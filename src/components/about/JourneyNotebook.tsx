import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Rocket, TrendingUp, Trophy, Star } from 'lucide-react';
import { sound } from '../../utils/sound';

export const JourneyNotebook: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const milestones = [
    {
      year: '2022',
      title: 'The Idea',
      icon: Lightbulb,
      desc: 'Formed DetQel studio with a core passion for bespoke web engineering.'
    },
    {
      year: '2023',
      title: 'First Projects',
      icon: Rocket,
      desc: 'Shipped 15+ full-stack web applications and AI workflow automations.'
    },
    {
      year: '2024',
      title: 'Growth & Trust',
      icon: TrendingUp,
      desc: 'Expanded client base across US, EU, & India with 98% satisfaction.'
    },
    {
      year: '2025',
      title: 'Stronger Together',
      icon: Trophy,
      desc: 'Launched custom vector search RAG systems and WebGL showcases.'
    },
    {
      year: '2026+',
      title: 'Building Future',
      icon: Star,
      desc: 'Scaling studio capabilities into next-generation intelligent platforms.'
    }
  ];

  return (
    <div className="w-full bg-[#FAF8F3] dark:bg-[#181624] text-ink dark:text-white border-3 border-ink p-4 sm:p-5 rounded-md shadow-brutalist relative">
      
      {/* Top Metallic Spiral Binder Rings */}
      <div className="absolute -top-3 inset-x-8 flex justify-between pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="w-2.5 h-6 bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 border border-black rounded-full shadow-sm" />
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-ink/20 pb-2 mb-4 pt-2">
        <h3 className="font-pixel text-base font-extrabold uppercase text-ink dark:text-white tracking-wider flex items-center gap-2">
          <span>📓</span> OUR JOURNEY
        </h3>
        <span className="font-mono text-xs text-ink/50 dark:text-gray-400 font-bold">
          2022 — 2026+
        </span>
      </div>

      {/* Horizontal Timeline Journey */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative pt-2">
        
        {/* Animated Connecting Line */}
        <div className="hidden sm:block absolute top-[44px] left-6 right-6 h-1 bg-ink/20 dark:bg-white/20 z-0" />

        {milestones.map((m, idx) => {
          const IconComp = m.icon;
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={m.year}
              onMouseEnter={() => {
                setHoveredIndex(idx);
                sound.playHover();
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
            >
              {/* Year Label */}
              <span className="font-pixel text-xs font-black text-ink dark:text-white mb-1.5">
                {m.year}
              </span>

              {/* Animated Icon Circle */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 6 }}
                className={`w-10 h-10 rounded-full border-2 border-ink flex items-center justify-center transition-all shadow-brutalist-sm ${
                  isHovered ? 'bg-[#88C000] text-ink' : 'bg-white dark:bg-canvas-dark text-ink dark:text-white'
                }`}
              >
                <IconComp className="w-5 h-5" />
              </motion.div>

              {/* Title */}
              <span className="font-pixel text-[10px] font-bold mt-2 text-center text-ink dark:text-gray-200">
                {m.title}
              </span>

              {/* Detailed Tooltip Description on Hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute bottom-full mb-2 bg-[#121118] text-white p-2.5 rounded-xs border-2 border-ink shadow-brutalist text-[10px] font-sans font-medium w-48 text-center z-50 pointer-events-none"
                >
                  <p>{m.desc}</p>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
