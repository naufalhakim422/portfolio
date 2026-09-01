'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect device capabilities for responsive animations.
 * Helps disable heavy desktop mouse interactions (magnetic, custom cursor) on touch/mobile devices.
 */
export function useDevice() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTouch: false,
    hasFinePointer: true,
    isMounted: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileWidth = window.innerWidth < 768;
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

      setDevice({
        isMobile: isMobileWidth,
        isTouch,
        hasFinePointer,
        isMounted: true,
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return device;
}
