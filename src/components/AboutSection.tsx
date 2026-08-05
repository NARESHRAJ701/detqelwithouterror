import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PolaroidGallery } from './PolaroidGallery';
import { POLAROID_DATA } from '../data/projects';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { Award, Zap, Code2, Globe, Cpu, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ALL');

  const skillsData = [
    { name: 'React / Next.js 15', category: 'FRONTEND', color: 'bg-blue-100 text-blue-900 border-blue-300' },
    { name: 'TypeScript', category: 'FRONTEND', color: 'bg-sky-100 text-sky-900 border-sky-300' },
    { name: 'Three.js & WebGL', category: '3D/WEBGL', color: 'bg-purple-100 text-purple-900 border-purple-300' },
    { name: 'GLSL Shaders', category: '3D/WEBGL', color: 'bg-pink-100 text-pink-900 border-pink-300' },
    { name: 'Framer Motion', category: 'MOTION', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    { name: 'GSAP & ScrollTrigger', category: 'MOTION', color: 'bg-green-100 text-green-900 border-green-300' },
    { name: 'Swiss Typography', category: 'DESIGN', color: 'bg-amber-100 text-amber-900 border-amber-300' },
    { name: 'Design Systems Architecture', category: 'SYSTEMS', color: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
    { name: 'Stripe & Fintech APIs', category: 'SYSTEMS', color: 'bg-violet-100 text-violet-900 border-violet-300' },
    { name: 'Tailwind CSS', category: 'FRONTEND', color: 'bg-teal-100 text-teal-900 border-teal-300' },
    { name: 'WebGPU & Canvas', category: '3D/WEBGL', color: 'bg-rose-100 text-rose-900 border-rose-300' },
    { name: 'Performance Optimization', category: 'SYSTEMS', color: 'bg-yellow-100 text-yellow-900 border-yellow-300' },
  ];

  const categories = ['ALL', 'FRONTEND', 'MOTION', '3D/WEBGL', 'DESIGN', 'SYSTEMS'];

  const filteredSkills = activeTab === 'ALL'
    ? skillsData
    : skillsData.filter((s) => s.category === activeTab);

  const stats = [
    { label: 'AWWWARDS & FWA', value: '24+', icon: Award, color: 'text-accent-coral' },
    { label: 'SHIPPED PLATFORMS', value: '48+', icon: Globe, color: 'text-accent-blue' },
    { label: 'PROD CODE LINES', value: '180K', icon: Code2, color: 'text-accent-acid-green' },
    { label: 'CLIENT SATISFACTION', value: '100%', icon: CheckCircle2, color: 'text-accent-purple' },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-8 bg-canvas dark:bg-canvas-dark border-b-2 border-ink">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b-2 border-ink gap-4">
          <div>
            <div className="flex items-center gap-2 text-ink/60 dark:text-gray-400 font-mono text-xs mb-2">
              <span className="bg-ink text-white dark:bg-accent-acid dark:text-ink px-2 py-0.5 font-pixel">
                02
              </span>
              <span>// MANIFESTO & CRAFT</span>
            </div>
            <h2 className="font-pixel text-3xl sm:text-5xl font-black uppercase text-ink dark:text-white">
              DESIGN WITH PURPOSE<span className="text-accent-coral">.</span>
            </h2>
          </div>

          <span className="font-handwriting text-2xl text-ink/70 dark:text-gray-300 font-bold rotate-[-2deg]">
            "Less, but unforgettable."
          </span>
        </div>

        {/* Editorial Grid: Main Bio & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          {/* Left Column: Big Editorial Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-ink/80 dark:text-gray-300 text-lg sm:text-xl leading-relaxed"
          >
            <p className="font-sans font-medium text-ink dark:text-white text-2xl sm:text-3xl leading-snug">
              I bridges the gap between high-end digital design and bulletproof technical execution.
            </p>
            <p>
              Over the past two decades, I’ve partnered with visionary startups, global luxury houses, and pioneer tech studios—building web products that prioritize typography, motion design, and emotional engagement.
            </p>
            <p className="font-mono text-sm bg-white dark:bg-canvas-dark-paper p-4 rounded-xs border-2 border-ink shadow-brutalist">
              ⚡ <strong>Design Philosophy:</strong> Whitespace is part of the layout. Typography dictates the rhythm. Motion guides human focus. Never ship templates.
            </p>
          </motion.div>

          {/* Right Column: Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-canvas-dark-paper p-6 rounded-xs border-2 border-ink shadow-brutalist hover:translate-x-1 hover:-translate-y-1 transition-transform"
                >
                  <IconComp className={`w-6 h-6 mb-3 ${stat.color}`} />
                  <div className="font-pixel text-3xl sm:text-4xl font-bold text-ink dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs text-ink/60 dark:text-gray-400 uppercase font-bold tracking-wider">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Polaroid Archive Gallery */}
        <div className="mb-20">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-pixel text-xl sm:text-2xl font-bold uppercase text-ink dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent-coral" /> BEHIND THE SCENES // RAW ARCHIVE
            </h3>
            <span className="font-mono text-xs text-ink/60 dark:text-gray-400">
              [HOVER TO INSPECT]
            </span>
          </div>

          <PolaroidGallery items={POLAROID_DATA} />
        </div>

        {/* Filterable Skill Chips */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="font-pixel text-xl sm:text-2xl font-bold uppercase text-ink dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-accent-blue" /> TECHNICAL ARSENAL & SKILLS
              </h3>
              <p className="font-mono text-xs text-ink/60 dark:text-gray-400 mt-1">
                Filter technologies by discipline
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-white dark:bg-canvas-dark-paper p-1 rounded-xs border-2 border-ink shadow-brutalist-sm font-mono text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(cat);
                  }}
                  className={`px-3 py-1 rounded-xs transition-colors font-bold ${
                    activeTab === cat
                      ? 'bg-ink text-white dark:bg-accent-acid dark:text-ink'
                      : 'hover:bg-black/5 dark:hover:bg-white/10 text-ink dark:text-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Chips Cloud */}
          <div className="flex flex-wrap gap-3">
            {filteredSkills.map((skill, idx) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                onMouseEnter={() => {
                  sound.playHover();
                  triggerCursor('SKILL', 'hover');
                }}
                onMouseLeave={() => triggerCursor('', 'default')}
                className={`font-mono text-xs font-bold px-4 py-2 rounded-xs border-2 border-ink shadow-brutalist-sm hover:scale-105 transition-transform cursor-pointer ${skill.color}`}
              >
                ⚡ {skill.name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
