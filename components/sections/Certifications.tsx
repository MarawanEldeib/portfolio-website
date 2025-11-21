'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, Award, FileText } from 'lucide-react';
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

const PDFPreviewModal = dynamic(() => import('@/components/ui/PDFPreviewModal'), {
  ssr: false,
});

export default function Certifications() {
  const t = useTranslations('certifications');
  const [mounted, setMounted] = useState(false);
  const [pdfPreview, setPdfPreview] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: ''
  });

  useEffect(() => {
    // Defer mounting to ensure client-side hydration
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="certifications" className="py-20 px-4 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">{t('title')}</h2>

          {/* Grid container for side-by-side layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Certifications Carousel */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 justify-center lg:justify-start">
                <Award className="text-green-600 dark:text-green-400" />
                Course Certifications
              </h3>
              {mounted && (
                <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCards]}
                effect="cards"
                grabCursor={true}
                loop={true}
                navigation={{
                  enabled: true,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                cardsEffect={{
                  perSlideOffset: 8,
                  perSlideRotate: 2,
                  rotate: true,
                  slideShadows: true,
                }}
                className="pb-12"
              >
                {[...certifications, ...certifications, ...certifications].map((cert, index) => (
                  <SwiperSlide key={`${cert.id}-${index}`}>
                    <div className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full">
                      {cert.image ? (
                        <div className="relative h-40 bg-zinc-200 dark:bg-zinc-700">
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            fill
                            className="object-contain p-4"
                          />
                        </div>
                      ) : (
                        <div className="relative h-40 bg-gradient-to-br from-green-500 to-teal-600 dark:from-green-600 dark:to-teal-700 flex items-center justify-center">
                          <Award className="text-white opacity-30" size={48} />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{cert.title}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                          {cert.issuer}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">
                          {new Date(cert.date).toLocaleDateString('en', { month: 'long', year: 'numeric' })}
                        </p>
                        {cert.credentialUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPdfPreview({
                                isOpen: true,
                                url: cert.credentialUrl!,
                                title: cert.title
                              });
                            }}
                            className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-yellow-600 dark:bg-yellow-700 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-800 transition-colors text-sm font-medium w-full justify-center"
                          >
                            <FileText size={16} />
                            {t('viewCertificate')}
                          </button>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              )}
            </div>

            {/* Awards */}
            {awards.length > 0 && mounted && (
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 justify-center lg:justify-start">
                  <Award className="text-yellow-600 dark:text-yellow-400" />
                  {t('awards')}
                </h3>
                <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCards]}
                effect="cards"
                grabCursor={true}
                loop={true}
                navigation={{
                  enabled: true,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                cardsEffect={{
                  perSlideOffset: 8,
                  perSlideRotate: 2,
                  rotate: true,
                  slideShadows: true,
                }}
                className="pb-12"
              >
                {[...awards, ...awards, ...awards].map((award, index) => (
                  <SwiperSlide key={`${award.id}-${index}`}>
                    <div className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full">
                      {award.image ? (
                        <div className="relative h-40 bg-zinc-200 dark:bg-zinc-700">
                          <Image
                            src={award.image}
                            alt={award.title}
                            fill
                            className="object-contain p-4"
                          />
                        </div>
                      ) : (
                        <div className="relative h-40 bg-gradient-to-br from-yellow-500 to-orange-600 dark:from-yellow-600 dark:to-orange-700 flex items-center justify-center">
                          <Award className="text-white opacity-30" size={48} />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{award.title}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                          {award.issuer}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-3">
                          {new Date(award.date).toLocaleDateString('en', { month: 'long', year: 'numeric' })}
                        </p>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-3 leading-relaxed">
                          {award.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {award.certificateUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPdfPreview({
                                  isOpen: true,
                                  url: award.certificateUrl!,
                                  title: `${award.title} - Certificate`
                                });
                              }}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 dark:bg-yellow-700 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-800 transition-colors text-sm font-medium w-full justify-center"
                            >
                              <FileText size={16} />
                              View Certificate
                            </button>
                          )}
                          {(award as any).projectUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPdfPreview({
                                  isOpen: true,
                                  url: (award as any).projectUrl!,
                                  title: `${award.title} - Project Report`
                                });
                              }}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors text-sm font-medium w-full justify-center"
                            >
                              <FileText size={16} />
                              View Project
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {pdfPreview.isOpen && (
        <PDFPreviewModal
          isOpen={pdfPreview.isOpen}
          onClose={() => setPdfPreview({ isOpen: false, url: '', title: '' })}
          pdfUrl={pdfPreview.url}
          title={pdfPreview.title}
        />
      )}
    </section>
  );
}
