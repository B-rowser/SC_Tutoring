import Link from "next/link";
import { site } from "@/lib/content";

const links = [
  { href: "#services", label: "Services" },
  { href: "#team", label: "Meet the Team" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur border-b border-black/5">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="#top" className="font-display font-bold text-xl text-brand">
          {site.name}
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
        >
          Book
        </a>
      </nav>
    </header>
  );
}
