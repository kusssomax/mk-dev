export interface NavLink {
  href: string;
  label: string;
  num: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "#about", label: "About", num: "01" },
  { href: "#experience", label: "Experience", num: "02" },
  { href: "#projects", label: "Work", num: "03" },
  { href: "#contact", label: "Contact", num: "04" },
];
