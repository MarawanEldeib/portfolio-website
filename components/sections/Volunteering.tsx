'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { volunteering } from '@/lib/data';
import { TECH_ICONS, fadeInUp } from '@/lib/constants';
import Image from 'next/image';

export default function Volunteering() {
  const t = useTranslations('volunteering');

  if (volunteering.length === 0) {
    return null; // Don't render if no volunteer experience
  }

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="volunteering" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          {...fadeInUp}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="text-red-500" size={32} />
            <h2 className="text-4xl font-bold">{t('title')}</h2>
          </div>
          <p className="text-zinc-600 mb-12">
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
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-zinc-200"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Organization Logo */}
                {volunteer.organizationLogo && (
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-zinc-100">
                      <Image
                        src={volunteer.organizationLogo}
                        alt={volunteer.organization}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </div>
                )}

                <div className="flex-grow">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                        {volunteer.role}
                        {volunteer.websiteUrl && (
                          <a
                            href={volunteer.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                            aria-label={`Visit ${volunteer.organization} website`}
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </h3>
                      <p className="text-lg text-blue-600 font-medium">
                        {volunteer.organization}
                      </p>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>
                        {formatDate(volunteer.startDate)} - {volunteer.endDate ? formatDate(volunteer.endDate) : 'Present'}
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
                  <p className="text-zinc-700 mb-4 leading-relaxed text-justify">
                    {volunteer.description}
                  </p>

                  {/* Skills/Technologies */}
                  {volunteer.skills && volunteer.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {volunteer.skills.map((skill) => {
                        const IconComponent = TECH_ICONS[skill];
                        return (
                          <span
                            key={skill}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-md border border-red-200"
                          >
                            {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
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
          className="mt-12 text-center bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 border border-red-200"
        >
          <Heart className="text-red-500 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold text-zinc-900 mb-2">
            Passionate About Giving Back
          </h3>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            I believe in using technology to make a positive impact on society. 
            If you have a volunteer opportunity or know of a cause that could benefit from my skills, 
            I'd love to hear about it!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
