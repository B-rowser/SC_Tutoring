// Shared types/constants for the contact form. Kept out of lib/actions.ts
// because a "use server" file may only export async functions.

export type InquiryState = {
  ok: boolean;
  message: string;
  // Field values are echoed back so the form can repopulate on error.
  values?: {
    name: string;
    email: string;
    format: string;
    subject: string;
    message: string;
  };
};

export const initialInquiryState: InquiryState = { ok: false, message: "" };
