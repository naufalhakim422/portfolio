'use client';

import { gsap } from './gsap';

/**
 * Standard page transition animations.
 * Provides timeline helpers for route enter, route exit, and overlay wipes.
 */

export const TRANSITION_CONFIG = {
  duration: 0.6,
  ease: 'power3.inOut',
};

/**
 * Animates page exit overlay in preparation for route navigation.
 * @param {HTMLElement} overlayEl - The transition overlay element
 * @returns {Promise<void>}
 */
export function animatePageExit(overlayEl) {
  return new Promise((resolve) => {
    if (!overlayEl) {
      resolve();
      return;
    }

    gsap.fromTo(
      overlayEl,
      { scaleY: 0, transformOrigin: 'bottom' },
      {
        scaleY: 1,
        duration: TRANSITION_CONFIG.duration,
        ease: TRANSITION_CONFIG.ease,
        onComplete: resolve,
      }
    );
  });
}

/**
 * Animates page enter overlay when arriving at a new route.
 * @param {HTMLElement} overlayEl - The transition overlay element
 * @returns {Promise<void>}
 */
export function animatePageEnter(overlayEl) {
  return new Promise((resolve) => {
    if (!overlayEl) {
      resolve();
      return;
    }

    gsap.fromTo(
      overlayEl,
      { scaleY: 1, transformOrigin: 'top' },
      {
        scaleY: 0,
        duration: TRANSITION_CONFIG.duration,
        ease: TRANSITION_CONFIG.ease,
        delay: 0.1,
        onComplete: resolve,
      }
    );
  });
}
