import { testimonials } from "@/lib/content";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-brand py-14 sm:py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-bold">
          What families are saying
        </h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="rounded-3xl bg-white/10 p-8 backdrop-blur ring-1 ring-white/15"
            >
              <svg className="h-8 w-8 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M7.5 6C5 6 3 8 3 10.5c0 2.3 1.7 4.2 4 4.5-.2 2-1.4 3.3-3 3.7v2c3.6-.5 6-3.4 6-7.7V10C10 7.8 9 6 7.5 6zm9 0C14 6 12 8 12 10.5c0 2.3 1.7 4.2 4 4.5-.2 2-1.4 3.3-3 3.7v2c3.6-.5 6-3.4 6-7.7V10c0-2.2-1-4-2.5-4z" />
              </svg>
              <blockquote className="mt-4 text-lg leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-white/80">
                — {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
