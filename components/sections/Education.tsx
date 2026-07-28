'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, FileText } from 'lucide-react';
import { getTimeline } from '@/lib/data-localized';
import Image from 'next/image';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useLocaleDate } from '@/lib/hooks/useLocaleDate';
import { usePdfViewer } from '@/lib/hooks/usePdfViewer';
import type { Locale } from '@/lib/types';
import ActionButton from '@/components/ui/ActionButton';
import StatusBadge from '@/components/ui/StatusBadge';
import DateRange from '@/components/ui/DateRange';
import InfoItem from '@/components/ui/InfoItem';
import SectionHeader from '@/components/ui/SectionHeader';
import TimelineItem from '@/components/ui/TimelineItem';
import Card from '@/components/ui/Card';
import TechTag from '@/components/ui/TechTag';
import { TIMELINE_KEYWORDS } from '@/lib/constants';

const PDFPreviewModal = dynamic(() => import('@/components/ui/PDFPreviewModal'), {
  ssr: false,
});

export default function Education() {
  const t = useTranslations('education');
  const locale = useLocale() as Locale;
  const { formatShortDate } = useLocaleDate();
  const pdfModal = usePdfViewer();

  // Get localized timeline and filter only education items
  const timeline = useMemo(() => getTimeline(locale), [locale]);
  const educationItems = useMemo(() => timeline.filter(item => item.type === 'education'), [timeline]);

  return (
    <section id="education" className="py-20 px-4 bg-white dark:bg-zinc-950">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            title={t('title')}
            subtitle={t('subtitle')}
          />

          <div className="space-y-8">
            {educationItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                icon={GraduationCap}
                variant="education"
                index={index}
              >
                <Card variant="education">
                  <div className="flex flex-col items-center md:flex-row md:items-start gap-4 mb-4">
                    {item.organizationLogo && (
                      <div className="flex-shrink-0 w-24 h-24 relative rounded-lg overflow-hidden bg-white border border-zinc-200 dark:border-zinc-600 flex items-center justify-center shadow-sm">
                        <Image
                          src={item.organizationLogo}
                          alt={`${item.organization} logo`}
                          fill
                          sizes="96px" /* w-24 container */
                          className="object-contain p-2"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 text-center md:text-left w-full">
                      <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold flex-1 min-w-0 whitespace-pre-line">{item.title}</h3>
                        <StatusBadge
                          status={item.endDate === null ? 'ongoing' : 'completed'}
                          ongoingText={t('status.ongoing')}
                          completedText={t('status.completed')}
                        />
                      </div>
                      <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
                        {item.organization}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-500 mb-4 justify-center md:justify-start">
                    <DateRange
                      startDate={item.startDate}
                      endDate={item.endDate}
                      dateString={item.dateString}
                      presentText={t('present')}
                      formatDate={formatShortDate}
                    />
                    <InfoItem icon={MapPin}>
                      {item.location}
                    </InfoItem>
                  </div>

                  <p className="text-zinc-700 dark:text-zinc-300 mb-4 text-center md:text-left leading-relaxed">
                    {item.description}
                  </p>

                  {item.achievements && item.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                        {t('achievements')}
                      </h4>
                      <ul className="list-disc list-outside pl-3 md:list-inside md:pl-0 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {item.achievements.map((achievement: string, i: number) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.skills && (
                    <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                      {item.skills.map((skill: string) => (
                        <TechTag
                          key={skill}
                          tech={skill}
                          variant="education"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {item.certificateUrl && (
                      <ActionButton
                        onClick={() => pdfModal.open({
                          url: item.certificateUrl!,
                          title: `${item.title} - ${item.title.includes(TIMELINE_KEYWORDS.MASTER_DEGREE) ? t('buttons.viewEnrollment') : t('buttons.viewCertificate')}`
                        })}
                        icon={FileText}
                        variant="success"
                        ariaLabel={`View ${item.title.includes(TIMELINE_KEYWORDS.MASTER_DEGREE) ? 'enrollment' : 'certificate'} for ${item.title}`}
                      >
                        {item.title.includes(TIMELINE_KEYWORDS.MASTER_DEGREE) ? t('buttons.viewEnrollment') : t('buttons.viewCertificate')}
                      </ActionButton>
                    )}
                    {item.transcriptUrl && (
                      <ActionButton
                        onClick={() => pdfModal.open({
                          url: item.transcriptUrl!,
                          title: `${item.title} - ${t('buttons.viewTranscript')}`
                        })}
                        icon={FileText}
                        variant="success"
                        ariaLabel={`View transcript for ${item.title}`}
                      >
                        {t('buttons.viewTranscript')}
                      </ActionButton>
                    )}
                  </div>
                </Card>
              </TimelineItem>
            ))}
          </div>
        </motion.div>
      </div>

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
