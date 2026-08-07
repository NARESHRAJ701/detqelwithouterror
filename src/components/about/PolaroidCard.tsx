import React from 'react';
import { motion } from 'framer-motion';

export const PolaroidCard: React.FC = () => {
  return (
    <motion.div
      whileHover={{ rotate: [-1, 2, -1], scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="relative bg-white text-ink p-3 rounded-xs border-2 border-ink shadow-brutalist max-w-[250px] font-sans"
    >
      {/* Paper Clip on Top Center */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-8 border-2 border-ink rounded-t-full bg-gray-200 z-30 shadow-xs" />

      {/* Polaroid Frame & Photo Illustration */}
      <div className="w-full h-36 bg-[#1A1824] border-2 border-ink rounded-xs overflow-hidden relative flex flex-col items-center justify-center p-2">
        {/* Pixel Team Graphic Illustration */}
        <div className="flex items-center gap-2 mb-1 text-3xl animate-bounce">
          <span>🧑‍💻</span>
          <span>👩‍💻</span>
          <span>👨‍💻</span>
        </div>
        <div className="w-full bg-[#88C000]/20 border border-[#88C000] p-1 text-center rounded-[2px]">
          <span className="font-pixel text-[8px] font-black text-[#88C000] uppercase tracking-wider block">
            DETQEL CORE TEAM SPRINT
          </span>
        </div>
      </div>

      {/* Handwritten Caption */}
      <div className="pt-2 text-center font-handwriting text-base font-bold text-ink leading-tight">
        A team of dreamers,<br />
        builders & problem solvers. <span className="text-rose-500">♥</span>
      </div>
    </motion.div>
  );
};
