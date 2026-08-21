import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/sound';
import { triggerCursor } from '../CustomCursor';

interface HeroCopyProps {
  onExploreClick: () => void;
}

export const HeroCopy: React.FC<HeroCopyProps> = ({ onExploreClick }) => {
  return (
    <div className="flex flex-col items-start gap-4 select-none relative z-20">


      {/* Two Handcrafted Paper Stat Badges */}
      <div className="flex items-center gap-3 pt-2">
        {/* Stat 1: 100+ Projects */}
        <motion.div
          whileHover={{ y: -2, scale: 1.02 }}
          className="relative bg-[#FFFDF9] dark:bg-[#1C1D24] border-2 border-[#1E1E24] rounded-md p-2.5 sm:p-3 shadow-[3px_3px_0px_#1E1E24] flex items-center gap-2.5"
        >
          {/* Paper pin/tape */}
          <div className="absolute -top-1 right-2 w-4 h-2 bg-amber-100/90 border border-amber-300 rotate-6" />
          
          <div className="w-8 h-8 rounded-sm bg-emerald-100 dark:bg-emerald-950 border border-emerald-600 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4" />
          </div>

          <div>
            <div className="font-pixel text-lg sm:text-xl font-bold text-[#1E1E24] dark:text-white leading-none">
              100+
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] font-bold text-[#4B5563] dark:text-gray-400 tracking-wider uppercase mt-0.5">
              PROJECTS DELIVERED
            </div>
          </div>
        </motion.div>

        {/* Stat 2: 50+ Happy Clients */}
        <motion.div
          whileHover={{ y: -2, scale: 1.02 }}
          className="relative bg-[#FFFDF9] dark:bg-[#1C1D24] border-2 border-[#1E1E24] rounded-md p-2.5 sm:p-3 shadow-[3px_3px_0px_#1E1E24] flex items-center gap-2.5"
        >
          {/* Paper pin/tape */}
          <div className="absolute -top-1 right-2 w-4 h-2 bg-amber-100/90 border border-amber-300 -rotate-6" />
          
          <div className="w-8 h-8 rounded-sm bg-emerald-100 dark:bg-emerald-950 border border-emerald-600 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4" />
          </div>

          <div>
            <div className="font-pixel text-lg sm:text-xl font-bold text-[#1E1E24] dark:text-white leading-none">
              50+
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] font-bold text-[#4B5563] dark:text-gray-400 tracking-wider uppercase mt-0.5">
              HAPPY CLIENTS
            </div>
          </div>
        </motion.div>
      </div>


    </div>
  );
};
