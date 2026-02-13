'use client';

import { X } from 'lucide-react';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import DownloadButton from './DownloadButton';
import SnowLoader from './SnowLoader';

const subscribe = () => () => { };
const getSnapshot = () => true;
const getServerSnapshot = () => false;

interface PDFPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
    title: string;
}

export default function PDFPreviewModal({ isOpen, onClose, pdfUrl, title }: PDFPreviewModalProps) {
    const [isMobile, setIsMobile] = useState(false);
    const isClient = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const [isLoading, setIsLoading] = useState(true);
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

    // Reset loading state when modal opens/closes (state-in-render pattern)
    if (prevIsOpen !== isOpen) {
        setPrevIsOpen(isOpen);
        setIsLoading(true);
    }

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
                setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
            }
        };

        checkMobile();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', checkMobile);
            return () => window.removeEventListener('resize', checkMobile);
        }
    }, []);

    // Auto-open in new tab for mobile devices
    useEffect(() => {
        if (isClient && isOpen && isMobile && typeof window !== 'undefined') {
            window.open(pdfUrl, '_blank', 'noopener,noreferrer');
            onClose();
        }
    }, [isClient, isOpen, isMobile, pdfUrl, onClose]);



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
            </div>
        </div>,
        document.body
    );
}
