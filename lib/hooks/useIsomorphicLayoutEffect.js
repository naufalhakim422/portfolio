import { useEffect, useLayoutEffect } from 'react';

/**
 * useLayoutEffect replacement that falls back to useEffect during SSR to prevent Next.js warnings.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
