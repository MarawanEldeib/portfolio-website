/**
 * ProjectStatusBadge Component
 * Displays a status badge for project completion state
 * Provides consistent styling for 'completed' and 'ongoing' statuses
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
            status === 'ongoing',
        },
        className
      )}
    >
      {t(`filter.${status}`)}
    </span>
  );
}
