// ───────────────────────────────────────────────────────────────────────────
// SITE CONTENT — edit everything about the site's copy here.
// Non-developers can safely change the text in this file.
// ───────────────────────────────────────────────────────────────────────────

export const site = {
  name: "SC Tutoring",
  tagline: "Personalized tutoring that builds confidence",
  description:
    "1-on-1 and small group sessions led by local Sonoma County educators who meet students where they are.",
  email: "hello@sctutoring.com", // TODO: replace with your real contact email
  phone: "", // optional — e.g. "(707) 555-1234"
  location: "Sonoma County — online & in-person", // service area
  // Booking — paste your Calendly link here to enable the booking section.
  // e.g. "https://calendly.com/sctutoring/intro-session". Leave empty to hide it.
  calendlyUrl: "",
  social: {
    instagram: "", // e.g. "https://instagram.com/sctutoring"
    facebook: "",
  },
};

// ── Services we advertise ────────────────────────────────────────────────────
export const services = [
  {
    title: "1-on-1 Sessions",
    blurb:
      "Focused, fully personalized attention. We tailor every session to your student's pace, goals, and learning style.",
    points: ["Custom study plan", "Flexible scheduling", "Progress check-ins"],
    icon: "user",
  },
  {
    title: "Small Group Sessions",
    blurb:
      "Learn alongside a few peers (2–4 students). Collaborative, motivating, and more affordable per student.",
    points: ["2–4 students", "Peer learning", "Lower per-session cost"],
    icon: "users",
  },
];

// ── Subjects we tutor ────────────────────────────────────────────────────────
export const subjects = [
  "Elementary Math",
  "Middle School Math",
  "Pre-Algebra",
  "Reading & Writing",
  "Creative Writing",
  "Essay & Application Help",
  "Public Speaking & Performance",
  "Study Skills",
];

// ── The team. Headshots live in /public/headshots. ───────────────────────────
export type Tutor = {
  name: string;
  role: string;
  photo: string; // path under /public, e.g. "/headshots/andy.png"
  bio: string;
  subjects: string[];
};

export const tutors: Tutor[] = [
  {
    name: "Natalie Miller",
    role: "Elementary & Middle School Math",
    photo: "/headshots/natalie.png",
    bio: "A 20-year resident of West Sonoma County, Natalie has spent the past four years substitute teaching across the county and is pursuing her Foundational-Level Mathematics Teaching Credential. She specializes in helping elementary and middle school students strengthen their math skills, overcome challenges, and build a positive, confident attitude toward learning — living for those “aha!” moments when a concept finally clicks.",
    subjects: ["Elementary Math", "Middle School Math", "Pre-Algebra"],
  },
  {
    name: "Andy Spring",
    role: "Reading, Writing & Performance",
    photo: "/headshots/andy.png",
    bio: "A lifelong Petaluma resident, Andy earned a B.A. in Literature with a concentration in Creative Writing from UC Santa Cruz, then studied screenwriting and acting at the Los Angeles Performing Arts Conservatory. He's completing his teaching credential through the Sonoma County Office of Education's “Be a Teacher” program and is dedicated to helping the next generation of students find their unique voice.",
    subjects: [
      "Reading & Writing",
      "Creative Writing",
      "Public Speaking & Performance",
    ],
  },
  {
    name: "Tim",
    role: "Tutor",
    photo: "/headshots/tim.jpg", // TODO: add Tim's headshot to /public/headshots
    bio: "Bio coming soon.", // TODO: add Tim's bio (bios/Tim_bio.txt was empty)
    subjects: [],
  },
];

// ── Pricing / packages ────────────────────────────────────────────────────────
// Set `price` to a string ("$" amount or "Free"). `unit` is shown after it.
export const packages = [
  {
    name: "Free Consultation",
    price: "Free",
    unit: "",
    blurb: "A no-pressure call to talk goals and find the right fit.",
    features: ["15–20 minutes", "Meet your tutor", "No commitment"],
    cta: "Book a call",
    featured: false,
  },
  {
    name: "1-on-1 Session",
    price: "$60",
    unit: "/ hour",
    blurb: "Fully personalized, one-on-one attention.",
    features: [
      "Custom study plan",
      "Flexible scheduling",
      "Progress updates",
      "Online or in-person",
    ],
    cta: "Get started",
    featured: true,
  },
  {
    name: "Small Group",
    price: "$35",
    unit: "/ student / hour",
    blurb: "Learn with 2–4 peers at a lower per-student rate.",
    features: ["2–4 students", "Collaborative learning", "Same expert tutors"],
    cta: "Get started",
    featured: false,
  },
];

// Shown under the pricing cards. Set to "" to hide.
export const pricingNote =
  "Packages of 5 or 10 sessions are available at a discount — just ask.";

// ── Frequently asked questions ────────────────────────────────────────────────
export const faqs = [
  {
    q: "Do you tutor online, in person, or both?",
    a: "Both. We meet students across Sonoma County in person and also offer online sessions over video — whatever works best for your family.",
  },
  {
    q: "What ages and grade levels do you work with?",
    a: "We work with elementary, middle, and high school students. Reach out and we'll match your student with the right tutor.",
  },
  {
    q: "How big are the small group sessions?",
    a: "Small groups are capped at 2–4 students so everyone still gets plenty of individual attention.",
  },
  {
    q: "How do we get started?",
    a: "Start with a free consultation. We'll talk through your student's goals, answer questions, and find a tutor and schedule that fit.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Life happens — just let us know at least 24 hours in advance to reschedule at no charge.",
  },
];

// ── Optional: testimonials (great for trust). Leave empty to hide section. ────
export const testimonials = [
  {
    quote:
      "My daughter went from dreading math to looking forward to her sessions. Her grade jumped a full letter in one semester.",
    author: "Parent of a 10th grader",
  },
  {
    quote:
      "The small group format kept me motivated. It felt less like a class and more like studying with friends who actually get it.",
    author: "Writing student",
  },
];
