'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import Lottie to reduce initial bundle size
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => null,
});

export default function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load animation data
    fetch('/animations/loading.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading animation:', error));

    // Defer mounting check
    const mountTimer = setTimeout(() => setIsMounted(true), 0);

    // Check if page is fully loaded
    const handleLoad = () => {
      // Small delay to ensure everything is ready
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(mountTimer);
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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-zinc-950"
        >
          {/* ME Logo/Initials with gradient */}
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
              duration: 2,
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

          {/* Lottie Loading Animation */}
          {animationData && (
            <div className="w-48 h-48 md:w-56 md:h-56">
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid meet'
                }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
