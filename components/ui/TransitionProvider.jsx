'use client';

import React, { createContext, useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { animatePageExit, animatePageEnter } from '@/lib/animations/transitions';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export const TransitionContext = createContext({
  isTransitioning: false,
  navigate: () => {},
});

/**
 * Page Transition Infrastructure Provider.
 * Coordinates route enter/exit sequences and overlay animations.
 */
export default function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // Trigger enter animation on pathname change
  useEffect(() => {
    if (reducedMotion) return;

    if (overlayRef.current) {
      animatePageEnter(overlayRef.current).then(() => {
        setIsTransitioning(false);
      });
    }
  }, [pathname, reducedMotion]);

  const navigate = async (href) => {
    if (pathname === href) return;

    if (reducedMotion) {
      router.push(href);
      return;
    }

    setIsTransitioning(true);

    if (overlayRef.current) {
      await animatePageExit(overlayRef.current);
    }

    router.push(href);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, navigate }}>
      {/* Fullscreen Transition Overlay Curtain */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[999] bg-foreground origin-bottom scale-y-0"
      />
      {children}
    </TransitionContext.Provider>
  );
}

/**
 * Reusable animated link component that triggers the transition provider.
 */
export function TransitionLink({ href, children, className, ...props }) {
  const { navigate, isTransitioning } = React.useContext(TransitionContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (!isTransitioning) {
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
