'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, FileText } from 'lucide-react';
import { timeline } from '@/lib/data';
import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLocaleDate } from '@/lib/hooks/useLocaleDate';
import ActionButton from '@/components/ui/ActionButton';
import StatusBadge from '@/components/ui/StatusBadge';
import DateRange from '@/components/ui/DateRange';
import InfoItem from '@/components/ui/InfoItem';
import SectionHeader from '@/components/ui/SectionHeader';
import TimelineItem from '@/components/ui/TimelineItem';
import Card from '@/components/ui/Card';
import TechTag from '@/components/ui/TechTag';

const PDFPreviewModal = dynamic(() => import('@/components/ui/PDFPreviewModal'), {
  ssr: false,
});

export default function Experience() {
  const t = useTranslations('experience');
  const { formatShortDate } = useLocaleDate();
  const [pdfPreview, setPdfPreview] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: ''
  });

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
          <SectionHeader
            title={t('title')}
            subtitle={t('subtitle')}
          />

          <div className="space-y-8">
            {workItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                icon={Briefcase}
                variant="experience"
                index={index}
              >
                <Card variant="experience">
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

                  <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-500 mb-4">
                    <InfoItem icon={MapPin}>
                      {item.location}
                    </InfoItem>
                    <DateRange
                      startDate={item.startDate}
                      endDate={item.endDate}
                      presentText={t('present')}
                      formatDate={formatShortDate}
                    />
                  </div>

                  <div className="text-zinc-700 dark:text-zinc-300 mb-4 text-left leading-relaxed whitespace-pre-line">
                    {item.description}
                  </div>

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
                        <TechTag
                          key={skill}
                          tech={skill}
                          variant="experience"
                        />
                      ))}
                    </div>
                  )}

                  {item.certificateUrl && (
                    <ActionButton
                      onClick={() => setPdfPreview({
                        isOpen: true,
                        url: item.certificateUrl!,
                        title: `${item.title} - ${t('buttons.viewCertificate')}`
                      })}
                      icon={FileText}
                      variant="primary"
                      ariaLabel={`View certificate for ${item.title}`}
                    >
                      {t('buttons.viewCertificate')}
                    </ActionButton>
                  )}
                </Card>
              </TimelineItem>
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
