import {
  faqs,
  packages,
  serviceAreas,
  site,
  subjects,
  tutors,
} from "@/lib/content";

// ───────────────────────────────────────────────────────────────────────────
// JSON-LD structured data. This is invisible on the page — it describes the
// business to Google in a machine-readable way so it can show rich results
// (FAQ dropdowns, business info panels) and understand that we're a local
// tutoring service rather than a generic website.
//
// Test changes with https://search.google.com/test/rich-results
// ───────────────────────────────────────────────────────────────────────────

const businessId = `${site.url}/#business`;

const business = {
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": businessId,
  name: site.name,
  description: site.seoDescription,
  url: site.url,
  email: site.email,
  ...(site.phone ? { telephone: site.phone } : {}),
  image: `${site.url}/og.png`,
  logo: `${site.url}/logo.svg`,
  areaServed: serviceAreas.map((name) => ({
    "@type": "City",
    name,
    address: {
      "@type": "PostalAddress",
      addressRegion: "CA",
      addressCountry: "US",
    },
  })),
  address: {
    "@type": "PostalAddress",
    addressRegion: "CA",
    addressCountry: "US",
  },
  knowsAbout: subjects,
  employee: tutors.map((tutor) => ({
    "@type": "Person",
    name: tutor.name,
    jobTitle: tutor.role,
    image: `${site.url}${tutor.photo}`,
    knowsAbout: tutor.subjects,
  })),
  sameAs: Object.values(site.social).filter(Boolean),
  makesOffer: packages.map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.blurb,
    ...(p.price === "Free"
      ? { price: "0", priceCurrency: "USD" }
      : { priceCurrency: "USD", price: p.price.replace(/[^0-9.]/g, "") }),
    category: p.unit || undefined,
  })),
};

const faqPage = {
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const website = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { "@id": businessId },
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [business, website, ...(faqs.length ? [faqPage] : [])],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // `<` is escaped so a stray HTML tag in the content file can't break out
      // of the script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
