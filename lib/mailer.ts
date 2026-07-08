import { Resend } from "resend";

// The Resend client is created lazily and reused across requests (module scope
// persists between invocations on a warm server). Requires RESEND_API_KEY.
let cached: Resend | null = null;

function getClient(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("Missing required environment variable: RESEND_API_KEY");
  }
  cached = new Resend(key);
  return cached;
}

export async function sendEmail(params: {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
  // Display name shown before the "from" address. Defaults to the domain address.
  fromName?: string;
}): Promise<void> {
  // The "from" address must be on a domain you've verified in Resend.
  // Falls back to Resend's shared onboarding domain for quick local testing.
  const from = process.env.RESEND_FROM || "onboarding@resend.dev";

  const { error } = await getClient().emails.send({
    from: params.fromName ? `${params.fromName} <${from}>` : from,
    to: params.to,
    ...(params.replyTo ? { replyTo: params.replyTo } : {}),
    subject: params.subject,
    text: params.text,
    ...(params.html ? { html: params.html } : {}),
  });

  if (error) {
    // Surface Resend's error to the caller so the action can log it.
    throw new Error(`Resend error: ${error.name} — ${error.message}`);
  }
}
