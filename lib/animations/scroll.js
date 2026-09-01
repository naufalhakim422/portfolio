'use client';

import { gsap, ScrollTrigger } from './gsap';

/**
 * Creates a standard viewport reveal ScrollTrigger animation.
 * @param {HTMLElement|string} target - The target DOM element or selector
 * @param {object} options - Animation configuration options
 * @returns {gsap.core.Tween|gsap.core.Timeline|null}
 */
export function createScrollReveal(target, options = {}) {
  if (typeof window === 'undefined' || !target) return null;

  const {
    start = 'top 85%',
    end = 'bottom 15%',
    toggleActions = 'play none none none',
    markers = false,
    duration = 0.9,
    ease = 'power3.out',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    delay = 0,
    stagger = 0,
    once = true,
  } = options;

  return gsap.fromTo(
    target,
    { ...from },
    {
      ...to,
      duration,
      ease,
      delay,
      stagger,
      scrollTrigger: {
        trigger: target,
        start,
        end,
        toggleActions: once ? 'play none none reverse' : toggleActions,
        markers,
        once,
      },
    }
  );
}

/**
 * Creates a scrubbed parallax ScrollTrigger on a target.
 * @param {HTMLElement|string} target - The target DOM element
 * @param {object} options - Parallax configuration
 * @returns {ScrollTrigger|null}
 */
export function createParallax(target, options = {}) {
  if (typeof window === 'undefined' || !target) return null;

  const {
    speed = 0.2, // Factor of movement (-1 to 1)
    direction = 'vertical', // 'vertical' or 'horizontal'
    start = 'top bottom',
    end = 'bottom top',
    scrub = 0.5,
    ease = 'none',
  } = options;

  const isVertical = direction === 'vertical';
  const movement = speed * 100; // in percent or px

  const prop = isVertical ? 'yPercent' : 'xPercent';

  return gsap.fromTo(
    target,
    { [prop]: -movement },
    {
      [prop]: movement,
      ease,
      scrollTrigger: {
        trigger: target,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,
      },
    }
  );
}

/**
 * Debounced refresh for ScrollTrigger instances when layout/dimensions change.
 */
let refreshTimeout;
export function refreshScrollTrigger(delay = 100) {
  if (typeof window === 'undefined') return;
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, delay);
}
