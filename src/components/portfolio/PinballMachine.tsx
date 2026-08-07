import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/sound';

interface PinballMachineProps {
  onSelectCategory?: (cat: string) => void;
}

export const PinballMachine: React.FC<PinballMachineProps> = ({ onSelectCategory }) => {
  const [activeBumper, setActiveBumper] = useState<string | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);

  const bumpers = [
    { id: 'BRANDING', name: 'BRANDING', color: 'bg-amber-400 text-ink' },
    { id: 'WEB', name: 'WEB', color: 'bg-[#88C000] text-ink' },
    { id: 'MOTION', name: 'MOTION', color: 'bg-purple-400 text-ink' },
    { id: 'PACKAGING', name: 'PACKAGING', color: 'bg-rose-400 text-white' }
  ];

  const handleLaunch = () => {
    sound.playClick();
    setIsLaunching(true);
    const randomBumper = bumpers[Math.floor(Math.random() * bumpers.length)];
    setActiveBumper(randomBumper.id);
    if (onSelectCategory) onSelectCategory(randomBumper.name);

    setTimeout(() => {
      sound.playSuccess();
      setIsLaunching(false);
    }, 1200);
  };

  return (
    <div className="relative select-none cursor-pointer group perspective-1000">
      
      {/* 3D Backglass Header */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#121118] text-amber-400 border-2 border-ink px-3 py-1 rounded-t-sm shadow-brutalist font-pixel text-xs font-black uppercase tracking-widest z-30 flex items-center gap-1.5 transform translate-z-10">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        PINBALL 3D
      </div>

      {/* 3D ISOMETRIC PINBALL CABINET */}
      <motion.div
        whileHover={{ rotateY: 6, rotateX: 4, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-48 sm:w-52 h-72 bg-[#3A180C] border-4 border-ink rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative flex flex-col items-center justify-between p-3"
      >
        
        {/* 3D Extruded Right Side Panel Depth */}
        <div className="absolute -right-5 top-0 bottom-0 w-5 bg-[#250F08] border-y-4 border-r-4 border-ink rounded-r-lg transform skew-y-12 origin-left shadow-md pointer-events-none" />

        {/* 3D Backglass Box */}
        <div className="w-full h-12 bg-[#180A05] border-2 border-ink rounded-t-md p-1.5 flex items-center justify-between shadow-md relative z-20">
          <div className="font-pixel text-[9px] font-black text-amber-400 uppercase tracking-widest">
            DETQEL PINBALL
          </div>
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        </div>

        {/* Slanted 3D Playfield Glass Chamber */}
        <div
          style={{ transform: 'rotateX(14deg)', transformStyle: 'preserve-3d' }}
          className="w-full h-44 bg-[#1C1210] border-3 border-ink rounded-md p-2 relative overflow-hidden flex flex-col items-center justify-between shadow-inner z-20"
        >
          {/* Glass Reflection Beam */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-30" />

          {/* LED Score Display */}
          <div className="w-full flex justify-between items-center text-[8px] font-mono font-bold text-amber-400 border-b border-amber-500/20 pb-0.5 z-20">
            <span>MULTIBALL x3</span>
            <span className="animate-pulse">SURPRISE ME</span>
          </div>

          {/* 3D Bumper Targets */}
          <div className="grid grid-cols-2 gap-2 my-auto w-full px-1 z-20" style={{ transformStyle: 'preserve-3d' }}>
            {bumpers.map((b) => {
              const isHit = activeBumper === b.id;
              return (
                <motion.div
                  key={b.id}
                  animate={isHit ? { scale: [1, 1.25, 1], rotate: [0, 12, -12, 0] } : {}}
                  className={`p-1.5 rounded-xs border-2 border-ink text-center font-pixel text-[8.5px] font-black shadow-md cursor-pointer ${b.color} ${
                    isHit ? 'ring-2 ring-white animate-bounce' : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  {b.name}
                </motion.div>
              );
            })}
          </div>

          {/* 3D Chrome Ball */}
          <motion.div
            animate={
              isLaunching
                ? { y: [-70, -20, -55, 0], x: [25, -25, 12, 0] }
                : { y: [0, -3, 0] }
            }
            transition={{ duration: 1.2 }}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-gray-100 via-white to-gray-400 border-2 border-black shadow-lg z-30"
          />

          {/* 3D Flippers */}
          <div className="w-full flex justify-between px-2 pt-1 z-20">
            <div className="w-7 h-2 bg-amber-500 border-2 border-black rounded-r-full transform -rotate-15 shadow-sm" />
            <div className="w-7 h-2 bg-amber-500 border-2 border-black rounded-l-full transform rotate-15 shadow-sm" />
          </div>

        </div>

        {/* 3D Spring Plunger Mechanism */}
        <div className="w-full bg-[#100F17] border-2 border-black p-1 rounded-xs flex items-center justify-between px-2 z-20">
          <span className="font-pixel text-[8px] text-gray-300 font-bold">PLUNGER LAUNCH</span>
          
          <button
            onClick={handleLaunch}
            className="px-2.5 py-1 bg-amber-500 hover:bg-[#88C000] text-ink font-pixel text-[8.5px] font-black border border-black rounded-xs shadow-xs transition-colors"
          >
            PULL 🎯
          </button>
        </div>

        {/* 3D Chrome Legs Visual */}
        <div className="absolute -bottom-6 left-2 w-2 h-6 bg-gradient-to-b from-gray-400 to-gray-700 border border-black rounded-b-xs shadow-md" />
        <div className="absolute -bottom-6 right-2 w-2 h-6 bg-gradient-to-b from-gray-400 to-gray-700 border border-black rounded-b-xs shadow-md" />

      </motion.div>
    </div>
  );
};
