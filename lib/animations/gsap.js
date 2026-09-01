'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Standardized easing presets for consistent editorial motion feel.
 */
export const EASINGS = {
  editorial: 'power3.out',
  editorialSlow: 'power4.out',
  smooth: 'power2.out',
  cinematic: 'expo.out',
  bounceSubtle: 'back.out(1.2)',
  expressive: 'power3.inOut',
};

// Safe client-side registration
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Set performant global defaults
  gsap.defaults({
    duration: 0.8,
    ease: EASINGS.editorial,
  });

  // Ensure scroll restoration is manual for smooth Lenis coordination
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
}

export { gsap, ScrollTrigger };
export default gsap;
