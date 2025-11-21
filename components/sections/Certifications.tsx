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

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Award, FileText } from 'lucide-react';
import { certifications, awards } from '@/lib/data';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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
  const [mounted, setMounted] = useState(false);
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
  onViewCertificate: (data: Omit<PDFModalState, 'isOpen'>) => void;
}

function AwardsGrid({ onViewCertificate }: AwardsGridProps) {
  const t = useTranslations('certifications');

  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 justify-center">
        <Award className="text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
        <span>{t('awards')}</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

  const handleViewCertificate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewCertificate({
      url: certification.credentialUrl!,
      title: certification.title,
    });
  };

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
        {certification.credentialUrl && (
          <ActionButton
            onClick={handleViewCertificate}
            icon={FileText}
            variant="warning"
            fullWidth
            ariaLabel={`View certificate for ${certification.title}`}
          >
            {t('viewCertificate')}
          </ActionButton>
        )}
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
      className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col"
      aria-label={`${award.title} from ${award.issuer}`}
    >
      {award.image ? (
        <div className="relative h-40 bg-zinc-200 dark:bg-zinc-700">
          <Image
            src={award.image}
            alt={`${award.title} logo`}
            fill
            className="object-contain p-4"
          />
        </div>
      ) : (
        <div className="relative h-40 bg-gradient-to-br from-yellow-500 to-orange-600 dark:from-yellow-600 dark:to-orange-700 flex items-center justify-center">
          <Award className="text-white opacity-30" size={48} aria-hidden="true" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h4 className="text-lg font-semibold mb-2">{award.title}</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
          {award.issuer}
        </p>
        <time
          className="text-sm text-zinc-500 dark:text-zinc-500 mb-3 block"
          dateTime={award.date}
        >
          {formatMonthYear(award.date)}
        </time>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed flex-grow">
          {award.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {award.certificateUrl && (
            <ActionButton
              onClick={handleViewCertificate}
              icon={FileText}
              variant="warning"
              fullWidth
              ariaLabel={`View certificate for ${award.title}`}
            >
              {t('viewCertificate')}
            </ActionButton>
          )}
          {(award as any).projectUrl && (
            <ActionButton
              onClick={handleViewProject}
              icon={FileText}
              variant="primary"
              fullWidth
              ariaLabel={`View project report for ${award.title}`}
            >
              View Project
            </ActionButton>
          )}
        </div>
      </div>
    </motion.article>
  );
}
