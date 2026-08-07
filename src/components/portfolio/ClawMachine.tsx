import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/sound';

interface ClawMachineProps {
  onSelectRandomProject: () => void;
}

export const ClawMachine: React.FC<ClawMachineProps> = ({ onSelectRandomProject }) => {
  const [isClawing, setIsClawing] = useState(false);

  const handleGrab = () => {
    if (isClawing) return;
    sound.playClick();
    setIsClawing(true);

    setTimeout(() => {
      sound.playSuccess();
      setIsClawing(false);
      onSelectRandomProject();
    }, 1500);
  };

  return (
    <div className="relative select-none cursor-pointer group perspective-1000">
      
      {/* 3D Header Badge */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#121118] text-[#88C000] border-2 border-ink px-3 py-1 rounded-t-sm shadow-brutalist font-pixel text-xs font-black uppercase tracking-widest z-30 flex items-center gap-1.5 transform translate-z-10">
        <span className="w-2 h-2 rounded-full bg-[#88C000] animate-ping" />
        CLAW 3D
      </div>

      {/* 3D ISOMETRIC CLAW MACHINE CABINET */}
      <motion.div
        whileHover={{ rotateY: 6, rotateX: 4, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-48 sm:w-52 h-72 bg-[#173820] border-4 border-ink rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative flex flex-col items-center justify-between p-3"
      >
        
        {/* 3D Extruded Right Side Panel Depth */}
        <div className="absolute -right-5 top-0 bottom-0 w-5 bg-[#0F2615] border-y-4 border-r-4 border-ink rounded-r-lg transform skew-y-12 origin-left shadow-md pointer-events-none" />

        {/* 3D Top Marquee Header */}
        <div className="w-full h-10 bg-[#255232] border-2 border-ink rounded-t-md p-1 flex items-center justify-center shadow-md z-20">
          <div className="font-pixel text-[10px] font-black text-[#88C000] uppercase tracking-widest animate-pulse">
            PROJECT CLAW v3.0
          </div>
        </div>

        {/* Glass Chamber Window */}
        <div className="w-full h-44 bg-[#09170D] border-3 border-ink rounded-md p-2 relative overflow-hidden flex flex-col justify-between shadow-inner z-20">
          
          {/* Animated 3D Crane & Claw Mechanism */}
          <motion.div
            animate={isClawing ? { y: [0, 50, 0] } : { y: [0, 5, 0] }}
            transition={{ duration: isClawing ? 1.5 : 2, repeat: isClawing ? 0 : Infinity }}
            className="absolute top-1 left-1/2 -translate-x-1/2 flex flex-col items-center z-30"
          >
            <div className="w-1.5 h-8 bg-gray-400 border-x border-black" />
            <div className="w-6 h-3 bg-amber-400 border-2 border-black rounded-t-sm flex items-center justify-center font-pixel text-[6px] font-bold shadow-xs">
              CLAW
            </div>
            <div className="flex gap-1.5 -mt-0.5">
              <div className="w-1.5 h-3.5 bg-gray-300 border border-black transform -rotate-45 shadow-sm" />
              <div className="w-1.5 h-3.5 bg-gray-300 border border-black transform rotate-45 shadow-sm" />
            </div>
          </motion.div>

          {/* Project Spheres / Capsules Pool at Bottom */}
          <div className="mt-auto grid grid-cols-5 gap-1.5 pt-14 z-20">
            {['bg-rose-500', 'bg-amber-400', 'bg-[#88C000]', 'bg-sky-400', 'bg-purple-500', 'bg-pink-400', 'bg-emerald-400', 'bg-blue-500', 'bg-amber-500', 'bg-rose-400'].map((color, idx) => (
              <motion.div
                key={idx}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, delay: idx * 0.1, repeat: Infinity }}
                className={`w-4 h-4 rounded-full border-2 border-black shadow-md ${color} flex items-center justify-center`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
              </motion.div>
            ))}
          </div>

        </div>

        {/* 3D Grab Button */}
        <button
          onClick={handleGrab}
          disabled={isClawing}
          className="w-full py-1.5 bg-[#88C000] hover:bg-accent-coral hover:text-white text-ink border-2 border-ink rounded-xs font-pixel text-[9.5px] font-black shadow-xs transition-colors flex items-center justify-center gap-1 z-20 mt-1"
        >
          {isClawing ? 'GRABBING...' : 'GRAB RANDOM PROJECT 🎁'}
        </button>

      </motion.div>
    </div>
  );
};
