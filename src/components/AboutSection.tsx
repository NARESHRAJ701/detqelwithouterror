import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code2, Globe, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {

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

      </div>
    </section>
  );
};
