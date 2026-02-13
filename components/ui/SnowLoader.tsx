'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface SnowLoaderProps {
  isOpen: boolean;
  fullscreen?: boolean; // If true, shows as full-screen overlay; if false, shows inline
}

// Snow animation component - extracted outside to avoid re-creation during render
function SnowAnimation() {
  return (
    <>
      <div className="snow-loader">
        <div className="snow">
          <span style={{ '--i': 11 } as React.CSSProperties}></span>
          <span style={{ '--i': 12 } as React.CSSProperties}></span>
          <span style={{ '--i': 15 } as React.CSSProperties}></span>
          <span style={{ '--i': 17 } as React.CSSProperties}></span>
          <span style={{ '--i': 18 } as React.CSSProperties}></span>
          <span style={{ '--i': 13 } as React.CSSProperties}></span>
          <span style={{ '--i': 14 } as React.CSSProperties}></span>
          <span style={{ '--i': 19 } as React.CSSProperties}></span>
          <span style={{ '--i': 20 } as React.CSSProperties}></span>
          <span style={{ '--i': 10 } as React.CSSProperties}></span>
          <span style={{ '--i': 18 } as React.CSSProperties}></span>
          <span style={{ '--i': 13 } as React.CSSProperties}></span>
          <span style={{ '--i': 14 } as React.CSSProperties}></span>
          <span style={{ '--i': 19 } as React.CSSProperties}></span>
          <span style={{ '--i': 20 } as React.CSSProperties}></span>
          <span style={{ '--i': 10 } as React.CSSProperties}></span>
          <span style={{ '--i': 18 } as React.CSSProperties}></span>
          <span style={{ '--i': 13 } as React.CSSProperties}></span>
          <span style={{ '--i': 14 } as React.CSSProperties}></span>
          <span style={{ '--i': 19 } as React.CSSProperties}></span>
          <span style={{ '--i': 20 } as React.CSSProperties}></span>
          <span style={{ '--i': 10 } as React.CSSProperties}></span>
        </div>
      </div>
    </>
  );
}

export default function SnowLoader({ isOpen, fullscreen = true }: SnowLoaderProps) {
  // No timer - loader is controlled by parent component (e.g., PDF loading state)

  // Inline mode - just the animation
  if (!fullscreen) {
    return isOpen ? <SnowAnimation /> : null;
  }

  // Fullscreen mode - animation with overlay
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="snow-loader"
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
            className="flex flex-col items-center gap-8"
          >
            <SnowAnimation />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white text-lg font-medium"
            >
              Loading document...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
