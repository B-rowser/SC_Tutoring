"use client";

import { useState } from "react";
import { tutors } from "@/lib/content";

// Google Appointment Scheduling pages support being embedded in an iframe.
// We append the gv=true flag Google uses for its embedded ("gadget") view.
function embedUrl(url: string) {
  return url.includes("gv=true")
    ? url
    : url + (url.includes("?") ? "&" : "?") + "gv=true";
}

export default function Booking() {
  const bookable = tutors.filter((t) => Boolean(t.bookingUrl));
  const [active, setActive] = useState(0);

  // Section only appears once at least one tutor has a booking link set.
  if (bookable.length === 0) return null;

  const current = bookable[active];

  return (
    <section id="booking" className="bg-sand py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Book a session</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Choose your tutor and pick a time that works for you. Bookings sync
            straight to their calendar.
          </p>
        </div>

        {bookable.length > 1 && (
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {bookable.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  i === active
                    ? "bg-brand text-white"
                    : "bg-white text-ink ring-1 ring-black/5 hover:bg-brand-soft"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          <iframe
            key={current.bookingUrl}
            src={embedUrl(current.bookingUrl as string)}
            title={`Book a session with ${current.name}`}
            className="w-full"
            style={{ height: "700px", border: 0 }}
            loading="lazy"
          />
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Trouble seeing the calendar?{" "}
          <a
            href={current.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand hover:underline"
          >
            Open {current.name}&apos;s booking page
          </a>
          .
        </p>
      </div>
    </section>
  );
}
