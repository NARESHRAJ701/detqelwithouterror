import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { ArrowUpRight, Palette, Cpu, Code2, Sparkles, Compass } from 'lucide-react';

interface WorldSectionProps {
  onNavigateWork?: () => void;
}

const CAPABILITIES = [
  {
    number: '01',
    title: 'DESIGN',
    desc: 'Pixel Perfect UI/UX & Visual Systems',
    icon: Palette,
    color: 'text-[#B7E532]',
  },
  {
    number: '02',
    title: 'AI SOLUTIONS',
    desc: 'Intelligent Workflows & Agentic AI',
    icon: Cpu,
    color: 'text-[#00A676]',
  },
  {
    number: '03',
    title: 'DEVELOP',
    desc: 'Scalable Full-Stack Engineering',
    icon: Code2,
    color: 'text-[#3FA9E8]',
  },
  {
    number: '04',
    title: 'OPTIMIZE',
    desc: 'Performance that Turns into Impact',
    icon: Compass,
    color: 'text-[#FF6B35]',
  },
];

export const WorldSection: React.FC<WorldSectionProps> = ({ onNavigateWork }) => {
  return (
    <section
      id="second-section"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-8 lg:px-12 text-white overflow-hidden select-none font-sans"
    >
      <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* LEFT COLUMN: HEADLINE, COPY, 4 CAPABILITIES, CTA */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          
          {/* Section Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-[#00A676] font-mono text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00A676] animate-pulse" />
              <span>THAT INSPIRE, ENGAGE, EXPERIENCE...</span>
            </div>

            <h2 className="font-sans text-[clamp(2.5rem,5.5vw,5.2rem)] font-black uppercase text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] leading-[0.92]">
              WE BUILD<br />
              <span className="text-[#00A676] drop-shadow-[0_4px_16px_rgba(0,166,118,0.4)]">
                WORLDS.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-white/90 max-w-xl leading-relaxed font-medium drop-shadow-sm">
              By fusing design, technology, AI, and stories, we craft digital worlds that create emotion, drive action, and deliver real value.
            </p>
          </div>

          {/* 4 Capability Blocks (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {CAPABILITIES.map((cap) => {
              const IconComp = cap.icon;
              return (
                <motion.div
                  key={cap.number}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onMouseEnter={() => {
                    sound.playHover();
                    triggerCursor(cap.title, 'hover');
                  }}
                  onMouseLeave={() => triggerCursor('', 'default')}
                  className="p-4 rounded-2xl bg-black/35 hover:bg-black/50 backdrop-blur-xl border border-white/20 shadow-lg transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white/60">
                      {cap.number}
                    </span>
                    <IconComp className={`w-4 h-4 ${cap.color}`} />
                  </div>
                  <h3 className="font-pixel text-sm font-black text-white uppercase tracking-wider group-hover:text-[#B7E532] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="font-sans text-xs text-white/80 leading-snug">
                    {cap.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Explore Our Work CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playClick();
                if (onNavigateWork) onNavigateWork();
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => triggerCursor('EXPLORE', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00A676] hover:bg-[#B7E532] text-[#0A0D0F] font-mono text-xs font-bold tracking-wider uppercase shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: FEATURED PROJECT CARD (ISLAND WORLD) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-md p-5 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/25 shadow-2xl space-y-4 text-white"
          >
            {/* Header pill */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B7E532]">
                <Sparkles className="w-4 h-4" />
                <span>FEATURED WORK</span>
              </div>
              <span className="font-mono text-[10px] text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
                CASE STUDY
              </span>
            </div>

            {/* Project Image Preview with Floating Island */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 shadow-inner group">
              <img
                src="/images/second_section_bg.png"
                alt="Island World Immersive Experience"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[#B7E532] font-mono text-[10px] font-bold border border-white/20">
                  WEBGL • 3D ENVIRONMENT
                </span>
                <span className="text-[10px] font-mono text-white/80">
                  EST. 2026
                </span>
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-1">
              <span className="font-mono text-xs text-white/70 block uppercase">
                01 — IMMERSIVE DIGITAL EXPERIENCE
              </span>
              <h3 className="font-pixel text-xl font-bold text-white uppercase tracking-wide">
                ISLAND WORLD EXPERIENCE
              </h3>
              <p className="font-sans text-xs text-white/80 leading-relaxed pt-1">
                A living 3D interactive fantasy world built with custom WebGL shaders, spatial audio, and AI-driven narrative agents.
              </p>
            </div>

            {/* Project CTA Link */}
            <div className="pt-2 border-t border-white/15 flex items-center justify-between">
              <a
                href="#portfolio"
                onClick={() => sound.playClick()}
                onMouseEnter={() => triggerCursor('VIEW 001', 'hover')}
                onMouseLeave={() => triggerCursor('', 'default')}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#B7E532] hover:text-white transition-colors"
              >
                <span>VIEW PROJECT 001</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="font-mono text-[10px] text-white/50">
                LIVE PRODUCTION
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WorldSection;
