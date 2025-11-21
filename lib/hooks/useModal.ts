/**
 * useModal Hook
 * Reusable modal state management hook following DRY principle
 * Provides consistent API for all modal components
 *
 * @template T - Type of modal data (extends base ModalState)
 * @returns {ModalHookReturn<T>} Modal state and control functions
 *
 * @example
 * ```tsx
 * const pdfModal = useModal<PDFModalState>();
 * pdfModal.open({ url: '/doc.pdf', title: 'Document' });
 * ```
 */

import { useState, useCallback } from 'react';

/**
 * Base modal state interface
 * All modal states should extend this
 */
export interface BaseModalState {
  isOpen: boolean;
  url: string;
  title: string;
}

/**
 * Return type for useModal hook
 */
export interface ModalHookReturn<T extends BaseModalState> {
  state: T;
  open: (data: Omit<T, 'isOpen'>) => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Generic modal state management hook
 * Implements Single Responsibility Principle
 */
export function useModal<T extends BaseModalState>(
  initialState?: Partial<T>
): ModalHookReturn<T> {
  const defaultState: BaseModalState = {
    isOpen: false,
    url: '',
    title: '',
    ...initialState,
  };

  const [state, setState] = useState<T>(defaultState as T);

  /**
   * Open modal with provided data
   * Uses useCallback for performance optimization
   */
  const open = useCallback((data: Omit<T, 'isOpen'>) => {
    setState({
      ...data,
      isOpen: true,
    } as T);
  }, []);

  /**
   * Close modal and reset to default state
   */
  const close = useCallback(() => {
    setState(defaultState as T);
  }, [defaultState]);

  /**
   * Toggle modal open/closed state
   */
  const toggle = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  }, []);

  return {
    state,
    open,
    close,
    toggle,
  };
}

/**
 * Specific modal state types for type safety
 */
export interface PDFModalState extends BaseModalState {}

export interface VideoModalState extends BaseModalState {}
