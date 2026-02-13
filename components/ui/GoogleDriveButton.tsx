import React from 'react';
import './SocialFillButton.css';
import GoogleDriveIcon from './GoogleDriveIcon';

interface GoogleDriveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

export default function GoogleDriveButton({ href, ...props }: GoogleDriveButtonProps) {
  const ButtonContent = (
    <>
      <GoogleDriveIcon size={16} />
      <span>Google Drive</span>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="google-drive-btn-link" style={{ textDecoration: 'none' }}>
        <button className="social-fill-btn google-drive" {...props}>
          {ButtonContent}
        </button>
      </a>
    );
  }

  return (
    <button className="social-fill-btn google-drive" {...props}>
      {ButtonContent}
    </button>
  );
}
