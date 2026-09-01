'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Editorial Metadata Label & Badge Component.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {'default'|'accent'|'outline'|'sky'} [props.variant='default']
 * @param {string} [props.className='']
 */
export default function Label({
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  const variantStyles = {
    default: 'bg-surface text-muted-foreground border border-border',
    accent: 'bg-sky-500/10 text-sky-300 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.15)]',
    sky: 'bg-sky-400 text-slate-950 font-bold border border-sky-300',
    outline: 'bg-transparent text-muted-foreground border border-border/80 hover:border-sky-400/40',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.12em] select-none transition-colors',
        variantStyles[variant] || variantStyles.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
