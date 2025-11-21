/**
 * Video Preview Modal Component
 * Displays YouTube videos in an embedded player with fallback options
 * Keeps original design with improved functionality
 *
 * @component
 */

'use client';

import { X, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface VideoPreviewModalProps {
    /** Controls modal visibility */
    isOpen: boolean;
    /** Callback when modal closes */
    onClose: () => void;
    /** YouTube video URL */
    videoUrl: string;
    /** Video title for display */
    title: string;
}

export default function VideoPreviewModal({ isOpen, onClose, videoUrl, title }: VideoPreviewModalProps) {
    // Handle keyboard events and body scroll lock
    useEffect(() => {
        if (!isOpen) return;

        // Lock body scroll when modal is open
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Extract YouTube ID from various YouTube URL formats
    const getYoutubeId = (url: string) => {
        // Handle youtu.be short URLs
        const shortUrlMatch = url.match(/youtu\.be\/([^?&]+)/);
        if (shortUrlMatch) return shortUrlMatch[1];

        // Handle youtube.com URLs with v= parameter
        const longUrlMatch = url.match(/youtube\.com\/.*[?&]v=([^&]+)/);
        if (longUrlMatch) return longUrlMatch[1];

        // Handle embed URLs
        const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
        if (embedMatch) return embedMatch[1];

        // Handle shorts URLs
        const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);
        if (shortsMatch) return shortsMatch[1];

        return null;
    };

    const videoId = getYoutubeId(videoUrl);
    // Use youtube-nocookie.com for better privacy
    // Parameters: rel=0 (no related videos), modestbranding=1 (minimal branding), enablejsapi=1 (enable JS API)
    const embedUrl = videoId
        ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`
        : '';

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900">
                    <h3 className="text-lg font-semibold text-zinc-100 truncate pr-8">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                        >
                            <ExternalLink size={16} />
                            Open in YouTube
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
                            aria-label="Close video preview"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Video Container - Using padding-top technique for 16:9 ratio */}
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            className="absolute top-0 left-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            title={title}
                            style={{ border: 'none' }}
                            loading="lazy"
                        />
                    ) : (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-zinc-500 bg-black">
                            <div className="text-center">
                                <p className="mb-4">Invalid Video URL</p>
                                <a
                                    href={videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                                >
                                    <ExternalLink size={16} />
                                    Open in YouTube
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
