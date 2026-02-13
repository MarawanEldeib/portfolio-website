'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ExpandingSocialButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  ariaLabel: string;
  bgColor: string;
  hoverBgColor: string;
  expandedWidth?: string;
}

export default function ExpandingSocialButton({
  icon,
  label,
  onClick,
  ariaLabel,
  bgColor,
  hoverBgColor,
  expandedWidth = 'w-44'
}: ExpandingSocialButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative flex h-12 w-12 items-center justify-start gap-2 overflow-hidden rounded ${bgColor} p-2 pr-6 font-bold text-white duration-700 hover:${expandedWidth} hover:${hoverBgColor}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={ariaLabel}
    >
      {/* Rotating square decoration */}
      <span className={`absolute left-8 h-6 w-6 rotate-45 ${bgColor} duration-700 group-hover:left-40 group-hover:${hoverBgColor} z-0`} />

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
