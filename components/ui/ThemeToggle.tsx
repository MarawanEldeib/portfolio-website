'use client';

import { useEffect } from 'react';
import { enforceDarkMode } from '@/lib/theme.config';

export default function ThemeToggle() {
  // Force dark mode always
  useEffect(() => {
    enforceDarkMode();
  }, []);
  
  return null;
}
