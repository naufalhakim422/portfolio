'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations/gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useDevice } from '@/lib/hooks/useDevice';
import { cn } from '@/lib/utils';

/**
 * Reusable Parallax Scroll Component.
 * Shifts child content at a relative speed during scroll using GSAP ScrollTrigger scrub.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.speed=0.2] - Speed factor (-1.0 to 1.0, where positive moves with scroll, negative moves against)
 * @param {'vertical'|'horizontal'} [props.direction='vertical'] - Axis of parallax
 * @param {number|boolean} [props.scrub=0.5] - Scrub smoothing delay in seconds
 * @param {string} [props.start='top bottom'] - ScrollTrigger start
 * @param {string} [props.end='bottom top'] - ScrollTrigger end
 * @param {string} [props.className=''] - Tailwind CSS classes
 */
export default function Parallax({
  children,
  speed = 0.2,
  direction = 'vertical',
  scrub = 0.5,
  start = 'top bottom',
  end = 'bottom top',
  className = '',
  ...props
}) {
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { isMobile } = useDevice();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current || !targetRef.current) return;

      // Dampen speed by 50% on mobile for performance and battery conservation
      const effectiveSpeed = isMobile ? speed * 0.5 : speed;
      const movement = effectiveSpeed * 100;
      const isVertical = direction === 'vertical';
      const prop = isVertical ? 'yPercent' : 'xPercent';

      gsap.fromTo(
        targetRef.current,
        {
          [prop]: -movement,
        },
        {
          [prop]: movement,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    {
      scope: containerRef,
      dependencies: [reducedMotion, isMobile, speed, direction, scrub, start, end],
    }
  );

  return (
    <div
      ref={containerRef}
      className={cn('parallax-wrapper overflow-hidden', className)}
      {...props}
    >
      <div ref={targetRef} className="parallax-target will-change-transform h-full w-full">
        {children}
      </div>
    </div>
  );
}
