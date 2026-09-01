'use client';

import React from 'react';
import WelcomeIntro from '@/components/ui/WelcomeIntro';
import CosmicBackground from '@/components/ui/CosmicBackground';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen text-foreground selection:bg-sky-500 selection:text-white relative z-[2]">
      <CosmicBackground />
      <WelcomeIntro />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
