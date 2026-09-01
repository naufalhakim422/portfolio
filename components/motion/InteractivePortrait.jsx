'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Clean Steady Portrait with Hover-Activated Electric Lightning & Spider Web Energy.
 * - Idle: Clean, steady photo with transparent feathered background.
 * - Hover: Epic Spider Web energy matrix & electric blue lightning strikes surge behind/around the portrait.
 * Adaptive & crisp in both Light Mode and Dark Mode.
 */
export default function InteractivePortrait({
  src = '/profile.png',
  alt = 'Naufal Hakim Muzaki',
  className,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative select-none flex items-center justify-center cursor-pointer min-h-[440px] sm:min-h-[480px] w-full max-w-[420px] mx-auto group',
        className
      )}
      data-cursor="LINK"
      data-cursor-text="ZAP ⚡"
    >
      {/* 1. Dynamic Electric Cyan Plasma Surge (Activates on Hover) */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-500 -z-10',
          isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-95'
        )}
      >
        <div className="w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-tr from-sky-500/35 via-cyan-400/25 to-blue-600/30 dark:from-sky-500/45 dark:via-cyan-400/35 dark:to-blue-600/40 blur-3xl shadow-[0_0_60px_rgba(56,189,248,0.4)] dark:shadow-[0_0_80px_rgba(56,189,248,0.6)]" />
      </div>

      {/* 2. Concentric Spider Web Energy Strands (Surges on Hover) */}
      <svg
        viewBox="0 0 500 500"
        className={cn(
          'pointer-events-none absolute w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] text-sky-600 dark:text-cyan-400 transition-all duration-700 -z-10',
          isHovered ? 'opacity-80 scale-100 rotate-45' : 'opacity-0 scale-75 rotate-0'
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <polygon points="250,40 430,145 430,355 250,460 70,355 70,145" strokeDasharray="4 4" />
        <polygon points="250,85 390,165 390,335 250,415 110,335 110,165" />
        <polygon points="250,135 345,190 345,310 250,365 155,310 155,190" strokeDasharray="3 3" />
        <polygon points="250,185 298,215 298,285 250,315 202,285 202,215" />
        <line x1="250" y1="40" x2="250" y2="460" />
        <line x1="70" y1="145" x2="430" y2="355" />
        <line x1="70" y1="355" x2="430" y2="145" />
      </svg>

      {/* 3. Electric Blue Thunder Lightning Bolts (Surges on Hover) */}
      <div
        className={cn(
          'pointer-events-none absolute -inset-6 z-30 transition-all duration-300 flex items-center justify-center',
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 500 650"
          className="w-full h-full filter drop-shadow-[0_0_15px_rgba(2,132,199,0.7)] dark:drop-shadow-[0_0_20px_rgba(56,189,248,1)]"
          fill="none"
        >
          {/* Main Primary Lightning Bolt */}
          <path
            d="M270,10 L240,130 L290,200 L220,310 L280,360 L190,490 L250,530 L170,640"
            className="stroke-sky-600 dark:stroke-sky-400"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Core Plasma Lightning Strike */}
          <path
            d="M270,10 L240,130 L290,200 L220,310 L280,360 L190,490 L250,530 L170,640"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Forked Secondary Branches */}
          <path
            d="M240,130 L150,210 M290,200 L370,250 M220,310 L130,370 M280,360 L360,420"
            className="stroke-sky-500 dark:stroke-cyan-400"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
        </svg>
      </div>

      {/* 4. Steady Photo (Transparent Feathered Cutout, Clean and Uncluttered) */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center">
        <div
          className={cn(
            'relative w-[310px] sm:w-[360px] aspect-[3/4] overflow-hidden rounded-full transition-all duration-500',
            isHovered
              ? 'scale-105 filter drop-shadow-[0_0_30px_rgba(2,132,199,0.5)] dark:drop-shadow-[0_0_35px_rgba(56,189,248,0.7)]'
              : 'scale-100 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]'
          )}
          style={{
            maskImage:
              'radial-gradient(ellipse at 50% 48%, black 68%, transparent 96%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 48%, black 68%, transparent 96%)',
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover object-top transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}
