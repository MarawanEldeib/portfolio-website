'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface CVPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl: string;
}

export default function CVPreviewModal({ isOpen, onClose, cvUrl }: CVPreviewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-zinc-900 rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h3 className="text-lg font-semibold">CV Preview</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close preview"
          >
            <X size={20} />
          </button>
        </div>
        <div className="w-full h-[calc(100%-60px)]">
          <iframe
            src={cvUrl}
            className="w-full h-full border-0"
            title="CV Preview"
          />
        </div>
      </div>
    </div>
  );
}
