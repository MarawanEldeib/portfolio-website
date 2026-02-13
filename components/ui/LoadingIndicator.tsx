'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const subscribe = () => () => { };
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    if (typeof document !== 'undefined') {
      if (document.readyState === 'complete') {
        handleLoad();
      } else if (typeof window !== 'undefined') {
        window.addEventListener('load', handleLoad);
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad);
      }
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
          {/* 3D Spinner */}
          <motion.div 
            className="spinner-3d mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div className="spinner-leaf spinner-leaf-before" />
            <div className="spinner-leaf spinner-leaf-after" />
          </motion.div>

          {/* Logo text */}
          <motion.div
            className="text-4xl md:text-5xl font-black"
            animate={{
              backgroundImage: [
                'linear-gradient(45deg, #3b82f6, #0ea5e9)',
                'linear-gradient(45deg, #0ea5e9, #38bdf8)',
                'linear-gradient(45deg, #38bdf8, #1d4ed8)',
                'linear-gradient(45deg, #1d4ed8, #2563eb)',
                'linear-gradient(45deg, #2563eb, #3b82f6)',
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
