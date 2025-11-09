'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { skills, languages } from '@/lib/data';
import { TECH_ICONS, fadeInUp } from '@/lib/constants';
import { Languages as LanguagesIcon } from 'lucide-react';

export default function Skills() {
  const t = useTranslations('skills');

  const skillCategories = [
    { key: 'backend', data: skills.backend },
    { key: 'frontend', data: skills.frontend },
    { key: 'cloud', data: skills.cloud },
    { key: 'tools', data: skills.tools },
    { key: 'databases', data: skills.databases },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-white dark:bg-zinc-950">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          {...fadeInUp}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-3 text-center text-zinc-900 dark:text-zinc-50">{t('title')}</h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12">{t('subtitle')}</p>

          {/* Technical Skills */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 hover:border-2 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer"
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
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-8 shadow-lg border-2 border-purple-200 dark:border-purple-800"
          >
            <div className="flex items-center gap-3 mb-6">
              <LanguagesIcon className="text-purple-600 dark:text-purple-400" size={28} />
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Languages</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-3 uppercase tracking-wide">Fluent</h4>
                <div className="flex flex-wrap gap-2">
                  {languages.fluent.map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg font-medium shadow-md"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-3 uppercase tracking-wide">Intermediate</h4>
                <div className="flex flex-wrap gap-2">
                  {languages.intermediate.map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium border-2 border-purple-300 dark:border-purple-700"
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
    </section>
  );
}
