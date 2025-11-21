'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Eye } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import DownloadButton from '@/components/ui/DownloadButton';

// Lazy load PDF modal (only when needed)
const PDFPreviewModal = dynamic(() => import('@/components/ui/PDFPreviewModal'), {
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
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 80; // Faster for better performance
    const currentFullText = roles[currentRole];
    let rafId: number;
    let lastUpdate = Date.now();

    const animate = () => {
      const now = Date.now();
      if (now - lastUpdate >= typingSpeed) {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentFullText.length) {
            setDisplayText(currentFullText.slice(0, displayText.length + 1));
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => setIsDeleting(true), 1500); // Reduced wait time
            return;
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            // Finished deleting, move to next role
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
            return;
          }
        }
        lastUpdate = now;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [displayText, isDeleting, currentRole, roles]);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 bg-gradient-to-b from-zinc-950 via-blue-950/20 to-purple-950/20">
      <div className="container mx-auto max-w-4xl text-center px-0 sm:px-4">
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
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl overflow-hidden ring-4 ring-blue-900">
              <Image
                src="/images/Marawan.jpeg"
                alt={personalInfo.name}
                width={128}
                height={128}
                priority
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/AA8A/9k="
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white px-2">
            {t('greeting')}{' '}
            <span
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {personalInfo.name}
            </span>
          </h1>
          <div className="h-20 sm:h-20 md:h-24 flex items-center justify-center px-4">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-600 dark:text-zinc-400 font-semibold text-center break-words max-w-full">
              {displayText}
              <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 lg:h-8 bg-blue-600 dark:bg-blue-400 ml-1 animate-pulse"></span>
            </p>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-zinc-500 dark:text-zinc-500 mb-6 sm:mb-8 max-w-2xl mx-auto text-center px-4 sm:px-6">
            {t('tagline')}
          </p>

          <div className="flex flex-col gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-md sm:max-w-none mx-auto px-4 sm:px-0">
            <div className="flex gap-2 sm:gap-3 justify-center">
              <button
                onClick={() => setShowCVPreview(true)}
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors min-w-[44px] min-h-[44px] border border-zinc-300 dark:border-zinc-700 flex-shrink-0"
                title={t('cta.viewCV')}
                aria-label={t('cta.viewCV')}
              >
                <Eye size={18} className="sm:w-5 sm:h-5" />
              </button>
              <DownloadButton
                href="/cv/Marawan_Eldeib_Resume.pdf"
                variant="outline"
                className="!px-4 sm:!px-6 !py-2.5 sm:!py-3 flex-shrink-0"
              >
                <span className="text-sm sm:text-base whitespace-nowrap">{t('cta.downloadCV')}</span>
              </DownloadButton>
            </div>

            {/* Work Permit Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-600 rounded-full shadow-lg justify-center cursor-help transition-all hover:scale-105 hover:shadow-xl active:scale-95 relative group w-auto mx-auto"
              title={t('workPermitTooltip')}
              onClick={() => setShowTooltip(!showTooltip)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-green-500 dark:bg-green-600 rounded-full flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-green-700 dark:text-green-300 whitespace-nowrap">
                {t('workPermit')}
              </span>

              {/* Tooltip */}
              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none transition-all duration-200 ${showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                {t('workPermitTooltip')}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {showCVPreview && (
        <PDFPreviewModal
          isOpen={showCVPreview}
          onClose={() => setShowCVPreview(false)}
          pdfUrl="/cv/Marawan_Eldeib_Resume.pdf"
          title={`${t('cta.viewCV')} - ${personalInfo.name}`}
        />
      )}
    </section>
  );
}
