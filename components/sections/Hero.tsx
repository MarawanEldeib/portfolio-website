'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Eye } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import Image from 'next/image';
import { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import DownloadButton from '@/components/ui/DownloadButton';

// Lazy load CV modal (only when needed)
const CVPreviewModal = dynamic(() => import('@/components/ui/CVPreviewModal'), {
  ssr: false,
});

export default function Hero() {
  const t = useTranslations('hero');
  
  const roles = useMemo(() => [
    "Software Engineering Student",
    "AI/ML Enthusiast",
    "Full-Stack Developer",
    "Cybersecurity Enthusiast",
    "Research Developer",
    "Tech Innovator",
  ], []);
  
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCVPreview, setShowCVPreview] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const currentFullText = roles[currentRole];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Finished deleting, move to next role
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole, roles]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20 dark:from-zinc-950 dark:via-blue-950/20 dark:to-purple-950/20">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl overflow-hidden ring-4 ring-blue-100 dark:ring-blue-900">
              <Image
                src="/images/Marawan.jpeg"
                alt={personalInfo.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {t('greeting')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{personalInfo.name}</span>
          </h1>
          <div className="h-16 md:h-20 flex items-center justify-center">
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-semibold">
              {displayText}
              <span className="inline-block w-0.5 h-6 md:h-8 bg-blue-600 dark:bg-blue-400 ml-1 animate-pulse"></span>
            </p>
          </div>
          <p className="text-lg text-zinc-500 dark:text-zinc-500 mb-4 max-w-2xl mx-auto">
            {t('tagline')}
          </p>

          {/* Work Permit Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-600 rounded-full shadow-lg">
              <div className="flex items-center justify-center w-5 h-5 bg-green-500 dark:bg-green-600 rounded-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-3 h-3"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                Work Permit
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex gap-4">
              <button
                onClick={() => setShowCVPreview(true)}
                className="inline-flex items-center justify-center px-4 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="Preview CV"
              >
                <Eye size={20} />
              </button>
              <DownloadButton
                href="/cv/Marawan_Eldeib_Resume.pdf"
                variant="outline"
              >
                {t('cta.downloadCV')}
              </DownloadButton>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              <Mail size={20} />
              {t('cta.contact')}
            </a>
          </div>
        </motion.div>
      </div>

      {showCVPreview && (
        <CVPreviewModal
          isOpen={showCVPreview}
          onClose={() => setShowCVPreview(false)}
          cvUrl="/cv/Marawan_Eldeib_Resume.pdf"
        />
      )}
    </section>
  );
}
