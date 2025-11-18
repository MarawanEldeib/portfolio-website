/**
 * PassiveEventsInit Component
 * Client-side component that initializes passive event listeners polyfill
 * Fixes Chrome warning about non-passive scroll-blocking events
 */

'use client';

import { useEffect } from 'react';
import { initPassiveEventsPolyfill } from '@/lib/passive-events-polyfill';

export default function PassiveEventsInit() {
  useEffect(() => {
    // Initialize polyfill once on mount
    initPassiveEventsPolyfill();
  }, []);

  return null; // This component doesn't render anything
}
