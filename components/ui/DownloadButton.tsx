'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, Check } from 'lucide-react';
import { trackCVDownload } from '@/lib/analytics';

interface DownloadButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'outline' | 'solid';
}

export default function DownloadButton({ 
  href, 
  children, 
  className = '', 
  variant = 'outline' 
}: DownloadButtonProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'success'>('idle');

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Track analytics
    trackCVDownload('pdf');
    
    // Start download animation
    setDownloadState('downloading');
    
    // Simulate download delay (browser will actually start downloading)
    setTimeout(() => {
      // Actually trigger download
      const link = document.createElement('a');
      link.href = href;
      link.download = href.split('/').pop() || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success state
      setDownloadState('success');
      
      // Reset after 2.5 seconds
      setTimeout(() => {
        setDownloadState('idle');
      }, 2500);
    }, 1000);
  };

  const baseClasses = variant === 'outline'
    ? 'border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
    : 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600';

  const stateClasses = {
    idle: '',
    downloading: 'cursor-wait opacity-90',
    success: 'border-green-500 dark:border-green-500 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-600 dark:text-green-400',
  };

  return (
    <motion.a
      href={href}
      onClick={handleDownload}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${baseClasses} ${stateClasses[downloadState]} ${className}`}
      whileTap={{ scale: 0.95 }}
      whileHover={downloadState === 'idle' ? { scale: 1.05, y: -2 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {downloadState === 'idle' && (
          <motion.div
            key="download"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <Download size={20} />
          </motion.div>
        )}
        
        {downloadState === 'downloading' && (
          <motion.div
            key="loading"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={20} />
            </motion.div>
          </motion.div>
        )}
        
        {downloadState === 'success' && (
          <motion.div
            key="success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 15,
              mass: 0.5 
            }}
          >
            <Check size={20} className="text-green-600 dark:text-green-400" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.span
        animate={{
          color: downloadState === 'success' 
            ? 'rgb(22 163 74)' // green-600 for light mode
            : undefined,
        }}
        className={downloadState === 'success' ? 'dark:text-green-400' : ''}
        transition={{ duration: 0.3 }}
      >
        {downloadState === 'idle' && children}
        {downloadState === 'downloading' && 'Downloading...'}
        {downloadState === 'success' && 'Downloaded!'}
      </motion.span>
    </motion.a>
  );
}
