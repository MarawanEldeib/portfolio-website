/**
 * Carousel utility functions
 * Provides helper functions for carousel data manipulation
 * Follows DRY and Single Responsibility principles
 */

import { CAROUSEL_CONFIG } from '@/lib/constants';

/**
 * Duplicates array items for infinite carousel loop effect
 * Uses configurable multiplier for flexibility
 *
 * @template T - Type of array items
 * @param items - Array of items to duplicate
 * @param multiplier - Number of times to repeat (defaults to CAROUSEL_CONFIG.LOOP_MULTIPLIER)
 * @returns Duplicated array with unique keys
 *
 * @example
 * ```ts
 * const items = [{ id: '1', name: 'Item 1' }];
 * const looped = createLoopedArray(items);
 * // Returns items repeated 3 times with unique references
 * ```
 */
export function createLoopedArray<T>(
  items: T[],
  multiplier: number = CAROUSEL_CONFIG.LOOP_MULTIPLIER
): T[] {
  return Array.from({ length: multiplier }, () => items).flat();
}

/**
 * Generates unique key for carousel items
 * Combines item ID with index for uniqueness in loops
 *
 * @param id - Item identifier
 * @param index - Array index
 * @returns Unique key string
 */
export function generateCarouselKey(id: string, index: number): string {
  return `${id}-${index}`;
}

/**
 * Swiper configuration presets
 * Centralized configuration following DRY principle
 */
export const SWIPER_PRESETS = {
  certifications: {
    effect: 'cards' as const,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: CAROUSEL_CONFIG.CERTIFICATIONS_AUTOPLAY_DELAY,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      enabled: true,
    },
    cardsEffect: {
      perSlideOffset: CAROUSEL_CONFIG.CARDS_PER_SLIDE_OFFSET,
      perSlideRotate: CAROUSEL_CONFIG.CARDS_PER_SLIDE_ROTATE,
      rotate: true,
      slideShadows: true,
    },
  },
  awards: {
    effect: 'cards' as const,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: CAROUSEL_CONFIG.AWARDS_AUTOPLAY_DELAY,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      enabled: true,
    },
    cardsEffect: {
      perSlideOffset: CAROUSEL_CONFIG.CARDS_PER_SLIDE_OFFSET,
      perSlideRotate: CAROUSEL_CONFIG.CARDS_PER_SLIDE_ROTATE,
      rotate: true,
      slideShadows: true,
    },
  },
} as const;
