export interface Stat {
  id: number;
  label: string;
  value: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
}

export interface ExperienceBullet {
  id: number;
  text: string;
}

export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: ExperienceBullet[];
}

export interface EducationItem {
  id: number;
  institution: string;
  credential: string;
  location: string;
  period: string;
  note: string;
}

export interface ProjectHighlight {
  id: number;
  label: string;
  text: string;
}

export interface Project {
  id: number;
  number: number;
  title: string;
  tagline: string;
  live_url: string;
  repo_url: string;
  docs_url: string;
  stack: string;
  stack_list: string[];
  featured: boolean;
  highlights: ProjectHighlight[];
}

export interface ResumeBundle {
  stats: Stat[];
  skills: Skill[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
}
