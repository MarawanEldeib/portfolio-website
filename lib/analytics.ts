/**
 * Analytics Tracking Utility
 * 
 * Integrated with Vercel Analytics for comprehensive tracking:
 * - Custom events sent to Vercel Analytics
 * - Automatic page views (handled by Vercel)
 * - Automatic performance metrics (handled by Vercel Speed Insights)
 * 
 * What We Track:
 * - CV downloads & previews
 * - Certificate views
 * - Project clicks (GitHub, demos)
 * - Form submissions
 * - External link clicks
 * - Email/phone copy actions
 */

import { track } from '@vercel/analytics';

// Track event types
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

/**
 * Track an event with Vercel Analytics
 */
export function trackEvent(event: TrackingEvent, properties?: Record<string, string | number | boolean>) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', event, properties);
  }

  // Send to Vercel Analytics
  if (typeof window !== 'undefined') {
    track(event, properties);
  }
}

/**
 * Track CV download
 */
export function trackCVDownload(format: 'pdf' | 'docx' = 'pdf') {
  trackEvent('cv_download', {
    format,
    location: window.location.pathname,
  });
}

/**
 * Track CV preview modal open
 */
export function trackCVPreview() {
  trackEvent('cv_preview', {
    location: window.location.pathname,
  });
}

/**
 * Track certificate view/click
 */
export function trackCertificate(certificateName: string, action: 'view' | 'click' | 'download') {
  trackEvent(action === 'view' ? 'certificate_view' : 'certificate_click', {
    certificate_name: certificateName,
    action,
    location: window.location.pathname,
  });
}

/**
 * Track project click (GitHub, demo, etc.)
 */
export function trackProject(projectName: string, linkType: 'github' | 'demo' | 'details') {
  trackEvent('project_click', {
    project_name: projectName,
    link_type: linkType,
    location: window.location.pathname,
  });
}

/**
 * Track GitHub repository click
 */
export function trackGitHubClick(repoName: string) {
  trackEvent('github_click', {
    repo_name: repoName,
    location: window.location.pathname,
  });
}

/**
 * Track contact form submission
 */
export function trackFormSubmit() {
  trackEvent('form_submit', {
    location: window.location.pathname,
  });
}

/**
 * Track external link clicks
 */
export function trackLinkClick(url: string, linkText: string) {
  trackEvent('link_click', {
    url,
    link_text: linkText,
    location: window.location.pathname,
  });
}

/**
 * Track email/phone copy
 */
export function trackCopy(type: 'email' | 'phone') {
  trackEvent(type === 'email' ? 'email_copy' : 'phone_copy', {
    type,
    location: window.location.pathname,
  });
}

/**
 * Track contact method click (email, phone, LinkedIn)
 */
export function trackContactClick(method: 'email' | 'phone' | 'linkedin' | 'whatsapp') {
  trackEvent('contact_click', {
    method,
    location: window.location.pathname,
  });
}
