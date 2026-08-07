import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/sound';

interface CaseStudyDoorProps {
  onEnter: () => void;
}

export const CaseStudyDoor: React.FC<CaseStudyDoorProps> = ({ onEnter }) => {
  return (
    <div className="relative select-none cursor-pointer group perspective-1000">
      
      {/* 3D Header Badge */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#121118] text-[#88C000] border-2 border-ink px-3 py-1 rounded-t-sm shadow-brutalist font-pixel text-xs font-black uppercase tracking-widest z-30 flex items-center gap-1.5 transform translate-z-10">
        <span className="w-2 h-2 rounded-full bg-[#88C000] animate-ping" />
        CASE ROOM 3D
      </div>

      {/* 3D ISOMETRIC DOOR FRAME */}
      <motion.div
        whileHover={{ rotateY: -6, rotateX: 4, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => {
          sound.playProjectorOn();
          onEnter();
        }}
        className="w-44 sm:w-48 h-72 bg-[#2A1E14] border-4 border-[#17100A] p-3 rounded-t-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative flex flex-col items-center justify-between"
      >
        
        {/* 3D Extruded Left Door Frame Side */}
        <div className="absolute -left-5 top-0 bottom-0 w-5 bg-[#1B120C] border-y-4 border-l-4 border-[#100A07] rounded-l-xl transform -skew-y-12 origin-right shadow-md pointer-events-none" />

        {/* 3D Wooden Door Surface */}
        <div className="w-full h-52 bg-[#3E2D1F] border-3 border-black rounded-t-md p-2 flex flex-col justify-between items-center shadow-inner relative z-20" style={{ transformStyle: 'preserve-3d' }}>
          
          <div className="w-full h-22 border-2 border-black/60 bg-[#2D2015] rounded-xs shadow-inner" />
          <div className="w-full h-22 border-2 border-black/60 bg-[#2D2015] rounded-xs shadow-inner" />

          {/* 3D Brass Door Handle Knob */}
          <div
            style={{ transform: 'translateZ(12px)' }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-amber-300 to-amber-600 border-2 border-black shadow-lg"
          />
        </div>

        {/* Glowing Neon Enter Arrow Button */}
        <div className="w-full bg-[#88C000] text-ink font-pixel text-[9.5px] font-black py-1.5 text-center border-2 border-black rounded-xs shadow-md group-hover:bg-accent-coral group-hover:text-white transition-colors flex items-center justify-center gap-1.5 z-20">
          <span>ENTER CASE ROOM</span>
          <span className="animate-bounce font-mono">→</span>
        </div>

      </motion.div>
    </div>
  );
};
