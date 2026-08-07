import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import type { Project } from '../types';
import { PROJECTS_DATA } from '../data/projects';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { ArrowRight, Sparkles, Cpu, Code2, Zap, Compass, Smartphone, Palette } from 'lucide-react';

interface GhibliHeroSectionProps {
  onSelectProject?: (project: Project) => void;
}

const SERVICE_TAGS = [
  { text: 'AI Solutions', rotation: -5, xOffset: '-22vw', yOffset: '-17vh', color: 'bg-emerald-100 text-emerald-900 border-emerald-300', clipColor: '#10B981' },
  { text: 'Brand Identity', rotation: 4, xOffset: '0vw', yOffset: '-24vh', color: 'bg-indigo-100 text-indigo-900 border-indigo-300', clipColor: '#6366F1' },
  { text: 'UI/UX Design', rotation: -3, xOffset: '22vw', yOffset: '-17vh', color: 'bg-lime-200 text-lime-950 border-lime-400', clipColor: '#84CC16' },
  { text: 'Web Development', rotation: 5, xOffset: '25vw', yOffset: '0vh', color: 'bg-sky-100 text-sky-900 border-sky-300', clipColor: '#0EA5E9' },
  { text: 'Automation', rotation: -4, xOffset: '20vw', yOffset: '15vh', color: 'bg-amber-100 text-amber-900 border-amber-300', clipColor: '#F59E0B' },
  { text: 'ERP & CRM Systems', rotation: 2, xOffset: '0vw', yOffset: '21vh', color: 'bg-teal-100 text-teal-900 border-teal-300', clipColor: '#14B8A6' },
  { text: 'SaaS Products', rotation: 3, xOffset: '-20vw', yOffset: '15vh', color: 'bg-purple-100 text-purple-900 border-purple-300', clipColor: '#A855F7' },
  { text: 'Mobile Apps', rotation: -2, xOffset: '-25vw', yOffset: '0vh', color: 'bg-pink-100 text-pink-900 border-pink-300', clipColor: '#EC4899' },
];

const DOCK_ITEMS = [
  { label: 'Branding', icon: Palette, color: 'from-amber-400 to-orange-500' },
  { label: 'AI Platform', icon: Cpu, color: 'from-cyan-400 to-blue-600' },
  { label: 'Development', icon: Code2, color: 'from-emerald-400 to-teal-600' },
  { label: 'Automation', icon: Zap, color: 'from-yellow-400 to-amber-600' },
  { label: 'Research', icon: Compass, color: 'from-purple-400 to-indigo-600' },
  { label: 'Mobile Apps', icon: Smartphone, color: 'from-pink-400 to-rose-600' },
];

