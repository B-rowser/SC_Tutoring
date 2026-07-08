import { subjects } from "@/lib/content";

export default function Subjects() {
  return (
    <section id="subjects" className="bg-sand py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">What we tutor</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          From building fundamentals to acing the big test — here&apos;s where we
          can help.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {subjects.map((s) => (
            <span
              key={s}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium shadow-sm ring-1 ring-black/5"
            >
              {s}
            </span>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted">
          Don&apos;t see your subject?{" "}
          <a href="#contact" className="font-semibold text-brand hover:underline">
            Just ask
          </a>{" "}
          — we may still be able to help.
        </p>
      </div>
    </section>
  );
}
