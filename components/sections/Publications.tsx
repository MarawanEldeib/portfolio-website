'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';
import { publications } from '@/lib/data-localized';
import SectionHeader from '@/components/ui/SectionHeader';
import TimelineItem from '@/components/ui/TimelineItem';
import Card from '@/components/ui/Card';

export default function Publications() {
  const t = useTranslations('publications');

  return (
    <section id="publications" className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
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
            {publications.map((pub, index) => {
              const [before, after] = pub.authors.split(pub.highlightAuthor);

              return (
                <TimelineItem
                  key={pub.id}
                  icon={BookOpen}
                  variant="publication"
                  index={index}
                >
                  <Card variant="publication">
                    <div className="text-center md:text-left">
                      {/* Authors — own name emphasised */}
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                        {before}
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {pub.highlightAuthor}
                        </span>
                        {after}
                      </p>

                      {/* Title — links to the DOI */}
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 leading-snug">
                        <a
                          href={pub.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-start gap-2 text-zinc-900 dark:text-zinc-50 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                          aria-label={`${t('viewPaper')}: ${pub.title}`}
                        >
                          <span>{pub.title}</span>
                          <ExternalLink size={16} className="mt-1.5 flex-shrink-0 opacity-60" aria-hidden="true" />
                        </a>
                      </h3>

                      {/* Venue */}
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
                        <span className="italic">{pub.venue}</span>
                        {`, vol. ${pub.volume}, no. ${pub.issue}, pp. ${pub.pages}, ${pub.year}.`}
                      </p>

                      {/* DOI */}
                      <div className="flex justify-center md:justify-start">
                        <a
                          href={pub.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors break-all"
                        >
                          <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 uppercase tracking-wide">
                            {t('doi')}
                          </span>
                          <span>{pub.doi.replace('https://doi.org/', '')}</span>
                        </a>
                      </div>
                    </div>
                  </Card>
                </TimelineItem>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
