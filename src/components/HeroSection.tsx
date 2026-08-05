import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StickyNote } from './StickyNote';
import { INITIAL_STICKY_NOTES } from '../data/projects';
import { MagneticButton } from './MagneticButton';
import { ArrowDownRight, Sparkles, Code, Cpu, Layers, Terminal, Award } from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';

export const HeroSection: React.FC = () => {
  const [stickyNotes] = useState(INITIAL_STICKY_NOTES);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -100]);

  const skillsList = [
    'REACT & NEXT.JS',
    'THREE.JS & WEBGL',
    'FRAMER MOTION',
    'SYSTEMS ARCHITECTURE',
    'SWISS TYPOGRAPHY',
    'AWWWARDS SOTD',
    'CREATIVE DIRECTION',
    'INTERACTION DESIGN',
    'PERFORMANCE 60FPS',
    'TAILWIND CSS',
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-8 bg-grid-pattern overflow-hidden flex flex-col justify-between border-b-2 border-ink">
      {/* Background Engineering Grid Blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-canvas/50 to-canvas dark:via-canvas-dark/50 dark:to-canvas-dark pointer-events-none" />

      {/* Floating Draggable Sticky Notes */}
      <div className="hidden lg:block">
        {stickyNotes.map((note) => (
          <div
            key={note.id}
            style={{
              top: `${note.y}px`,
              left: `${note.x}%`,
            }}
            className="absolute z-30"
          >
            <StickyNote note={note} />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        {/* Top Floating Badge & Rotated Paper Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          {/* Status Badge */}
          <span className="inline-flex items-center gap-2 bg-ink text-accent-acid dark:bg-accent-acid dark:text-ink font-mono text-xs px-3 py-1.5 rounded-xs border border-ink shadow-brutalist-sm">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>SENIOR MULTIDISCIPLINARY CREATIVE TECH</span>
          </span>

          {/* Rotated Paper Card 1 */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="hidden sm:inline-flex items-center gap-1.5 bg-sticky-yellow text-ink font-handwriting text-base font-bold px-3 py-1 -rotate-2 border border-black/20 shadow-sm"
          >
            <Award className="w-4 h-4 text-ink" /> ★ 20+ Global Awards
          </motion.div>

          {/* Rotated Paper Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="hidden sm:inline-flex items-center gap-1.5 bg-sticky-pink text-ink font-mono text-xs font-bold px-3 py-1 rotate-3 border border-black/20 shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-ink" /> 20+ Yrs Exp
          </motion.div>
        </motion.div>

        {/* Massive Pixel Heading */}
        <motion.div style={{ y: parallaxY }} className="relative mb-8">
          {/* Paper Tape Sticker Over Title */}
          <div className="tape-sticker tape-sticker-yellow w-32 h-8 top-[-16px] left-12 rotate-[-5deg] z-20 hidden md:block" />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-ink dark:text-white leading-[0.95]"
          >
            UNFORGETTABLE
            <br />
            <span className="text-stroke-sm dark:text-stroke-white text-transparent hover:text-accent-acid transition-colors duration-300">
              DIGITAL
            </span>{' '}
            EXPERIENCES<span className="text-accent-coral">.</span>
          </motion.h1>

          {/* Scattered Sub-labels */}
          <span className="absolute right-0 top-2 font-mono text-xs uppercase bg-white dark:bg-canvas-dark-paper border border-ink px-2 py-1 rotate-3 shadow-brutalist-sm hidden xl:block">
            [SWISS + BRUTALIST ENGINE]
          </span>
        </motion.div>

        {/* Subheading & Editorial Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-10"
        >
          <div className="md:col-span-8">
            <p className="font-sans text-lg sm:text-xl md:text-2xl text-ink/80 dark:text-gray-300 font-medium leading-relaxed max-w-3xl">
              I design and engineer award-winning web platforms combining <strong className="text-ink dark:text-white underline decoration-accent-acid decoration-4">Swiss brutalist grid systems</strong>, bespoke 3D WebGL motion, and seamless full-stack architecture.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col items-start md:items-end gap-2 font-mono text-xs text-ink/60 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-accent-blue" />
              <span>React / Next.js / TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-accent-coral" />
              <span>Three.js / GLSL / Motion</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent-acid-green" />
              <span>Pixel-perfect Design Systems</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <MagneticButton cursorText="EXPLORE">
            <a
              href="#projects"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-3 bg-ink text-white dark:bg-accent-acid dark:text-ink px-6 sm:px-8 py-4 font-pixel text-sm sm:text-base font-bold uppercase border-2 border-ink shadow-brutalist hover:bg-accent-coral hover:text-white transition-all group"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </a>
          </MagneticButton>

          <MagneticButton cursorText="COPY EMAIL">
            <button
              onClick={() => {
                sound.playSuccess();
                navigator.clipboard.writeText('hello@aex-studio.design');
                triggerCursor('COPIED! ⚡', 'hover');
                setTimeout(() => triggerCursor('', 'default'), 2000);
              }}
              className="inline-flex items-center gap-2 bg-white dark:bg-canvas-dark-paper text-ink dark:text-white px-6 sm:px-8 py-4 font-mono text-xs sm:text-sm font-bold uppercase border-2 border-ink shadow-brutalist hover:bg-sticky-yellow hover:text-ink transition-all"
            >
              <span>COPY EMAIL</span>
              <span className="text-ink/40 dark:text-white/40">hello@aex-studio.design</span>
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Infinite Marquee Footer Ticker */}
      <div className="w-full mt-16 bg-ink text-white dark:bg-accent-acid dark:text-ink py-3 border-t-2 border-b-2 border-ink overflow-hidden font-pixel text-xs sm:text-sm tracking-widest uppercase">
        <div className="flex w-[200%] animate-marquee whitespace-nowrap">
          {Array(2)
            .fill(skillsList)
            .flat()
            .map((item, idx) => (
              <span key={idx} className="flex items-center gap-6 mx-4">
                <span>{item}</span>
                <span className="text-accent-coral">★</span>
              </span>
            ))}
        </div>
      </div>
    </section>
  );
};
