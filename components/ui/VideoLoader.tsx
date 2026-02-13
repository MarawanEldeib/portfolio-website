'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface VideoLoaderProps {
  isOpen: boolean;
  fullscreen?: boolean; // If true, shows as full-screen overlay; if false, shows inline
}

// Jumping cube animation component - extracted outside to avoid re-creation during render
function JumpingCubeAnimation() {
  return <div className="video-loader" />;
}

export default function VideoLoader({ isOpen, fullscreen = true }: VideoLoaderProps) {
  // Inline mode - just the animation
  if (!fullscreen) {
    return isOpen ? <JumpingCubeAnimation /> : null;
  }

  // Fullscreen mode - animation with overlay
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
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
            <JumpingCubeAnimation />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white text-lg font-medium"
            >
              Loading video...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
