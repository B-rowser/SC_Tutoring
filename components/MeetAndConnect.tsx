"use client";

import { useState } from "react";
import { tutors, subjects, site, bookingEnabled, type Tutor } from "@/lib/content";

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
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const format = String(data.get("format") || "");
    const subject = String(data.get("subject") || "");
    const message = String(data.get("message") || "");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Format: ${format}`,
      `Subject: ${subject}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Tutoring inquiry — ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-soft";

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

      {sent ? (
        <div className="mt-4 rounded-2xl bg-brand-soft p-4 text-sm text-muted">
          Thanks! Your email app should have opened with your message ready to
          send. Or email us at{" "}
          <a className="font-semibold text-brand" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
          <input name="name" required placeholder="Your name" className={field} />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className={field}
          />
          <div className="grid grid-cols-2 gap-3">
            <select name="format" aria-label="Session type" className={field}>
              <option>1-on-1</option>
              <option>Small group</option>
              <option>Not sure yet</option>
            </select>
            <select name="subject" aria-label="Subject" className={field}>
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
            className={field}
          />
          <button
            type="submit"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            Send inquiry
          </button>
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
