export interface NameLetter {
  char: string;
  delay: number;
  accent?: boolean;
}

export const NAME_LETTERS: NameLetter[] = [
  { char: "M", delay: 0.05 },
  { char: "a", delay: 0.12 },
  { char: "k", delay: 0.19 },
  { char: "s", delay: 0.26 },
  { char: ".", delay: 0.33, accent: true },
];
