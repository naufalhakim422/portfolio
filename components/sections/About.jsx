'use client';

import React from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Reveal from '@/components/motion/Reveal';
import TiltCard from '@/components/motion/TiltCard';
import FlipCard from '@/components/motion/FlipCard';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useLanguage } from '@/components/ui/LanguageProvider';

/**
 * Creative About Section with Clean Portrait & 3D Flip Cards (Zero Bracket/Divider Lines).
 */
export default function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" spacing="default" className="relative">
      <Container size="default" className="space-y-12 md:space-y-16">
        
        {/* Section Header */}
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400" />
          <span className="text-xs font-mono font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase">
            {t.about.title}
          </span>
        </div>

        {/* Heroic Statement & Quote Pill */}
        <div className="max-w-4xl space-y-6">
          <Reveal direction="up" distance={25} duration={0.7}>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] text-foreground">
              {t.about.headline}
            </h2>
          </Reveal>

          {/* Inspirational Quote Card with 3D Tilt */}
          <Reveal direction="up" distance={20} delay={0.1}>
            <TiltCard
              maxTilt={4}
              className="p-5 rounded-2xl bg-surface border border-sky-500/30 shadow-sm hover:border-sky-500/60"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon name="Quote" size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-foreground italic leading-relaxed">
                    {t.hero.quote}
                  </p>
                  <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-bold block">
                    — Naufal Hakim Muzaki
                  </span>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        {/* Interactive Highlight Stats Grid */}
        <Reveal direction="up" distance={20} delay={0.15}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {t.about.stats.map((stat, sIdx) => (
              <TiltCard
                key={sIdx}
                maxTilt={6}
                className="p-4 sm:p-5 rounded-2xl bg-surface border border-border/90 shadow-xs hover:border-sky-500/60 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
              >
                <div className="text-xl sm:text-2xl font-black font-mono text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground uppercase font-semibold mt-1">
                  {stat.label}
                </div>
              </TiltCard>
            ))}
          </div>
        </Reveal>

        {/* Narrative, Clean Photo Card & 4 3D Flip Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Portrait Card + Narrative Story + Actions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Clean Portrait Photo Card (No corner bracket lines) */}
            <Reveal direction="up" distance={25}>
              <TiltCard
                maxTilt={5}
                className="relative p-2.5 rounded-3xl bg-surface border border-border/90 shadow-md group overflow-hidden"
              >
                {/* Photo Image Frame */}
                <div className="relative w-full h-[320px] sm:h-[360px] rounded-2xl overflow-hidden bg-muted/40">
                  <Image
                    src="/profile.png"
                    alt="Naufal Hakim Muzaki — Software Engineer"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Shade at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                  {/* Identity Tag inside Photo */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-bold tracking-wider">NAUFAL HAKIM MUZAKI</span>
                    </div>
                    <span className="text-[11px] text-slate-300">JAKARTA, ID</span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* Narrative Paragraph */}
            <Reveal direction="up" distance={20} delay={0.1}>
              <Text variant="body-lg" className="text-foreground/95 leading-relaxed font-normal">
                {t.about.paragraph1}
              </Text>
            </Reveal>

            {/* Quick Badges Checklist */}
            <Reveal direction="up" distance={20} delay={0.15}>
              <div className="space-y-2.5 pt-1">
                {[
                  'Full-Stack Architecture & Microservices',
                  'Database Schema Modeling & Indexing',
                  'Sub-second Latency & Clean Code Standards',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-mono font-medium text-foreground">
                    <Icon name="CheckCircle2" size={14} className="text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Action Buttons in About */}
            <Reveal direction="up" distance={20} delay={0.2}>
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Button
                  variant="primary"
                  size="md"
                  magnetic
                  cursorState="LINK"
                  onClick={() => {
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>{t.about.exploreProjectsCta}</span>
                  <Icon name="ArrowDownRight" size={15} />
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  magnetic
                  cursorState="LINK"
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>{t.about.contactCta}</span>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 4 3D Flip Engineering Pillars */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {t.about.pillars.map((pillar, index) => (
                <Reveal
                  key={pillar.num}
                  direction="up"
                  distance={20}
                  delay={index * 0.08}
                  className="h-full"
                >
                  <FlipCard
                    height="h-[240px] sm:h-[260px]"
                    front={
                      <div className="h-full flex flex-col justify-between">
                        {/* Front Top: Number & Icon */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-sky-600 dark:text-sky-400 font-black">
                            {pillar.num}
                          </span>
                          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                            <Icon name={pillar.icon} size={16} />
                          </div>
                        </div>

                        {/* Front Center: Bold Pillar Title Text */}
                        <div className="my-auto py-2">
                          <Heading as="h4" className="text-xl sm:text-2xl font-black text-foreground group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors tracking-tight">
                            {pillar.title}
                          </Heading>
                        </div>

                        {/* Front Bottom: Flip Indicator */}
                        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-1">
                          <span>Putar untuk deskripsi</span>
                          <Icon name="RotateCw" size={13} className="text-sky-600 dark:text-sky-400 group-hover:rotate-180 transition-transform duration-500" />
                        </div>
                      </div>
                    }
                    back={
                      <div className="h-full flex flex-col justify-between">
                        {/* Back Top: Title Header */}
                        <div className="flex items-center justify-between pb-1">
                          <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                            {pillar.title}
                          </span>
                          <span className="text-xs font-mono text-muted-foreground font-black">
                            {pillar.num}
                          </span>
                        </div>

                        {/* Back Center: Full Description Text */}
                        <div className="my-auto py-2">
                          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
                            {pillar.description}
                          </p>
                        </div>

                        {/* Back Bottom: Return Indicator */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1">
                          <span>Kembali ke judul</span>
                          <Icon name="RotateCcw" size={12} className="text-sky-600 dark:text-sky-400" />
                        </div>
                      </div>
                    }
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

      </Container>
    </Section>
  );
}
