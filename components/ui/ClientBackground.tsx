'use client';

import dynamic from 'next/dynamic';

// Lazy load non-critical visual components
const CursorGlow = dynamic(() => import('@/components/ui/CursorGlow'), {
  ssr: false,
});

const AnimatedBackground = dynamic(() => import('@/components/ui/AnimatedBackground'), {
  ssr: false,
});

export default function ClientBackground() {
  return (
    <>
      <AnimatedBackground />
      <CursorGlow />
    </>
  );
}
