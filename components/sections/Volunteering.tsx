'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { getVolunteering } from '@/lib/data-localized';
import { TECH_ICONS, fadeInUp } from '@/lib/constants';
import Image from 'next/image';
import { useLocaleDate } from '@/lib/hooks/useLocaleDate';
import InstagramButton from '@/components/ui/InstagramButton';
import GoogleDriveButton from '@/components/ui/GoogleDriveButton';
import GoogleDriveIcon from '@/components/ui/GoogleDriveIcon';
import { personalInfo } from '@/lib/data';

export default function Volunteering() {
  const t = useTranslations('volunteering');
  const locale = useLocale() as 'en' | 'de';
  const { formatShortDate } = useLocaleDate();
  
  // Get localized volunteering data
  const volunteering = getVolunteering(locale);

  if (volunteering.length === 0) {
    return null; // Don't render if no volunteer experience
  }

  return (
    <section id="volunteering" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          {...fadeInUp}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4 justify-center">
            <Heart className="text-purple-500 dark:text-purple-400" size={32} />
            <h2 className="text-4xl font-bold text-center">{t('title')}</h2>
          </div>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 text-center">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="space-y-8">
          {volunteering.map((volunteer, index) => (
            <motion.div
              key={volunteer.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-800 rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Organization Logo */}
                {volunteer.organizationLogo && (
                  <div className="flex-shrink-0 flex flex-row md:flex-col gap-3">
                    <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-white dark:bg-white border-2 border-zinc-200 dark:border-zinc-600">
                      <Image
                        src={volunteer.organizationLogo}
                        alt={volunteer.organization}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    {/* IEEE PES Badge - Only for IEEE entry */}
                    {volunteer.organization.includes("IEEE") && (
                      <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-white dark:bg-white border border-zinc-200 dark:border-zinc-600">
                        <Image
                          src="/images/logos/ieee_pes_mmu.jpg"
                          alt="IEEE PES Chapter"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex-grow">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                        {volunteer.role}
                      </h3>
                      <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                        {volunteer.organization}
                      </p>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>
                        {formatShortDate(volunteer.startDate)} - {volunteer.endDate ? formatShortDate(volunteer.endDate) : t('present')}
                      </span>
                    </div>
                    {volunteer.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{volunteer.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 mb-4 space-y-1 text-left">
                    {volunteer.description.map((point, i) => (
                      <li key={i} className="leading-relaxed">{point}</li>
                    ))}
                  </ul>

                  {/* Skills/Technologies */}
                  {volunteer.skills && volunteer.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {volunteer.skills.map((skill) => {
                        const IconComponent = TECH_ICONS[skill];
                        return (
                          <span
                            key={skill}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-md border border-purple-200 dark:border-purple-700"
                          >
                            {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Side Icons */}
                {volunteer.websiteUrl && (
                  <div className="flex-shrink-0 flex items-start justify-end">
                    {volunteer.organization === "Skippy Snacks" ? (
                      <InstagramButton href={volunteer.websiteUrl} />
                    ) : volunteer.websiteUrl.includes('drive.google.com') ? (
                      <GoogleDriveButton href={volunteer.websiteUrl} />
                    ) : (
                      <a
                        href={volunteer.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        aria-label={`Visit ${volunteer.organization} website`}
                      >
                        <ExternalLink size={24} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-8 border border-purple-200 dark:border-purple-700"
        >
          <Heart className="text-purple-500 dark:text-purple-400 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            {t('cta.title')}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t('cta.message')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
