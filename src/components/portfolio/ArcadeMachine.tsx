import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/sound';

interface ArcadeMachineProps {
  onSelectProject: (projectId: string) => void;
}

export const ArcadeMachine: React.FC<ArcadeMachineProps> = ({ onSelectProject }) => {
  const [activeBtn, setActiveBtn] = useState<number | null>(null);

  const handlePress = (btnIdx: number) => {
    sound.playClick();
    setActiveBtn(btnIdx);
    setTimeout(() => setActiveBtn(null), 200);
    onSelectProject('planet-coffee');
  };

  return (
    <div className="relative select-none cursor-pointer group perspective-1000">
      
      {/* Top Floating 3D Neon Marquee */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#121118] text-[#88C000] border-2 border-ink px-3 py-1 rounded-t-sm shadow-brutalist font-pixel text-xs font-black uppercase tracking-widest z-30 flex items-center gap-1.5 transform translate-z-10">
        <span className="w-2 h-2 rounded-full bg-[#88C000] animate-ping" />
        ARCADE 3D
      </div>

      {/* 3D ISOMETRIC CABINET CONTAINER */}
      <motion.div
        whileHover={{ rotateY: -6, rotateX: 4, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-48 sm:w-52 h-72 bg-[#1E3E1A] border-4 border-ink rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative flex flex-col items-center justify-between p-3"
      >
        
        {/* 3D Extruded Left Side Panel Depth */}
        <div className="absolute -left-5 top-0 bottom-0 w-5 bg-[#142A12] border-y-4 border-l-4 border-ink rounded-l-lg transform -skew-y-12 origin-right shadow-md pointer-events-none" />

        {/* 3D Top Marquee Overhang */}
        <div className="w-full h-10 bg-[#2E5829] border-2 border-ink rounded-t-md p-1 flex items-center justify-center shadow-md relative z-20">
          <div className="bg-[#100F17] text-[#88C000] px-3 py-1 rounded-xs border border-black font-pixel text-[10px] font-black uppercase tracking-wider animate-pulse">
            ★ PLANET COFFEE ★
          </div>
        </div>

        {/* 3D Recessed CRT Screen Display */}
        <div
          onClick={() => {
            sound.playProjectorOn();
            onSelectProject('planet-coffee');
          }}
          className="w-full h-36 bg-[#081309] border-3 border-ink rounded-md p-2.5 relative overflow-hidden flex flex-col justify-between text-emerald-400 font-mono shadow-inner group-hover:border-[#88C000] transition-colors z-20"
        >
          {/* Scanlines & Phosphor Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent bg-[length:100%_4px] pointer-events-none z-10" />

          {/* Header */}
          <div className="flex justify-between items-center z-20 text-[7.5px] text-emerald-500 font-bold border-b border-emerald-500/20 pb-0.5">
            <span>DETQEL 3D ARCADE</span>
            <span className="animate-pulse">HIGH SCORE 9999</span>
          </div>

          {/* Pixel Artwork Game Banner */}
          <div className="text-center z-20 space-y-1 my-auto">
            <div className="font-pixel text-sm font-black text-[#88C000] tracking-wider leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              PLANET COFFEE
            </div>
            <div className="font-pixel text-[8.5px] text-emerald-300 font-bold uppercase animate-pulse">
              PRESS START TO VIEW CASE
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center z-20 text-[7px] text-emerald-500 font-bold">
            <span>CREDIT 01</span>
            <span>INSERT COIN 🪙</span>
          </div>
        </div>

        {/* 3D PROTRUDING CONTROL DECK */}
        <div
          style={{ transform: 'translateZ(16px) rotateX(-10deg)' }}
          className="w-[108%] bg-[#1A1824] border-3 border-ink rounded-md p-2 flex items-center justify-between shadow-2xl relative z-20 -my-1"
        >
          {/* 3D Joystick */}
          <div className="flex flex-col items-center cursor-pointer">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-5 h-5 rounded-full bg-rose-600 border-2 border-black shadow-lg relative"
            >
              <div className="w-2 h-2 rounded-full bg-rose-300" />
            </motion.div>
            <div className="w-1.5 h-3.5 bg-gray-900 border-x border-black" />
            <div className="w-7 h-2 bg-gray-700 border border-black rounded-full shadow-inner" />
          </div>

          {/* 6 3D Arcade Push Buttons */}
          <div className="grid grid-cols-3 gap-1">
            {['bg-rose-500', 'bg-amber-400', 'bg-[#88C000]', 'bg-sky-400', 'bg-purple-500', 'bg-pink-400'].map((color, idx) => (
              <motion.button
                key={idx}
                onClick={() => handlePress(idx)}
                whileTap={{ scale: 0.75, y: 2 }}
                className={`w-4 h-4 rounded-full border-2 border-black shadow-md ${color} ${
                  activeBtn === idx ? 'brightness-150 translate-y-0.5 shadow-none' : ''
                }`}
              />
            ))}
          </div>

        </div>

        {/* 3D Cabinet Coin Door */}
        <div className="w-full bg-[#100F17] border-2 border-black p-1 rounded-xs flex items-center justify-between px-2 z-20">
          <span className="font-pixel text-[8px] text-gray-400 font-bold">COIN DOOR</span>
          <div className="w-1.5 h-3 bg-amber-400 border border-black rounded-xs animate-pulse" />
        </div>

        {/* 3D Shadow Cast Underneath */}
        <div className="absolute -bottom-4 left-0 right-0 h-4 bg-black/60 blur-md rounded-full pointer-events-none" />

      </motion.div>
    </div>
  );
};
