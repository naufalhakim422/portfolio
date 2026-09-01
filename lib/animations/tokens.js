/**
 * Centralized Design System Motion Tokens.
 * Standardizes animation durations, easings, staggers, and distances across all components.
 */
export const MOTION_TOKENS = {
  duration: {
    instant: 0.15,
    fast: 0.35,
    normal: 0.8,
    slow: 1.2,
    cinematic: 1.6,
  },
  ease: {
    editorial: 'power3.out',
    editorialSlow: 'power4.out',
    cinematic: 'expo.out',
    smooth: 'power2.out',
    spring: { type: 'spring', stiffness: 300, damping: 25 },
  },
  stagger: {
    dense: 0.02,
    normal: 0.05,
    loose: 0.1,
  },
  distance: {
    subtle: 15,
    normal: 35,
    deep: 70,
  },
};

export default MOTION_TOKENS;
