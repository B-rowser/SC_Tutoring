"use server";

import { site } from "@/lib/content";
import { sendEmail } from "@/lib/mailer";
import type { InquiryState } from "@/lib/inquiry";

// reCAPTCHA v3 returns a score from 0.0 (bot) to 1.0 (human). 0.5 is Google's
// suggested default threshold.
const RECAPTCHA_THRESHOLD = 0.5;

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    throw new Error("Missing RECAPTCHA_SECRET_KEY environment variable");
  }
  if (!token) return false;

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
    // Never cache verification requests.
    cache: "no-store",
  });

  if (!res.ok) return false;
  const data = (await res.json()) as {
    success: boolean;
    score?: number;
    action?: string;
  };

  return (
    data.success &&
    data.action === "inquiry" &&
    (data.score ?? 0) >= RECAPTCHA_THRESHOLD
  );
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
  const fail = (msg: string): InquiryState => ({ ok: false, message: msg, values });

  // Basic server-side validation (never trust the client).
  if (!name || !email) {
    return fail("Please provide your name and email.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail("That email address doesn't look right.");
  }

  // Spam check.
  let human = false;
  try {
    human = await verifyRecaptcha(token);
  } catch {
    return fail("Spam verification is temporarily unavailable. Please try again later.");
  }
  if (!human) {
    return fail("We couldn't verify you're human. Please try again.");
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
