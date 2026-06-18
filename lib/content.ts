// ───────────────────────────────────────────────────────────────────────────
// SITE CONTENT — edit everything about the site's copy here.
// Non-developers can safely change the text in this file.
// ───────────────────────────────────────────────────────────────────────────

export const site = {
  name: "SC Tutoring",
  tagline: "Personalized tutoring that builds confidence",
  description:
    "1-on-1 and small group sessions led by three experienced tutors who meet students where they are.",
  email: "hello@sctutoring.com", // TODO: replace with your real contact email
  phone: "(555) 123-4567", // TODO: replace or remove
  location: "Online & in-person", // service area
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
  "Algebra",
  "Geometry",
  "Calculus",
  "Chemistry",
  "Biology",
  "Physics",
  "Reading & Writing",
  "SAT / ACT Prep",
];

// ── The team. Drop headshots in /public/headshots and update `photo`. ─────────
export type Tutor = {
  name: string;
  role: string;
  photo: string; // path under /public, e.g. "/headshots/jane.jpg"
  bio: string;
  subjects: string[];
};

export const tutors: Tutor[] = [
  {
    name: "Tutor One",
    role: "Math & Test Prep",
    photo: "/headshots/tutor-one.jpg",
    bio: "Replace this with the first bio. A couple of warm sentences about background, teaching style, and what students can expect.",
    subjects: ["Algebra", "Calculus", "SAT / ACT Prep"],
  },
  {
    name: "Tutor Two",
    role: "Science",
    photo: "/headshots/tutor-two.jpg",
    bio: "Replace this with the second bio. Mention experience, favorite subjects, and the kind of students you love working with.",
    subjects: ["Chemistry", "Biology", "Physics"],
  },
  {
    name: "Tutor Three",
    role: "Reading & Writing",
    photo: "/headshots/tutor-three.jpg",
    bio: "Replace this with the third bio. Keep it friendly and approachable — this is often what convinces a parent to reach out.",
    subjects: ["Reading & Writing", "SAT / ACT Prep"],
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
    author: "SAT prep student",
  },
];
