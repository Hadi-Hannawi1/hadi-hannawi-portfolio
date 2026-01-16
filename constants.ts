import { Project, Skill, SocialLink } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive analytics dashboard for online retailers featuring real-time data visualization and inventory management.',
    category: 'Web App',
    technologies: ['React', 'TypeScript', 'D3.js', 'Tailwind'],
    imageUrl: 'https://picsum.photos/seed/dash/800/600',
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'AI Image Generator',
    description: 'A SaaS platform allowing users to generate images using generative AI models with a custom credit system.',
    category: 'AI / ML',
    technologies: ['Next.js', 'Python', 'Stripe', 'Gemini API'],
    imageUrl: 'https://picsum.photos/seed/ai/800/600',
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
  },
  {
    id: '3',
    title: '3D Portfolio',
    description: 'An interactive portfolio utilizing WebGL and R3F to create immersive user experiences.',
    category: 'Creative',
    technologies: ['Three.js', 'React Three Fiber', 'GLSL'],
    imageUrl: 'https://picsum.photos/seed/port/800/600',
    liveUrl: '#',
    repoUrl: '#',
    featured: false,
  },
];

export const SKILLS: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Three.js', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'GraphQL'],
  },
  {
    category: 'Design & Tools',
    items: ['Figma', 'Blender', 'Docker', 'AWS', 'CI/CD'],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/hadi-hannawi', icon: 'linkedin' },
  { platform: 'Email', url: 'mailto:contact@hadi-hannawi.com', icon: 'mail' },
];

export const ADMIN_PIN = '1234';