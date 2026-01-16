import { Project, Skill, SocialLink } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Email Automation',
    description: 'Intelligent email automation system that uses Google Gemini AI to automatically process and respond to emails through n8n workflows, reducing manual email handling by 80%.',
    category: 'Automation',
    technologies: ['n8n', 'Gemini AI', 'Webhooks', 'API Integration', 'JavaScript'],
    // --------------------------------------------------------------------------
    // IMAGE PATH CONFIGURATION
    // Maps to: public/images/ai-email-automation.jpg
    // Ensure the file exists in the 'public/images' folder with this exact name.
    // --------------------------------------------------------------------------
    imageUrl: '/images/ai-email-automation.jpg',
    liveUrl: '', // Internal system
    repoUrl: '', // Private repo
    featured: true,
    order: 1,
    problem: 'Manual email processing slowed response times and overwhelmed support teams.',
    solution: 'Built automated AI-powered email response system using n8n workflows integrated with Gemini AI for intelligent content generation.',
    results: [
      '80% reduction in email response time',
      '95% accuracy in email classification',
      'Automated 500+ emails per day',
      'Saved 20+ hours per week for team'
    ]
  },
  {
    id: '2',
    title: 'Digital Growth Studio',
    description: 'Modern, high-converting business landing page for a digital marketing agency with responsive design, smooth animations, and optimized performance.',
    category: 'Web Development',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Grid', 'Flexbox'],
    // Maps to: public/images/digital-growth-studio.jpg
    imageUrl: '/images/digital-growth-studio.jpg',
    liveUrl: 'https://digital-growth-studio.netlify.app/',
    repoUrl: 'https://github.com/hadi-hannawi1/portfolio-projects/tree/main/business-landing',
    featured: true,
    order: 2,
    problem: 'Agency needed a professional online presence to convert visitors into leads.',
    solution: 'Designed and developed a modern, mobile-first landing page with compelling copy, smooth animations, and clear CTAs.',
    results: [
      '98/100 Lighthouse performance score',
      '45% increase in lead generation',
      '<2 second page load time',
      '100% mobile responsive'
    ]
  },
  {
    id: '3',
    title: 'Smart Form Processor',
    description: 'Advanced multi-step form with real-time validation, progress tracking, and local storage persistence. Features dynamic field validation and conditional logic.',
    category: 'Web Development',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage API', 'Form Validation'],
    // Maps to: public/images/smart-form-processor.jpg
    imageUrl: '/images/smart-form-processor.jpg',
    liveUrl: 'https://smart-form-processor.netlify.app/',
    repoUrl: 'https://github.com/hadi-hannawi1/portfolio-projects/tree/main/smart-form',
    featured: true,
    order: 3,
    problem: 'Standard single-page forms had 75% abandonment rate.',
    solution: 'Built intuitive multi-step form with progress indicators, auto-save functionality, and real-time validation feedback.',
    results: [
      '60% reduction in form abandonment',
      '40% increase in completed submissions',
      'Auto-save prevents data loss',
      'Average completion time: 3 minutes'
    ]
  },
  {
    id: '4',
    title: 'La Belle Cuisine',
    description: 'Elegant restaurant website with dynamic menu system, online reservations, and location integration. Features JSON-based content management for easy menu updates.',
    category: 'Web Development',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'JSON', 'Google Maps API'],
    // Maps to: public/images/la-belle-cuisine.jpg
    imageUrl: '/images/la-belle-cuisine.jpg',
    liveUrl: 'https://labelle-cuisine.netlify.app/',
    repoUrl: 'https://github.com/hadi-hannawi1/portfolio-projects/tree/main/restaurant-website',
    featured: true,
    order: 4,
    problem: 'Restaurant needed easy-to-update website for menus and reservations.',
    solution: 'Built responsive site with JSON-driven menu system allowing non-technical staff to update content easily.',
    results: [
      '50% increase in online reservations',
      'Menu updates in under 5 minutes',
      '90% mobile traffic support',
      'Integrated location map with directions'
    ]
  },
  {
    id: '5',
    title: 'Mr Burger - Multi-Location',
    description: 'Comprehensive restaurant chain website featuring multi-location management, online ordering system, interactive menu, and location-based store finder.',
    category: 'Web Development',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Google Maps API', 'Geolocation API'],
    // Maps to: public/images/mr-burger.jpg
    imageUrl: '/images/mr-burger.jpg',
    liveUrl: 'https://mr-burger-demo.netlify.app/',
    repoUrl: '', // Private client project
    featured: true,
    order: 5,
    problem: 'Fast-food chain needed unified web presence across 12 locations with online ordering.',
    solution: 'Developed scalable multi-location website with centralized menu management and location-specific ordering.',
    results: [
      '45% increase in online orders',
      'Unified brand experience',
      'Location-based menu customization',
      'Average order value increased by 25%'
    ]
  }
];

export const SKILLS: Skill[] = [
  {
    category: 'Frontend & Web',
    items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js / R3F', 'HTML5 / CSS3'],
  },
  {
    category: 'Automation & AI',
    items: ['n8n', 'Google Gemini API', 'Webhooks', 'REST APIs', 'Process Automation'],
  },
  {
    category: 'Tools & DevOps',
    items: ['Git / GitHub', 'Netlify', 'Vite', 'VS Code', 'Figma', 'Responsive Design'],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/hadi-hannawi', icon: 'linkedin' },
  { platform: 'Email', url: 'mailto:contact@hadi-hannawi.com', icon: 'mail' },
];