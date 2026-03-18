export const SITE_CONFIG = {
  name: "Rıdvan Koçuk",
  title: "Full Stack Software Engineer",
  description:
    "Full Stack Software Engineer specializing in AI & Web Applications. Based in Istanbul, 4+ years experience.",
  url: "https://ridvankocuk.tech",
  email: "kck.rdvan@gmail.com",
  social: {
    github: "https://github.com/rdvankck",
    linkedin: "https://www.linkedin.com/in/r%C4%B1dvan-ko%C3%A7uk-00a16724a/",
  },
} as const;

export const NAV_ITEMS = [
  { label: "about.tsx", href: "#hero" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "education", href: "#education" },
  { label: "contact", href: "#contact" },
] as const;

export const DEVELOPER_CODE = `// Full Stack Software Engineer
const developer = {
  name: "Rıdvan Koçuk",
  location: "Istanbul, Turkey",
  focus: "AI, Web & Mobile",
  exp: "4+ years",
  passion: "Building scalable solutions"
};

export default developer;`;

export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-500",
  Python: "bg-blue-400",
  HTML: "bg-orange-500",
  CSS: "bg-blue-600",
} as const;
