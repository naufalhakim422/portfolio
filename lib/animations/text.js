'use client';

import { gsap } from './gsap';

/**
 * Splits text string into an array of word or character tokens wrapped in span elements.
 * Designed for lightweight, dependency-free editorial typography animation without layout shift.
 *
 * @param {string} text - Raw string
 * @param {'word'|'character'|'line'} type - Splitting mode
 * @returns {Array<{text: string, isSpace: boolean}>}
 */
export function splitTextContent(text, type = 'word') {
  if (typeof text !== 'string') return [];

  if (type === 'character') {
    return text.split('').map((char) => ({
      text: char === ' ' ? '\u00A0' : char,
      isSpace: char === ' ',
    }));
  }

  // Word mode by default
  const words = text.split(' ');
  return words.map((word, index) => ({
    text: word,
    isLast: index === words.length - 1,
  }));
}

/**
 * Creates an editorial staggered text reveal animation using GSAP.
 *
 * @param {HTMLElement[]|NodeListOf<HTMLElement>|string} elements - Target spans/elements
 * @param {object} options - Animation configuration
 * @returns {gsap.core.Timeline}
 */
export function animateTextReveal(elements, options = {}) {
  const {
    duration = 0.9,
    stagger = 0.03,
    ease = 'power3.out',
    delay = 0,
    y = '100%',
    opacity = 0,
    rotate = 0,
  } = options;

  const tl = gsap.timeline({ delay });

  tl.fromTo(
    elements,
    {
      y,
      opacity,
      rotate,
    },
    {
      y: '0%',
      opacity: 1,
      rotate: 0,
      duration,
      stagger,
      ease,
      clearProps: 'transform,opacity,rotate', // Clean up after animation to allow CSS hover/responsive layouts
    }
  );

  return tl;
}
