export interface ExperienceItem {
  dates: string;
  role: string;
  company: string;
  highlight: string;
  tags: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    dates: "March 2025 — Present",
    role: "Full-stack Engineer",
    company: "InsAlder",
    highlight:
      "Core contributor to an enterprise SaaS platform for AI agents — real-time LLM chat, agent builder, MCP server integrations, and multi-tenant orgs — built on a React, TypeScript, Tailwind CSS + shadcn/ui for styling, RTK Query for state management, i18n for localization, and WebSockets for real-time communication. Also delivered two more products end to end on the same team: DTMM, a full-stack Next.js platform, and ICDTAI, a certification-platform site.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS", "RTK Query", "WebSockets"],
  },
  {
    dates: "November 2024 — March 2025",
    role: "Frontend Developer (Freelance)",
    company: "E-commerce Clothing Store",
    highlight:
      "Freelance frontend work on an e-commerce clothing store — fixed bugs across the codebase to improve UI stability, built new UI components from scratch in React + TypeScript with pixel-perfect implementation of Figma designs, and shipped new features from business requirements while working closely with the client. State managed with Zustand, styling with CSS Modules.",
    tags: ["React", "TypeScript", "Zustand", "CSS Modules", "Figma"],
  },
];


const startYears = EXPERIENCE.map((item) => Number(item.dates.match(/\d{4}/)?.[0]));
export const EXPERIENCE_RANGE = `${Math.min(...startYears)} — Present`;
