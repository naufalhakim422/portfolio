'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations/gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * Reusable Viewport Reveal Component.
 * Supports directional offsets, scale, opacity, duration, delay, stagger, and reduced-motion fallbacks.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {'up'|'down'|'left'|'right'|'none'} [props.direction='up'] - Direction of entry
 * @param {number} [props.distance=40] - Translation distance in px
 * @param {number} [props.duration=0.9] - Duration in seconds
 * @param {number} [props.delay=0] - Delay in seconds
 * @param {number} [props.scale=1] - Starting scale factor
 * @param {number} [props.stagger=0] - Stagger delay for direct child elements
 * @param {string} [props.ease='power3.out'] - GSAP easing
 * @param {string} [props.start='top 85%'] - ScrollTrigger start position
 * @param {boolean} [props.once=true] - Whether reveal plays once or reverses on scroll back
 * @param {string} [props.className=''] - Tailwind CSS classes
 */
export default function Reveal({
  children,
  direction = 'up',
  distance = 40,
  duration = 0.9,
  delay = 0,
  scale = 1,
  stagger = 0,
  ease = 'power3.out',
  start = 'top 85%',
  once = true,
  className = '',
  ...props
}) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current) return;

      let x = 0;
      let y = 0;

      if (direction === 'up') y = distance;
      if (direction === 'down') y = -distance;
      if (direction === 'left') x = distance;
      if (direction === 'right') x = -distance;

      const targets = stagger > 0 ? containerRef.current.children : containerRef.current;

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          x,
          y,
          scale,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          stagger: stagger > 0 ? stagger : 0,
          ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
            once,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion, direction, distance, duration, delay, scale, stagger] }
  );

  return (
    <div
      ref={containerRef}
      className={cn('reveal-container', className)}
      {...props}
    >
      {children}
    </div>
  );
}
