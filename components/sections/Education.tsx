'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, FileText } from 'lucide-react';
import { timeline } from '@/lib/data';
import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLocaleDate } from '@/lib/hooks/useLocaleDate';

const PDFPreviewModal = dynamic(() => import('@/components/ui/PDFPreviewModal'), {
  ssr: false,
});

export default function Education() {
  const t = useTranslations('education');
  const { formatShortDate } = useLocaleDate();
  const [pdfPreview, setPdfPreview] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: ''
  });

  // Filter only education items
  const educationItems = timeline.filter(item => item.type === 'education');

  return (
    <section id="education" className="py-20 px-4 bg-white dark:bg-zinc-950">
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
            {educationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-green-300 dark:border-green-700"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-white dark:bg-zinc-800 border-2 border-green-500 dark:border-green-600 flex items-center justify-center">
                  <GraduationCap size={14} className="text-green-600 dark:text-green-400" />
                </div>

                <div className="relative bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-md hover:shadow-2xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 dark:hover:from-green-950/30 dark:hover:to-green-900/30 hover:border-2 hover:border-green-500 dark:hover:border-green-600 transition-all duration-300 cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    {item.organizationLogo && (
                      <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden bg-white border border-zinc-200 dark:border-zinc-600 flex items-center justify-center shadow-sm">
                        <Image
                          src={item.organizationLogo}
                          alt={`${item.organization} logo`}
                          width={64}
                          height={64}
                          className="object-contain p-2"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold flex-1 min-w-0">{item.title}</h3>
                        {/* Status Badge */}
                        <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${item.endDate === null
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
                          : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                          }`}>
                          {item.endDate === null ? t('status.ongoing') : t('status.completed')}
                        </span>
                      </div>
                      <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
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
                      {formatShortDate(item.startDate)} - {item.endDate ? formatShortDate(item.endDate) : t('present')}
                    </span>
                  </div>

                  <p className="text-zinc-700 dark:text-zinc-300 mb-4 text-left leading-relaxed">
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
                          className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    {item.certificateUrl && (
                      <button
                        onClick={() => setPdfPreview({
                          isOpen: true,
                          url: item.certificateUrl!,
                          title: `${item.title} - ${item.title.includes('Master') ? t('buttons.viewEnrollment') : t('buttons.viewCertificate')}`
                        })}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors text-sm font-medium"
                      >
                        <FileText size={16} />
                        {item.title.includes('Master') ? t('buttons.viewEnrollment') : t('buttons.viewCertificate')}
                      </button>
                    )}
                    {item.transcriptUrl && (
                      <button
                        onClick={() => setPdfPreview({
                          isOpen: true,
                          url: item.transcriptUrl!,
                          title: `${item.title} - ${t('buttons.viewTranscript')}`
                        })}
                        className="inline-flex items-center gap-2 px-4 py-2 border-2 border-green-600 dark:border-green-700 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-sm font-medium"
                      >
                        <FileText size={16} />
                        {t('buttons.viewTranscript')}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
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
