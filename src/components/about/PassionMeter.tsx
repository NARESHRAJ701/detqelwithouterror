import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const PassionMeter: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#181624] text-white p-3 rounded-xs border-2 border-ink shadow-brutalist min-w-[150px]">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-rose-500 font-bold animate-bounce text-xs">♥</span>
        <span className="font-pixel text-[9px] font-black text-gray-200 uppercase tracking-wider">
          PASSION FUEL
        </span>
      </div>

      <div className="w-full bg-[#100F17] h-3 border border-black rounded-xs overflow-hidden p-0.5 relative mb-1">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="h-full bg-[#88C000] rounded-[1px]"
        />
      </div>

      <div className="flex justify-between font-mono text-[9px] font-bold text-gray-400">
        <span>LVL.MAX</span>
        <span className="text-[#88C000]">{progress}%</span>
      </div>
    </div>
  );
};
