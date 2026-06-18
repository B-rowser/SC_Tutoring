"use client";

import { useEffect } from "react";
import { site } from "@/lib/content";

export default function Booking() {
  // Section only appears once a Calendly link is configured in lib/content.ts.
  const url = site.calendlyUrl;

  useEffect(() => {
    if (!url) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  if (!url) return null;

  return (
    <section id="booking" className="bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Book a session</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Pick a time that works for you — choose a free consultation or jump
            straight into a session.
          </p>
        </div>

        <div
          className="calendly-inline-widget mt-10 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
          data-url={url}
          style={{ minWidth: "320px", height: "680px" }}
        />

        <p className="mt-6 text-center text-sm text-muted">
          Trouble seeing the calendar?{" "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand hover:underline"
          >
            Open the booking page
          </a>
          .
        </p>
      </div>
    </section>
  );
}
