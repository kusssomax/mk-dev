export interface NameLetter {
  char: string;
  delay: string;
  accent?: boolean;
}

export const NAME_LETTERS: NameLetter[] = [
  { char: "M", delay: "0.05s" },
  { char: "a", delay: "0.12s" },
  { char: "k", delay: "0.19s" },
  { char: "s", delay: "0.26s" },
  { char: ".", delay: "0.33s", accent: true },
];
