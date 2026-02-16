/**
 * Certifications Section Component
 * Displays certifications in carousel and awards in grid layout
 *
 * Architecture & Best Practices:
 * - Follows Single Responsibility Principle (SRP)
 * - Implements DRY with reusable hooks and utilities
 * - Uses proper TypeScript typing for type safety
 * - Follows React best practices (hooks, memoization)
 * - Accessible with proper ARIA labels
 * - Performance optimized with dynamic imports
 *
 * @component
 */

'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/lib/types';
import { motion } from 'framer-motion';
import { Award, FileText } from 'lucide-react';
import { certifications } from '@/lib/data';
import { getAwards } from '@/lib/data-localized';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import dynamic from 'next/dynamic';
import { useModal, type PDFModalState } from '@/lib/hooks/useModal';
import { createLoopedArray, generateCarouselKey, SWIPER_PRESETS } from '@/lib/utils/carousel';
import { useLocaleDate } from '@/lib/hooks/useLocaleDate';
import type { Certification, Award as AwardType } from '@/lib/types';

// Dynamic import for better code splitting and performance
const PDFPreviewModal = dynamic(() => import('@/components/ui/PDFPreviewModal'), {
  ssr: false,
  loading: () => null, // Optional: add loading component
});

import ActionButton from '@/components/ui/ActionButton';

/**
 * Main Certifications Component
 * Implements separation of concerns with sub-components
 */
export default function Certifications() {
  const t = useTranslations('certifications');
  const locale = useLocale() as Locale;
  const [mounted, setMounted] = useState(false);

  // Get localized awards
  const awards = useMemo(() => getAwards(locale), [locale]);
  const pdfModal = useModal<PDFModalState>();

  // Client-side only mounting to prevent hydration issues
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="certifications"
      className="py-20 px-4 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950"
      aria-labelledby="certifications-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            id="certifications-heading"
            className="text-4xl font-bold mb-12 text-center"
          >
            {t('title')}
          </h2>

          {/* Certifications Carousel */}
          <CertificationsCarousel
            mounted={mounted}
            onViewCertificate={pdfModal.open}
          />

          {/* Awards Grid - Separate Section */}
          {awards.length > 0 && (
            <AwardsGrid
              awards={awards}
              onViewCertificate={pdfModal.open}
            />
          )}
        </motion.div>
      </div>

      {/* PDF Preview Modal */}
      {pdfModal.state.isOpen && (
        <PDFPreviewModal
          isOpen={pdfModal.state.isOpen}
          onClose={pdfModal.close}
          pdfUrl={pdfModal.state.url}
          title={pdfModal.state.title}
        />
      )}
    </section>
  );
}

/**
 * Certifications Carousel Sub-Component
 * Follows Single Responsibility Principle
 */
interface CertificationsCarouselProps {
  mounted: boolean;
  onViewCertificate: (data: Omit<PDFModalState, 'isOpen'>) => void;
}

