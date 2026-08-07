export interface ProjectItem {
  name: string;
  desc: string;
  tags: string[];
  href: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    name: "DTMM",
    desc: "Digital Transformation Maturity Model — a full-stack assessment platform scoring organizations across 7 categories on a 0-6 maturity scale, with a guest-to-account flow, PDF report generation, and assessment history, built end to end with Next.js, PostgreSQL/PrismaORM, and Auth0 for authentication.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "PrismaORM", "Auth0"],
    href: "#",
  },
  {
    name: "AI Telegram Bot",
    desc: "Telegram bot that turns a short brief into 30 ready-to-record Instagram Reels scripts, powered by the Gemini API with batched generation and automatic JSON validation, deployed on a VPS with automated CI/CD.",
    tags: ["Node.js", "TypeScript", "grammY", "Gemini API", "GitHub Actions"],
    href: "#",
  },
  {
    name: "ICDTAI",
    desc: "Certification platform for digital-transformation leaders — dynamic program pages, multi-step application flows, and a Tailwind design system, statically exported from Next.js.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "#",
  },
];

export const PROJECTS_RANGE = "Selected, 2025 — Present";
