export interface Project {
  id: string;
  title: string;
  description: string;
  category: string; // New field for filtering
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  category: string;
  items: string[];
}