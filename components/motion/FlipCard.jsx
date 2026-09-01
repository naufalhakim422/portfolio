'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Robust 3D Flip Card Component.
 * Fixed height ensures 3D absolute faces never collapse and bold titles always render prominently.
 * Crisp, tactile glass styling for Light and Dark modes.
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
          className="absolute inset-0 w-full h-full rounded-2xl bg-white/95 dark:bg-surface/90 backdrop-blur-md border border-slate-200/90 dark:border-border/80 group-hover:border-sky-500 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(2,132,199,0.12)] dark:hover:shadow-[0_0_25px_rgba(56,189,248,0.12)] p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all"
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
          className="absolute inset-0 w-full h-full rounded-2xl bg-white dark:bg-surface border border-sky-500/80 dark:border-sky-500/60 shadow-[0_12px_40px_rgba(2,132,199,0.15)] dark:shadow-[0_0_30px_rgba(56,189,248,0.18)] p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all"
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
