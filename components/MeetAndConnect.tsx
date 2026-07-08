"use client";

import { useActionState, useCallback, useEffect, useState } from "react";
import { tutors, subjects, site, bookingEnabled, type Tutor } from "@/lib/content";
import { sendInquiry } from "@/lib/actions";
import { initialInquiryState } from "@/lib/inquiry";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Headshot({ tutor }: { tutor: Tutor }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-3xl font-bold text-brand-dark sm:h-32 sm:w-32">
        {initials(tutor.name)}
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={tutor.photo}
      alt={tutor.name}
      className="h-28 w-28 shrink-0 rounded-2xl object-cover sm:h-32 sm:w-32"
      onError={() => setBroken(true)}
    />
  );
}

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <Headshot tutor={tutor} />
      <div className="min-w-0">
        <h3 className="text-lg font-semibold leading-tight">{tutor.name}</h3>
        <p className="text-sm font-medium text-brand">{tutor.role}</p>
        <p className="mt-2 text-sm text-muted">{tutor.bio}</p>
        {tutor.subjects.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tutor.subjects.map((s) => (
              <span
                key={s}
                className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ContactCard() {
  // Load the reCAPTCHA v3 script once when the form mounts.
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    const id = "recaptcha-v3";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Client wrapper: fetch a fresh reCAPTCHA token, attach it to the form data,
  // then hand off to the server action that emails the inquiry.
  const submit = useCallback(
    async (_prev: typeof initialInquiryState, formData: FormData) => {
      if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
        try {
          const token = await new Promise<string>((resolve, reject) => {
            window.grecaptcha!.ready(() => {
              window
                .grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action: "inquiry" })
                .then(resolve, reject);
            });
          });
          formData.set("token", token);
        } catch {
          return {
            ok: false,
            message: "Couldn't load spam protection. Please try again.",
          };
        }
      }
      return sendInquiry(_prev, formData);
    },
    [],
  );

  const [state, formAction, pending] = useActionState(
    submit,
    initialInquiryState,
  );

  const field =
    "w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-soft disabled:opacity-60";

  const v = state.values;

  return (
    <div
      id="contact"
      className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 lg:sticky lg:top-20"
    >
      <h3 className="text-xl font-semibold">Get in touch</h3>
      <p className="mt-1 text-sm text-muted">
        Tell us about your student — we reply within a day.
      </p>

      {bookingEnabled && (
        <a
          href="#booking"
          className="mt-4 flex w-full items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
        >
          Book online instantly
        </a>
      )}

      {state.ok ? (
        <div className="mt-4 rounded-2xl bg-brand-soft p-4 text-sm text-muted">
          {state.message} Prefer email? Reach us at{" "}
          <a className="font-semibold text-brand" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </div>
      ) : (
        <form action={formAction} className="mt-4 grid gap-3">
          <input
            name="name"
            required
            placeholder="Your name"
            defaultValue={v?.name}
            className={field}
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            defaultValue={v?.email}
            className={field}
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              name="format"
              aria-label="Session type"
              defaultValue={v?.format}
              className={field}
            >
              <option>1-on-1</option>
              <option>Small group</option>
              <option>Not sure yet</option>
            </select>
            <select
              name="subject"
              aria-label="Subject"
              defaultValue={v?.subject}
              className={field}
            >
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
              <option>Other</option>
            </select>
          </div>
          <textarea
            name="message"
            rows={3}
            placeholder="Grade level, goals, availability…"
            defaultValue={v?.message}
            className={field}
          />
          {state.message && !state.ok && (
            <p aria-live="polite" className="text-sm font-medium text-red-600">
              {state.message}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? "Sending…" : "Send inquiry"}
          </button>
          <p className="text-center text-[11px] leading-tight text-muted">
            Protected by reCAPTCHA. Google&apos;s{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Terms
            </a>{" "}
            apply.
          </p>
        </form>
      )}
    </div>
  );
}

export default function MeetAndConnect() {
  return (
    <section id="team" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Meet your tutors</h2>
        <p className="mt-2 text-muted">
          A small, local team that genuinely cares about your student&apos;s
          progress.
        </p>

        {/* Heading sits above the grid so the contact card lines up with the
            top of the first tutor card, not the top of the section. */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[7fr_3fr]">
          {/* Bios */}
          <div className="grid gap-4">
            {tutors.map((t) => (
              <TutorCard key={t.name} tutor={t} />
            ))}
          </div>

          {/* Contact / booking */}
          <div>
            <ContactCard />
          </div>
        </div>
      </div>
    </section>
  );
}
