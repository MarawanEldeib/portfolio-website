'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { skills, languages } from '@/lib/data';
import { TECH_ICONS, fadeInUp } from '@/lib/constants';
import { Languages as LanguagesIcon, FileText } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useModal, type PDFModalState } from '@/lib/hooks/useModal';

const PDFPreviewModal = dynamic(() => import('@/components/ui/PDFPreviewModal'), {
  ssr: false,
});

export default function Skills() {
  const t = useTranslations('skills');
  const pdfModal = useModal<PDFModalState>();

  const skillCategories = [
    { key: 'languages', data: skills?.languages || [] },
    { key: 'dataScience', data: skills?.dataScience || [] },
    { key: 'frameworks', data: skills?.frameworks || [] },
    { key: 'cloudDevOps', data: skills?.cloudDevOps || [] },
    { key: 'projectManagement', data: skills?.projectManagement || [] },
    { key: 'tools', data: skills?.tools || [] },
    { key: 'cybersecurity', data: skills?.cybersecurity || [] },
    { key: 'systems', data: skills?.systems || [] },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-white dark:bg-zinc-950">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          {...fadeInUp}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-center text-zinc-900 dark:text-zinc-50">{t('title')}</h2>
          <p className="text-center text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-12 px-4">{t('subtitle')}</p>

          {/* Technical Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-sky-50 dark:hover:from-blue-950/30 dark:hover:to-sky-950/30 hover:border-2 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">{t(category.key)}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.data.map((skillName) => {
                    const IconComponent = TECH_ICONS[skillName];
                    return (
                      <div
                        key={skillName}
                        className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:scale-105 transition-all duration-200"
                      >
                        {IconComponent && (
                          <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )}
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{skillName}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Languages Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20 rounded-xl p-8 shadow-lg border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-6">
              <LanguagesIcon className="text-blue-600 dark:text-blue-400" size={28} />
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('spokenLanguages')}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-800/50 rounded-lg p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3 uppercase tracking-wide">{t('fluent')}</h4>
                <div className="flex flex-wrap gap-2">
                  {[...(languages?.native || []), ...(languages?.proficient || [])].map((lang) => {
                    const isEnglish = lang.includes('English');
                    return (
                      <span
                        key={lang}
                        onClick={() => isEnglish ? pdfModal.open({
                          url: "/certificates/English C1 Certificate.pdf",
                          title: "English C1 Certificate (2024)"
                        }) : null}
                        className={`px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-110 transition-all duration-200 cursor-pointer flex items-center gap-2`}
                        title={isEnglish ? "Click to view certificate" : undefined}
                      >
                        {lang}
                        {isEnglish && (
                          <span className="flex items-center justify-center bg-yellow-400 text-blue-900 p-1 rounded">
                            <FileText size={14} />
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800/50 rounded-lg p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3 uppercase tracking-wide">{t('intermediate')}</h4>
                <div className="flex flex-wrap gap-2">
                  {(languages?.intermediate || []).map((lang) => {
                    const isGerman = lang.includes('German');
                    return (
                      <span
                        key={lang}
                        onClick={() => isGerman ? pdfModal.open({
                          url: "/certificates/German B1 Certificate.pdf",
                          title: "German B1 Certificate"
                        }) : null}
                        className={`px-4 py-2 rounded-lg font-medium border-2 transition-all duration-200 cursor-pointer flex items-center gap-2
                          ${isGerman
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/50 hover:scale-105 hover:shadow-md'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/50 hover:scale-110'
                          }`}
                        title={isGerman ? "Click to view certificate" : undefined}
                      >
                        {lang}
                        {isGerman && (
                          <span className="flex items-center justify-center bg-yellow-400 text-blue-900 p-1 rounded">
                            <FileText size={14} />
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800/50 rounded-lg p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3 uppercase tracking-wide">{t('beginner')}</h4>
                <div className="flex flex-wrap gap-2">
                  {(languages?.beginner || []).map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300 border-2 border-zinc-300 dark:border-zinc-600 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-110 transition-all duration-200 cursor-pointer"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
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
