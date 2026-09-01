'use client';

import React, { useRef, useState } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * Ultra-Clean 3D Physics TiltCard.
 * Clean, tactile 3D perspective tilting and elevation physics with zero artificial spotlight overlays.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    // Crisp 3D Tilt & Elevation
    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      y: -6,
      scale: 1.015,
      transformPerspective: 900,
      duration: 0.22,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (reducedMotion || !cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      scale: 1,
      duration: 0.65,
      ease: 'elastic.out(1.1, 0.45)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl border transition-all duration-300 will-change-transform overflow-hidden',
        isHovered
          ? 'border-sky-500/50 shadow-lg dark:shadow-[0_8px_30px_rgba(56,189,248,0.12)]'
          : 'border-border/80 shadow-xs hover:border-sky-500/40',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
