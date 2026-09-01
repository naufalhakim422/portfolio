'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import Icon from '@/components/ui/Icon';

/**
 * Award-Winning 3D Quantum Preloader.
 * - Interactive 3D Holographic Gyro Core with mouse parallax
 * - Smooth luxury progress meter (0% -> 100%)
 * - Interactive "MASUK KE PORTOFOLIO" (Enter Experience) button when complete
 * - Cinematic dual-shutter portal reveal
 */
export default function WelcomeIntro() {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const topShutterRef = useRef(null);
  const bottomShutterRef = useRef(null);
  const contentRef = useRef(null);
  const core3DRef = useRef(null);
  const enterBtnRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // Mouse parallax for 3D gyro tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      // 3D Core Portal Expansion & Cinema Shutter Wipe
      tl.to(core3DRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
      })
        .to(
          contentRef.current,
          {
            opacity: 0,
            scale: 0.96,
            duration: 0.4,
            ease: 'power2.in',
          },
          '<'
        )
        .to(
          topShutterRef.current,
          {
            yPercent: -100,
            duration: 0.95,
            ease: 'power4.inOut',
          },
          '-=0.15'
        )
        .to(
          bottomShutterRef.current,
          {
            yPercent: 100,
            duration: 0.95,
            ease: 'power4.inOut',
          },
          '<'
        );
    }
  }, [reducedMotion]);

  useEffect(() => {
    // Smooth ~5.5s progressive count
    let current = 0;
    const interval = setInterval(() => {
      const step = current < 35 ? 1 : current < 75 ? 2 : current < 94 ? 1 : 2;
      current += step;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        setIsReady(true);
        clearInterval(interval);
      } else {
        setProgress(current);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Animate the enter button when ready
  useEffect(() => {
    if (isReady && enterBtnRef.current) {
      gsap.fromTo(
        enterBtnRef.current,
        { scale: 0.8, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, [isReady]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[99999] select-none overflow-hidden bg-[#030712] text-white">
      {/* Top Shutter Panel */}
      <div
        ref={topShutterRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#050711] border-b border-sky-500/20 will-change-transform z-0"
      />

      {/* Bottom Shutter Panel */}
      <div
        ref={bottomShutterRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050711] border-t border-sky-500/20 will-change-transform z-0"
      />

      {/* Ambient Deep Plasma Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-tr from-sky-500/15 via-cyan-400/10 to-blue-600/15 blur-[160px] animate-pulse" />
      </div>

      {/* Main Content Layer */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col justify-between p-8 sm:p-14"
      >
        {/* Top Minimal Status */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="tracking-widest font-semibold text-slate-300">
              NAUFAL HAKIM MUZAKI
            </span>
          </div>

          <button
            onClick={handleEnter}
            className="text-[11px] text-slate-500 hover:text-sky-400 transition-colors uppercase tracking-wider font-mono cursor-pointer"
          >
            LEWATI ↗
          </button>
        </div>

        {/* Center: 3D Holographic Quantum Core + Typography + Interactive Button */}
        <div className="my-auto w-full max-w-2xl mx-auto text-center flex flex-col items-center space-y-8">
          
          {/* 3D Holographic Gyroscope Core */}
          <div
            ref={core3DRef}
            className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center transition-transform duration-300 ease-out"
            style={{
              perspective: '1000px',
              transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
            }}
          >
            {/* Outer Orbit Gyro Ring */}
            <div
              className="absolute inset-0 rounded-full border border-sky-400/30 border-dashed animate-spin"
              style={{ animationDuration: '14s' }}
            />

            {/* Middle 3D Tilted Laser Ring */}
            <div
              className="absolute inset-3 rounded-full border-2 border-cyan-400/40 border-t-transparent animate-spin"
              style={{
                animationDuration: '9s',
                animationDirection: 'reverse',
                transform: 'rotateX(55deg) rotateY(25deg)',
              }}
            />

            {/* Inner Diagonal Gyro Ring */}
            <div
              className="absolute inset-7 rounded-full border border-blue-400/50 border-b-transparent animate-spin"
              style={{
                animationDuration: '6s',
                transform: 'rotateY(60deg) rotateX(30deg)',
              }}
            />

            {/* Central Glowing Quantum Singularity Core */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-300 shadow-[0_0_35px_rgba(56,189,248,0.8)] flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_20px_#fff] animate-ping opacity-75" />
              <div className="absolute w-7 h-7 rounded-full bg-white" />
            </div>
          </div>

          {/* Monumental Name & Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white">
              <span>NAUFAL HAKIM </span>
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                MUZAKI
              </span>
            </h1>

            <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-widest uppercase">
              Software Engineer & Full-Stack Architect
            </p>
          </div>

          {/* Dynamic Switch: Progress Meter (while loading) OR Glowing "MASUK" Button (when ready) */}
          <div className="w-full max-w-md mx-auto pt-2 min-h-[70px] flex items-center justify-center">
            {!isReady ? (
              <div className="w-full space-y-3">
                {/* Hairline Laser Progress Line */}
                <div className="w-full h-[2px] bg-slate-800 relative overflow-hidden rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 via-cyan-300 to-blue-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                    MEMUAT SISTEM
                  </span>
                  <span className="text-sky-400 font-bold tracking-wider font-mono">
                    {progress}%
                  </span>
                </div>
              </div>
            ) : (
              /* High-End 3D Interactive Enter Button */
              <div ref={enterBtnRef} className="w-full flex flex-col items-center gap-3">
                <button
                  onClick={handleEnter}
                  className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-black font-black text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(56,189,248,0.6)] hover:shadow-[0_0_55px_rgba(56,189,248,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                  data-cursor="LINK"
                  data-cursor-text="ENTER ⚡"
                >
                  <span className="relative z-10 font-mono font-bold">MASUK KE PORTOFOLIO</span>
                  <Icon
                    name="ArrowRight"
                    size={18}
                    className="relative z-10 group-hover:translate-x-1.5 transition-transform"
                  />
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>

                <span className="text-[11px] font-mono text-sky-400/80 animate-pulse tracking-wider">
                  KLIK UNTUK MEMULAI PENGALAMAN ✦
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Subtext */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>JAKARTA, INDONESIA</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
