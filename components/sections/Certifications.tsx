'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';
import { certifications, awards } from '@/lib/data';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Certifications() {
  const t = useTranslations('certifications');
  const [mounted, setMounted] = useState(false);

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

          {/* Certifications Carousel */}
          <div className="mb-12 max-w-md mx-auto">
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
                {certifications.map((cert) => (
                  <SwiperSlide key={cert.id}>
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
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <ExternalLink size={14} />
                            {t('viewCertificate')}
                          </a>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Awards */}
          {awards.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Award className="text-yellow-600 dark:text-yellow-400" />
                {t('awards')}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {awards.map((award, index) => (
                  <motion.div
                    key={award.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 dark:hover:from-yellow-950/30 dark:hover:to-orange-950/30 hover:border-2 hover:border-yellow-500 dark:hover:border-yellow-600 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                        <Award className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2">{award.title}</h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                          {award.issuer}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-3">
                          {new Date(award.date).toLocaleDateString('en', { month: 'long', year: 'numeric' })}
                        </p>
                        <p className="text-zinc-700 dark:text-zinc-300 mb-3 text-left leading-relaxed">
                          {award.description}
                        </p>
                        {award.certificateUrl && (
                          <a
                            href={award.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-yellow-600 dark:bg-yellow-700 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-800 transition-colors text-sm font-medium"
                          >
                            <ExternalLink size={16} />
                            View Certificate
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
