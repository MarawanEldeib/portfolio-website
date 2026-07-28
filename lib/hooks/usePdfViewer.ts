/**
 * usePdfViewer Hook
 *
 * Drop-in replacement for `useModal<PDFModalState>()` at PDF call sites.
 *
 * The only difference is that `open()` first tries to hand the PDF to the device's
 * own viewer. Because `open()` is invoked directly from the click handler, that
 * attempt happens inside the user gesture, which is the condition iOS Safari
 * enforces. If the handoff does not happen (desktop, or a blocked popup) it falls
 * through to the existing in-page modal, so no path ends in silence.
 */

import { useCallback } from 'react';
import { useModal, type PDFModalState, type ModalHookReturn } from './useModal';
import { openPdfNatively } from '@/lib/utils/pdf';

export function usePdfViewer(): ModalHookReturn<PDFModalState> {
    const modal = useModal<PDFModalState>();
    const { open: openModal } = modal;

    const open = useCallback(
        (data: Omit<PDFModalState, 'isOpen'>) => {
            if (openPdfNatively(data.url)) return;
            openModal(data);
        },
        [openModal]
    );

    return { ...modal, open };
}
