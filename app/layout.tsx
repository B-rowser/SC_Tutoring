import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { seoKeywords, site } from "@/lib/content";

// Analytics uses the measurement ID from lib/content.ts. Setting
// NEXT_PUBLIC_GA_ID in the environment overrides it — useful for pointing a
// staging deploy at a separate GA property. Blank in both places = no tracking.
const gaId = process.env.NEXT_PUBLIC_GA_ID || site.gaId;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seoTitle,
  description: site.seoDescription,
  keywords: seoKeywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  // Canonical URL — tells Google which address is the real one so traffic to
  // www/non-www or ?utm_source= links all counts toward the same page.
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: site.seoTitle,
    description: site.seoDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.seoDescription,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StructuredData />
        {children}
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
