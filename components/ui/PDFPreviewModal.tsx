'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import DownloadButton from './DownloadButton';

interface PDFPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
    title: string;
}

export default function PDFPreviewModal({ isOpen, onClose, pdfUrl, title }: PDFPreviewModalProps) {
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

    // Auto-open in new tab for mobile devices
    useEffect(() => {
        if (isOpen && isMobile) {
            window.open(pdfUrl, '_blank', 'noopener,noreferrer');
            onClose();
        }
    }, [isOpen, isMobile, pdfUrl, onClose]);

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

    // Desktop view: Show preview iframe
    // Use Portal to ensure modal is always relative to viewport, not parent containers
    if (typeof document === 'undefined') return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-zinc-900 rounded-lg shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
                    <div className="flex items-center gap-2">
                        <DownloadButton
                            href={pdfUrl}
                            variant="solid"
                            className="text-sm"
                        >
                            Download
                        </DownloadButton>
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
                        src={pdfUrl}
                        className="w-full h-full border-0"
                        title={title}
                    />
                </div>
            </div>
        </div>,
        document.body
    );
}
