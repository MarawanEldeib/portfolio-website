'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type ButtonVariant = 'email' | 'github' | 'linkedin' | 'youtube';

interface ExpandingSocialButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  ariaLabel: string;
  variant: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  email: 'bg-blue-600 hover:bg-blue-700 hover:w-64',
  github: 'bg-zinc-800 hover:bg-zinc-700 hover:w-44',
  linkedin: 'bg-sky-700 hover:bg-sky-600 hover:w-44',
  youtube: 'bg-red-600 hover:bg-red-700 hover:w-44',
};

const decorationStyles: Record<ButtonVariant, string> = {
  email: 'bg-blue-600 group-hover:bg-blue-700',
  github: 'bg-zinc-800 group-hover:bg-zinc-700',
  linkedin: 'bg-sky-700 group-hover:bg-sky-600',
  youtube: 'bg-red-600 group-hover:bg-red-700',
};

export default function ExpandingSocialButton({
  icon,
  label,
  onClick,
  ariaLabel,
  variant
}: ExpandingSocialButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative flex h-12 w-12 items-center justify-start gap-2 overflow-hidden rounded p-2 pr-6 font-bold text-white duration-700 ${variantStyles[variant]}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={ariaLabel}
    >
      {/* Rotating square decoration */}
      <span className={`absolute left-8 h-6 w-6 rotate-45 duration-700 group-hover:left-40 z-0 ${decorationStyles[variant]}`} />

      {/* Icon */}
      <div className="relative z-10">
        {icon}
      </div>

      {/* Label */}
      <span className="relative z-10 opacity-0 group-hover:opacity-100 duration-700 text-sm">
        {label}
      </span>
    </motion.button>
  );
}
