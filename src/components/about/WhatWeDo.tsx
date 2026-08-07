import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Cpu, Palette, Code2, Rocket, Target } from 'lucide-react';
import { sound } from '../../utils/sound';

export const WhatWeDo: React.FC = () => {
  const services = [
    { name: 'Web Development', icon: Globe },
    { name: 'AI Solutions', icon: Cpu },
    { name: 'Branding & Design', icon: Palette },
    { name: 'Software Development', icon: Code2 },
    { name: 'Digital Experience', icon: Rocket },
    { name: 'Product Strategy', icon: Target }
  ];

  return (
    <div className="relative bg-[#FAF8F2] dark:bg-[#1A1824] text-ink dark:text-white p-4 rounded-xs border-2 border-ink shadow-brutalist max-w-[240px]">
      {/* Red Thumbtack / Pin on Top Center */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 border-2 border-ink shadow-xs flex items-center justify-center z-30">
        <div className="w-1 h-1 rounded-full bg-white" />
      </div>

      <div className="border-b border-ink/20 pb-1.5 mb-2.5 text-center">
        <h3 className="font-pixel text-xs font-black uppercase tracking-wider text-ink dark:text-white">
          WHAT WE DO
        </h3>
      </div>

      <div className="space-y-2">
        {services.map((s) => {
          const IconComp = s.icon;
          return (
            <motion.div
              key={s.name}
              onMouseEnter={() => sound.playHover()}
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-xs font-sans font-bold text-ink/85 dark:text-gray-200 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-xs bg-[#88C000]/15 border border-ink flex items-center justify-center text-ink dark:text-[#88C000]">
                <IconComp className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">{s.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
