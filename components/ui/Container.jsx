'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Standardized responsive container wrapper with editorial margins.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 * @param {'default'|'narrow'|'wide'|'full'} [props.size='default']
 */
export default function Container({
  children,
  size = 'default',
  className = '',
  ...props
}) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16',
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
