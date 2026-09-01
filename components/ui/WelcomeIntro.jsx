'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

/**
 * Minimalist, Ultra-Elegant & Modern Preloader (~6.5 Seconds).
 * Clean, calm, and uncluttered design:
 * - Monumental refined typography: NAUFAL HAKIM MUZAKI
 * - Minimal hairline laser progress beam (h-[1.5px])
 * - Clean monospace percentage counter (0% -> 100%)
 * - Dual-shutter smooth cinematic reveal
 */
export default function WelcomeIntro() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const topShutterRef = useRef(null);
  const bottomShutterRef = useRef(null);
  const contentRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const handleEnter = useCallback(() => {
    if (!topShutterRef.current || !bottomShutterRef.current) {
      setIsDone(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setIsDone(true),
    });

    if (reducedMotion) {
      tl.to([topShutterRef.current, bottomShutterRef.current, contentRef.current], {
        opacity: 0,
        duration: 0.4,
      });
    } else {
      tl.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
      })
        .to(
          topShutterRef.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
          },
          '-=0.1'
        )
        .to(
          bottomShutterRef.current,
          {
            yPercent: 100,
            duration: 0.9,
            ease: 'power4.inOut',
          },
          '<'
        );
    }
  }, [reducedMotion]);

  useEffect(() => {
    // Calibrated ~6.5 second progression (within 5-8 seconds requirement)
    let current = 0;
    const interval = setInterval(() => {
      // Smooth organic step curve
      const step = current < 35 ? 1 : current < 75 ? 2 : current < 92 ? 1 : 2;
      current += step;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          handleEnter();
        }, 500);
      } else {
        setProgress(current);
      }
    }, 65);

    return () => clearInterval(interval);
  }, [handleEnter]);

  if (isDone) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] select-none overflow-hidden cursor-pointer"
      onClick={handleEnter}
      data-cursor="LINK"
      data-cursor-text="ENTER"
    >
      {/* Top Shutter Panel */}
      <div
        ref={topShutterRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#050711] border-b border-sky-500/15 will-change-transform z-0"
      />

      {/* Bottom Shutter Panel */}
      <div
        ref={bottomShutterRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050711] border-t border-sky-500/15 will-change-transform z-0"
      />

      {/* Ambient Deep Glow in Center */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-gradient-to-tr from-sky-500/10 via-cyan-400/8 to-blue-600/10 blur-[140px]" />
      </div>

      {/* Minimalist Centered Content Layer */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col justify-between p-8 sm:p-14 text-white"
      >
        {/* Top Minimal Status */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-slate-400 tracking-wider">NAUFAL HAKIM MUZAKI</span>
          </div>

          <span className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors">
            KLIK UNTUK LEWATI ↗
          </span>
        </div>

        {/* Center: Monumental Refined Name & Hairline Progress */}
        <div className="my-auto w-full max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-white">
              <span className="block">NAUFAL HAKIM</span>
              <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                MUZAKI
              </span>
            </h1>

            <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-widest uppercase">
              Software Engineer & Full-Stack Architect
            </p>
          </div>

          {/* Minimalist Hairline Progress Line & Numeric Indicator */}
          <div className="w-full max-w-md mx-auto space-y-3 pt-4">
            <div className="w-full h-[1.5px] bg-slate-800 relative overflow-hidden rounded-full">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-cyan-300 to-blue-400 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>INITIALIZING</span>
              <span className="text-sky-400 font-bold tracking-wider">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Bottom Minimal Subtext */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-600">
          <span>JAKARTA, INDONESIA</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
