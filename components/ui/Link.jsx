'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TransitionLink } from '@/components/ui/TransitionProvider';

/**
 * Editorial Text Link Component with hover underline reveal.
 *
 * @param {object} props
 * @param {string} props.href
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.external=false]
 * @param {string} [props.className='']
 */
export default function Link({
  href,
  children,
  external = false,
  className = '',
  ...props
}) {
  const linkClasses = cn(
    'relative inline-flex items-center gap-1 text-foreground transition-colors duration-300 group',
    'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-foreground',
    'after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300 after:ease-editorial',
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="LINK"
        className={linkClasses}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <TransitionLink
      href={href}
      data-cursor="LINK"
      className={linkClasses}
      {...props}
    >
      {children}
    </TransitionLink>
  );
}
