// Shared Constants and Configuration

// Animation Timing Constants
export const ANIMATION_DELAYS = {
  SHORT: 200,
  MEDIUM: 500,
  LONG: 1000,
  EXTRA_LONG: 2000,
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 1.0,
} as const;

// Loading Spinner Classes (reusable)
export const LOADING_SPINNER_CLASSES = {
  container: 'min-h-screen flex items-center justify-center',
  spinner: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600',
} as const;

// Common Animation Variants - Optimized for performance
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { 
    duration: ANIMATION_DURATIONS.FAST,
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { 
    duration: ANIMATION_DURATIONS.FAST,
  },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: ANIMATION_DURATIONS.NORMAL },
};

// Tech Icons Mapping (centralized)
import {
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiC,
  SiReact, SiNextdotjs, SiFlutter, SiGraphql, SiSpringboot,
  SiPytorch, SiTensorflow, SiOpencv, SiNumpy, SiScikitlearn,
  SiMysql, SiPostgresql, SiMongodb, SiRedis, SiFirebase,
  SiDocker, SiKubernetes, SiGit, SiGithub, SiGitlab, SiJira,
  SiLinux, SiAmazon, SiGooglecloud, SiDart
} from 'react-icons/si';

import { IconType } from 'react-icons';

export const TECH_ICONS: Record<string, IconType> = {
  'Python': SiPython,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'C++': SiCplusplus,
  'C/C++': SiC,
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'Flutter': SiFlutter,
  'GraphQL': SiGraphql,
  'Spring Boot': SiSpringboot,
  'PyTorch': SiPytorch,
  'TensorFlow': SiTensorflow,
  'OpenCV': SiOpencv,
  'NumPy': SiNumpy,
  'Scikit-learn': SiScikitlearn,
  'MySQL': SiMysql,
  'PostgreSQL': SiPostgresql,
  'MongoDB': SiMongodb,
  'Redis': SiRedis,
  'Firebase': SiFirebase,
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'Git': SiGit,
  'GitHub': SiGithub,
  'GitLab': SiGitlab,
  'Jira': SiJira,
  'Linux': SiLinux,
  'AWS': SiAmazon,
  'GCP': SiGooglecloud,
  'Dart': SiDart,
  // Additional mappings for skills/projects
  'REST APIs': SiGraphql,
  'Unit Testing': SiGithub,
  'Computer Vision': SiOpencv,
  'Deep Learning': SiPytorch,
  'Research': SiPython,
  'AI/ML': SiPytorch,
  'Backend Development': SiPython,
  'Frontend Design': SiReact,
  'Data Extraction': SiPython,
  'LLM': SiPython,
  'SQL': SiMysql,
  'Detectron2': SiPytorch,
  'Scrum': SiJira,
  'API Development': SiGraphql,
  'Agile': SiJira,
  'Confluence': SiJira,
};

// External Links
export const EXTERNAL_LINKS = {
  CV_PATH: '/cv/Marawan_Eldeib_Resume.pdf',
  REPO_URL: 'https://github.com/MarawanEldeib/portfolio-website',
} as const;

// Viewport Configuration
export const VIEWPORT_CONFIG = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Layout Constants
export const LAYOUT_CONSTANTS = {
  HEADER_HEIGHT: 80, // px - Height of fixed header for scroll offset calculations
  SCROLL_OFFSET: 100, // px - Additional offset for active section detection
} as const;
