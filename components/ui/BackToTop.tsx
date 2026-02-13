'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-[50px] h-[50px] rounded-full bg-zinc-900 border-none flex items-center justify-center shadow-[0px_0px_0px_4px_rgba(37,99,235,0.25)] cursor-pointer transition-all duration-300 overflow-hidden hover:w-[140px] hover:rounded-[50px] hover:bg-blue-600 group"
      aria-label="Back to Top"
    >
      <ChevronUp
        size={20}
        className="text-white transition-transform duration-300 group-hover:-translate-y-[200%] flex-shrink-0"
      />
      <span className="absolute text-[0px] text-white font-semibold transition-all duration-300 group-hover:text-[13px] whitespace-nowrap">
        Back to Top
      </span>
    </button>
  );
}
