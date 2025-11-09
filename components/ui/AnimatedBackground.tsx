'use client';

import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Defer animation start for better initial load
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Don't render animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/80 dark:to-zinc-950/90" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Light mode only - Optimized blob animations with GPU acceleration */}
      <div className={`absolute top-0 -left-4 w-48 h-48 md:w-72 lg:w-96 md:h-72 lg:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 transition-opacity duration-1000 ${isLoaded ? 'animate-blob' : 'opacity-0'}`} style={{ transform: 'translate3d(0, 0, 0)' }} />
      <div className={`absolute top-0 -right-4 w-48 h-48 md:w-72 lg:w-96 md:h-72 lg:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 transition-opacity duration-1000 ${isLoaded ? 'animate-blob animation-delay-2000' : 'opacity-0'}`} style={{ transform: 'translate3d(0, 0, 0)' }} />
      <div className={`absolute -bottom-8 left-10 md:left-20 w-48 h-48 md:w-72 lg:w-96 md:h-72 lg:h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 transition-opacity duration-1000 ${isLoaded ? 'animate-blob animation-delay-4000' : 'opacity-0'}`} style={{ transform: 'translate3d(0, 0, 0)' }} />
      <div className={`absolute top-1/2 right-1/4 md:right-1/3 w-40 h-40 md:w-72 lg:w-96 md:h-72 lg:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-35 transition-opacity duration-1000 ${isLoaded ? 'animate-blob animation-delay-6000' : 'opacity-0'}`} style={{ transform: 'translate3d(0, 0, 0)' }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/20 to-gray-100/40" />
      
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-noise" />
    </div>
  );
}
