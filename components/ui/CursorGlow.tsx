'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

const subscribe = () => () => { };
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    // Check if device supports touch (deferred to avoid hydration mismatch)
    const checkTouchDevice = () => {
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
      }
    };

    checkTouchDevice();

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      window.addEventListener('mousemove', updatePosition);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        window.removeEventListener('mousemove', updatePosition);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Don't render during SSR or on touch devices
  if (!isMounted || isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Main glow - Single element for better performance */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block will-change-transform"
        style={{
          opacity: isVisible ? 0.8 : 0,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.12), transparent 40%)`,
        }}
      />

      {/* Cursor dot - Simplified */}
      <div
        className="pointer-events-none fixed w-3 h-3 rounded-full bg-blue-500/40 z-50 transition-opacity duration-100 ease-out hidden lg:block will-change-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
