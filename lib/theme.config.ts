/**
 * Centralized Theme Configuration
 * All theme-related colors, dark mode settings, and styling constants
 */

export const THEME_CONFIG = {
  // Force dark mode always
  forceDarkMode: true,
  
  // Theme Colors (Dark Mode - Always Active)
  colors: {
    // Background Colors
    background: {
      primary: '#0a0a0a',
      secondary: '#18181b',
      tertiary: '#27272a',
    },
    
    // Card Colors
    card: {
      background: '#18181b',
      border: '#3f3f46',
    },
    
    // Text Colors
    text: {
      primary: '#fafafa',
      secondary: '#d4d4d8',
      muted: '#a1a1aa',
    },
    
    // Border Color
    border: '#3f3f46',
    
    // Accent Colors
    accent: {
      primary: '#2563eb',
      secondary: '#0ea5e9',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
  
  // CSS Variables (for use in CSS files)
  cssVariables: {
    '--background': '#0a0a0a',
    '--background-secondary': '#18181b',
    '--background-tertiary': '#27272a',
    '--card-background': '#18181b',
    '--card-border': '#3f3f46',
    '--text-primary': '#fafafa',
    '--text-secondary': '#d4d4d8',
    '--text-muted': '#a1a1aa',
    '--border-color': '#3f3f46',
    '--accent-primary': '#2563eb',
    '--accent-secondary': '#0ea5e9',
    '--accent-success': '#10b981',
    '--accent-warning': '#f59e0b',
    '--accent-error': '#ef4444',
  },
  
  // Shadows (Dark Mode)
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.6), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.7), 0 8px 10px -6px rgb(0 0 0 / 0.5)',
  },
  
  // Toast Notification Styles
  toast: {
    style: {
      background: '#18181b',
      color: '#fafafa',
      border: '1px solid #3f3f46',
      padding: '12px 16px',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '500',
      maxWidth: '380px',
      boxShadow: 'rgba(149, 157, 165, 0.15) 0px 8px 24px',
    },
    success: {
      style: {
        background: '#18181b',
        color: '#fafafa',
        border: '1px solid rgba(34, 197, 94, 0.25)',
        borderLeft: '4px solid #22c55e',
        padding: '12px 16px',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '380px',
        boxShadow: 'rgba(149, 157, 165, 0.15) 0px 8px 24px',
      },
      iconTheme: {
        primary: '#22c55e',
        secondary: 'white',
      },
    },
    error: {
      style: {
        background: '#18181b',
        color: '#fafafa',
        border: '1px solid rgba(239, 68, 68, 0.25)',
        borderLeft: '4px solid #ef4444',
        padding: '12px 16px',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '380px',
        boxShadow: 'rgba(149, 157, 165, 0.15) 0px 8px 24px',
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: 'white',
      },
    },
  },
  
  // Swiper/Carousel Styles
  swiper: {
    pagination: {
      bulletColor: '#cbd5e1',
      bulletActiveColor: '#2563eb',
      bulletWidth: 12,
      bulletHeight: 12,
      bulletActiveWidth: 32,
    },
    navigation: {
      buttonColor: '#2563eb',
      buttonBackground: 'white',
      buttonHoverBackground: '#2563eb',
      buttonHoverColor: 'white',
    },
  },
} as const;

/**
 * Dark mode enforcement script
 * To be used in the <head> of the document
 */
export const DARK_MODE_SCRIPT = `
  try {
    // Force dark mode always
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('dark');
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', 'dark');
    }
  } catch (e) {
    // Silently fail if storage is unavailable
  }
`;

/**
 * Get CSS variables as a string for inline styles
 */
export function getCSSVariablesString(): string {
  return Object.entries(THEME_CONFIG.cssVariables)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n    ');
}

/**
 * Helper to ensure dark mode is active
 */
export function enforceDarkMode(): void {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}
