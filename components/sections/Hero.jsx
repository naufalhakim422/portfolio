'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations/gsap';
import Container from '@/components/ui/Container';
import Reveal from '@/components/motion/Reveal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import InteractivePortrait from '@/components/motion/InteractivePortrait';
import { useLanguage } from '@/components/ui/LanguageProvider';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

/**
 * Ultra-Modern Cosmic Hero Section with Spider-Man & Electric Lightning Visuals.
 */
export default function Hero() {
  const heroRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { t } = useLanguage();

  useGSAP(
    () => {
      if (reducedMotion || !scrollIndicatorRef.current) return;

      gsap.to(scrollIndicatorRef.current, {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut',
      });
    },
    { scope: heroRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-36 pb-10 overflow-hidden"
    >
      {/* 1. Cosmic Atmosphere & Electric Nebula Plasma */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-sky-500/15 via-cyan-400/10 to-transparent blur-[160px] rounded-full -z-10"
        aria-hidden="true"
      />

      {/* 2. Twinkling Cosmic Stars & Shooting Meteors (Inspired by TikTok reference) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Shooting Meteor Streak 1 */}
        <span className="absolute top-1/4 right-1/4 w-[120px] h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-white -rotate-45 animate-pulse opacity-40" />
        {/* Shooting Meteor Streak 2 */}
        <span className="absolute top-1/3 left-1/5 w-[90px] h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-white -rotate-45 opacity-30 animate-pulse delay-1000" />
      </div>

      <Container size="default" className="relative z-10 flex-1 flex flex-col justify-between">
        {/* Main Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto py-6 md:py-10">
          
          {/* Left Column: Typography & Narrative */}
          <div className="lg:col-span-7 space-y-6 md:space-y-7">
            
            {/* Clean Status Pill with Spider-Man Theme */}
            <Reveal direction="down" distance={15} duration={0.6}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-sky-500/30 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600 dark:bg-sky-400" />
                </span>
                <span>{t.hero.status} • {t.hero.location}</span>
              </div>
            </Reveal>

            {/* Monumental Headline */}
            <div className="space-y-2">
              <Reveal direction="up" distance={25} duration={0.7} delay={0.1}>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground leading-[1.02]">
                  <span className="block">Naufal Hakim</span>
                  <span className="block text-sky-600 dark:text-sky-400">Muzaki</span>
                </h1>
              </Reveal>

              <Reveal direction="up" distance={20} duration={0.7} delay={0.2}>
                <p className="text-xl sm:text-2xl md:text-3xl text-foreground/90 font-bold tracking-tight">
                  {t.hero.tagline}
                </p>
              </Reveal>
            </div>

            {/* Crisp 1-Line Description */}
            <Reveal direction="up" distance={20} duration={0.7} delay={0.3}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-normal">
                {t.hero.description}
              </p>
            </Reveal>

            {/* Action Buttons */}
            <Reveal direction="up" distance={20} duration={0.7} delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  magnetic
                  cursorState="LINK"
                  onClick={() => {
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>{t.hero.exploreCta}</span>
                  <Icon name="ArrowDownRight" size={16} />
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  magnetic
                  cursorState="LINK"
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>{t.hero.contactCta}</span>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Floating Spider-Man & Electric Lightning Hero Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <Reveal direction="up" distance={25} duration={0.7} delay={0.2}>
                <InteractivePortrait
                  src="/profile.png"
                  alt="Naufal Hakim Muzaki"
                />

                {/* Subtle Modern Figure Label */}
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-3 px-2">
                  <span className="text-foreground font-semibold">{t.hero.figCaption}</span>
                  <span className="text-sky-600 dark:text-sky-400 font-medium">JAKARTA // CAKUNG</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar & Scroll Prompt */}
        <div className="flex items-center justify-end pt-4 text-xs text-muted-foreground">
          <div
            ref={scrollIndicatorRef}
            className="flex items-center gap-2 select-none cursor-pointer text-muted-foreground hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-mono"
            onClick={() => {
              window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
            }}
          >
            <span className="text-xs font-medium">{t.hero.scroll}</span>
            <Icon name="ArrowDown" size={14} className="text-sky-600 dark:text-sky-400" />
          </div>
        </div>
      </Container>
    </section>
  );
}
