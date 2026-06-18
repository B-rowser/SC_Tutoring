import { site } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
    >
      {/* soft decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-soft blur-3xl opacity-60" />
      <div className="pointer-events-none absolute top-32 -left-24 h-72 w-72 rounded-full bg-accent-soft blur-3xl opacity-60" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 text-center">
        <span className="inline-block rounded-full bg-brand-soft px-4 py-1 text-sm font-medium text-brand-dark">
          1-on-1 &amp; small group tutoring
        </span>

        <h1 className="mt-6 text-4xl sm:text-6xl font-bold leading-tight">
          {site.tagline}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          {site.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-brand px-7 py-3 font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            Get started
          </a>
          <a
            href="#team"
            className="rounded-full border border-brand px-7 py-3 font-semibold text-brand hover:bg-brand-soft transition-colors"
          >
            Meet the tutors
          </a>
        </div>
      </div>
    </section>
  );
}
