import React from 'react';
import { motion } from 'framer-motion';

export const GoalBoard: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center">
      
      {/* Gold Pin & Twin Hanging Ropes */}
      <div className="w-3 h-3 rounded-full bg-amber-400 border-2 border-ink shadow-xs z-30 mb-0.5" />
      <div className="w-20 h-4 relative">
        <div className="absolute top-0 left-2 w-0.5 h-4 bg-amber-700/80 transform -rotate-12" />
        <div className="absolute top-0 right-2 w-0.5 h-4 bg-amber-700/80 transform rotate-12" />
      </div>

      {/* Chalkboard Casing */}
      <div className="bg-[#4A2C11] border-4 border-[#351E09] p-2.5 rounded-sm shadow-brutalist max-w-[240px] text-center relative">
        {/* Chalkboard Interior Surface */}
        <div className="bg-[#19221B] border-2 border-ink p-3 rounded-xs text-left text-emerald-400 font-pixel space-y-1.5 shadow-inner">
          <div className="text-[9px] uppercase tracking-wider text-amber-300 font-bold">
            OUR GOAL:
          </div>
          <div className="text-xs font-black leading-snug tracking-wide text-emerald-300">
            SOLVE REAL PROBLEMS WITH CREATIVE TECHNOLOGY.
          </div>
          <div className="text-right text-xs">
            ☺
          </div>
        </div>
      </div>

      {/* Small Taped Sticky Note Below Chalkboard */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 2 }}
        className="mt-2 bg-[#FFF066] text-ink p-2 rounded-xs shadow-sticky border border-amber-300 font-handwriting text-xs font-bold rotate-2 max-w-[180px] relative"
      >
        <div className="tape-sticker tape-sticker-yellow w-6 h-2.5 -top-1 left-1/2 -translate-x-1/2 rounded-xs" />
        We listen. We build. We deliver. We care. <span className="text-rose-500">♥</span>
      </motion.div>

    </div>
  );
};
