'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if page is fully loaded
    const handleLoad = () => {
      // Small delay to ensure everything is ready
      setTimeout(() => {
        setIsLoading(false);
      }, 300); // Reduced from 500ms
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isMounted) return null;

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

          {/* Simplified loading dots */}
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                  backgroundColor: [
                    '#3b82f6',
                    '#8b5cf6',
                    '#ec4899',
                    '#f59e0b',
                    '#10b981',
                    '#3b82f6',
                  ],
                }}
                transition={{
                  duration: 1.5, // Reduced from 2s
                  repeat: Infinity,
                  delay: i * 0.15, // Reduced from 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
