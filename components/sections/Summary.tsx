'use client';

import { motion } from 'framer-motion';
import { Award, Users, Code2 } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export default function Summary() {
  const stats = [
    { icon: Award, label: 'Awards', value: 'Best Research Project' },
    { icon: Users, label: 'Users Impacted', value: '10,000+' },
    { icon: Code2, label: 'ML Accuracy', value: '98.5%' },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10">
      <div className="container mx-auto max-w-6xl px-0 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-left text-zinc-900 dark:text-zinc-50">Professional Summary</h2>

          {/* Summary Text */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed text-left max-w-4xl mb-12">
            {personalInfo.summary}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-zinc-200 dark:border-zinc-700 hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 hover:border-2 hover:border-blue-500 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer"
                >
                  <Icon className="text-blue-600 dark:text-blue-400 mb-2 sm:mb-3" size={28} />
                  <div className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
