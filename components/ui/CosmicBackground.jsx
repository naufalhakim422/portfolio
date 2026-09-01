'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ui/ThemeProvider';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * World-Class Clean Background System.
 * - Pure floating particle starfield with smooth physics (Zero distracting connecting lines).
 * - Multi-layer glowing fluid aurora plasma mesh.
 * - Completely clean, seamless, and elegant across both Dark and Light modes.
 */
export default function CosmicBackground({ className }) {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });

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

    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
    let particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Gentle cursor push
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          this.x -= (dx / distance) * force * 1.5;
          this.y -= (dy / distance) * force * 1.5;
        }
      }

      draw() {
        const isDark = theme === 'dark';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(56, 189, 248, ${this.alpha})`
          : `rgba(2, 132, 199, ${this.alpha * 0.8})`;
        ctx.shadowBlur = isDark ? 10 : 4;
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

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!reducedMotion) {
        particles.forEach((p) => {
          p.update();
          p.draw();
        });
      } else {
        particles.forEach((p) => p.draw());
      }

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
      {/* 1. Floating Ambient Starfield Canvas (Zero connecting lines) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

      {/* 2. Fluid Glowing Aurora Plasma Mesh */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[600px] rounded-full bg-gradient-to-b from-sky-400/20 dark:from-sky-500/25 via-cyan-300/10 dark:via-cyan-400/15 to-transparent blur-[140px] animate-pulse" />
      <div className="absolute top-[35%] left-[-15%] w-[600px] sm:w-[900px] h-[600px] rounded-full bg-gradient-to-r from-sky-400/15 dark:from-blue-600/20 via-blue-300/8 dark:via-sky-500/10 to-transparent blur-[150px]" />
      <div className="absolute top-[60%] right-[-15%] w-[650px] sm:w-[900px] h-[650px] rounded-full bg-gradient-to-l from-sky-400/15 dark:from-cyan-500/15 via-blue-300/8 dark:via-blue-600/12 to-transparent blur-[150px]" />
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[550px] rounded-full bg-gradient-to-t from-sky-400/20 dark:from-sky-500/25 via-cyan-300/10 dark:via-cyan-400/15 to-transparent blur-[150px]" />
    </div>
  );
}
