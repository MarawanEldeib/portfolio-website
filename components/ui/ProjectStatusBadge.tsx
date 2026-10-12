/**
 * ProjectStatusBadge Component
 * Displays a status badge for project completion state
 * Provides consistent styling for 'completed', 'in-progress' and 'paused' statuses
 */

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/lib/types';

interface ProjectStatusBadgeProps {
  status: Exclude<ProjectStatus, 'all'>;
  className?: string;
}

export default function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  const t = useTranslations('projects');

  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-xs font-medium',
        {
          'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100':
            status === 'completed',
          'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100':
            status === 'in-progress',
          'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200':
            status === 'paused',
        },
        className
      )}
    >
      {t(`filter.${status}`)}
    </span>
  );
}
