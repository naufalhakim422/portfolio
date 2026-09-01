'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Editorial Heading Component.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {'display'|'h1'|'h2'|'h3'|'h4'} [props.as='h2'] - Hierarchy variant
 * @param {string} [props.className='']
 */
export default function Heading({
  children,
  as = 'h2',
  className = '',
  ...props
}) {
  const variantStyles = {
    display: 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.92] text-foreground',
    h1: 'text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.0] text-foreground',
    h2: 'text-2xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] text-foreground',
    h3: 'text-xl sm:text-2xl md:text-3xl font-medium tracking-[-0.02em] leading-[1.25] text-foreground',
    h4: 'text-lg sm:text-xl font-medium tracking-[-0.01em] leading-[1.35] text-foreground',
  };

  const Component = as === 'display' ? 'h1' : as;

  return (
    <Component
      className={cn(variantStyles[as] || variantStyles.h2, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
