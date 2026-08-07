import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/sound';

export const CoffeeWidget: React.FC = () => {
  return (
    <div
      onClick={() => sound.playClick()}
      className="relative flex flex-col items-center cursor-pointer group"
      title="Click Coffee Mug"
    >
      {/* Animated Rising Steam Whisps */}
      <div className="flex gap-1 mb-1">
        <motion.div
          animate={{ y: [-2, -12], opacity: [0.8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-1 h-3 bg-white/70 rounded-full blur-[1px]"
        />
        <motion.div
          animate={{ y: [-2, -14], opacity: [0.9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
          className="w-1 h-4 bg-white/70 rounded-full blur-[1px]"
        />
      </div>

      {/* Ceramic Mug Casing */}
      <div className="w-12 h-13 bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-b-xl shadow-brutalist relative flex flex-col items-center justify-center p-1">
        {/* Coffee Liquid Top Surface */}
        <div className="w-9 h-2 bg-[#3D210B] border border-black rounded-full mb-1 flex items-center justify-center">
          <div className="w-4 h-1 bg-[#542F11] rounded-full" />
        </div>

        <span className="font-pixel text-[6.5px] font-black text-ink dark:text-white uppercase leading-tight text-center">
          BUILD<br />SOLVE<br />REPEAT
        </span>

        {/* Handle */}
        <div className="absolute -right-3.5 top-2.5 w-3.5 h-6 border-2 border-ink rounded-r-md bg-white dark:bg-canvas-dark-paper" />
      </div>
    </div>
  );
};
