'use client';

import { useContext } from 'react';
import { TransitionContext } from '@/components/ui/TransitionProvider';

/**
 * Hook to trigger animated page transitions programmatically.
 */
export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within TransitionProvider');
  }
  return context;
}
