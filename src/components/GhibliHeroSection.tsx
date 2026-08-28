import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { Project } from '../types';
import { PROJECTS_DATA } from '../data/projects';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { ArrowUpRight, Sparkles, Cpu, Code2, Zap, Palette, Layers, Terminal } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';

interface GhibliHeroSectionProps {
  onSelectProject?: (project: Project) => void;
}

const FLOATING_TAGS = [
  { text: 'AI Solutions', x: '18%', y: '16%', rot: -6, color: 'bg-white/80 text-emerald-950 border-emerald-300' },
  { text: 'UI / UX Design', x: '68%', y: '14%', rot: 4, color: 'bg-white/80 text-indigo-950 border-indigo-300' },
  { text: 'Web Development', x: '82%', y: '20%', rot: -3, color: 'bg-white/80 text-lime-950 border-lime-300' },
  { text: 'Development', x: '24%', y: '30%', rot: 5, color: 'bg-white/80 text-purple-950 border-purple-300' },
  { text: 'Automation', x: '86%', y: '32%', rot: 4, color: 'bg-white/80 text-sky-950 border-sky-300' },
];

const DOCK_PILLS = [
  { label: 'Branding', icon: Palette, color: 'bg-[#FF6B35]' },
  { label: 'AI Platform', icon: Cpu, color: 'bg-[#00A676]' },
  { label: 'Development', icon: Code2, color: 'bg-[#3FA9E8]' },
  { label: 'Automation', icon: Zap, color: 'bg-[#B7E532] text-black' },
  { label: 'Research', icon: Layers, color: 'bg-[#7C3AED]' },
  { label: 'Engineering', icon: Terminal, color: 'bg-[#EC4899]' },
];

export const GhibliHeroSection: React.FC<GhibliHeroSectionProps> = ({ onSelectProject }) => {
  const [hoveredDockIndex, setHoveredDockIndex] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 20 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  const [rightProjects, setRightProjects] = useState<Project[]>([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "project" && featured == true] | order(sortOrder asc, _createdAt desc) [0...3]`)
      .then((data) => {
        if (data && data.length > 0) {
          const mappedData = data.map((proj: any, idx: number) => ({
            ...proj,
            id: proj.slug?.current || proj._id,
            number: String(idx + 1).padStart(2, '0'),
            image: proj.coverImage ? urlFor(proj.coverImage).width(120).height(120).url() : '/projects/placeholder.png',
            tags: proj.services || [],
            bgAccent: proj.bgAccent || 'bg-accent-acid',
            badgeText: proj.badgeText || 'FEATURED',
            year: String(proj.year || 2026),
          }));
          setRightProjects(mappedData);
        } else {
          setRightProjects(PROJECTS_DATA.slice(0, 3));
        }
      })
      .catch(() => {
        setRightProjects(PROJECTS_DATA.slice(0, 3));
      });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 20);
      mouseY.set((e.clientY / innerHeight - 0.5) * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-8 flex flex-col justify-between overflow-hidden select-none font-sans">
      
      {/* 1. FLOATING SERVICE TAGS AROUND HERO */}
      <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
        {FLOATING_TAGS.map((tag, idx) => (
          <motion.div
            key={tag.text}
            style={{ left: tag.x, top: tag.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
              rotate: [tag.rot, tag.rot + 2, tag.rot]
            }}
            transition={{
              duration: 4.5 + idx * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.2
            }}
            className="absolute pointer-events-auto cursor-pointer"
            onMouseEnter={() => {
              sound.playHover();
              triggerCursor(tag.text.toUpperCase(), 'hover');
            }}
            onMouseLeave={() => triggerCursor('', 'default')}
          >
            <div className={`px-3 py-1.5 rounded-lg border backdrop-blur-md shadow-md text-xs font-mono font-bold flex items-center gap-1.5 hover:scale-110 transition-transform ${tag.color}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A676]" />
              <span>{tag.text}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. TOP RIGHT FLOATING PROJECT PREVIEW CARDS */}
      <div className="absolute top-24 right-6 sm:right-10 z-20 hidden xl:flex flex-col space-y-2.5 max-w-[280px]">
        {rightProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03, x: -4 }}
            onClick={() => {
              sound.playClick();
              if (onSelectProject) onSelectProject(project);
            }}
            onMouseEnter={() => {
              sound.playHover();
              triggerCursor('VIEW PROJECT', 'view', project.image);
            }}
            onMouseLeave={() => triggerCursor('', 'default')}
            className="p-2.5 rounded-2xl bg-black/35 hover:bg-black/50 backdrop-blur-xl border border-white/25 shadow-xl cursor-pointer transition-all flex items-center gap-3 group text-white"
          >
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/30 shrink-0 bg-neutral-900">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-pixel text-xs font-black text-white truncate uppercase tracking-wide">
                {project.title}
              </h4>
              <span className="font-mono text-[10px] text-white/70 block truncate">
                {project.category.split('&')[0]}
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#B7E532] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </motion.div>
        ))}
      </div>

      {/* 3. CENTER OVERSIZED HERO HEADLINE & SCALING PILL */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="relative z-10 max-w-6xl mx-auto my-auto text-center flex flex-col items-center justify-center py-6 sm:py-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* Main Huge Typography */}
          <h1 className="font-sans text-[clamp(2.6rem,7vw,6.8rem)] font-black uppercase text-white tracking-tight drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)] leading-[0.88] text-center">
            WE BUILD<br />
            <span className="text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
              AI-POWERED
            </span><br />
            PRODUCTS<br />
            <span className="text-[#B7E532] drop-shadow-[0_4px_18px_rgba(183,229,50,0.4)]">
              THAT SCALE.
            </span>
          </h1>

          {/* Scaling to Impact Center Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 text-white font-mono text-xs font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#B7E532]" />
            <span>SCALING TO IMPACT</span>
            <Sparkles className="w-3.5 h-3.5 text-[#B7E532]" />
          </div>
        </motion.div>
      </motion.div>

      {/* 4. BOTTOM BAR: LEFT MANIFESTO COPY + CENTER DOCK ICONS */}
      <div className="relative z-10 max-w-[1600px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-4">
        
        {/* Left Supporting Manifesto Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:col-span-6 lg:col-span-5 text-white drop-shadow-md space-y-2"
        >
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#B7E532]">
            <span className="w-4 h-0.5 bg-[#B7E532]" />
            <span>AI • DESIGN • TECHNOLOGY</span>
          </div>
          <p className="font-sans text-sm sm:text-base text-white/95 leading-relaxed max-w-md font-medium">
            We don't just build websites. We design brands, engineer software, and create AI-powered digital experiences.
          </p>
        </motion.div>

        {/* Center / Right Colorful Glass Dock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:col-span-6 lg:col-span-7 flex justify-start md:justify-end"
        >
          <div className="bg-black/35 backdrop-blur-xl border border-white/30 p-2 sm:p-2.5 rounded-2xl flex items-center gap-2 sm:gap-3 shadow-2xl">
            {DOCK_PILLS.map((item, dIdx) => {
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
                    scale: isHovered ? 1.25 : 1,
                    y: isHovered ? -8 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="relative cursor-pointer group"
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${item.color} border border-white/60 flex items-center justify-center text-white shadow-md`}>
                    <IconComp className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
                  </div>

                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap border border-white/20 shadow-md pointer-events-none"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>

    </section>
  );
};

export default GhibliHeroSection;
