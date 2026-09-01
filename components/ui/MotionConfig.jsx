'use client';

import React, { createContext, useContext } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useDevice } from '@/lib/hooks/useDevice';

export const MotionContext = createContext({
  reducedMotion: false,
  isMobile: false,
  isTouch: false,
});

export function MotionProvider({ children }) {
  const reducedMotion = useReducedMotion();
  const { isMobile, isTouch } = useDevice();

  return (
    <MotionContext.Provider value={{ reducedMotion, isMobile, isTouch }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionConfig() {
  return useContext(MotionContext);
}
