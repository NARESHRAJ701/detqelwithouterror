import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../utils/sound';

interface ProjectVendorProps {
  onSelectCategory: (cat: string) => void;
}

export const ProjectVendor: React.FC<ProjectVendorProps> = ({ onSelectCategory }) => {
  const [dispensing, setDispensing] = useState<string | null>(null);

  const vendorItems = [
    { code: 'A1', name: 'AI SOLUTIONS', color: 'bg-purple-500' },
    { code: 'A2', name: 'BRANDING', color: 'bg-[#88C000]' },
    { code: 'B1', name: 'WEBSITES', color: 'bg-blue-500' },
    { code: 'B2', name: 'MOBILE APPS', color: 'bg-amber-400' },
    { code: 'C1', name: 'MOTION', color: 'bg-rose-500' },
    { code: 'C2', name: 'AUTOMATION', color: 'bg-emerald-400' }
  ];

  const handleVend = (code: string, name: string) => {
    sound.playClick();
    setDispensing(code);
    onSelectCategory(name);

    setTimeout(() => {
      sound.playSuccess();
      setTimeout(() => setDispensing(null), 1500);
    }, 600);
  };

  return (
    <div className="relative select-none cursor-pointer group perspective-1000">
      
      {/* 3D Header Badge */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#121118] text-sky-400 border-2 border-ink px-3 py-1 rounded-t-sm shadow-brutalist font-pixel text-xs font-black uppercase tracking-widest z-30 flex items-center gap-1.5 transform translate-z-10">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        VENDOR 3D
      </div>

      {/* 3D ISOMETRIC VENDING MACHINE CABINET */}
      <motion.div
        whileHover={{ rotateY: -6, rotateX: 4, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-48 sm:w-52 h-72 bg-[#122740] border-4 border-ink rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative flex flex-col items-center justify-between p-3"
      >
        
        {/* 3D Extruded Left Side Panel Depth */}
        <div className="absolute -left-5 top-0 bottom-0 w-5 bg-[#0C1A2B] border-y-4 border-l-4 border-ink rounded-l-lg transform -skew-y-12 origin-right shadow-md pointer-events-none" />

        {/* 3D Illuminated Top Sign */}
        <div className="w-full h-10 bg-[#1C3B5E] border-2 border-ink rounded-t-md p-1 flex items-center justify-center shadow-md z-20">
          <div className="font-pixel text-[10px] font-black text-sky-300 uppercase tracking-widest animate-pulse">
            PROJECT VENDOR v3.0
          </div>
        </div>

        {/* Glass Front Window with Shelves */}
        <div className="w-full h-44 bg-[#081422] border-3 border-ink rounded-md p-2 relative overflow-hidden flex flex-col justify-between shadow-inner z-20">
          
          <div className="grid grid-cols-2 gap-2 z-20">
            {vendorItems.map((item) => (
              <motion.button
                key={item.code}
                whileHover={{ scale: 1.06 }}
                onClick={() => handleVend(item.code, item.name)}
                className={`p-1.5 rounded-xs border-2 border-ink font-pixel text-[8px] font-black text-white shadow-md transition-transform ${item.color} flex items-center justify-between`}
              >
                <span className="truncate">{item.name}</span>
                <span className="font-mono text-[7.5px] bg-black/50 px-1 rounded-[1px] text-amber-300">{item.code}</span>
              </motion.button>
            ))}
          </div>

          {/* Vending Dispense Tray Slot */}
          <div className="w-full h-8 bg-[#040810] border-2 border-black rounded-xs flex items-center justify-center relative overflow-hidden z-20">
            <AnimatePresence>
              {dispensing && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  className="bg-[#88C000] text-ink font-pixel text-[8.5px] font-black px-2.5 py-0.5 rounded-xs border border-black shadow-md"
                >
                  CARD {dispensing} DISPENSED! 💳
                </motion.div>
              )}
            </AnimatePresence>
            {!dispensing && (
              <span className="font-pixel text-[8px] text-sky-400 font-bold uppercase tracking-wider">
                PUSH FOR CARD 📥
              </span>
            )}
          </div>

        </div>

        {/* LED Keypad Console */}
        <div className="w-full bg-[#100F17] border-2 border-black p-1 rounded-xs flex items-center justify-between px-2 z-20">
          <span className="font-pixel text-[8px] text-sky-300 font-bold uppercase">SELECT CATEGORY</span>
          <div className="font-mono text-[8px] text-amber-400 font-bold bg-black px-1.5 py-0.5 rounded-xs border border-gray-800">
            [A1-C2]
          </div>
        </div>

      </motion.div>
    </div>
  );
};
