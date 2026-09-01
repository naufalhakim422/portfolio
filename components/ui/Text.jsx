'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Editorial Text Component.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {'body-lg'|'body'|'small'|'metadata'} [props.variant='body']
 * @param {string} [props.as='p']
 * @param {string} [props.className='']
 */
export default function Text({
  children,
  variant = 'body',
  as: Component = 'p',
  className = '',
  ...props
}) {
  const variantStyles = {
    'body-lg': 'text-lg md:text-xl text-muted-foreground leading-[1.65] font-normal max-w-prose',
    'body': 'text-base text-muted-foreground leading-[1.6] font-normal max-w-prose',
    'small': 'text-sm text-muted-foreground leading-[1.5] font-normal',
    'metadata': 'text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground',
  };

  return (
    <Component
      className={cn(variantStyles[variant] || variantStyles.body, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
