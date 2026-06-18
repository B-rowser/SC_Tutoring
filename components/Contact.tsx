"use client";

import { useState } from "react";
import { site, subjects } from "@/lib/content";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const format = String(data.get("format") || "");
    const subject = String(data.get("subject") || "");
    const message = String(data.get("message") || "");

    // Zero-backend approach: open the visitor's email client pre-filled.
    // To collect submissions automatically instead, swap this for a service
    // like Formspree (https://formspree.io) and post `data` to its endpoint.
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
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-soft";

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Contact us</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Tell us a little about your student and what you&apos;re looking for.
            We&apos;ll get back to you within a day.
          </p>
        </div>

        {sent ? (
          <div className="mt-10 rounded-3xl bg-brand-soft p-8 text-center">
            <h3 className="text-xl font-semibold text-brand-dark">Thanks!</h3>
            <p className="mt-2 text-muted">
              Your email app should have opened with your message ready to send.
              Prefer to reach us directly? Email{" "}
              <a className="font-semibold text-brand" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 grid gap-4 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium" htmlFor="name">
                  Your name
                </label>
                <input id="name" name="name" required className={`mt-1 ${field}`} />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`mt-1 ${field}`}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium" htmlFor="format">
                  Session type
                </label>
                <select id="format" name="format" className={`mt-1 ${field}`}>
                  <option>1-on-1</option>
                  <option>Small group</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="subject">
                  Subject
                </label>
                <select id="subject" name="subject" className={`mt-1 ${field}`}>
                  {subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="message">
                Anything else?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`mt-1 ${field}`}
                placeholder="Grade level, goals, availability…"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-full bg-brand px-7 py-3 font-semibold text-white hover:bg-brand-dark transition-colors"
            >
              Send inquiry
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