function CertificationsCarousel({ mounted, onViewCertificate }: CertificationsCarouselProps) {
  const loopedCertifications = createLoopedArray(certifications);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-md mx-auto mb-16">
      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 justify-center">
        <Award className="text-green-600 dark:text-green-400" aria-hidden="true" />
        <span>Course Certifications</span>
      </h3>
      <Swiper
        {...SWIPER_PRESETS.certifications}
        modules={[Navigation, Pagination, Autoplay, EffectCards]}
        className="pb-12"
        aria-label="Certifications carousel"
      >
        {loopedCertifications.map((cert, index) => (
          <SwiperSlide key={generateCarouselKey(cert.id, index)}>
            <CertificationCard
              certification={cert}
              onViewCertificate={onViewCertificate}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

/**
 * Awards Grid Sub-Component
 * Displays awards in a responsive grid layout
 */
interface AwardsGridProps {
  awards: AwardType[];
  onViewCertificate: (data: Omit<PDFModalState, 'isOpen'>) => void;
}

function AwardsGrid({ awards, onViewCertificate }: AwardsGridProps) {
  const t = useTranslations('certifications');

  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 justify-center">
        <Award className="text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
        <span>{t('awards')}</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {awards.map((award) => (
          <AwardCard
            key={award.id}
            award={award}
            onViewCertificate={onViewCertificate}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Certification Card Component
 * Reusable, focused on presentation logic only
 */
interface CertificationCardProps {
  certification: Certification;
  onViewCertificate: (data: Omit<PDFModalState, 'isOpen'>) => void;
}

function CertificationCard({ certification, onViewCertificate }: CertificationCardProps) {
  const t = useTranslations('certifications');
  const { formatMonthYear } = useLocaleDate();

  const handleViewPDF = (e: React.MouseEvent) => {
    e.stopPropagation();
    const pdfUrl = (certification as any).pdfUrl || certification.credentialUrl;
    onViewCertificate({
      url: pdfUrl!,
      title: certification.title,
    });
  };

  const handleViewOnline = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(certification.credentialUrl, '_blank', 'noopener,noreferrer');
  };

  const hasPdfUrl = !!(certification as any).pdfUrl;
  const hasCredentialUrl = !!certification.credentialUrl;
  const isExternalUrl = certification.credentialUrl?.startsWith('http');

  return (
    <article
      className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
      aria-label={`${certification.title} from ${certification.issuer}`}
    >
      {certification.image ? (
        <div className="relative h-40 bg-zinc-200 dark:bg-zinc-700">
          <Image
            src={certification.image}
            alt={`${certification.title} logo`}
            fill
            className="object-contain p-4"
          />
        </div>
      ) : (
        <div className="relative h-40 bg-gradient-to-br from-green-500 to-teal-600 dark:from-green-600 dark:to-teal-700 flex items-center justify-center">
          <Award className="text-white opacity-30" size={48} aria-hidden="true" />
        </div>
      )}
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2 line-clamp-2">{certification.title}</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
          {certification.issuer}
        </p>
        <time
          className="text-sm text-zinc-500 dark:text-zinc-500 mb-4 block"
          dateTime={certification.date}
        >
          {formatMonthYear(certification.date)}
        </time>
        {(hasPdfUrl && isExternalUrl) ? (
          <div className="flex flex-col gap-2">
            <ActionButton
              onClick={handleViewOnline}
              icon={FileText}
              variant="primary"
              fullWidth
              ariaLabel={`View online verification for ${certification.title}`}
            >
              View Online
            </ActionButton>
            <ActionButton
              onClick={handleViewPDF}
              icon={FileText}
              variant="warning"
              fullWidth
              ariaLabel={`Download certificate for ${certification.title}`}
            >
              {t('viewCertificate')}
            </ActionButton>
          </div>
        ) : hasCredentialUrl ? (
          <ActionButton
            onClick={isExternalUrl ? handleViewOnline : handleViewPDF}
            icon={FileText}
            variant="warning"
            fullWidth
            ariaLabel={`View certificate for ${certification.title}`}
          >
            {t('viewCertificate')}
          </ActionButton>
        ) : null}
      </div>
    </article>
  );
}

/**
 * Award Card Component
 * Reusable, focused on presentation logic only
 */
interface AwardCardProps {
  award: AwardType;
  onViewCertificate: (data: Omit<PDFModalState, 'isOpen'>) => void;
}

function AwardCard({ award, onViewCertificate }: AwardCardProps) {
  const t = useTranslations('certifications');
  const { formatMonthYear } = useLocaleDate();

  const handleViewCertificate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewCertificate({
      url: award.certificateUrl!,
      title: `${award.title} - Certificate`,
    });
  };

  const handleViewProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewCertificate({
      url: (award as any).projectUrl!,
      title: `${award.title} - Project Report`,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative w-full min-h-[280px] md:h-[280px] rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 p-6 md:p-8 pb-24 md:pb-8 transition-all duration-500 ease-out overflow-hidden hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-start md:justify-center text-center"
      aria-label={`${award.title} from ${award.issuer}`}
    >
      {/* Decorative Watermark */}
      <Award className="absolute -right-6 -bottom-6 w-32 h-32 md:w-40 md:h-40 text-zinc-100 dark:text-zinc-950 rotate-12 transition-transform duration-700 ease-out group-hover:rotate-0 group-hover:scale-110 opacity-60 dark:opacity-40" />

      <div className="relative z-10 flex flex-col items-center gap-2 md:gap-3 h-full justify-start md:justify-center md:group-hover:-translate-y-4 transition-transform duration-500 pt-2">
        <h4 className="text-lg md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight px-2">
          {award.title}
        </h4>

        <div className="flex flex-col items-center text-sm">
          <span className="font-semibold text-blue-600 dark:text-blue-400">{award.issuer}</span>
          <time className="text-zinc-500 dark:text-zinc-500 font-medium" dateTime={award.date}>
            {formatMonthYear(award.date)}
          </time>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm line-clamp-2 md:line-clamp-3 px-4">
          {award.description}
        </p>
      </div>

      {/* Buttons - Always visible on mobile, slide up on desktop hover */}
      <div className="absolute left-0 right-0 bottom-0 p-4 md:p-6 translate-y-0 md:translate-y-full transition-transform duration-500 ease-out md:group-hover:translate-y-0 flex flex-col gap-2 z-20 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-zinc-900 dark:via-zinc-900/95 pt-6 md:pt-12">
        {award.certificateUrl && (
          <button
            onClick={handleViewCertificate}
            className="w-full py-2 md:py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/20"
          >
            {t('viewCertificate')}
          </button>
        )}
        {(award as any).projectUrl && (
          <button
            onClick={handleViewProject}
            className="w-full py-2 md:py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium text-sm transition-colors border border-zinc-200 dark:border-zinc-700"
          >
            View Project
          </button>
        )}
      </div>
    </motion.article>
  );
}
