'use client';

/**
 * Calculates bounded magnetic displacement offset.
 *
 * @param {MouseEvent} event - Mouse move event
 * @param {HTMLElement} target - The magnetic element
 * @param {number} strength - Attraction strength factor (0.1 - 0.8)
 * @param {number} maxDisplacement - Maximum allowed pixel offset
 * @returns {{ x: number, y: number, distance: number }}
 */
export function calculateMagneticOffset(
  event,
  target,
  strength = 0.35,
  maxDisplacement = 35
) {
  if (!target) return { x: 0, y: 0, distance: 0 };

  const rect = target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = event.clientX - centerX;
  const deltaY = event.clientY - centerY;

  const distance = Math.hypot(deltaX, deltaY);

  // Apply strength factor with bounding clamp
  const rawX = deltaX * strength;
  const rawY = deltaY * strength;

  const clampedX = Math.max(Math.min(rawX, maxDisplacement), -maxDisplacement);
  const clampedY = Math.max(Math.min(rawY, maxDisplacement), -maxDisplacement);

  return {
    x: clampedX,
    y: clampedY,
    distance,
  };
}
