export interface Skill {
  name: string;
  icon: React.ElementType; // Using React.ElementType for Lucide icons
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string; // URL to project image
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
}
