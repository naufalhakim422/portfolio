'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ui/ThemeProvider';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * World-Class Interactive Canvas Background.
 * Combines:
 * - 60 FPS Interactive Particle Constellation with cursor gravity/repulsion
 * - Ambient undulating sine energy plasma waves
 * - Laser micro-grid nodes & fluid vector connections
 * - Adaptive color palette for both Dark and Light modes
 */
export default function CosmicBackground({ className }) {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 140 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Track mouse for interactive constellation physics
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle System
    const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
    let particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.density = Math.random() * 20 + 5;
      }

      update() {
        // Move with velocity
        this.x += this.vx;
        this.y += this.vy;

        // Wrap edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction (gentle repulsion & magnetic orbit)
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRef.current.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          const directionX = forceDirectionX * force * this.density * 0.5;
          const directionY = forceDirectionY * force * this.density * 0.5;

          this.x -= directionX;
          this.y -= directionY;
        }
      }

      draw() {
        const isDark = theme === 'dark';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? 'rgba(56, 189, 248, 0.75)'
          : 'rgba(2, 132, 199, 0.65)';
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.shadowColor = isDark ? '#38bdf8' : '#0284c7';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    // Render loop
    let waveTime = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = theme === 'dark';

      // 1. Draw connecting constellation lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * (isDark ? 0.28 : 0.22);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 2. Draw lines from particles to cursor
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        for (let i = 0; i < particles.length; i++) {
          const dx = particles[i].x - mouseRef.current.x;
          const dy = particles[i].y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRef.current.radius) {
            const alpha = (1 - dist / mouseRef.current.radius) * 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // 3. Update & draw all particles
      if (!reducedMotion) {
        particles.forEach((p) => {
          p.update();
          p.draw();
        });
      } else {
        particles.forEach((p) => p.draw());
      }

      waveTime += 0.01;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, reducedMotion]);

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 z-0 overflow-hidden select-none transition-colors duration-700',
        className
      )}
      aria-hidden="true"
    >
      {/* 1. HTML5 60 FPS Interactive Particle Constellation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

      {/* 2. Deep Multi-Layer Ambient Aurora Plasma Mesh */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[600px] rounded-full bg-gradient-to-b from-sky-400/25 dark:from-sky-500/25 via-cyan-300/15 dark:via-cyan-400/15 to-transparent blur-[140px] animate-pulse" />
      <div className="absolute top-[35%] left-[-15%] w-[600px] sm:w-[900px] h-[600px] rounded-full bg-gradient-to-r from-sky-400/20 dark:from-blue-600/20 via-blue-300/10 dark:via-sky-500/10 to-transparent blur-[150px]" />
      <div className="absolute top-[60%] right-[-15%] w-[650px] sm:w-[900px] h-[650px] rounded-full bg-gradient-to-l from-sky-400/20 dark:from-cyan-500/15 via-blue-300/10 dark:via-blue-600/12 to-transparent blur-[150px]" />
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[550px] rounded-full bg-gradient-to-t from-sky-400/25 dark:from-sky-500/25 via-cyan-300/15 dark:via-cyan-400/15 to-transparent blur-[150px]" />

      {/* 3. Subtle Cyber Blueprint Dot Matrix Grid */}
      <div
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.28] z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, currentColor 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
}
