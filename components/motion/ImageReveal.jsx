'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations/gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * Editorial Image Reveal Component.
 * Animates image unmasking via clip-paths and subtle counter-scaling.
 *
 * @param {object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {'clip-up'|'clip-right'|'curtain'|'scale'} [props.effect='clip-up'] - Reveal style
 * @param {number} [props.duration=1.2] - Animation duration in seconds
 * @param {number} [props.delay=0] - Delay in seconds
 * @param {string} [props.ease='power3.inOut'] - GSAP easing
 * @param {string} [props.start='top 85%'] - ScrollTrigger trigger position
 * @param {string} [props.aspectRatio='aspect-[16/10]'] - Aspect ratio class
 * @param {string} [props.className=''] - Container Tailwind CSS classes
 * @param {string} [props.imageClassName=''] - Image element Tailwind CSS classes
 */
export default function ImageReveal({
  src,
  alt = '',
  effect = 'clip-up',
  duration = 1.2,
  delay = 0,
  ease = 'power3.inOut',
  start = 'top 85%',
  aspectRatio = 'aspect-[16/10]',
  className = '',
  imageClassName = '',
  ...props
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current || !imageRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: 'play none none none',
          once: true,
        },
        delay,
      });

      // Define clip-path animations based on effect
      let clipFrom = 'inset(100% 0% 0% 0%)';
      let clipTo = 'inset(0% 0% 0% 0%)';

      if (effect === 'clip-right') {
        clipFrom = 'inset(0% 100% 0% 0%)';
        clipTo = 'inset(0% 0% 0% 0%)';
      } else if (effect === 'curtain') {
        clipFrom = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
        clipTo = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      }

      if (effect !== 'scale') {
        tl.fromTo(
          containerRef.current,
          { clipPath: clipFrom },
          { clipPath: clipTo, duration, ease }
        );
      }

      // Counter-scale image for editorial parallax reveal feel
      tl.fromTo(
        imageRef.current,
        { scale: 1.25 },
        { scale: 1, duration: duration * 1.1, ease: 'power2.out' },
        0
      );
    },
    { scope: containerRef, dependencies: [reducedMotion, effect, duration, delay, ease] }
  );

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden bg-surface', aspectRatio, className)}
      style={!reducedMotion && effect !== 'scale' ? { clipPath: 'inset(100% 0% 0% 0%)' } : undefined}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full object-cover will-change-transform',
          imageClassName
        )}
      />
    </div>
  );
}
