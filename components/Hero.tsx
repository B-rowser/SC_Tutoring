import Image from "next/image";
import { site } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* background banner photo */}
      <Image
        src="/banner.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* gradient fade to white — keeps text legible and blends into the page below */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/48 via-white/32 to-white" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/56 to-transparent" />

      {/* photo credit — revealed on hover */}
      <div className="group absolute bottom-3 right-3 z-10">
        <button
          type="button"
          aria-label="Photo credit"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition-colors hover:bg-black/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M4 8a2 2 0 0 1 2-2h1.5l1-1.5h5l1 1.5H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
            <circle cx="12" cy="12.5" r="3" />
          </svg>
        </button>
        <span className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md bg-black/80 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
          Photo by Amanda Villalobos
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-center md:gap-12 md:text-left">
          {/* logo on the left */}
          <Image
            src="/logo.svg"
            alt={site.name}
            width={384}
            height={216}
            priority
            className="w-[294px] shrink-0 sm:w-[331px] md:w-[368px]"
          />

          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-brand-soft px-4 py-1 text-sm font-medium text-brand-dark">
              1-on-1 &amp; small group tutoring
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
              {site.tagline}
            </h1>

            <p className="mt-4 font-medium text-ink">{site.description}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href="#contact"
                className="rounded-full bg-brand px-6 py-2.5 font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Get started
              </a>
              <a
                href="#pricing"
                className="rounded-full border border-brand px-6 py-2.5 font-semibold text-brand transition-colors hover:bg-brand-soft"
              >
                View pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
