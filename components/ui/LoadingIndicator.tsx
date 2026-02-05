'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Defer mounting check
    const mountTimer = setTimeout(() => setIsMounted(true), 0);

    // Check if page is fully loaded
    const handleLoad = () => {
      // Small delay to ensure everything is ready
      setTimeout(() => {
        setIsLoading(false);
      }, 300); // Reduced from 500ms
    };

    if (typeof document !== 'undefined') {
      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
      }
    }

    return () => {
      clearTimeout(mountTimer);
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  // Always render the same structure to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-zinc-950">
        <div className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          ME
        </div>
        <div className="relative w-48 h-2 bg-zinc-800 rounded-full" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }} // Reduced from 0.5s
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-zinc-950"
        >
          {/* Simple Logo/Initials with optimized gradient */}
          <motion.div
            className="text-6xl md:text-7xl font-black mb-8"
            animate={{
              backgroundImage: [
                'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                'linear-gradient(45deg, #8b5cf6, #ec4899)',
                'linear-gradient(45deg, #ec4899, #f59e0b)',
                'linear-gradient(45deg, #f59e0b, #10b981)',
                'linear-gradient(45deg, #10b981, #3b82f6)',
              ],
            }}
            transition={{
              duration: 2, // Reduced from 3s
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ME
          </motion.div>

          {/* Animated loading bar */}
          <div className="relative w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                backgroundImage: [
                  'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                  'linear-gradient(90deg, #8b5cf6, #ec4899)',
                  'linear-gradient(90deg, #ec4899, #f59e0b)',
                  'linear-gradient(90deg, #f59e0b, #10b981)',
                  'linear-gradient(90deg, #10b981, #3b82f6)',
                ],
                x: ['-100%', '100%'],
              }}
              transition={{
                x: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                backgroundImage: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
              style={{
                width: '50%',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
