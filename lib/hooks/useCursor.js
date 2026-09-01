'use client';

import { createContext, useContext, useState, useCallback } from 'react';

export const CURSOR_STATES = {
  DEFAULT: 'DEFAULT',
  VIEW: 'VIEW',
  LINK: 'LINK',
  DRAG: 'DRAG',
  PROJECT: 'PROJECT',
};

export const CursorContext = createContext({
  cursorState: CURSOR_STATES.DEFAULT,
  cursorText: '',
  setCursor: () => {},
  resetCursor: () => {},
  getCursorProps: () => ({}),
});

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
