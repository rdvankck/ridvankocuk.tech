import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: "#F7DF1E",
    TypeScript: "#3178C6",
    Python: "#3776AB",
    HTML: "#E34F26",
    CSS: "#1572B6",
    Java: "#ED8B00",
    Go: "#00ADD8",
    Rust: "#000000",
  };
  return colors[language] || "#8B949E";
}
