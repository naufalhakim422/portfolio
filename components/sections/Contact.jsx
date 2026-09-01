'use client';

import React, { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Reveal from '@/components/motion/Reveal';
import TiltCard from '@/components/motion/TiltCard';
import Magnetic from '@/components/motion/Magnetic';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useLanguage } from '@/components/ui/LanguageProvider';

/**
 * Modern Luxury Contact Section.
 * Completely seamless card without unwanted divider lines,
 * clean responsive typography, and high-contrast elegance.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');
  const emailAddress = 'opaln9406@gmail.com';
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=Hello%20Naufal%20Hakim%20Muzaki`;
  const { lang, t } = useLanguage();

  // Real-time Jakarta Clock (UTC+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/naufalhakim422', icon: 'Github' },
    { label: 'Instagram', href: 'https://www.instagram.com/tumpulcs_/', icon: 'Instagram' },
    { label: 'Gmail Web', href: gmailComposeUrl, icon: 'Mail' },
  ];

  return (
    <Section id="contact" spacing="generous" className="relative pt-10 pb-16 overflow-hidden">
      {/* Soft Ambient Aurora Backdrop */}
      <div
        className="pointer-events-none absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/10 dark:bg-sky-500/15 blur-[150px] rounded-full"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 space-y-12 md:space-y-16">
        
        {/* Section Header Tag */}
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400" />
          <span className="text-xs font-mono font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase">
            {t.contact.title}
          </span>
        </div>

        {/* Monumental Headline */}
        <div className="space-y-4 max-w-3xl">
          <Reveal direction="up" distance={25}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.08]">
              {lang === 'id' ? (
                <>
                  Punya ide proyek atau peluang? <br />
                  <span className="text-sky-600 dark:text-sky-400">Mari wujudkan bersama.</span>
                </>
              ) : (
                <>
                  Have a project or opportunity? <br />
                  <span className="text-sky-600 dark:text-sky-400">Let&apos;s build something great.</span>
                </>
              )}
            </h2>
          </Reveal>

          <Reveal direction="up" distance={20} delay={0.1}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
              {t.contact.description}
            </p>
          </Reveal>
        </div>

        {/* Seamless Luxury Contact Card (No Internal Divider Lines) */}
        <Reveal direction="up" distance={25} delay={0.15}>
          <TiltCard
            maxTilt={3}
            className="p-6 sm:p-10 md:p-12 rounded-3xl bg-surface/95 dark:bg-surface/85 backdrop-blur-xl border border-border/80 dark:border-sky-500/30 shadow-lg dark:shadow-[0_0_40px_rgba(0,0,0,0.4)] space-y-8"
          >
            {/* Card Top: Live Availability & Jakarta Clock */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 dark:bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-bold text-foreground">
                  {lang === 'id' ? 'TERSEDIA UNTUK KOLABORASI' : 'AVAILABLE FOR COLLABORATIONS'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Icon name="Clock" size={13} className="text-sky-600 dark:text-sky-400" />
                <span>JAKARTA (WIB)</span>
                <span className="text-sky-600 dark:text-sky-400 font-bold">{time || '21:00:00'}</span>
              </div>
            </div>

            {/* Card Center: Clean Email & Direct Action Buttons */}
            <div className="space-y-6 pt-2">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 font-bold block">
                  {t.contact.directInbox}
                </span>
                
                {/* Full Unbroken Email Address */}
                <a
                  href={`mailto:${emailAddress}`}
                  className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground hover:text-sky-600 dark:hover:text-sky-400 transition-colors tracking-tight"
                  data-cursor="LINK"
                >
                  {emailAddress}
                </a>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  magnetic
                  href={`mailto:${emailAddress}`}
                  cursorState="LINK"
                >
                  <span>{t.contact.composeEmail}</span>
                  <Icon name="Send" size={15} />
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  magnetic
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  cursorState="LINK"
                >
                  <Icon name="ExternalLink" size={15} className="text-sky-600 dark:text-sky-400" />
                  <span>Gmail Web</span>
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  magnetic
                  cursorState="LINK"
                  onClick={handleCopyEmail}
                >
                  <Icon
                    name={copied ? 'Check' : 'Copy'}
                    size={15}
                    className={copied ? 'text-emerald-600 dark:text-emerald-400' : 'text-sky-600 dark:text-sky-400'}
                  />
                  <span>{copied ? t.contact.copied : t.contact.copyAddress}</span>
                </Button>
              </div>
            </div>

            {/* Card Bottom: Social Channels & Touchpoints */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-6 text-sm">
                {socialLinks.map((item) => (
                  <Magnetic key={item.label} strength={0.15}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium text-xs font-mono"
                      data-cursor="LINK"
                    >
                      <span>{item.label}</span>
                      <Icon name="ArrowUpRight" size={12} className="text-sky-600 dark:text-sky-400" />
                    </a>
                  </Magnetic>
                ))}
              </div>

              <span className="text-xs font-mono text-muted-foreground">
                Respons time: &lt; 24 jam
              </span>
            </div>
          </TiltCard>
        </Reveal>

        {/* Clean Luxury Footer */}
        <footer className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>
            <span>© {new Date().getFullYear()} Naufal Hakim Muzaki. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Magnetic strength={0.25}>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                data-cursor="LINK"
              >
                <span>Back to top</span>
                <Icon name="ArrowUp" size={13} className="text-sky-600 dark:text-sky-400" />
              </button>
            </Magnetic>
          </div>
        </footer>
      </Container>
    </Section>
  );
}
