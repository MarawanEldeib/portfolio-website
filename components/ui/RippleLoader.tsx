'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface RippleLoaderProps {
  isOpen: boolean;
  onComplete?: () => void;
}

export default function RippleLoader({ isOpen, onComplete }: RippleLoaderProps) {
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Lock body scroll when loader opens (no scroll to top - stays at current position)
  useEffect(() => {
    if (isOpen) {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && onComplete) {
      // Show loader briefly for visual feedback (500ms), then close
      // Can't track external page loading due to cross-origin restrictions
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onComplete]);

  if (!isClient || typeof document === 'undefined') return null;

  // Use portal to render to document.body to ensure proper viewport positioning
  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="ripple-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col items-center gap-6"
          >
            {/* Ripple Grid Loader - Exact Uiverse Structure */}
            <div className="ripple-grid-loader">
              <div className="ripple-cell d-0"></div>
              <div className="ripple-cell d-1"></div>
              <div className="ripple-cell d-2"></div>

              <div className="ripple-cell d-1"></div>
              <div className="ripple-cell d-2"></div>
              <div className="ripple-cell d-3"></div>

              <div className="ripple-cell d-2"></div>
              <div className="ripple-cell d-3"></div>
              <div className="ripple-cell d-4"></div>
            </div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white text-lg font-medium"
            >
              Opening GitHub...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
