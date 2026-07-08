import { faqs } from "@/lib/content";

export default function FAQ() {
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="bg-sand py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 [&_summary]:list-none"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                {item.q}
                <svg
                  className="h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="mt-3 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
