/**
 * Jumping Cube Loader Component
 * Displays a jumping cube animation for video loading
 *
 * @component
 */

'use client';

interface JumpingCubeLoaderProps {
  /** Controls loader visibility */
  isOpen: boolean;
  /** Whether to show in fullscreen mode (default: true) */
  fullscreen?: boolean;
}

export default function JumpingCubeLoader({ isOpen, fullscreen = true }: JumpingCubeLoaderProps) {
  if (!fullscreen) {
    return isOpen ? <div className="video-loader" /> : null;
  }

  return isOpen ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="video-loader" />
    </div>
  ) : null;
}
