export interface SkillGroup {
  name: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Redux / Zustand", "Tailwind CSS"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "GraphQL", "REST APIs"],
  },
  {
    name: "Tools",
    items: ["Git", "Docker", "AWS", "CI/CD", "Figma"],
  },
];
