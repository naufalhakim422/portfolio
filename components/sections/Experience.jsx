'use client';

import React from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import Icon from '@/components/ui/Icon';
import { useLanguage } from '@/components/ui/LanguageProvider';
import { cn } from '@/lib/utils';

/**
 * Modern, Interactive Roadmap Section (2024 – 2028).
 * Bespoke milestone timeline cards with status indicators, watermark typography, and zero AI-slop.
 */
export default function Experience() {
  const { t } = useLanguage();

  return (
    <Section id="experience" spacing="default" className="relative">
      <Container size="default" className="space-y-12 md:space-y-16">
        
        {/* Section Header */}
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400" />
          <span className="text-xs font-mono font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase">
            {t.experience.title}
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl space-y-2">
          <Reveal direction="up" distance={20}>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
              {t.experience.headline}
            </h2>
          </Reveal>
          <Reveal direction="up" distance={20} delay={0.1}>
            <Text variant="body" className="text-muted-foreground font-normal">
              {t.experience.subtitle}
            </Text>
          </Reveal>
        </div>

        {/* Modern Interactive Roadmap Stepper Cards */}
        <div className="relative space-y-8 pt-4">
          
          {/* Subtle Vertical Spine */}
          <div className="hidden lg:block absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-emerald-500 via-sky-500 to-border" />

          {t.experience.items.map((item, index) => {
            const isCompleted = item.status === 'completed';
            const isActive = item.status === 'active';

            return (
              <Reveal
                key={item.step + item.period}
                direction="up"
                distance={25}
                delay={index * 0.08}
              >
                <div
                  className={cn(
                    'relative rounded-3xl border p-6 sm:p-8 transition-all duration-300 overflow-hidden',
                    isActive
                      ? 'bg-surface border-sky-500/60 shadow-lg dark:shadow-[0_0_35px_rgba(56,189,248,0.16)]'
                      : isCompleted
                      ? 'bg-surface/90 border-emerald-500/30 shadow-xs hover:border-emerald-500/50'
                      : 'bg-surface/80 border-border/80 shadow-xs hover:border-border'
                  )}
                >
                  {/* Subtle Background Watermark Year */}
                  <span
                    className="pointer-events-none absolute right-4 -bottom-6 font-mono font-black text-6xl sm:text-8xl text-foreground/[0.03] select-none"
                    aria-hidden="true"
                  >
                    {item.period}
                  </span>

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-10">
                    
                    {/* Left Milestone Summary */}
                    <div className="space-y-3 lg:max-w-xs flex-shrink-0">
                      {/* Step Number & Status Badge */}
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-1 rounded-lg bg-muted text-xs font-mono font-bold text-foreground">
                          {item.step} / 05
                        </span>

                        {isActive && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/40 text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                            {t.experience.statusLabels.active}
                          </span>
                        )}

                        {isCompleted && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            <Icon name="CheckCircle2" size={12} />
                            {t.experience.statusLabels.completed}
                          </span>
                        )}

                        {!isActive && !isCompleted && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-muted text-[10px] font-mono font-semibold text-muted-foreground">
                            {t.experience.statusLabels.upcoming}
                          </span>
                        )}
                      </div>

                      {/* Year & Phase Title */}
                      <div className="space-y-0.5">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-foreground block">
                          {item.period}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold block">
                          {item.phase}
                        </span>
                      </div>

                      {/* Location Badge */}
                      <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                        <Icon name="MapPin" size={13} className="text-sky-600 dark:text-sky-400" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Right Milestone Content & Highlights */}
                    <div className="flex-1 space-y-4">
                      {/* Role & Company */}
                      <div className="space-y-1">
                        <Heading as="h3" className="text-xl sm:text-2xl font-bold text-foreground">
                          {item.role}
                        </Heading>
                        <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                          {item.company}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Key Deliverables / Highlights */}
                      <div className="space-y-2 pt-1">
                        <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/90 font-medium">
                          {item.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5">
                              <span
                                className={cn(
                                  'w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0',
                                  isActive ? 'bg-sky-500' : isCompleted ? 'bg-emerald-500' : 'bg-muted-foreground'
                                )}
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technology Chips */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.technologies.map((tech) => (
                          <Magnetic key={tech} strength={0.15}>
                            <span
                              className="px-2.5 py-1 rounded-lg bg-muted text-[11px] font-mono text-foreground font-medium border border-border hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                              data-cursor="LINK"
                            >
                              {tech}
                            </span>
                          </Magnetic>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </Container>
    </Section>
  );
}
