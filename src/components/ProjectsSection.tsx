import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../types';
import { PROJECTS_DATA } from '../data/projects';
import { MockupCanvas } from './MockupCanvas';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { ArrowUpRight, ArrowRight, CheckCircle2, Layers, Sparkles, Eye } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeProject = PROJECTS_DATA[activeIndex] || PROJECTS_DATA[0];

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 bg-grid-pattern border-b-2 border-ink selection:bg-accent-acid selection:text-ink">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b-2 border-ink gap-6">
          <div>
            <div className="flex items-center gap-2 text-ink/60 dark:text-gray-400 font-mono text-xs mb-3">
              <span className="bg-ink text-white dark:bg-accent-acid dark:text-ink px-2.5 py-0.5 font-pixel font-bold">
                01
              </span>
              <span>// ARCHIVE & SELECTED WORKS</span>
            </div>
            <h2 className="font-pixel text-4xl sm:text-6xl font-black uppercase text-ink dark:text-white tracking-tight">
              FEATURED PROJECTS<span className="text-accent-coral">.</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-ink/70 dark:text-gray-400 max-w-sm text-left sm:text-right space-y-1">
            <p className="font-bold text-ink dark:text-white uppercase flex items-center gap-2 sm:justify-end">
              <Sparkles className="w-3.5 h-3.5 text-accent-coral" /> CURATED STUDIO SHOWCASE
            </p>
            <p>Interactive editorial index of high-impact AI products, brand flagships, and spatial motion systems.</p>
          </div>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Editorial Navigation List (5 Projects) */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            <div className="flex items-center justify-between pb-3 border-b border-ink/20 font-mono text-xs text-ink/50 dark:text-gray-500 uppercase tracking-wider">
              <span>INDEX // REF</span>
              <span>PROJECT TITLE</span>
              <span>DISCIPLINE</span>
            </div>

            {PROJECTS_DATA.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => {
                    if (activeIndex !== index) {
                      setActiveIndex(index);
                      sound.playHover();
                    }
                    triggerCursor('INSPECT', 'hover');
                  }}
                  onMouseLeave={() => triggerCursor('', 'default')}
                  onClick={() => {
                    setActiveIndex(index);
                    sound.playClick();
                  }}
                  className={`group relative cursor-pointer py-5 px-4 rounded-xs border-b border-ink/15 transition-all duration-300 ${
                    isActive
                      ? 'bg-white dark:bg-canvas-dark-paper border-2 border-ink shadow-brutalist opacity-100 z-10'
                      : 'opacity-40 hover:opacity-85 hover:bg-white/50 dark:hover:bg-white/5'
                  }`}
                >
                  {/* Active Animated Side Bar Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="active-project-bar"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent-acid"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <div className="flex flex-col gap-2">
                    {/* Top Row: Number, Name, Category, Arrow */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`font-pixel text-base font-bold ${isActive ? 'text-ink dark:text-white' : 'text-ink/60 dark:text-gray-400'}`}>
                          {project.number}
                        </span>
                        <h3 className={`font-pixel text-xl sm:text-2xl font-black uppercase transition-colors ${
                          isActive ? 'text-ink dark:text-white' : 'text-ink/80 dark:text-gray-300 group-hover:text-ink'
                        }`}>
                          {project.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`hidden sm:inline font-mono text-[11px] font-bold px-2 py-0.5 rounded-xs border ${
                          isActive
                            ? 'bg-canvas-paper dark:bg-canvas-dark border-ink text-ink dark:text-white'
                            : 'border-ink/20 text-ink/60 dark:text-gray-400'
                        }`}>
                          {project.category.split('&')[0]}
                        </span>

                        <motion.div
                          animate={{ x: isActive ? 4 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={`p-1.5 rounded-xs border ${
                            isActive
                              ? 'bg-accent-acid text-ink border-ink font-bold shadow-brutalist-sm'
                              : 'border-transparent text-ink/40 group-hover:text-ink'
                          }`}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Bottom Row: Short One-Line Description */}
                    <p className={`font-sans text-sm line-clamp-2 pl-8 transition-colors ${
                      isActive ? 'text-ink/80 dark:text-gray-300 font-medium' : 'text-ink/60 dark:text-gray-500'
                    }`}>
                      {project.shortDescription}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Editorial Footer Tag */}
            <div className="pt-4 flex items-center justify-between font-mono text-[11px] text-ink/50 dark:text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-acid" /> LIVE SELECTION // {activeProject.number} OF 05
              </span>
              <span>DETQEL STUDIO © 2026</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Interactive Preview Panel */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 space-y-6">
            
            {/* Hero Visual Preview Container */}
            <div
              onClick={() => {
                sound.playClick();
                onSelectProject(activeProject);
              }}
              onMouseEnter={() => {
                sound.playHover();
                triggerCursor('VIEW CASE', 'view');
              }}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="relative aspect-[16/10] w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink shadow-brutalist rounded-xs overflow-hidden cursor-pointer group"
            >
              {/* Animated Project Image Crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <MockupCanvas
                    type={activeProject.mockupType}
                    accentColor={activeProject.accentColor}
                    imageSrc={activeProject.image}
                    title={activeProject.title}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Top Status Ribbon */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
                <span className="font-pixel text-[10px] font-bold bg-white text-ink px-2.5 py-1 border border-ink shadow-sm uppercase">
                  {activeProject.year}
                </span>
                <span className={`font-pixel text-[10px] font-bold px-2.5 py-1 text-ink border border-ink shadow-sm uppercase ${activeProject.bgAccent}`}>
                  {activeProject.badgeText}
                </span>
              </div>

              {/* Hover Inspection Overlay Hint */}
              <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="bg-white text-ink font-pixel text-xs font-bold px-5 py-2.5 border-2 border-ink shadow-brutalist flex items-center gap-2">
                  <Eye className="w-4 h-4 text-ink" /> CLICK TO INSPECT CASE STUDY
                </span>
              </div>
            </div>

            {/* Staggered Metadata & Deliverables Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id + '-details'}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white dark:bg-canvas-dark-paper border-2 border-ink p-6 sm:p-8 shadow-brutalist rounded-xs space-y-6"
              >
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-ink/20 pb-4 gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-accent-coral uppercase">
                      // {activeProject.category}
                    </span>
                    <h3 className="font-pixel text-3xl font-black uppercase text-ink dark:text-white mt-1">
                      {activeProject.title}
                    </h3>
                  </div>

                  <div className="font-mono text-xs text-right">
                    <span className="text-ink/60 dark:text-gray-400 block">CLIENT</span>
                    <span className="font-bold text-ink dark:text-white">{activeProject.client}</span>
                  </div>
                </div>

                {/* Project Description */}
                <p className="font-sans text-base sm:text-lg text-ink/80 dark:text-gray-300 leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Service Tags & Deliverables Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Service Tags */}
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold text-ink/60 dark:text-gray-400 flex items-center gap-1.5 uppercase">
                      <Layers className="w-3.5 h-3.5 text-accent-blue" /> STUDIO SERVICES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.serviceTags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] font-bold bg-canvas-paper dark:bg-canvas-dark px-2.5 py-1 border border-ink/30 rounded-xs text-ink dark:text-gray-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Deliverables Manifest */}
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold text-ink/60 dark:text-gray-400 flex items-center gap-1.5 uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-acid-green" /> KEY DELIVERABLES
                    </span>
                    <ul className="space-y-1 font-mono text-xs text-ink/80 dark:text-gray-300">
                      {activeProject.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="text-accent-acid-green font-bold">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-4 border-t border-ink/20 flex items-center justify-between">
                  <MagneticButton cursorText="VIEW">
                    <button
                      onClick={() => {
                        sound.playClick();
                        onSelectProject(activeProject);
                      }}
                      className={`inline-flex items-center gap-2 text-ink font-pixel text-xs font-bold px-6 py-3 border-2 border-ink shadow-brutalist hover:bg-ink hover:text-white dark:hover:bg-accent-acid dark:hover:text-ink transition-all ${activeProject.bgAccent}`}
                    >
                      EXPLORE CASE STUDY #{activeProject.number} <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </MagneticButton>

                  <div className="hidden sm:block font-mono text-xs text-ink/60 dark:text-gray-400 font-bold">
                    IMPACT: <span className="text-accent-coral">{activeProject.metrics}</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
};
