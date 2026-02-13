'use client';

import ExpandingSocialButton from './ExpandingSocialButton';

interface EmailButtonProps {
  email: string;
}

export default function EmailButton({ email }: EmailButtonProps) {
  const handleClick = () => {
    const mailtoLink = document.createElement('a');
    mailtoLink.href = `mailto:${email}`;
    mailtoLink.click();
  };

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 shrink-0 text-white"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );

  return (
    <ExpandingSocialButton
      icon={icon}
      label={`mailto:${email}`}
      onClick={handleClick}
      ariaLabel={`Send email to ${email}`}
      variant="email"
    />
  );
}
