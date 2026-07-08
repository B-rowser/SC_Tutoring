import { packages, pricingNote, bookingEnabled } from "@/lib/content";

export default function Pricing() {
  const bookHref = bookingEnabled ? "#booking" : "#contact";

  return (
    <section id="pricing" className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Simple, fair pricing</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            No contracts, no surprises. Start with a free consultation and go
            from there.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl p-8 ring-1 transition ${
                p.featured
                  ? "bg-brand text-white ring-brand shadow-lg lg:-translate-y-2"
                  : "bg-white ring-black/5 shadow-sm"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-ink">
                  Most popular
                </span>
              )}

              <h3 className="text-xl font-semibold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{p.price}</span>
                {p.unit && (
                  <span
                    className={`text-sm ${p.featured ? "text-white/80" : "text-muted"}`}
                  >
                    {p.unit}
                  </span>
                )}
              </div>
              <p
                className={`mt-3 text-sm ${p.featured ? "text-white/90" : "text-muted"}`}
              >
                {p.blurb}
              </p>

              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <svg
                      className={`h-4 w-4 shrink-0 ${p.featured ? "text-accent" : "text-brand"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={bookHref}
                className={`mt-8 rounded-full px-6 py-3 text-center font-semibold transition-colors ${
                  p.featured
                    ? "bg-white text-brand hover:bg-white/90"
                    : "bg-brand text-white hover:bg-brand-dark"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        {pricingNote && (
          <p className="mt-10 text-center text-sm text-muted">{pricingNote}</p>
        )}
      </div>
    </section>
  );
}
