'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Github, Calendar, Play, FileText } from 'lucide-react';
import { getProjects } from '@/lib/data-localized';
import { TECH_ICONS, PROJECT_IDS, PROJECT_TITLES } from '@/lib/constants';
import ProjectStatusBadge from '@/components/ui/ProjectStatusBadge';
import ActionButton from '@/components/ui/ActionButton';
import FilterButtons from '@/components/ui/FilterButtons';
import SectionHeader from '@/components/ui/SectionHeader';
import { useLocaleDate } from '@/lib/hooks/useLocaleDate';
import { useModal, type PDFModalState, type VideoModalState } from '@/lib/hooks/useModal';
import type { Locale } from '@/lib/types';
import dynamic from 'next/dynamic';

const PDFPreviewModal = dynamic(() => import('@/components/ui/PDFPreviewModal'), {
  ssr: false,
});

const VideoPreviewModal = dynamic(() => import('@/components/ui/VideoPreviewModal'), {
  ssr: false,
});

const RippleLoader = dynamic(() => import('@/components/ui/RippleLoader'), {
  ssr: false,
});

export default function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale() as Locale;
  const { formatShortDate } = useLocaleDate();
  const projects = useMemo(() => getProjects(locale), [locale]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress'>('all');
  const pdfModal = useModal<PDFModalState>();
  const videoModal = useModal<VideoModalState>();
  const [githubLoader, setGithubLoader] = useState<{ isOpen: boolean; url: string }>({
    isOpen: false,
    url: ''
  });

  const filteredProjects = projects
    .filter((project) => filter === 'all' || project.status === filter)
    .sort((a, b) => {
      // Sort by date descending (most recent first)
      return b.startDate.localeCompare(a.startDate);
    });

  const handleGithubClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    setGithubLoader({ isOpen: true, url });
  };

  const handleGithubLoaderComplete = () => {
    if (githubLoader.url) {
      window.open(githubLoader.url, '_blank', 'noopener,noreferrer');
    }
    setGithubLoader({ isOpen: false, url: '' });
  };

  const handlePdfClick = (url: string, title: string) => {
    // Directly open PDF preview modal - loading animation is now integrated inside the modal
    pdfModal.open({ url, title });
  };

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionHeader title={t('title')} />

          {/* Filter Buttons */}
          <FilterButtons
            options={['all', 'completed', 'in-progress'] as const}
            activeFilter={filter}
            onChange={setFilter}
            getLabel={(option: 'all' | 'completed' | 'in-progress') => t(`filter.${option}`)}
            className="mb-12"
          />

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:border-2 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex justify-end mb-2">
                    <ProjectStatusBadge status={project.status} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

                  <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-500 mb-3">
                    <Calendar size={14} />
                    {formatShortDate(project.startDate)} -{' '}
                    {project.endDate ? formatShortDate(project.endDate) : t('present')}
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-left leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => {
                      const IconComponent = TECH_ICONS[tech];
                      return (
                        <span
                          key={tech}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-medium rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-110 transition-all duration-200 cursor-pointer"
                        >
                          {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {/* GitHub Button - Only show if specific repo URL exists */}
                    {project.github && !project.github.endsWith('/MarawanEldeib') && (
                      <>
                        {project.id === PROJECT_IDS.KGFM_UNIVERSAL_DB ? (
                          <div className="relative group">
                            <button
                              disabled
                              className="flex items-center gap-2 px-4 py-2 bg-zinc-400 dark:bg-zinc-600 text-white rounded-lg cursor-not-allowed opacity-70"
                              aria-label="GitHub repository (private)"
                            >
                              <Github size={16} />
                              {t('buttons.code')}
                            </button>
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10" role="tooltip">
                              Repository is currently private
                            </div>
                          </div>
                        ) : (
                          <a
                            href={project.github}
                            onClick={(e) => handleGithubClick(e, project.github!)}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                          >
                            <Github size={16} />
                            {t('buttons.code')}
                          </a>
                        )}
                      </>
                    )}
                    {project.video && (
                      <button
                        onClick={() => videoModal.open({
                          url: project.video!,
                          title: project.title
                        })}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
                      >
                        <Play size={16} fill="currentColor" />
                        {t('buttons.video')}
                      </button>
                    )}
                    {project.report && (
                      <ActionButton
                        onClick={() => handlePdfClick(project.report!, `${project.title} - ${t('buttons.report')}`)}
                        icon={FileText}
                        variant="primary"
                        ariaLabel={`View report for ${project.title}`}
                      >
                        {t('buttons.report')}
                      </ActionButton>
                    )}
                    {project.pdf && (
                      <ActionButton
                        onClick={() => handlePdfClick(project.pdf!, `${project.title} - ${t('buttons.report')}`)}
                        icon={FileText}
                        variant="primary"
                        ariaLabel={`View Report for ${project.title}`}
                      >
                        {t('buttons.report')}
                      </ActionButton>
                    )}
                    {(project.report === undefined && project.title.includes(PROJECT_TITLES.MANGO_VISION)) && (
                      <div className="relative group">
                        <button
                          disabled
                          className="flex items-center gap-2 px-4 py-2 bg-amber-600/50 dark:bg-amber-700/50 text-white rounded-lg cursor-not-allowed opacity-70"
                          aria-label="Research paper (coming soon)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                          {t('buttons.researchPaper')}
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none" role="tooltip">
                          {t('buttons.publishingSoon')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
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

      {videoModal.state.isOpen && (
        <VideoPreviewModal
          isOpen={videoModal.state.isOpen}
          onClose={videoModal.close}
          videoUrl={videoModal.state.url}
          title={videoModal.state.title}
        />
      )}

      <RippleLoader
        isOpen={githubLoader.isOpen}
        onComplete={handleGithubLoaderComplete}
      />
    </section>
  );
}
