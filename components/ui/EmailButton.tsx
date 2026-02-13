'use client';

import { motion } from 'framer-motion';

interface EmailButtonProps {
  email: string;
}

export default function EmailButton({ email }: EmailButtonProps) {
  const handleClick = () => {
    // Create and click a mailto link to ensure it works across all browsers
    const mailtoLink = document.createElement('a');
    mailtoLink.href = `mailto:${email}`;
    mailtoLink.click();
  };

  // Get a shortened version of email for display (if it's too long)
  const displayEmail = email.length > 20 ? email.substring(0, 18) + '...' : email;

  return (
    <motion.button
      onClick={handleClick}
      className="group relative flex h-12 w-12 items-center justify-start gap-2 overflow-hidden rounded bg-blue-600 p-2 pr-6 font-bold text-white duration-700 hover:w-64 hover:bg-blue-700"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Send email to ${email}`}
    >
      {/* Rotating square decoration */}
      <span className="absolute left-8 h-6 w-6 rotate-45 bg-blue-600 duration-700 group-hover:left-40 group-hover:bg-blue-700 z-0" />

      {/* Email SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 shrink-0 text-white relative z-10"
        aria-hidden="true"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>

      {/* Expanding email text */}
      <span className="relative z-10 inline-flex origin-left transform border-l-2 border-white pl-2 text-white font-bold text-xs whitespace-nowrap scale-x-0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100 group-hover:delay-200">
        {email}
      </span>
    </motion.button>
  );
}
