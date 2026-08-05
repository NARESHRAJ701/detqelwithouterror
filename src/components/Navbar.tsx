import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { Volume2, VolumeX, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const [soundOn, setSoundOn] = useState(true);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    sound.setEnabled(next);
    if (next) sound.playSuccess();
  };

  const toggleTheme = () => {
    sound.playClick();
    setDarkMode(!darkMode);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 py-2.5 sm:py-3 pointer-events-none"
    >
      <div className="max-w-[1600px] w-[92vw] mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Logo Badge */}
        <MagneticButton cursorText="HOME">
          <a
            href="#"
            className="flex items-center gap-2 bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xs shadow-brutalist hover:bg-accent-acid hover:text-ink transition-all"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent-acid animate-ping" />
            <span className="font-pixel text-[clamp(0.9rem,1.05vw,1.15rem)] font-bold tracking-tight">
              AEX <span className="text-[clamp(0.65rem,0.7vw,0.75rem)] opacity-60 font-mono">// STUDIO</span>
            </span>
          </a>
        </MagneticButton>

        {/* Center Clock & Status (Hidden on small mobile) */}
        <div className="hidden lg:flex items-center gap-3 sm:gap-4 bg-white/90 dark:bg-canvas-dark-paper/90 backdrop-blur-md px-3.5 py-1.5 rounded-xs border border-ink/20 shadow-sm font-mono text-[clamp(0.75rem,0.85vw,0.9rem)] text-ink dark:text-gray-200">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            OPEN FOR Q3/Q4 2026
          </span>
          <span className="text-ink/30 dark:text-white/30">|</span>
          <span className="font-pixel text-[clamp(0.68rem,0.75vw,0.8rem)] tracking-wider text-ink dark:text-accent-acid">
            TOK {timeString} JST
          </span>
        </div>

        {/* Quick Nav & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/90 dark:bg-canvas-dark-paper/90 backdrop-blur-md px-2 py-1 rounded-xs border border-ink/20 shadow-sm font-mono text-[clamp(0.75rem,0.85vw,0.9rem)]">
            <a
              href="#projects"
              onClick={() => sound.playClick()}
              onMouseEnter={() => triggerCursor('JUMP', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 hover:bg-ink hover:text-white dark:hover:bg-accent-acid dark:hover:text-ink transition-colors rounded-xs"
            >
              01 WORK
            </a>
            <a
              href="#about"
              onClick={() => sound.playClick()}
              onMouseEnter={() => triggerCursor('JUMP', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 hover:bg-ink hover:text-white dark:hover:bg-accent-acid dark:hover:text-ink transition-colors rounded-xs"
            >
              02 ABOUT
            </a>
            <a
              href="#playground"
              onClick={() => sound.playClick()}
              onMouseEnter={() => triggerCursor('JUMP', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 hover:bg-ink hover:text-white dark:hover:bg-accent-acid dark:hover:text-ink transition-colors rounded-xs"
            >
              03 LABS
            </a>
            <a
              href="#contact"
              onClick={() => sound.playClick()}
              onMouseEnter={() => triggerCursor('JUMP', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 hover:bg-ink hover:text-white dark:hover:bg-accent-acid dark:hover:text-ink transition-colors rounded-xs"
            >
              04 CONTACT
            </a>
          </nav>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => triggerCursor(soundOn ? 'MUTE' : 'UNMUTE', 'hover')}
            onMouseLeave={() => triggerCursor('', 'default')}
            className="p-1.5 sm:p-2 bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white rounded-xs shadow-brutalist hover:bg-accent-coral hover:text-white transition-all"
            title="Toggle Sound Effects"
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            onMouseEnter={() => triggerCursor(darkMode ? 'LIGHT' : 'DARK', 'hover')}
            onMouseLeave={() => triggerCursor('', 'default')}
            className="p-1.5 sm:p-2 bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white rounded-xs shadow-brutalist hover:bg-accent-blue hover:text-white transition-all"
            title="Toggle Theme Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-accent-acid" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary CTA */}
          <MagneticButton cursorText="TALK">
            <a
              href="#contact"
              className="hidden sm:flex items-center gap-1.5 bg-ink text-white dark:bg-accent-acid dark:text-ink px-3.5 sm:px-4 py-1.5 sm:py-2 font-pixel text-[clamp(0.75rem,0.85vw,0.9rem)] font-bold border-2 border-ink rounded-xs shadow-brutalist hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
            >
              LET'S TALK <ArrowUpRight className="w-4 h-4" />
            </a>
          </MagneticButton>
        </div>
      </div>
    </motion.header>
  );
};
