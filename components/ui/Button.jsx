'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Magnetic from '@/components/motion/Magnetic';

/**
 * Animated Design System Button Component.
 * Features shimmer wave animations, elastic magnetic physics, and tactile micro-interactions.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  href,
  cursorState = 'LINK',
  cursorText = '',
  className = '',
  disabled = false,
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium overflow-hidden transition-all duration-300 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer group hover:scale-[1.03] active:scale-[0.96]';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 rounded-full gap-1.5 font-mono',
    md: 'text-sm px-6 py-3 rounded-full gap-2 font-semibold',
    lg: 'text-base px-8 py-3.5 rounded-full gap-2.5 font-bold',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-sky-600 to-sky-500 text-white dark:from-sky-400 dark:to-cyan-400 dark:text-slate-950 shadow-md hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] dark:hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] border border-sky-400/30',
    secondary:
      'bg-surface text-foreground border border-border/90 hover:border-sky-500 hover:bg-surface-hover shadow-xs hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]',
    outline:
      'bg-transparent text-foreground border border-sky-500/40 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-500/10',
    ghost:
      'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/80',
  };

  const combinedClassName = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const innerContent = (
    <>
      {/* Light Shimmer Sweep Effect */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent"
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const element = href ? (
    <a
      href={href}
      data-cursor={cursorState}
      data-cursor-text={cursorText}
      className={combinedClassName}
      {...props}
    >
      {innerContent}
    </a>
  ) : (
    <button
      disabled={disabled}
      data-cursor={cursorState}
      data-cursor-text={cursorText}
      className={combinedClassName}
      {...props}
    >
      {innerContent}
    </button>
  );

  if (magnetic && !disabled) {
    return <Magnetic strength={0.25}>{element}</Magnetic>;
  }

  return element;
}
