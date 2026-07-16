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
  SiLinux, SiAmazon, SiGooglecloud, SiDart, SiInsomnia,
  SiKalilinux, SiUbuntu, SiClaude, SiOwasp,
  SiPhp, SiHtml5, SiCss3, SiPandas, SiArduino,
  SiSupabase, SiStripe, SiNodedotjs, SiExpress, SiSqlite,
  SiGooglegemini, SiQt, SiPopos, SiTmux, SiSocketdotio
} from 'react-icons/si';
import {
  FaBrain, FaRobot, FaChalkboardTeacher, FaMicrophone, FaUsers,
  FaHandshake, FaUserTie, FaCalendarAlt, FaLightbulb, FaAward,
  FaShoppingCart, FaHeadset, FaCode, FaShieldAlt, FaTerminal,
  FaNetworkWired, FaJava, FaWindows, FaFlag,
  FaLock, FaProjectDiagram, FaCloud, FaMobileAlt, FaCog,
  FaCheckCircle, FaMicrochip, FaPaintBrush, FaWifi,
  FaBug, FaTachometerAlt, FaMemory, FaKey
} from 'react-icons/fa';
import { MdAgriculture } from 'react-icons/md';

import { IconType } from 'react-icons';

export const TECH_ICONS: Record<string, IconType> = {
  'Python': SiPython,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'C++': SiCplusplus,
  'C/C++': SiC,
  'Java': FaJava,
  'Assembly': FaCode,
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
  'scikit-learn': SiScikitlearn,
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
  'Kali Linux': SiKalilinux,
  'Ubuntu': SiUbuntu,
  'Pop!_OS': SiPopos,
  'Windows': FaWindows,
  'AWS': SiAmazon,
  'GCP': SiGooglecloud,
  'Dart': SiDart,
  'Insomnia': SiInsomnia,
  'GitHub Copilot': SiGithub,
  'Claude': SiClaude,
  'MCP Server': FaNetworkWired,
  'Burp Suite': FaShieldAlt,
  'Nmap': FaNetworkWired,
  'SQLmap': FaTerminal,
  'OWASP': SiOwasp,
  'picoCTF': FaFlag,
  'mitmproxy': FaNetworkWired,
  'GDB': FaBug,
  'PHP': SiPhp,
  'HTML': SiHtml5,
  'CSS': SiCss3,
  'pandas': SiPandas,
  'Agile/Scrum': SiJira,
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
  'Arduino': SiArduino,
  'IoT': FaWifi,
  'Sensors': FaMicrochip,
  'Automation': FaCog,
  'Mobile Development': FaMobileAlt,
  'UI/UX Design': FaPaintBrush,
  'Privacy': FaLock,
  'Security': FaShieldAlt,
  'Network Analysis': FaNetworkWired,
  'Knowledge Graphs': FaProjectDiagram,
  'Graph Neural Networks': FaProjectDiagram,
  'Cloud Architecture': FaCloud,
  'Distributed Systems': FaNetworkWired,
  'P2P': FaNetworkWired,
  'Fault Tolerance': FaShieldAlt,
  'YOLO': SiOpencv,
  'End-to-End Testing': FaCheckCircle,
  'Digital Twins': FaMicrochip,
  'VPC': FaNetworkWired,
  'Auto Scaling': FaCloud,
  'Load Balancer': FaCloud,
  // Project stacks (shown on project cards only, not listed as skills)
  'Supabase': SiSupabase,
  'Stripe Connect': SiStripe,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'SQLite': SiSqlite,
  'Gemini Live': SiGooglegemini,
  'PyQt6': SiQt,
  'Socket.IO': SiSocketdotio,
  'tmux': SiTmux,
  'SSH': FaKey,
  'Performance Optimisation': FaTachometerAlt,
  'Memory Profiling': FaMemory,
  // Volunteering and soft skills icons
  'AI': FaBrain,
  'Machine Learning': SiPytorch,
  'Smart Farming': MdAgriculture,
  'Precision Agriculture': MdAgriculture,
  'Public Speaking': FaMicrophone,
  'International Collaboration': FaHandshake,
  'Technical Training': FaChalkboardTeacher,
  'Leadership': FaUserTie,
  'Event Management': FaCalendarAlt,
  'Student Engagement': FaUsers,
  'Robotics': FaRobot,
  'Mentoring': FaChalkboardTeacher,
  'Chapter Founding': FaAward,
  'Entrepreneurship': FaLightbulb,
  'Business Management': FaUserTie,
  'Social Responsibility': FaHandshake,
  'Sales': FaShoppingCart,
  'Customer Service': FaHeadset,
};

// External Links
export const EXTERNAL_LINKS = {
  CV_PATH: '/cv/Marawan_Eldeib_Resume.pdf',
  REPO_URL: 'https://github.com/MarawanEldeib/portfolio-website',
} as const;

// Project-specific constants
export const PROJECT_IDS = {
  KGFM_UNIVERSAL_DB: 'new-1',
  MANGO_VISION: '1',
  FITNESS_CENTER: '2',
  RAIN_ROOT: '3',
} as const;

// Timeline item constants
export const TIMELINE_KEYWORDS = {
  MASTER_DEGREE: 'Master',
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
  HEADER_HEIGHT: 100, // px - Increased to ensure section titles clear the header
  SCROLL_OFFSET: 120, // px - Increased to trigger active state slightly earlier
} as const;

// Carousel Configuration
export const CAROUSEL_CONFIG = {
  LOOP_MULTIPLIER: 3, // Number of times to duplicate items for infinite loop effect
  CERTIFICATIONS_AUTOPLAY_DELAY: 3000, // ms
  AWARDS_AUTOPLAY_DELAY: 4000, // ms
  CARDS_PER_SLIDE_OFFSET: 8,
  CARDS_PER_SLIDE_ROTATE: 2,
} as const;

// Modal Configuration
export const MODAL_CONFIG = {
  PDF_VIEWER_HEIGHT: '90vh',
  VIDEO_PLAYER_ASPECT_RATIO: '16:9',
} as const;
