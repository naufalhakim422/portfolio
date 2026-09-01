'use client';

import React from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Reveal from '@/components/motion/Reveal';
import FlipCard from '@/components/motion/FlipCard';
import Magnetic from '@/components/motion/Magnetic';
import Icon from '@/components/ui/Icon';
import { useLanguage } from '@/components/ui/LanguageProvider';

/**
 * 3D Flip Card Skills Section.
 * Front face: Bold Domain Title text.
 * Back face: Full Description text and technology stack.
 */
export default function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills" spacing="default" className="relative">
      <Container size="default" className="space-y-10 md:space-y-14">
        
        {/* Section Header */}
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400" />
          <span className="text-xs font-mono font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase">
            {t.skills.title}
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl space-y-2">
          <Reveal direction="up" distance={20}>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
              {t.skills.headline}
            </h2>
          </Reveal>
          <Reveal direction="up" distance={20} delay={0.1}>
            <Text variant="body" className="text-muted-foreground font-normal">
              {t.skills.subtitle}
            </Text>
          </Reveal>
        </div>

        {/* 6 Stack Domains Grid with 3D Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
          {t.skills.domains.map((domain, index) => (
            <Reveal
              key={domain.id}
              direction="up"
              distance={25}
              delay={index * 0.06}
              className="h-full"
            >
              <FlipCard
                height="h-[270px] sm:h-[290px]"
                front={
                  <div className="h-full flex flex-col justify-between">
                    {/* Front Top: Number */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-black">
                        0{index + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-muted text-[10px] font-mono text-muted-foreground uppercase font-bold tracking-wider">
                        STACK DOMAIN
                      </span>
                    </div>

                    {/* Front Center: Monumental Bold Title Text */}
                    <div className="my-auto py-2">
                      <Heading as="h3" className="text-2xl sm:text-3xl font-black text-foreground tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {domain.title}
                      </Heading>
                    </div>

                    {/* Front Bottom: Flip Cue */}
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-3 border-t border-border/60">
                      <span>Putar untuk deskripsi</span>
                      <Icon name="RotateCw" size={13} className="text-sky-600 dark:text-sky-400 group-hover:rotate-180 transition-transform duration-500" />
                    </div>
                  </div>
                }
                back={
                  <div className="h-full flex flex-col justify-between">
                    {/* Back Top: Title Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-border/60">
                      <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                        {domain.title}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground font-black">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Back Center: Full Description Text & Badges */}
                    <div className="space-y-3 my-auto py-2">
                      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
                        {domain.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {domain.techs.map((tech) => (
                          <Magnetic key={tech} strength={0.15}>
                            <span
                              className="inline-block px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono text-foreground font-semibold border border-border/80"
                            >
                              {tech}
                            </span>
                          </Magnetic>
                        ))}
                      </div>
                    </div>

                    {/* Back Bottom: Return Cue */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-2 border-t border-border/60">
                      <span>Kembali ke judul</span>
                      <Icon name="RotateCcw" size={12} className="text-sky-600 dark:text-sky-400" />
                    </div>
                  </div>
                }
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
