'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { timeline } from '@/lib/data';
import Image from 'next/image';

export default function Experience() {
  const t = useTranslations('experience');
  
  // Filter only work experience items
  const workItems = timeline.filter(item => item.type === 'work');

  return (
    <section id="experience" className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-center">{t('title')}</h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 text-center">
            {t('subtitle')}
          </p>

          <div className="space-y-8">
            {workItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-blue-300 dark:border-blue-700"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-white dark:bg-zinc-800 border-2 border-blue-500 dark:border-blue-600 flex items-center justify-center">
                  <Briefcase size={14} className="text-blue-600 dark:text-blue-400" />
                </div>

                <div className="relative bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-md hover:shadow-2xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-950/30 dark:hover:to-blue-900/30 hover:border-2 hover:border-blue-500 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.endDate === null
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                        : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100'
                    }`}>
                      {item.endDate === null ? 'Ongoing' : 'Completed'}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    {item.organizationLogo && (
                      <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 flex items-center justify-center">
                        <Image
                          src={item.organizationLogo}
                          alt={`${item.organization} logo`}
                          width={64}
                          height={64}
                          className="object-contain p-2"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
                        {item.organization}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-500 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(item.startDate).toLocaleDateString('en', { month: 'short', year: 'numeric' })} -{' '}
                      {item.endDate ? new Date(item.endDate).toLocaleDateString('en', { month: 'short', year: 'numeric' }) : t('present')}
                    </span>
                  </div>

                  <p className="text-zinc-700 dark:text-zinc-300 mb-4 text-justify">
                    {item.description}
                  </p>

                  {item.achievements && item.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                        {t('achievements')}
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {item.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.skills && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.certificateUrl && (
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors text-sm font-medium"
                    >
                      <ExternalLink size={16} />
                      View Certificate
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
