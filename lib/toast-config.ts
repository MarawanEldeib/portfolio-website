/**
 * Toast notification configuration utilities
 * Styled with wave accent + icon badge (inspired by Uiverse)
 */

import { type Toast } from 'react-hot-toast';

const baseStyle = {
  padding: '12px 16px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '500',
  maxWidth: '380px',
  boxShadow: 'rgba(149, 157, 165, 0.15) 0px 8px 24px',
};

export const defaultToastStyle: Partial<Toast> = {
  style: {
    ...baseStyle,
    background: 'var(--card-background)',
    color: 'var(--text-primary)',
    border: '1px solid var(--card-border)',
  },
};

export const toastConfig = {
  success: {
    duration: 3500,
    style: {
      ...baseStyle,
      background: '#18181b',
      color: '#fafafa',
      border: '1px solid #22c55e40',
      borderLeft: '4px solid #22c55e',
    },
    iconTheme: {
      primary: '#22c55e',
      secondary: '#fff',
    },
  },
  error: {
    duration: 4000,
    style: {
      ...baseStyle,
      background: '#18181b',
      color: '#fafafa',
      border: '1px solid #ef444440',
      borderLeft: '4px solid #ef4444',
    },
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  },
  info: {
    duration: 3000,
    ...defaultToastStyle,
  },
} as const;
