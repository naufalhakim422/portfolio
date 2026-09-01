'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

/**
 * Standardized Lucide Icon wrapper to maintain consistent icon styling across the project.
 *
 * @param {object} props
 * @param {string} props.name - PascalCase icon name in lucide-react (e.g. 'ArrowUpRight', 'Eye', 'Code')
 * @param {number|string} [props.size=20] - Icon size in px
 * @param {string} [props.className=''] - Tailwind CSS classes
 * @param {number} [props.strokeWidth=1.5] - Stroke width
 */
export default function Icon({
  name,
  size = 20,
  className = '',
  strokeWidth = 1.5,
  ...props
}) {
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;

  return (
    <IconComponent
      size={size}
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      {...props}
    />
  );
}
