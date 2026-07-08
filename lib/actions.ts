"use server";

import { site } from "@/lib/content";
import { sendEmail } from "@/lib/mailer";
import type { InquiryState } from "@/lib/inquiry";

// reCAPTCHA v3 returns a score from 0.0 (bot) to 1.0 (human). 0.5 is Google's
// suggested default threshold.
const RECAPTCHA_THRESHOLD = 0.5;

// A verification outcome carries enough detail to diagnose *why* it failed.
// - "unavailable": our side / config problem (missing key, network, Google
//   error). The visitor can't fix it; retry later.
// - "rejected": reCAPTCHA judged the request (no token, low score, bot). This
//   is the normal "prove you're human" path.
type RecaptchaResult =
  | { ok: true; detail: string }
  | { ok: false; kind: "unavailable" | "rejected"; detail: string };

async function verifyRecaptcha(token: string): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { ok: false, kind: "unavailable", detail: "RECAPTCHA_SECRET_KEY is not set on the server" };
  }
  if (!token) {
    return { ok: false, kind: "rejected", detail: "no token received from the browser (reCAPTCHA script may not have loaded)" };
  }

  let res: Response;
  try {
    res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store", // Never cache verification requests.
    });
  } catch (err) {
    return { ok: false, kind: "unavailable", detail: `could not reach Google siteverify: ${String(err)}` };
  }

  if (!res.ok) {
    return { ok: false, kind: "unavailable", detail: `siteverify returned HTTP ${res.status}` };
  }

  const data = (await res.json()) as {
    success: boolean;
    score?: number;
    action?: string;
    "error-codes"?: string[];
  };

  if (!data.success) {
    const codes = data["error-codes"] ?? [];
    // A bad/missing secret is a config problem, not a bot; treat as unavailable.
    const isConfig = codes.some((c) => c.startsWith("invalid-input-secret") || c === "bad-request");
    return {
      ok: false,
      kind: isConfig ? "unavailable" : "rejected",
      detail: `siteverify rejected: ${codes.join(", ") || "no error-codes"}`,
    };
  }
  if (data.action !== "inquiry") {
    return { ok: false, kind: "rejected", detail: `unexpected action "${data.action}" (expected "inquiry")` };
  }
  const score = data.score ?? 0;
  if (score < RECAPTCHA_THRESHOLD) {
    return { ok: false, kind: "rejected", detail: `score ${score} below threshold ${RECAPTCHA_THRESHOLD}` };
  }
  return { ok: true, detail: `score ${score}` };
}

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function sendInquiry(
  _prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const name = clean(formData.get("name"));
  const email = clean(formData.get("email"));
  const format = clean(formData.get("format"));
  const subject = clean(formData.get("subject"));
  const message = clean(formData.get("message"));
  const token = clean(formData.get("token"));

  const values = { name, email, format, subject, message };
  // In development we append the internal detail to the user-facing message so
  // it's visible right in the browser. In production the message stays clean.
  const isDev = process.env.NODE_ENV !== "production";
  const fail = (msg: string, detail?: string): InquiryState => ({
    ok: false,
    message: isDev && detail ? `${msg} [dev detail: ${detail}]` : msg,
    values,
  });

  // Basic server-side validation (never trust the client).
  if (!name || !email) {
    return fail("Please provide your name and email.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail("That email address doesn't look right.");
  }

  // Spam check.
  const recaptcha = await verifyRecaptcha(token);
  if (!recaptcha.ok) {
    // Always log the reason server-side (terminal in dev, host logs in prod).
    console.error(`reCAPTCHA ${recaptcha.kind}: ${recaptcha.detail}`);
    if (recaptcha.kind === "unavailable") {
      return fail(
        "Spam verification is temporarily unavailable. Please try again later.",
        recaptcha.detail,
      );
    }
    return fail("We couldn't verify you're human. Please try again.", recaptcha.detail);
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Session type: ${format || "—"}`,
    `Subject: ${subject || "—"}`,
    "",
    message || "(no message provided)",
  ].join("\n");

  // 1) Notify the team. This is the critical send — fail the submission if it errors.
  try {
    await sendEmail({
      to: site.email,
      replyTo: `${name} <${email}>`,
      subject: `Tutoring inquiry — ${name}`,
      text,
      fromName: `${site.name} website`,
    });
  } catch (err) {
    console.error("Failed to send inquiry email:", err);
    return fail(
      `Sorry, something went wrong sending your message. Please email us directly at ${site.email}.`,
    );
  }

  // 2) Send the visitor a confirmation. Best-effort: a mistyped address that
  // still passed basic validation shouldn't make the whole submission look
  // failed to the user, since the team was already notified.
  try {
    await sendEmail({
      to: email,
      replyTo: site.email,
      subject: `Thanks for reaching out to ${site.name}`,
      fromName: site.name,
      text: confirmationText(name),
      html: confirmationHtml(name),
    });
  } catch (err) {
    console.error("Failed to send confirmation email to visitor:", err);
  }

  return {
    ok: true,
    message: "Thanks! Your inquiry is on its way — we'll reply within a day.",
  };
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || "there";
}

function confirmationText(name: string): string {
  return [
    `Hi ${firstName(name)},`,
    "",
    `Thanks for reaching out to ${site.name}! We've received your message and one of our tutors will be in touch with you shortly.`,
    "",
    `If you have any further questions in the meantime, just reply to this email or contact us at ${site.email}.`,
    "",
    `— The ${site.name} team`,
  ].join("\n");
}

function confirmationHtml(name: string): string {
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;padding:8px 4px;color:#1f2937;line-height:1.6;">
    <p style="margin:0 0 16px;">Hi ${escapeHtml(firstName(name))},</p>
    <p style="margin:0 0 16px;">
      Thanks for reaching out to <strong>${escapeHtml(site.name)}</strong>! We've received your
      message and one of our tutors will be in touch with you shortly.
    </p>
    <p style="margin:0 0 16px;">
      If you have any further questions in the meantime, just reply to this email or contact us at
      <a href="mailto:${site.email}" style="color:#2563eb;text-decoration:none;">${site.email}</a>.
    </p>
    <p style="margin:24px 0 0;color:#6b7280;">— The ${escapeHtml(site.name)} team</p>
  </div>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
