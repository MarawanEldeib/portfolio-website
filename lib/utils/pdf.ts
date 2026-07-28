/**
 * Opening a PDF on mobile.
 *
 * Mobile browsers only allow window.open() from inside the call stack of a real
 * user gesture. iOS Safari is the strict one: once the call has been deferred to
 * an effect, a promise or a lazily-imported component, it is no longer attributed
 * to the tap and the new tab is suppressed silently.
 *
 * That is why these helpers exist and why they must be called *synchronously from
 * the click handler* rather than from inside the modal. It is the same shape the
 * GitHub and YouTube buttons already use, which is why those have always worked.
 */

/** True when the device should use its own PDF viewer instead of an inline iframe. */
export function prefersNativePdfViewer(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
    return window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

/**
 * Hand the PDF to the browser's own viewer. Call this synchronously from a click
 * handler.
 *
 * @returns true if the PDF was handed off, false if the caller should fall back to
 *          the in-page modal (desktop, or a mobile popup that was blocked anyway).
 */
export function openPdfNatively(url: string): boolean {
    if (!prefersNativePdfViewer()) return false;
    const tab = window.open(url, '_blank', 'noopener,noreferrer');
    // A blocked popup returns null. Report it so the caller can still show something
    // rather than failing silently, which is what the old effect-based code did.
    return tab !== null;
}
