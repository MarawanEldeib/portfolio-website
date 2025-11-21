/**
 * Date Formatting Utilities
 * Provides consistent, locale-aware date formatting across the application
 * Follows i18n best practices
 */

import type { Locale } from '@/lib/types';

/**
 * Format options for different date display scenarios
 */
export const DATE_FORMATS = {
  MONTH_YEAR: {
    month: 'long' as const,
    year: 'numeric' as const,
  },
  SHORT_MONTH_YEAR: {
    month: 'short' as const,
    year: 'numeric' as const,
  },
  FULL_DATE: {
    day: 'numeric' as const,
    month: 'long' as const,
    year: 'numeric' as const,
  },
} as const;

/**
 * Format a date string to locale-specific format
 *
 * @param dateString - Date string in YYYY-MM or YYYY-MM-DD format
 * @param locale - Current locale (en or de)
 * @param format - Format options from DATE_FORMATS
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatDate('2023-11', 'de', DATE_FORMATS.MONTH_YEAR)
 * // Returns: "November 2023" (en) or "November 2023" (de)
 * ```
 */
export function formatDate(
  dateString: string,
  locale: Locale = 'en',
  format: Intl.DateTimeFormatOptions = DATE_FORMATS.SHORT_MONTH_YEAR
): string {
  try {
    // Handle YYYY-MM format
    const [year, month, day] = dateString.split('-');
    const date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      day ? parseInt(day) : 1
    );

    return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', format);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Format a date range (start - end or start - present)
 *
 * @param startDate - Start date string
 * @param endDate - End date string or null for ongoing
 * @param locale - Current locale
 * @param presentLabel - Label for ongoing items
 * @returns Formatted date range string
 */
export function formatDateRange(
  startDate: string,
  endDate: string | null,
  locale: Locale = 'en',
  presentLabel: string = 'Present'
): string {
  const start = formatDate(startDate, locale, DATE_FORMATS.SHORT_MONTH_YEAR);
  const end = endDate
    ? formatDate(endDate, locale, DATE_FORMATS.SHORT_MONTH_YEAR)
    : presentLabel;

  return `${start} - ${end}`;
}

/**
 * Get current year for copyright notices
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}
