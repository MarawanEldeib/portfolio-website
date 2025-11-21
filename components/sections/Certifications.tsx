/**
 * Certifications Section Component
 * Displays certifications and awards in side-by-side carousels
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
import type { Certification, Award as AwardType } from '@/lib/types';

// Dynamic import for better code splitting and performance
const PDFPreviewModal = dynamic(() => import('@/components/ui/PDFPreviewModal'), {
  ssr: false,
  loading: () => null, // Optional: add loading component
});

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Certifications Carousel */}
            <CertificationsCarousel
              mounted={mounted}
              onViewCertificate={pdfModal.open}
            />

            {/* Awards Carousel */}
            {awards.length > 0 && (
              <AwardsCarousel
                mounted={mounted}
                onViewCertificate={pdfModal.open}
              />
            )}
          </div>
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
  const t = useTranslations('certifications');
  const loopedCertifications = createLoopedArray(certifications);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-md mx-auto lg:ml-auto lg:mr-8">
      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 justify-center lg:justify-start">
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
 * Awards Carousel Sub-Component
 * Follows Single Responsibility Principle
 */
interface AwardsCarouselProps {
  mounted: boolean;
  onViewCertificate: (data: Omit<PDFModalState, 'isOpen'>) => void;
}

function AwardsCarousel({ mounted, onViewCertificate }: AwardsCarouselProps) {
  const t = useTranslations('certifications');
  const loopedAwards = createLoopedArray(awards);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-md mx-auto lg:ml-8 lg:mr-auto">
      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 justify-center lg:justify-start">
        <Award className="text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
        <span>{t('awards')}</span>
      </h3>
      <Swiper
        {...SWIPER_PRESETS.awards}
        modules={[Navigation, Pagination, Autoplay, EffectCards]}
        className="pb-12"
        aria-label="Awards carousel"
      >
        {loopedAwards.map((award, index) => (
          <SwiperSlide key={generateCarouselKey(award.id, index)}>
            <AwardCard
              award={award}
              onViewCertificate={onViewCertificate}
            />
          </SwiperSlide>
        ))}
      </Swiper>
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
          {new Date(certification.date).toLocaleDateString('en', { month: 'long', year: 'numeric' })}
        </time>
        {certification.credentialUrl && (
          <button
            onClick={handleViewCertificate}
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-yellow-600 dark:bg-yellow-700 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-800 transition-colors text-sm font-medium w-full justify-center"
            aria-label={`View certificate for ${certification.title}`}
          >
            <FileText size={16} aria-hidden="true" />
            {t('viewCertificate')}
          </button>
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
    <article
      className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
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
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2 line-clamp-2">{award.title}</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
          {award.issuer}
        </p>
        <time
          className="text-sm text-zinc-500 dark:text-zinc-500 mb-3 block"
          dateTime={award.date}
        >
          {new Date(award.date).toLocaleDateString('en', { month: 'long', year: 'numeric' })}
        </time>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-3 leading-relaxed">
          {award.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {award.certificateUrl && (
            <button
              onClick={handleViewCertificate}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 dark:bg-yellow-700 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-800 transition-colors text-sm font-medium w-full justify-center"
              aria-label={`View certificate for ${award.title}`}
            >
              <FileText size={16} aria-hidden="true" />
              View Certificate
            </button>
          )}
          {(award as any).projectUrl && (
            <button
              onClick={handleViewProject}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors text-sm font-medium w-full justify-center"
              aria-label={`View project report for ${award.title}`}
            >
              <FileText size={16} aria-hidden="true" />
              View Project
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
