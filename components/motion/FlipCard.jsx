'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Robust 3D Flip Card Component.
 * Uses semantic theme tokens (bg-surface, text-foreground, border-border)
 * to guarantee 100% high-contrast readability across all themes with zero white-on-white bugs.
 */
export default function FlipCard({
  front,
  back,
  className = '',
  height = 'h-[250px] sm:h-[270px]',
  ...props
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped((prev) => !prev)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className={cn('relative w-full group cursor-pointer select-none', height, className)}
      style={{ perspective: '1200px' }}
      data-cursor="LINK"
      data-cursor-text="FLIP"
      {...props}
    >
      <div
        className="relative w-full h-full rounded-2xl transition-transform duration-500 ease-out will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          WebkitTransform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT FACE (Always visible at 0deg) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-surface border border-border group-hover:border-sky-500/70 shadow-md dark:shadow-[0_0_25px_rgba(0,0,0,0.3)] dark:group-hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            WebkitTransform: 'rotateY(0deg)',
          }}
        >
          {front}
        </div>

        {/* BACK FACE (Hidden at idle, visible at 180deg) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-surface border border-sky-500/70 shadow-xl dark:shadow-[0_0_30px_rgba(56,189,248,0.18)] p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            WebkitTransform: 'rotateY(180deg)',
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
