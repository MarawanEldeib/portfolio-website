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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/80 dark:to-zinc-950/90"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Light mode gradient orbs - Responsive sizes */}
      <div className="dark:hidden">
        <div className={`absolute top-0 -left-4 w-48 h-48 md:w-72 lg:w-96 md:h-72 lg:h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-40 transition-opacity duration-1000 ${isLoaded ? 'animate-blob' : 'opacity-0'}`}></div>
        <div className={`absolute top-0 -right-4 w-48 h-48 md:w-72 lg:w-96 md:h-72 lg:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-40 transition-opacity duration-1000 ${isLoaded ? 'animate-blob animation-delay-2000' : 'opacity-0'}`}></div>
        <div className={`absolute -bottom-8 left-10 md:left-20 w-48 h-48 md:w-72 lg:w-96 md:h-72 lg:h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-40 transition-opacity duration-1000 ${isLoaded ? 'animate-blob animation-delay-4000' : 'opacity-0'}`}></div>
        <div className={`absolute top-1/2 right-1/4 md:right-1/3 w-40 h-40 md:w-72 lg:w-96 md:h-72 lg:h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-30 transition-opacity duration-1000 ${isLoaded ? 'animate-blob animation-delay-6000' : 'opacity-0'}`}></div>
      </div>
      
      {/* Dark mode gradient orbs - Responsive sizes */}
      <div className="hidden dark:block">
        <div className={`absolute top-0 -left-4 w-48 h-48 md:w-72 lg:w-96 md:h-72 lg:h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-2xl md:blur-3xl opacity-20 transition-opacity duration-1000 ${isLoaded ? 'animate-blob' : 'opacity-0'}`}></div>
        <div className={`absolute top-0 -right-4 w-48 h-48 md:w-72 lg:w-96 md:h-72 lg:h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-2xl md:blur-3xl opacity-20 transition-opacity duration-1000 ${isLoaded ? 'animate-blob animation-delay-2000' : 'opacity-0'}`}></div>
        <div className={`absolute -bottom-8 left-10 md:left-20 w-48 h-48 md:w-72 lg:w-96 md:h-72 lg:h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-2xl md:blur-3xl opacity-20 transition-opacity duration-1000 ${isLoaded ? 'animate-blob animation-delay-4000' : 'opacity-0'}`}></div>
        <div className={`absolute top-1/2 right-1/4 md:right-1/3 w-40 h-40 md:w-72 lg:w-96 md:h-72 lg:h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-2xl md:blur-3xl opacity-15 transition-opacity duration-1000 ${isLoaded ? 'animate-blob animation-delay-6000' : 'opacity-0'}`}></div>
      </div>
      
      {/* Grid pattern overlay - Responsive */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.08]"></div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/80 dark:to-zinc-950/90"></div>
      
      {/* Noise texture for premium feel */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-noise"></div>
    </div>
  );
}
