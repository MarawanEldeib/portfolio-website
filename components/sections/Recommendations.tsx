'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Quote, Linkedin, User, ExternalLink } from 'lucide-react';
import { getRecommendations } from '@/lib/data-localized';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Recommendations() {
  const locale = useLocale() as 'en' | 'de';
  const t = useTranslations('recommendations');
  const [mounted, setMounted] = useState(false);

  // Get localized recommendations
  const recommendations = useMemo(() => getRecommendations(locale), [locale]);

  // Only enable loop if we have more slides than the max slidesPerView (2)
  const enableLoop = recommendations.length > 2;

  useEffect(() => {
    // Defer mounting to ensure client-side hydration
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section id="recommendations" className="py-20 px-4 bg-white dark:bg-zinc-950">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              {t('subtitle')}
            </p>
          </div>

          {/* Recommendations Carousel */}
          {mounted && (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              loop={enableLoop}
              navigation={{
                enabled: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 24,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 28,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
              }}
              className="recommendations-swiper pb-12"
            >
              {recommendations.map((recommendation) => (
                <SwiperSlide key={recommendation.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-600"
                  >
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <Quote className="text-blue-600 dark:text-blue-400 opacity-30" size={48} />
                    </div>

                    {/* Recommendation Text */}
                    <p className="text-zinc-700 dark:text-zinc-300 text-lg mb-6 italic leading-relaxed text-left">
                      &quot;{recommendation.text}&quot;
                    </p>

                    {/* Recommender Info */}
                    <div className="flex items-center gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        {recommendation.image ? (
                          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 dark:border-blue-500">
                            <Image
                              src={recommendation.image}
                              alt={recommendation.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center border-2 border-blue-500 dark:border-blue-500">
                            <User className="text-white" size={32} />
                          </div>
                        )}
                      </div>

                      {/* Name and Title */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                          {recommendation.name}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {recommendation.title}
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {recommendation.company}
                        </p>
                      </div>

                      {/* Social Links */}
                      <div className="flex-shrink-0 flex items-center gap-3">
                        {/* LinkedIn Expanding Button */}
                        {recommendation.linkedin && (
                          <a
                            href={recommendation.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linkedin-btn"
                            aria-label={t('linkedinProfile', { name: recommendation.name })}
                          >
                            <div className="linkedin-sign">
                              <svg
                                fill="white"
                                className="svgIcon"
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.6em"
                                viewBox="0 0 448 512"
                              >
                                <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                              </svg>
                            </div>
                            <div className="linkedin-text">LinkedIn</div>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </div>
    </section>
  );
}
