'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { CursorContext, CURSOR_STATES } from '@/lib/hooks/useCursor';
import { useDevice } from '@/lib/hooks/useDevice';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

/**
 * Enhanced Cursor Provider.
 * Luminous blue ambient glow dynamically follows cursor across the screen at z-[1],
 * while all content (text, cards, buttons) is layered above it at z-[2] so text is never obscured.
 */
export default function CursorProvider({ children }) {
  const [cursorState, setCursorState] = useState(CURSOR_STATES.DEFAULT);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const cursorGlowRef = useRef(null);

  const { isTouch, hasFinePointer } = useDevice();
  const reducedMotion = useReducedMotion();

  const setCursor = useCallback((state = CURSOR_STATES.DEFAULT, text = '') => {
    setCursorState(state);
    setCursorText(text);
  }, []);

  const resetCursor = useCallback(() => {
    setCursorState(CURSOR_STATES.DEFAULT);
    setCursorText('');
  }, []);

  const getCursorProps = useCallback(
    (state = CURSOR_STATES.DEFAULT, text = '') => ({
      onMouseEnter: () => setCursor(state, text),
      onMouseLeave: () => resetCursor(),
      'data-cursor': state,
      'data-cursor-text': text,
    }),
    [setCursor, resetCursor]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || isTouch || !hasFinePointer || reducedMotion) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = cursorFollowerRef.current;
    const glow = cursorGlowRef.current;

    if (!cursor || !follower || !glow) return;

    // High performance GSAP quickTo setters for 60fps tracking
    const xDot = gsap.quickTo(cursor, 'x', { duration: 0.08, ease: 'power3' });
    const yDot = gsap.quickTo(cursor, 'y', { duration: 0.08, ease: 'power3' });

    const xFollower = gsap.quickTo(follower, 'x', { duration: 0.3, ease: 'power2.out' });
    const yFollower = gsap.quickTo(follower, 'y', { duration: 0.3, ease: 'power2.out' });

    // Smooth momentum tracking for the bright glowing blue spotlight
    const xGlow = gsap.quickTo(glow, 'x', { duration: 0.45, ease: 'power2.out' });
    const yGlow = gsap.quickTo(glow, 'y', { duration: 0.45, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xFollower(e.clientX);
      yFollower(e.clientY);
      xGlow(e.clientX);
      yGlow(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Global declarative attribute listener: [data-cursor]
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const state = target.getAttribute('data-cursor') || CURSOR_STATES.DEFAULT;
        const text = target.getAttribute('data-cursor-text') || '';
        setCursor(state, text);
      } else {
        const interactive = e.target.closest('a, button, [role="button"]');
        if (interactive) {
          setCursor(CURSOR_STATES.LINK);
        } else {
          resetCursor();
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouch, hasFinePointer, reducedMotion, isVisible, setCursor, resetCursor]);

  // Determine cursor scale and styles based on active state
  const getFollowerStyles = () => {
    switch (cursorState) {
      case CURSOR_STATES.VIEW:
        return 'w-20 h-20 bg-sky-400 text-slate-950 text-xs font-mono font-bold scale-100 shadow-[0_0_35px_rgba(56,189,248,0.7)]';
      case CURSOR_STATES.PROJECT:
        return 'w-24 h-24 bg-sky-400 text-slate-950 text-xs font-mono font-bold scale-100 shadow-[0_0_40px_rgba(56,189,248,0.8)]';
      case CURSOR_STATES.LINK:
        return 'w-14 h-14 bg-sky-400/20 border-2 border-sky-400 scale-100 shadow-[0_0_20px_rgba(56,189,248,0.4)]';
      case CURSOR_STATES.DRAG:
        return 'w-16 h-16 bg-sky-500/25 border-2 border-sky-400 scale-100';
      default:
        return 'w-8 h-8 border border-sky-400/60 bg-transparent scale-100';
    }
  };

  const showCustomCursor = !isTouch && hasFinePointer && !reducedMotion;

  return (
    <CursorContext.Provider
      value={{
        cursorState,
        cursorText,
        setCursor,
        resetCursor,
        getCursorProps,
      }}
    >
      {/* Radiant Blue Spotlight Glow actively following cursor everywhere at z-[1] */}
      {showCustomCursor && (
        <div
          ref={cursorGlowRef}
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] rounded-full transition-opacity duration-300 z-[1] ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(14, 165, 233, 0.22) 35%, rgba(2, 132, 199, 0.08) 60%, transparent 75%)',
            filter: 'blur(35px)',
          }}
        />
      )}

      {/* Main Page Children (Cards, Text, Buttons) strictly layered ON TOP at z-[2] */}
      <div className="relative z-[2]">{children}</div>

      {/* Precision Foreground Dot & Follower on top at z-[50] */}
      {showCustomCursor && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed inset-0 z-[50] transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Precision Center Dot */}
          <div
            ref={cursorRef}
            className="fixed top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,1),0_0_25px_rgba(14,165,233,0.8)]"
          />

          {/* Follower Ring */}
          <div
            ref={cursorFollowerRef}
            className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ease-editorial ${getFollowerStyles()}`}
          >
            {cursorText && (
              <span className="select-none uppercase tracking-wider text-[10px] animate-fade-in font-black">
                {cursorText}
              </span>
            )}
          </div>
        </div>
      )}
    </CursorContext.Provider>
  );
}
