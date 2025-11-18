/**
 * Toast notification configuration utilities
 * Provides consistent styling and behavior for toast notifications across the application
 */

import { type Toast } from 'react-hot-toast';

/**
 * Default toast styling that matches the application's theme
 */
export const defaultToastStyle: Partial<Toast> = {
  style: {
    background: 'var(--card-background)',
    color: 'var(--text-primary)',
    border: '1px solid var(--card-border)',
  },
};

/**
 * Toast configuration presets for different notification types
 */
export const toastConfig = {
  success: {
    duration: 3500,
    ...defaultToastStyle,
  },
  error: {
    duration: 4000,
    ...defaultToastStyle,
  },
  info: {
    duration: 3000,
    ...defaultToastStyle,
  },
} as const;
