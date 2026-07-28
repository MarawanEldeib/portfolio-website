'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Github, Calendar, Globe, BookOpen } from 'lucide-react';
import { getProjects } from '@/lib/data-localized';
import { TECH_ICONS } from '@/lib/constants';
import ProjectStatusBadge from '@/components/ui/ProjectStatusBadge';
import FilterButtons from '@/components/ui/FilterButtons';
import SectionHeader from '@/components/ui/SectionHeader';
import { useLocaleDate } from '@/lib/hooks/useLocaleDate';
import { useModal, type VideoModalState } from '@/lib/hooks/useModal';
import { usePdfViewer } from '@/lib/hooks/usePdfViewer';
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
  const pdfModal = usePdfViewer();
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
                  {/* Top row: Action buttons (left) + Status badge (right) */}
                  <div className="flex justify-between items-start mb-4">
                    {/* Action buttons - emoji only */}
                    <div className="flex gap-2">
                      {/* GitHub Button */}
                      {project.github && !project.github.endsWith('/MarawanEldeib') && (
                        project.privateGithub ? (
                          <div className="relative group">
                            <button
                              disabled
                              className="w-10 h-10 rounded-full bg-zinc-400 dark:bg-zinc-600 flex items-center justify-center cursor-not-allowed opacity-70"
                              aria-label="Private repository"
                            >
                              <Github size={18} className="text-white" />
                            </button>
                            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-zinc-800 text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              Private Repo
                            </span>
                          </div>
                        ) : (
                          <a
                            href={project.github}
                            onClick={(e) => handleGithubClick(e, project.github!)}
                            className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-lg hover:scale-110 transition-transform group relative"
                            aria-label={`View source code for ${project.title}`}
                          >
                            <Github size={18} className="text-white dark:text-zinc-900" />
                          </a>
                        )
                      )}
                      {/* Live Deployment Button */}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-green-600 dark:bg-green-700 flex items-center justify-center hover:scale-110 transition-transform group relative"
                          aria-label={`Open the live deployment of ${project.title}`}
                        >
                          <Globe size={18} className="text-white" />
                          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-zinc-800 text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {t('buttons.live')}
                          </span>
                        </a>
                      )}
                      {/* Published Paper Button */}
                      {project.paperUrl && (
                        <a
                          href={project.paperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-amber-600 dark:bg-amber-700 flex items-center justify-center hover:scale-110 transition-transform group relative"
                          aria-label={`${t('buttons.publishedPaper')}: ${project.title}`}
                        >
                          <BookOpen size={18} className="text-white" />
                          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-zinc-800 text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {t('buttons.publishedPaper')}
                          </span>
                        </a>
                      )}
                      {/* Video Button */}
                      {project.video && (
                        <button
                          onClick={() => videoModal.open({
                            url: project.video!,
                            title: project.title
                          })}
                          className="w-10 h-10 rounded-full bg-red-600 dark:bg-red-700 flex items-center justify-center text-lg hover:scale-110 transition-transform group relative"
                          aria-label={`Watch demo video for ${project.title}`}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>

                        </button>
                      )}
                      {/* Report/PDF Button */}
                      {project.report && (
                        <button
                          onClick={() => handlePdfClick(project.report!, `${project.title} - ${t('buttons.report')}`)}
                          className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-700 flex items-center justify-center text-lg hover:scale-110 transition-transform group relative"
                          aria-label={`View report for ${project.title}`}
                        >
                          📄

                        </button>
                      )}
                      {project.pdf && (
                        <button
                          onClick={() => handlePdfClick(project.pdf!, `${project.title} - ${t('buttons.report')}`)}
                          className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-700 flex items-center justify-center text-lg hover:scale-110 transition-transform group relative"
                          aria-label={`View report for ${project.title}`}
                        >
                          📄

                        </button>
                      )}
                    </div>

                    {/* Status badge + Institute logo */}
                    <div className="flex items-center gap-2">
                      {project.institute && (
                        project.institute.url ? (
                          <a href={project.institute.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <Image
                              src={project.institute.logo}
                              alt={project.institute.name}
                              width={44}
                              height={28}
                              className="object-contain h-7 w-auto"
                            />
                          </a>
                        ) : (
                          <Image
                            src={project.institute.logo}
                            alt={project.institute.name}
                            width={44}
                            height={28}
                            className="object-contain h-7 w-auto"
                          />
                        )
                      )}
                      <ProjectStatusBadge status={project.status} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 text-center md:text-left">{project.title}</h3>

                  {/* Date */}
                  <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-500 mb-4 justify-center md:justify-start">
                    <Calendar size={14} />
                    {formatShortDate(project.startDate)} -{' '}
                    {project.endDate ? formatShortDate(project.endDate) : t('present')}
                  </div>

                  {/* Description */}
                  <p className="text-zinc-600 dark:text-zinc-400 mb-5 text-justify leading-relaxed">
                    {project.description}
                  </p>

                  {/* Supervisor */}
                  {project.supervisor && (
                    <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                      {project.supervisor.url ? (
                        <a
                          href={project.supervisor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                          {project.supervisor.image && (
                            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-zinc-300 dark:border-zinc-600 relative">
                              <Image src={project.supervisor.image} alt={project.supervisor.name} fill sizes="28px" className="object-cover" />
                            </div>
                          )}
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">{project.supervisor.name}</span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-2">
                          {project.supervisor.image && (
                            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-zinc-300 dark:border-zinc-600 relative">
                              <Image src={project.supervisor.image} alt={project.supervisor.name} fill sizes="28px" className="object-cover" />
                            </div>
                          )}
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">{project.supervisor.name}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
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
