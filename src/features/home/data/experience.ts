export interface ExperienceItem {
  dates: string;
  role: string;
  company: string;
  highlight: string;
  tags: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    dates: "2023 — Present",
    role: "Senior Full-Stack Engineer",
    company: "Nimbus Labs",
    highlight:
      "Rebuilt the core platform on Next.js, cutting load times 40% and shipping a design system used by 6 teams.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    dates: "2021 — 2023",
    role: "Full-Stack Engineer",
    company: "Vertex Software",
    highlight: "Built and scaled React/Node services powering products used by 200k+ people.",
    tags: ["React", "Node.js", "Redis", "AWS"],
  },
  {
    dates: "2019 — 2021",
    role: "Frontend Developer",
    company: "Studio Loop",
    highlight: "Shipped design systems and interactive marketing sites for a dozen client brands.",
    tags: ["React", "TypeScript", "GraphQL"],
  },
];

/**
 * "2019 — Present" range shown next to the section heading, derived from the
 * earliest year across all entries instead of being hardcoded.
 */
const startYears = EXPERIENCE.map((item) => Number(item.dates.match(/\d{4}/)?.[0]));
export const EXPERIENCE_RANGE = `${Math.min(...startYears)} — Present`;
