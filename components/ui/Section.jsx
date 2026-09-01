'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Semantic section component providing consistent editorial vertical rhythm.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.id]
 * @param {string} [props.className='']
 * @param {'default'|'tight'|'generous'|'none'} [props.spacing='default']
 */
export default function Section({
  children,
  id,
  spacing = 'default',
  className = '',
  ...props
}) {
  const spacingClasses = {
    tight: 'py-16 md:py-24',
    default: 'py-24 md:py-36 lg:py-44',
    generous: 'py-32 md:py-48 lg:py-56',
    none: 'py-0',
  };

  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        spacingClasses[spacing] || spacingClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
