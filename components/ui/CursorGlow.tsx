'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

const subscribe = () => () => { };
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const updatePosition = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.opacity = '0.8';
        glowRef.current.style.background = `radial-gradient(500px circle at ${e.clientX}px ${e.clientY}px, rgba(59, 130, 246, 0.12), transparent 40%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = '1';
        dotRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };

    const handleMouseLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0 z-30 hidden lg:block will-change-[background]"
        style={{ opacity: 0 }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 w-3 h-3 rounded-full bg-blue-500/40 z-50 hidden lg:block will-change-transform"
        style={{ opacity: 0, transition: 'opacity 100ms ease-out' }}
      />
    </>
  );
}
