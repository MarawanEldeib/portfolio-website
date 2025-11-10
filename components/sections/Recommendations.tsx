'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Quote, Linkedin, User } from 'lucide-react';
import { recommendations } from '@/lib/data';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Recommendations() {
  const t = useTranslations('recommendations');

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
            <h2 className="text-4xl font-bold mb-4">Recommendations</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              What colleagues and mentors say about working with me
            </p>
          </div>

          {/* Recommendations Carousel */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
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
                  className="bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-700"
                >
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="text-purple-600 dark:text-purple-400 opacity-30" size={48} />
                  </div>

                  {/* Recommendation Text */}
                  <p className="text-zinc-700 dark:text-zinc-300 text-lg mb-6 italic leading-relaxed text-justify">
                    "{recommendation.text}"
                  </p>

                  {/* Recommender Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      {recommendation.image ? (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500 dark:border-purple-600">
                          <Image
                            src={recommendation.image}
                            alt={recommendation.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center border-2 border-purple-500 dark:border-purple-600">
                          <User className="text-white" size={32} />
                        </div>
                      )}
                    </div>

                    {/* Name and Title */}
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {recommendation.name}
                      </h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {recommendation.title}
                      </p>
                      <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        {recommendation.company}
                      </p>
                    </div>

                    {/* LinkedIn Link */}
                    {recommendation.linkedin && (
                      <a
                        href={recommendation.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        aria-label={`View ${recommendation.name}'s LinkedIn profile`}
                      >
                        <Linkedin size={24} />
                      </a>
                    )}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
