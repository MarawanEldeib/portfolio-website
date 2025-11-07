'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Prevent body scroll while loading
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100vh';
    
    // Hide loading screen after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.documentElement.style.overflow = 'unset';
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'auto';
      document.body.style.height = 'auto';
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = 'unset';
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'auto';
      document.body.style.height = 'auto';
    };
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-zinc-950 overflow-hidden"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden'
          }}
        >
          {/* ME Letters with Color Animation */}
          <div className="flex items-center gap-8">
            {/* M Letter */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.span
                className="text-[12rem] md:text-[16rem] font-black"
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
                  duration: 3,
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
                M
              </motion.span>
            </motion.div>

            {/* E Letter */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotateY: [0, -360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            >
              <motion.span
                className="text-[12rem] md:text-[16rem] font-black"
                animate={{
                  backgroundImage: [
                    'linear-gradient(45deg, #ec4899, #8b5cf6)',
                    'linear-gradient(45deg, #f59e0b, #ec4899)',
                    'linear-gradient(45deg, #10b981, #f59e0b)',
                    'linear-gradient(45deg, #3b82f6, #10b981)',
                    'linear-gradient(45deg, #8b5cf6, #3b82f6)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.5,
                }}
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                E
              </motion.span>
            </motion.div>
          </div>

          {/* Loading dots */}
          <motion.div
            className="absolute bottom-20 flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-4 h-4 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                  backgroundColor: [
                    '#3b82f6',
                    '#8b5cf6',
                    '#ec4899',
                    '#f59e0b',
                    '#3b82f6',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'linear' }}
            style={{
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
