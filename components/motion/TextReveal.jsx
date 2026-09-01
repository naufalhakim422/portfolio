'use client';

import React, { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations/gsap';
import { splitTextContent } from '@/lib/animations/text';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * Editorial Text Reveal Component.
 * Animates text entrances by word, character, or line with overflow masking.
 *
 * @param {object} props
 * @param {string} [props.text] - Raw text to animate (or use children as string)
 * @param {React.ReactNode} [props.children] - Children text
 * @param {'word'|'character'|'line'} [props.type='word'] - Split mode
 * @param {number} [props.duration=0.8] - Animation duration in seconds
 * @param {number} [props.stagger=0.03] - Stagger delay between tokens
 * @param {number} [props.delay=0] - Delay before starting
 * @param {string} [props.ease='power3.out'] - GSAP easing
 * @param {string} [props.start='top 85%'] - ScrollTrigger start
 * @param {string} [props.className=''] - Tailwind CSS classes
 * @param {string} [props.as='div'] - HTML wrapper element tag
 */
export default function TextReveal({
  text,
  children,
  type = 'word',
  duration = 0.8,
  stagger = 0.03,
  delay = 0,
  ease = 'power3.out',
  start = 'top 85%',
  className = '',
  as: Component = 'div',
  ...props
}) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const rawText = typeof text === 'string' ? text : typeof children === 'string' ? children : '';
  const tokens = useMemo(() => splitTextContent(rawText, type), [rawText, type]);

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current || tokens.length === 0) return;

      const elements = containerRef.current.querySelectorAll('.text-reveal-token');

      gsap.fromTo(
        elements,
        {
          y: '110%',
          opacity: 0,
          rotateZ: type === 'character' ? 2 : 0,
        },
        {
          y: '0%',
          opacity: 1,
          rotateZ: 0,
          duration,
          stagger,
          delay,
          ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion, tokens, duration, stagger, delay] }
  );

  // If reduced motion is active or text is complex React nodes, render directly
  if (reducedMotion || !rawText) {
    return (
      <Component ref={containerRef} className={cn('text-reveal', className)} {...props}>
        {children || text}
      </Component>
    );
  }

  return (
    <Component
      ref={containerRef}
      className={cn('text-reveal inline-flex flex-wrap items-baseline', className)}
      {...props}
    >
      {type === 'character' ? (
        tokens.map((token, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.05em] align-bottom">
            <span className="text-reveal-token inline-block will-change-transform">
              {token.text}
            </span>
          </span>
        ))
      ) : (
        tokens.map((token, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.05em] align-bottom">
            <span className="text-reveal-token inline-block will-change-transform">
              {token.text}
            </span>
          </span>
        ))
      )}
    </Component>
  );
}
