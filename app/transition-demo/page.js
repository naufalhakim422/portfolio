'use client';

import React from 'react';
import Reveal from '@/components/motion/Reveal';
import TextReveal from '@/components/motion/TextReveal';
import Magnetic from '@/components/motion/Magnetic';
import Icon from '@/components/ui/Icon';
import { TransitionLink } from '@/components/ui/TransitionProvider';

export default function TransitionDemoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-2xl w-full p-8 md:p-12 rounded-2xl bg-surface border border-border space-y-8 text-center">
        <Reveal direction="down" distance={20}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background text-xs font-mono text-emerald-400">
            <Icon name="CheckCircle" size={14} />
            <span>Route Transition Successful</span>
          </div>
        </Reveal>

        <TextReveal
          type="word"
          stagger={0.04}
          className="text-3xl md:text-5xl font-bold tracking-tight text-foreground justify-center"
        >
          Page Transition Engine Validated
        </TextReveal>

        <Reveal direction="up" distance={30} delay={0.2}>
          <p className="text-muted-foreground leading-relaxed">
            The page transition lifecycle coordinates GSAP curtain entrance/exit sequences with Next.js App Router navigation.
            Reduced motion settings automatically bypass the curtain animation for instant navigation.
          </p>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.3}>
          <div className="pt-4 flex justify-center">
            <Magnetic strength={0.35}>
              <TransitionLink
                href="/"
                className="px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm inline-flex items-center gap-2"
                data-cursor="LINK"
              >
                <Icon name="ArrowLeft" size={16} />
                <span>Return to Engine Sandbox</span>
              </TransitionLink>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
