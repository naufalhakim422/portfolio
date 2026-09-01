'use client';

import React, { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Global Smooth Scrolling Provider using Lenis.
 * Synchronized with GSAP Ticker and ScrollTrigger updates.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion: if reduced motion is requested, do not initialize smooth momentum scrolling
    if (reducedMotion) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis requestAnimationFrame loop into GSAP's centralized ticker
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    // Disable GSAP lag smoothing to ensure synchronized frame delivery
    gsap.ticker.lagSmoothing(0);

    // Expose lenis to window for testing/debugging in development
    if (process.env.NODE_ENV !== 'production') {
      window.__lenis = lenis;
    }

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined' && window.__lenis) {
        delete window.__lenis;
      }
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
