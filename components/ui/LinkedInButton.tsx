'use client';

import { motion } from 'framer-motion';

interface LinkedInButtonProps {
  name: string;
  linkedInUrl: string;
}

export default function LinkedInButton({ name, linkedInUrl }: LinkedInButtonProps) {
  const handleClick = () => {
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      onClick={handleClick}
      className="group relative flex h-12 w-12 items-center justify-start gap-2 overflow-hidden rounded bg-sky-700 p-2 pr-6 font-bold text-neutral-50 duration-700 hover:w-44 hover:bg-sky-600"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Connect with ${name} on LinkedIn`}
    >
      {/* Rotating square decoration */}
      <span className="absolute left-8 h-6 w-6 rotate-45 bg-sky-700 duration-700 group-hover:left-40 group-hover:bg-sky-600 z-0" />

      {/* LinkedIn SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="h-8 w-8 shrink-0 fill-white relative z-10"
        aria-hidden="true"
      >
        <path d="M92.86,0H7.12A7.17,7.17,0,0,0,0,7.21V92.79A7.17,7.17,0,0,0,7.12,100H92.86A7.19,7.19,0,0,0,100,92.79V7.21A7.19,7.19,0,0,0,92.86,0ZM30.22,85.71H15.4V38H30.25V85.71ZM22.81,31.47a8.59,8.59,0,1,1,8.6-8.59A8.6,8.6,0,0,1,22.81,31.47Zm63,54.24H71V62.5c0-5.54-.11-12.66-7.7-12.66s-8.91,6-8.91,12.26V85.71H39.53V38H53.75v6.52H54c2-3.75,6.83-7.7,14-7.7,15,0,17.79,9.89,17.79,22.74Z" />
      </svg>

      {/* Expanding name text */}
      <span className="relative z-10 inline-flex origin-left transform border-l-2 border-white pl-2 text-white font-bold text-sm whitespace-nowrap scale-x-0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100 group-hover:delay-200">
        {name}
      </span>
    </motion.button>
  );
}
