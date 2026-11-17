export interface NavItemConfig {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const NAV_ITEMS: readonly NavItemConfig[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
