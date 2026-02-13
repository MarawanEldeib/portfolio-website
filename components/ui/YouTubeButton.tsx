'use client';

import { motion } from 'framer-motion';

interface YouTubeButtonProps {
  name: string;
  youtubeUrl: string;
}

export default function YouTubeButton({ name, youtubeUrl }: YouTubeButtonProps) {
  const handleClick = () => {
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      onClick={handleClick}
      className="group relative flex h-12 w-12 items-center justify-start gap-2 overflow-hidden rounded bg-red-600 p-2 pr-6 font-bold text-white duration-700 hover:w-44 hover:bg-red-700"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Visit ${name}'s YouTube channel`}
    >
      {/* Rotating square decoration */}
      <span className="absolute left-8 h-6 w-6 rotate-45 bg-red-600 duration-700 group-hover:left-40 group-hover:bg-red-700 z-0" />

      {/* YouTube SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8 shrink-0 text-white relative z-10"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>

      {/* Expanding name text */}
      <span className="relative z-10 inline-flex origin-left transform border-l-2 border-white pl-2 text-white font-bold text-sm whitespace-nowrap scale-x-0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100 group-hover:delay-200">
        {name}
      </span>
    </motion.button>
  );
}
