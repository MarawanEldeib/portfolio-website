'use client';

import { X, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CVPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl: string;
}

export default function CVPreviewModal({ isOpen, onClose, cvUrl }: CVPreviewModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  if (!isOpen) return null;

  // Mobile view: Show download prompt instead of preview
  if (isMobile) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-lg shadow-2xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download size={32} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
              Download CV
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Preview is best viewed on desktop. Would you like to download the PDF instead?
            </p>
          </div>
          
          <div className="space-y-3">
            <a
              href={cvUrl}
              download="Marawan_Eldeib_Resume.pdf"
              className="block w-full px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-center font-medium"
              onClick={() => {
                onClose();
              }}
            >
              Download PDF
            </a>
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-3 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-center font-medium"
            >
              Open in New Tab
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Desktop view: Show preview iframe
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
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">CV Preview</h3>
          <div className="flex items-center gap-2">
            <a
              href={cvUrl}
              download="Marawan_Eldeib_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              <Download size={16} />
              Download
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
          </div>
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
