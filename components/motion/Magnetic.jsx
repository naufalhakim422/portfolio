'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { calculateMagneticOffset } from '@/lib/animations/magnetic';
import { useDevice } from '@/lib/hooks/useDevice';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * Subtle Magnetic Interaction Component.
 * Attracts the element toward the cursor on hover using high-performance GSAP quickTo setters.
 * Automatically disabled on touch screens and when reduced motion is preferred.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.strength=0.3] - Attraction strength factor (0.1 - 0.5)
 * @param {number} [props.maxDisplacement=30] - Max pixel displacement
 * @param {string} [props.className=''] - Tailwind CSS classes
 */
export default function Magnetic({
  children,
  strength = 0.3,
  maxDisplacement = 30,
  className = '',
  ...props
}) {
  const elementRef = useRef(null);
  const { isTouch, hasFinePointer } = useDevice();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined' || isTouch || !hasFinePointer || reducedMotion) {
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Direct GSAP quickTo setters for 60fps spring feel without React re-renders
    const xTo = gsap.quickTo(element, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(element, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      const { x, y } = calculateMagneticOffset(e, element, strength, maxDisplacement);
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set(element, { x: 0, y: 0 });
    };
  }, [strength, maxDisplacement, isTouch, hasFinePointer, reducedMotion]);

  return (
    <div
      ref={elementRef}
      className={cn('inline-block will-change-transform', className)}
      {...props}
    >
      {children}
    </div>
  );
}
