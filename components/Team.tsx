"use client";

import { useState } from "react";
import { tutors, type Tutor } from "@/lib/content";

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
    // Graceful placeholder until a real headshot is added to /public/headshots
    return (
      <div className="flex h-full w-full items-center justify-center bg-brand-soft text-3xl font-bold text-brand-dark">
        {initials(tutor.name)}
      </div>
    );
  }

  // Plain <img> (not next/image) so missing files degrade gracefully.
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={tutor.photo}
      alt={tutor.name}
      className="h-full w-full object-cover"
      onError={() => setBroken(true)}
    />
  );
}

export default function Team() {
  return (
    <section id="team" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Meet your tutors</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            A small team that genuinely cares about your student&apos;s progress.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {tutors.map((t) => (
            <div
              key={t.name}
              className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
            >
              <div className="aspect-square w-full overflow-hidden">
                <Headshot tutor={t} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{t.name}</h3>
                <p className="text-sm font-medium text-brand">{t.role}</p>
                <p className="mt-3 text-sm text-muted">{t.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.subjects.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-sand px-3 py-1 text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
