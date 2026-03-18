export interface Project {
  id: string;
  name: string;
  language: string;
  description: string;
  longDescription: string;
  techStack: string[];
  github: string;
  demo: string | null;
  image: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillsData {
  skills: Skill[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
