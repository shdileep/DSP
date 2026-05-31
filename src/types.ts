export interface JobExperience {
  company: string;
  role: string;
  location: string;
  duration: string;
  bullets: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  duration: string;
  bullets: string[];
  stack: string[];
  problem: string;
  aiFeatures: string[];
  architecture: string; // Brief description
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Blog {
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  category: string;
  tags: string[];
}

export interface Achievement {
  title: string;
  description: string;
}

export interface ResumeData {
  name: string;
  title: string;
  subTitle: string;
  shortSummary: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  education: {
    institution: string;
    degree: string;
    cgpa?: string;
    percentage?: string;
    duration: string;
    location: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  experience: JobExperience[];
  projects: Project[];
  achievements: Achievement[];
  certifications: Certification[];
  blogs: Blog[];
}

export type ThemeStyle = 'neo-ai' | 'terminal-os' | 'minimal-linear' | 'cyber-synth';
