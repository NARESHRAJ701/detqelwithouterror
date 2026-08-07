import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/sound';

interface RobotMascotProps {
  activeSection: number;
}

export const RobotMascot: React.FC<RobotMascotProps> = ({ activeSection }) => {
  const [blink, setBlink] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [robotMsg, setRobotMsg] = useState("Hi! I'm Robo-DETQEL 🤖");

  // Blinking loop
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 250);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Reaction on activeSection change
  useEffect(() => {
    setIsWaving(true);
    setRobotMsg(`Section loaded! 🚀`);
    sound.playSuccess();
    const t = setTimeout(() => setIsWaving(false), 1500);
    return () => clearTimeout(t);
  }, [activeSection]);

  return (
    <div className="relative flex flex-col items-center select-none cursor-pointer">
      
      {/* Speech Bubble */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="bg-white dark:bg-canvas-dark-paper border-2 border-ink px-2.5 py-1 rounded-xs shadow-brutalist-sm font-pixel text-[9px] font-bold mb-1 text-center max-w-[140px] text-ink dark:text-white"
      >
        {robotMsg}
      </motion.div>

      {/* Robot Casing Body */}
      <motion.div
        animate={{ y: [0, -4, 0], rotate: isWaving ? [0, 6, -6, 0] : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        onMouseEnter={() => {
          setIsWaving(true);
          sound.playHover();
          setRobotMsg("Ready to build! ⚡");
        }}
        onMouseLeave={() => setIsWaving(false)}
        className="w-16 h-20 bg-[#E0E0E0] dark:bg-[#252232] border-3 border-ink rounded-t-2xl rounded-b-md p-1.5 shadow-brutalist flex flex-col items-center justify-between relative"
      >
        {/* Antennas */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
          <div className="w-1 h-3 bg-ink rounded-full" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#88C000] border border-black animate-ping" />
        </div>

        {/* Head Display Screen */}
        <div className="w-full h-9 bg-[#100F17] border-2 border-ink rounded-md flex items-center justify-center p-1 relative overflow-hidden">
          {/* Green Pixel Eyes */}
          <div className="flex items-center gap-2">
            <div className={`w-3.5 h-3.5 bg-[#88C000] rounded-xs transition-all ${blink ? 'h-0.5' : 'h-3.5'}`} />
            <div className={`w-3.5 h-3.5 bg-[#88C000] rounded-xs transition-all ${blink ? 'h-0.5' : 'h-3.5'}`} />
          </div>
        </div>

        {/* Robot Chest & DET Logo */}
        <div className="w-full bg-[#88C000] border-2 border-ink rounded-xs text-center py-0.5">
          <span className="font-pixel text-[7px] font-black text-ink uppercase tracking-widest">
            DET
          </span>
        </div>

        {/* Waving Arm Visual Accent */}
        {isWaving && (
          <motion.div
            animate={{ rotate: [0, 30, -10, 30, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="absolute -right-3 top-6 w-3 h-1.5 bg-ink rounded-full"
          />
        )}
      </motion.div>

    </div>
  );
};
