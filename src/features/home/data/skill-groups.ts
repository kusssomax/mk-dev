export interface SkillGroup {
  name: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "SCSS", "shadcn/ui"],
  },
  {
    name: "Backend & Data",
    items: ["Node.js", "PostgreSQL", "Prisma ORM", "MongoDB", "REST API"],
  },
  {
    name: "State & Forms",
    items: ["Redux Toolkit / RTK Query", "TanStack Query", "React Hook Form", "Zod"],
  },
  {
    name: "Tools & AI",
    items: ["Git", "GitHub Actions (CI/CD)", "Vite", "Figma", "Gemini API"],
  },
];
