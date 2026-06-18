import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-sand">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-bold text-brand">
              {site.name}
            </p>
            <p className="mt-1 text-sm text-muted">{site.tagline}</p>
          </div>

          <div className="text-sm text-muted">
            <p>
              <a className="hover:text-ink" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            {site.phone && <p className="mt-1">{site.phone}</p>}
            <p className="mt-1">{site.location}</p>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
