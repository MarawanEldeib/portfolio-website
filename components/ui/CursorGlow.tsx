'use client';

import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch (deferred to avoid hydration mismatch)
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkTouchDevice();

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Don't render cursor glow on touch devices (mobile/tablet)
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Main glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Inner glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(147, 51, 234, 0.1), transparent 40%)`,
        }}
      />

      {/* Cursor dot */}
      <div
        className="pointer-events-none fixed w-4 h-4 rounded-full border-2 border-blue-500/50 z-50 transition-transform duration-100 ease-out hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping" />
      </div>

      {/* Following circle */}
      <div
        className="pointer-events-none fixed w-8 h-8 rounded-full border border-purple-500/30 z-40 transition-all duration-200 ease-out hidden md:block"
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
