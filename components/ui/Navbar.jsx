'use client';

import React, { useState, useEffect } from 'react';
import Magnetic from '@/components/motion/Magnetic';
import Icon from '@/components/ui/Icon';
import { useLanguage } from '@/components/ui/LanguageProvider';
import { useTheme } from '@/components/ui/ThemeProvider';
import { cn } from '@/lib/utils';

/**
 * Ultra-Modern Floating Island Navbar.
 * High-contrast frosted glass capsule with seamless Light and Dark mode styling.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={cn(
          'pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 py-2.5 rounded-full border shadow-xl',
          scrolled
            ? 'bg-background/90 backdrop-blur-xl border-border dark:border-sky-500/20 scale-[0.98] shadow-lg'
            : 'bg-surface/90 backdrop-blur-lg border-border/80 dark:border-sky-500/20'
        )}
      >
        {/* Brand Monogram */}
        <Magnetic strength={0.2}>
          <a
            href="#hero"
            className="group flex items-center gap-2.5 text-xs font-mono font-bold tracking-wider text-foreground pr-2"
            data-cursor="LINK"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600 dark:bg-sky-400" />
            </span>
            <span className="group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">NAUFAL</span>
          </a>
        </Magnetic>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
              data-cursor="LINK"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Language Switcher & Theme Toggle */}
        <div className="flex items-center gap-1.5 pl-2">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLang}
            className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold text-foreground hover:text-sky-600 dark:hover:text-sky-400 hover:bg-muted/80 transition-all"
            data-cursor="LINK"
            aria-label="Switch Language"
          >
            {lang === 'en' ? 'EN' : 'ID'}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-foreground hover:text-sky-600 dark:hover:text-sky-400 hover:bg-muted/80 transition-all"
            data-cursor="LINK"
            aria-label="Toggle Theme"
          >
            {mounted && theme === 'light' ? (
              <Icon name="Sun" size={15} className="text-amber-500" />
            ) : (
              <Icon name="Moon" size={15} className="text-sky-400" />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-foreground hover:text-sky-600"
            aria-label="Toggle Menu"
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-16 left-4 right-4 max-w-sm mx-auto p-4 rounded-3xl bg-background/95 backdrop-blur-2xl border border-border shadow-2xl space-y-1 animate-fade-in md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-2xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
