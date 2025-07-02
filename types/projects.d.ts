export interface Project {
  id: string;
  name: string;
  description: string;
  github_url?: string | null;
  live_url?: string | null;
  main_image_url?: string | null;
  tech_stack: string[];
  category: string;
  created_at: string;
  updated_at?: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
  github_url: string;
  live_url: string;
  main_image_url: string | null;
  tech_stack: string;
  category: string;
  featured: boolean;
  display_order: number | string;
}