export const GhibliHeroSection: React.FC<GhibliHeroSectionProps> = ({ onSelectProject }) => {
  const [hoveredDockIndex, setHoveredDockIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();

  // Scroll Parallax
  const bgY = useTransform(scrollY, [0, 800], [0, 150]);
  const contentY = useTransform(scrollY, [0, 800], [0, -80]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const parallaxMouseX = useSpring(mouseX, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Selected 3 Right Cards
  const rightProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <div className="relative w-full h-screen h-[100vh] max-h-[100vh] overflow-hidden bg-[#87CEEB] selection:bg-accent-acid selection:text-ink font-sans">
      
      {/* 1. STUDIO GHIBLI HAND-PAINTED LANDSCAPE BACKGROUND WITH PARALLAX */}
      <motion.div
        style={{
          y: bgY,
          x: parallaxMouseX,
          scale: 1.05
        }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
      >
        <img
          src="/images/herobg.png"
          alt="Studio Ghibli Landscape"
          className="w-full h-full object-cover object-center"
        />
        
        {/* Soft Morning Atmosphere Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 via-transparent to-emerald-950/30" />
      </motion.div>

      {/* 2. DRIFTING VOLUMETRIC CLOUDS & ANIMATED BIRDS OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {/* Animated Flying Birds */}
        <motion.div
          animate={{
            x: ['-10%', '110%'],
            y: ['20%', '15%', '25%']
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute top-24 left-0 text-white/70"
        >
          <svg width="60" height="24" viewBox="0 0 60 24" fill="currentColor">
            <path d="M 0 12 Q 15 0 30 12 Q 45 0 60 12 Q 45 6 30 16 Q 15 6 0 12 Z" opacity="0.8" />
          </svg>
        </motion.div>

        <motion.div
          animate={{
            x: ['-20%', '120%'],
            y: ['40%', '35%', '42%']
          }}
          transition={{
            duration: 48,
            repeat: Infinity,
            delay: 15,
            ease: 'linear'
          }}
          className="absolute top-48 left-0 text-white/50 scale-75"
        >
          <svg width="60" height="24" viewBox="0 0 60 24" fill="currentColor">
            <path d="M 0 12 Q 15 0 30 12 Q 45 0 60 12 Q 45 6 30 16 Q 15 6 0 12 Z" opacity="0.8" />
          </svg>
        </motion.div>

        {/* Soft Drifting Cloud Shadows */}
        <motion.div
          animate={{ x: ['-30%', '100%'] }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-10 left-0 w-[600px] h-[300px] bg-white/20 blur-3xl rounded-full"
        />
      </div>

      {/* 3. HERO CONTENT WRAPPER - Centered responsive container (max-w: 1600px, width: 92vw, margin: 0 auto) */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 w-[92vw] max-w-[1600px] h-full flex flex-col justify-between mx-auto pt-[clamp(4.5rem,7vh,5.5rem)] pb-[clamp(1rem,3vh,2rem)] px-2 sm:px-4 box-border overflow-hidden"
      >
        {/* TOP STATUS CARD (LEFT SAFE AREA) */}
        <div className="flex justify-between items-start shrink-0 pt-2 sm:pt-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 bg-white/40 dark:bg-black/40 backdrop-blur-md px-3.5 py-1.5 border border-white/50 dark:border-white/20 rounded-full shadow-lg"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-800 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-xs shrink-0">
              ⚡
            </div>
            <div className="font-mono text-[clamp(0.75rem,0.8vw,0.9rem)] text-white drop-shadow-xs">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-accent-acid animate-ping" />
                <span>Available for Projects</span>
              </div>
              <span className="text-white/80 text-[clamp(0.65rem,0.7vw,0.75rem)]">DETQEL — AI-Powered Product Studio</span>
            </div>
          </motion.div>
        </div>

        {/* CENTER MAIN HERO HEADLINE WITH FLOATING SERVICE TAGS */}
        <div className="relative my-auto py-2 sm:py-4 text-center flex flex-col items-center justify-center shrink-1 min-h-0">
          
          {/* FLOATING PAPER SERVICE TAGS AROUND HEADLINE */}
          <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
            {SERVICE_TAGS.map((tag, idx) => (
              <div
                key={tag.text}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{
                  top: `calc(50% + ${tag.yOffset})`,
                  left: `calc(50% + ${tag.xOffset})`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -8, 0],
                    rotate: [tag.rotation, tag.rotation + 3, tag.rotation]
                  }}
                  transition={{
                    duration: 4 + idx * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: idx * 0.15
                  }}
                  className={`cursor-pointer font-mono text-[clamp(0.7rem,0.75vw,0.85rem)] font-bold px-3 py-1.5 rounded-xs border-2 border-ink shadow-brutalist flex items-center gap-1.5 hover:scale-110 transition-transform ${tag.color}`}
                  onMouseEnter={() => {
                    sound.playHover();
                    triggerCursor('SERVICE', 'hover');
                  }}
                  onMouseLeave={() => triggerCursor('', 'default')}
                >
                  {/* Paperclip */}
                  <div className="w-2 h-3.5 border-2 border-ink rounded-xs -mt-2.5 shadow-xs" style={{ borderColor: tag.clipColor }} />
                  <span>{tag.text}</span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* OVERSIZED HERO HEADLINE WITH RESPONSIVE CLAMP TYPOGRAPHY & MAX 55% VH */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[55vh] flex items-center justify-center"
          >
            <h1 className="font-sans text-[clamp(2.5rem,5.2vw,6.5rem)] font-black uppercase text-white tracking-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] leading-[0.88] text-center">
              WE BUILD<br />
              <span className="text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
                AI-POWERED
              </span><br />
              PRODUCTS<br />
              <span className="text-accent-acid drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                THAT SCALE.
              </span>
            </h1>
          </motion.div>

        </div>

        {/* BOTTOM SECTION: LEFT SUPPORTING STATEMENT + CENTER DOCK + RIGHT PROJECT CARDS STACK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-end shrink-0 pb-2 sm:pb-4">
          
          {/* LEFT SUPPORTING STATEMENT (THE DETQEL MANIFESTO) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 space-y-1.5 text-white drop-shadow-md pb-1"
          >
            <div className="flex items-center gap-2 font-mono text-[clamp(0.68rem,0.75vw,0.8rem)] text-white/90 font-bold">
              <span className="w-5 h-0.5 bg-white" />
              <span>THE DETQEL MANIFESTO</span>
            </div>
            <p className="font-sans text-[clamp(0.85rem,1.05vw,1.15rem)] font-medium text-white/95 leading-relaxed max-w-xs sm:max-w-sm">
              We don't just build websites. We design brands, engineer software, and create AI-powered digital experiences.
            </p>
          </motion.div>

          {/* CENTER MACOS-INSPIRED FLOATING DOCK */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 flex justify-center py-1 sm:py-2"
          >
            <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/20 p-2 sm:p-2.5 rounded-3xl flex items-center gap-2 sm:gap-3 shadow-2xl">
              {DOCK_ITEMS.map((item, dIdx) => {
                const IconComp = item.icon;
                const isHovered = hoveredDockIndex === dIdx;

                return (
                  <motion.div
                    key={item.label}
                    onMouseEnter={() => {
                      setHoveredDockIndex(dIdx);
                      sound.playHover();
                      triggerCursor(item.label.toUpperCase(), 'hover');
                    }}
                    onMouseLeave={() => {
                      setHoveredDockIndex(null);
                      triggerCursor('', 'default');
                    }}
                    animate={{
                      scale: isHovered ? 1.3 : 1,
                      y: isHovered ? -10 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="relative cursor-pointer group"
                  >
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br ${item.color} border-2 border-white/60 flex items-center justify-center text-white shadow-lg`}>
                      <IconComp className="w-5 h-5 lg:w-6 lg:h-6 drop-shadow-md" />
                    </div>

                    {/* Tooltip Label */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-9 left-1/2 -translate-x-1/2 bg-black/80 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap border border-white/20 shadow-md pointer-events-none"
                      >
                        {item.label}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT VERTICAL STACK OF PROJECT PREVIEW CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-4 flex flex-col space-y-2 items-end"
          >
            <div className="font-mono text-[clamp(0.68rem,0.75vw,0.8rem)] text-white/80 font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-accent-acid" /> FEATURED WORKS PREVIEW
            </div>

            {rightProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02, x: -4 }}
                onClick={() => {
                  sound.playClick();
                  if (onSelectProject) onSelectProject(project);
                }}
                onMouseEnter={() => {
                  sound.playHover();
                  triggerCursor('', 'view', project.image);
                }}
                onMouseLeave={() => triggerCursor('', 'default')}
                className="w-full max-w-[240px] sm:max-w-[270px] lg:max-w-[290px] bg-white/25 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/20 p-2 sm:p-2.5 rounded-xl shadow-xl cursor-pointer transition-all group flex items-center gap-2.5"
              >
                {/* Thumbnail */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-white/40 shrink-0 bg-neutral-900">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Text Details */}
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[clamp(0.65rem,0.7vw,0.75rem)] font-bold text-white/70 block uppercase truncate">
                    {project.category.split('&')[0]} • {project.year}
                  </span>
                  <h4 className="font-pixel text-[clamp(0.75rem,0.85vw,0.9rem)] font-bold text-white truncate uppercase">
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[clamp(0.65rem,0.7vw,0.75rem)] font-mono font-bold text-accent-acid mt-0.5">
                    <span>VIEW CASE STUDY</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </motion.div>
    </div>
  );
};
