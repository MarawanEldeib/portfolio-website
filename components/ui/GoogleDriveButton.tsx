import React from 'react';
import './GoogleDriveButton.css';
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
        <button className="google-drive-btn" {...props}>
          {ButtonContent}
        </button>
      </a>
    );
  }

  return (
    <button className="google-drive-btn" {...props}>
      {ButtonContent}
    </button>
  );
}
