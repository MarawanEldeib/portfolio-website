/**
 * useLocaleDate Hook
 * Provides locale-aware date formatting in React components
 * Integrates with next-intl for consistent i18n
 */

import { useLocale } from 'next-intl';
import { formatDate, formatDateRange, DATE_FORMATS } from '@/lib/utils/date';
import type { Locale } from '@/lib/types';

/**
 * Hook for locale-aware date formatting
 * Automatically uses the current locale from next-intl
 *
 * @returns Object with formatting functions
 *
 * @example
 * ```tsx
 * const { formatMonthYear, formatShortDate } = useLocaleDate();
 * <time>{formatMonthYear('2023-11')}</time>
 * ```
 */
export function useLocaleDate() {
  const locale = useLocale() as Locale;

  return {
    /**
     * Format date as "November 2023" or "November 2023"
     */
    formatMonthYear: (dateString: string) =>
      formatDate(dateString, locale, DATE_FORMATS.MONTH_YEAR),

    /**
     * Format date as "Nov 2023" or "Nov. 2023"
     */
    formatShortDate: (dateString: string) =>
      formatDate(dateString, locale, DATE_FORMATS.SHORT_MONTH_YEAR),

    /**
     * Format date range "Nov 2023 - Present"
     */
    formatRange: (start: string, end: string | null, presentLabel: string) =>
      formatDateRange(start, end, locale, presentLabel),

    /**
     * Get current locale
     */
    locale,
  };
}
