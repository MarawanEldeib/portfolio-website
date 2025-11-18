/**
 * Passive Event Listeners Polyfill
 * Fixes Chrome warning: "Added non-passive event listener to a scroll-blocking event"
 *
 * This polyfill patches addEventListener to make touch/wheel events passive by default
 * Improves scroll performance and eliminates console warnings from third-party libraries
 *
 * @see https://www.chromestatus.com/feature/5745543795965952
 */

export function initPassiveEventsPolyfill() {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Check if passive events are supported
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
        return true;
      },
    });
    window.addEventListener('test' as any, null as any, opts);
    window.removeEventListener('test' as any, null as any, opts);
  } catch (e) {
    // Passive not supported
  }

  if (!supportsPassive) return;

  // Events that should be passive by default for better scroll performance
  const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];

  // Store original addEventListener
  const originalAddEventListener = EventTarget.prototype.addEventListener;

  // Override addEventListener to add passive by default for scroll-blocking events
  EventTarget.prototype.addEventListener = function (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) {
    // If options is already an object with passive defined, use it as-is
    if (typeof options === 'object' && options !== null && 'passive' in options) {
      return originalAddEventListener.call(this, type, listener, options);
    }

    // For scroll-blocking events, make them passive by default
    if (passiveEvents.includes(type)) {
      const passiveOptions: AddEventListenerOptions =
        typeof options === 'object' && options !== null
          ? { ...options, passive: true }
          : { passive: true, capture: typeof options === 'boolean' ? options : false };

      return originalAddEventListener.call(this, type, listener, passiveOptions);
    }

    // For other events, use original behavior
    return originalAddEventListener.call(this, type, listener, options);
  };
}
