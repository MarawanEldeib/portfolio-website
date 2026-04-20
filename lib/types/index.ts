/**
 * Shared TypeScript type definitions
 */

// Project Types
export type ProjectStatus = 'all' | 'completed' | 'in-progress';

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tech: string[];
  github?: string;
  privateGithub?: boolean;
  video?: string;
  pdf?: string;
  report?: string;
  status: Exclude<ProjectStatus, 'all'>;
  startDate: string;
  endDate: string | null;
  course?: string;
  highlights?: string[];
  supervisor?: { name: string; image?: string; url?: string };
}

// Timeline Types
export interface TimelineItem {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  organizationLogo?: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  skills?: string[];
  achievements?: string[];
  certificateUrl?: string;
  transcriptUrl?: string;
  dateString?: string;
}

// Certification & Award Types
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  pdfUrl?: string;
  image?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image?: string;
  certificateUrl?: string;
  projectUrl?: string;
}

// Recommendation Types
export interface Recommendation {
  id: string;
  name: string;
  title: string;
  company: string;
  text: string;
  image?: string;
  linkedin?: string;
  profileUrl?: string;
  email?: string;
}

// Personal Info Types
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  youtube: string;
  instagram: string;
  orcid: string;
  image: string;
  summary: string;
  workPermit: {
    hasPermit: boolean;
    details: string;
  };
}

// Analytics Types
export type TrackingEvent =
  | 'cv_download'
  | 'cv_preview'
  | 'certificate_view'
  | 'certificate_click'
  | 'project_click'
  | 'github_click'
  | 'form_submit'
  | 'link_click'
  | 'email_copy'
  | 'phone_copy'
  | 'contact_click';

// Performance Types
export interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  rating?: 'good' | 'needs-improvement' | 'poor';
}

// Navigation Types
export interface NavItem {
  href: string;
  label: string;
  id: string;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  url?: string;
  files?: File[];
}

export interface EmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
  reply_to: string;
  attachments?: Array<{ filename: string; content: Buffer }>;
}

// Locale Types
export type Locale = 'en' | 'de';
