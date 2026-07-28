'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import DownloadButton from './DownloadButton';
import SnowLoader from './SnowLoader';
import { prefersNativePdfViewer } from '@/lib/utils/pdf';

interface PDFPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
    title: string;
}

export default function PDFPreviewModal({ isOpen, onClose, pdfUrl, title }: PDFPreviewModalProps) {
    const [isMobile, setIsMobile] = useState(() => prefersNativePdfViewer());
    const [isLoading, setIsLoading] = useState(true);
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

    // Reset loading state when modal opens/closes (state-in-render pattern)
    if (prevIsOpen !== isOpen) {
        setPrevIsOpen(isOpen);
        setIsLoading(true);
    }

    // Detect mobile devices. Seeded synchronously so the desktop iframe never
    // renders for a frame on a phone (this component is client-only).
    useEffect(() => {
        const checkMobile = () => setIsMobile(prefersNativePdfViewer());
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // NOTE: this modal deliberately does NOT call window.open any more.
    // It used to do so from an effect, which runs after the lazily-imported chunk
    // has loaded — hundreds of ms after the tap and outside its user gesture, so
    // iOS Safari suppressed the tab and the modal closed itself, leaving nothing
    // on screen. The handoff now happens in the click handler (lib/utils/pdf.ts).
    // Reaching this component on a phone means that handoff did not happen, so we
    // show a real link the user can tap instead of failing silently.



    useEffect(() => {
        if (typeof document !== 'undefined') {
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
        }

        return () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = 'unset';
            }
        };
    }, [isOpen]);

    useEffect(() => {
        if (typeof document === 'undefined') return;

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
                <div className="flex items-center justify-between gap-3 p-4 border-b border-zinc-200 dark:border-zinc-700">
                    {/* min-w-0 + truncate: on a phone the title used to wrap and run under
                        the Download button, which only became visible once this modal
                        started rendering on mobile. */}
                    <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50 min-w-0 truncate">{title}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
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
                {isMobile ? (
                    /* Phones: never an iframe. iOS Safari will not render a PDF inline,
                       so offer a real anchor — tapping it is a fresh user gesture, which
                       is always permitted. */
                    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center h-[calc(100%-60px)]">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            PDFs open in your browser&apos;s own viewer.
                        </p>
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors min-h-[44px]"
                        >
                            Open PDF
                        </a>
                    </div>
                ) : (
                <div className="relative w-full h-[calc(100%-60px)]">
                    {/* Snow Loader inside PDF viewer */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 z-10">
                            <div className="flex flex-col items-center gap-4">
                                <SnowLoader isOpen={true} fullscreen={false} />
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-4">Loading PDF...</p>
                            </div>
                        </div>
                    )}
                    <iframe
                        src={pdfUrl}
                        className="w-full h-full border-0"
                        title={title}
                        onLoad={() => setIsLoading(false)}
                    />
                </div>
                )}
            </div>
        </div>,
        document.body
    );
}
