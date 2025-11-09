/**
 * Analytics Tracking Utility
 * 
 * Comprehensive event tracking for all user interactions:
 * - CV downloads
 * - Certificate views
 * - Code project clicks
 * - YouTube video plays
 * - File uploads
 * - Form submissions
 * - External link clicks
 */

// Track event types
export type TrackingEvent =
  | 'cv_download'
  | 'cv_preview'
  | 'certificate_view'
  | 'certificate_click'
  | 'project_click'
  | 'github_click'
  | 'youtube_play'
  | 'youtube_click'
  | 'form_submit'
  | 'file_upload'
  | 'url_attach'
  | 'link_click'
  | 'email_copy'
  | 'phone_copy'
  | 'contact_click';

interface TrackingData {
  event: TrackingEvent;
  properties?: Record<string, string | number | boolean>;
  timestamp?: number;
}

/**
 * Track an event with Vercel Analytics or Google Analytics
 */
export function trackEvent(event: TrackingEvent, properties?: Record<string, string | number | boolean>) {
  const data: TrackingData = {
    event,
    properties,
    timestamp: Date.now(),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', data);
  }

  // Vercel Analytics (if installed)
  if (typeof window !== 'undefined' && 'va' in window) {
    // @ts-ignore - Vercel Analytics
    window.va('event', event, properties);
  }

  // Google Analytics 4 (if installed)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore - Google Analytics
    window.gtag('event', event, properties);
  }

  // Send to custom analytics endpoint (optional)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(err => console.error('Analytics error:', err));
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
 * Track YouTube video interaction
 */
export function trackYouTube(videoTitle: string, action: 'click' | 'play' | 'pause' | 'complete') {
  trackEvent(action === 'play' ? 'youtube_play' : 'youtube_click', {
    video_title: videoTitle,
    action,
    location: window.location.pathname,
  });
}

/**
 * Track contact form submission
 */
export function trackFormSubmit(hasAttachment: boolean, attachmentType?: 'file' | 'url') {
  trackEvent('form_submit', {
    has_attachment: hasAttachment,
    attachment_type: attachmentType || 'none',
    location: window.location.pathname,
  });
}

/**
 * Track file upload
 */
export function trackFileUpload(fileName: string, fileSize: number, fileType: string) {
  trackEvent('file_upload', {
    file_name: fileName,
    file_size: fileSize,
    file_type: fileType,
    location: window.location.pathname,
  });
}

/**
 * Track URL attachment
 */
export function trackURLAttach(url: string) {
  trackEvent('url_attach', {
    url_domain: new URL(url).hostname,
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
export function trackCopy(type: 'email' | 'phone', value: string) {
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

/**
 * Batch tracking for page view with engagement metrics
 */
export function trackPageView(pagePath: string, referrer?: string) {
  trackEvent('link_click', {
    page_path: pagePath,
    referrer: referrer || document.referrer,
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
  });
}

/**
 * Track engagement time on page (call on page unload)
 */
let pageLoadTime = Date.now();

export function trackEngagementTime() {
  const timeOnPage = Math.floor((Date.now() - pageLoadTime) / 1000); // seconds
  
  trackEvent('link_click', {
    time_on_page: timeOnPage,
    location: window.location.pathname,
  });
}

// Auto-track engagement time on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', trackEngagementTime);
  
  // Reset timer on page load
  window.addEventListener('load', () => {
    pageLoadTime = Date.now();
  });
}

/**
 * Helper to track all external links automatically
 */
export function setupAutoTracking() {
  if (typeof window === 'undefined') return;

  // Track all external link clicks
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');

    if (anchor && anchor.href) {
      const url = new URL(anchor.href, window.location.origin);
      
      // Only track external links
      if (url.origin !== window.location.origin) {
        trackLinkClick(anchor.href, anchor.textContent || anchor.getAttribute('aria-label') || 'Unknown');
      }
    }
  });
}
