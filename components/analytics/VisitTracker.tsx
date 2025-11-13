'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitTracker() {
  const pathname = usePathname();
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per pathname
    if (hasTracked.current) {
      hasTracked.current = false;
      return;
    }

    // Only track in production or if explicitly enabled
    if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_ENABLE_TRACKING) {
      return;
    }

    const trackVisit = async () => {
      try {
        const referrer = document.referrer || 'direct';
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        await fetch('/api/track-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pathname,
            referrer: referrer !== window.location.origin ? referrer : 'direct',
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        hasTracked.current = true;
      } catch (error) {
        // Silently fail - don't disrupt user experience
        if (error instanceof Error && error.name !== 'AbortError') {
          console.debug('Visit tracking failed:', error.message);
        }
      }
    };

    // Delay tracking slightly to avoid blocking initial render
    const timer = setTimeout(trackVisit, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
