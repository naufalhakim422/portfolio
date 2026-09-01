'use client';

import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Reveal from '@/components/motion/Reveal';
import FlipCard from '@/components/motion/FlipCard';
import Icon from '@/components/ui/Icon';
import { useLanguage } from '@/components/ui/LanguageProvider';
import { cn } from '@/lib/utils';

/**
 * 3D Flip Card Projects Section.
 * Front face: Prominent Project Title and status.
 * Back face: Full Technology description, specs, and repository action link.
 */
export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const categories = [
    'All',
    'Full-Stack',
    'Real-Time',
    'Productivity',
    'Enterprise',
    'Finance',
    'Web App',
  ];

  const allFiltered =
    filter === 'All'
      ? t.projects.allProjects
      : t.projects.allProjects.filter(
          (p) => p.cat.toLowerCase() === filter.toLowerCase()
        );

  const INITIAL_COUNT = 6;
  const displayedProjects = showAll ? allFiltered : allFiltered.slice(0, INITIAL_COUNT);
  const hasMore = allFiltered.length > INITIAL_COUNT;

  return (
    <Section id="projects" spacing="default" className="relative">
      <Container size="default" className="space-y-10 md:space-y-14">
        
        {/* Section Header */}
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400" />
          <span className="text-xs font-mono font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase">
            {t.projects.title}
          </span>
        </div>

        {/* Section Headline & Top Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <Reveal direction="up" distance={20}>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
                {t.projects.headline}
              </h2>
            </Reveal>
            <Reveal direction="up" distance={20} delay={0.1}>
              <Text variant="body" className="text-muted-foreground font-normal">
                {t.projects.subtitle}
              </Text>
            </Reveal>
          </div>

          {/* 25/25 Status Milestone Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-emerald-500/30 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 shadow-xs flex-shrink-0 self-start md:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-400" />
            </span>
            <span>{t.projects.badge}</span>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setShowAll(false);
              }}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 cursor-pointer',
                filter === cat
                  ? 'bg-sky-600 text-white dark:bg-sky-400 dark:text-slate-950 shadow-xs'
                  : 'bg-surface text-muted-foreground hover:text-foreground hover:bg-muted border border-border/80'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Flip Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
          {displayedProjects.map((project, index) => (
            <Reveal
              key={project.id}
              direction="up"
              distance={20}
              delay={index * 0.04}
              className="h-full"
            >
              <FlipCard
                height="h-[240px] sm:h-[260px]"
                front={
                  <div className="h-full flex flex-col justify-between">
                    {/* Front Top: Number & Category & Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-sky-600 dark:text-sky-400">
                          #{project.id < 10 ? `0${project.id}` : project.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono text-muted-foreground uppercase font-semibold">
                          {project.cat}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {project.status}
                      </span>
                    </div>

                    {/* Front Center: Bold Project Name Title */}
                    <div className="my-auto py-2">
                      <Heading as="h3" className="text-xl sm:text-2xl font-black text-foreground group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors tracking-tight">
                        {project.name}
                      </Heading>
                    </div>

                    {/* Front Bottom: Flip Indicator */}
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-2 border-t border-border/60">
                      <span>Putar untuk deskripsi</span>
                      <Icon name="RotateCw" size={13} className="text-sky-600 dark:text-sky-400 group-hover:rotate-180 transition-transform duration-500" />
                    </div>
                  </div>
                }
                back={
                  <div className="h-full flex flex-col justify-between">
                    {/* Back Top: Project Title & Number */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-border/60">
                      <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                        {project.name}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground font-black">
                        #{project.id < 10 ? `0${project.id}` : project.id}
                      </span>
                    </div>

                    {/* Back Center: Tech Stack & Direct Repo Action */}
                    <div className="space-y-3 my-auto py-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase text-muted-foreground font-bold tracking-wider block">
                          DESKRIPSI & TEKNOLOGI
                        </span>
                        <p className="text-xs sm:text-sm font-mono font-semibold text-foreground">
                          {project.tech}
                        </p>
                      </div>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-500/10 transition-colors border border-border/80"
                        data-cursor="LINK"
                      >
                        <span>{t.projects.viewRepo}</span>
                        <Icon name="ArrowUpRight" size={13} />
                      </a>
                    </div>

                    {/* Back Bottom: Return Indicator */}
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

        {/* Elegant "Show More / Show Less" Toggle Bar */}
        {hasMore && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface hover:bg-muted border border-border/90 hover:border-sky-500/50 text-xs font-mono font-bold text-foreground shadow-sm transition-all duration-300 group cursor-pointer hover:scale-[1.03] active:scale-[0.96]"
              data-cursor="LINK"
            >
              <span>
                {showAll ? t.projects.showLess : `${t.projects.showMore} (${allFiltered.length})`}
              </span>
              <Icon
                name={showAll ? 'ChevronUp' : 'ChevronDown'}
                size={14}
                className="text-sky-600 dark:text-sky-400 group-hover:translate-y-0.5 transition-transform"
              />
            </button>
            <span className="text-[11px] font-mono text-muted-foreground">
              {t.projects.showingCount} {displayedProjects.length} {t.projects.ofCount} {allFiltered.length}
            </span>
          </div>
        )}

      </Container>
    </Section>
  );
}
