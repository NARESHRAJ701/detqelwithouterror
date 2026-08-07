import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { Volume2, VolumeX, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activePage?: 'home' | 'contact' | 'about' | 'portfolio';
  onNavigate?: (page: 'home' | 'contact' | 'about' | 'portfolio', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  activePage = 'home',
  onNavigate
}) => {
  const [soundOn, setSoundOn] = useState(true);

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

  const handleNav = (e: React.MouseEvent, page: 'home' | 'contact' | 'about' | 'portfolio', sectionId?: string) => {
    e.preventDefault();
    sound.playClick();
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else {
      if (page === 'contact') {
        window.location.hash = 'contact';
      } else if (page === 'about') {
        window.location.hash = 'about';
      } else if (page === 'portfolio') {
        window.location.hash = 'portfolio';
      } else {
        window.location.hash = sectionId || '';
      }
    }
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
            onClick={(e) => handleNav(e, 'home')}
            className="flex items-center gap-2 bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xs shadow-brutalist hover:bg-accent-acid hover:text-ink transition-all"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent-acid animate-ping" />
            <span className="font-pixel text-[clamp(0.9rem,1.05vw,1.15rem)] font-bold tracking-tight">
              DETQEL <span className="text-[clamp(0.65rem,0.7vw,0.75rem)] opacity-60 font-mono">// LAB</span>
            </span>
          </a>
        </MagneticButton>

        {/* Quick Nav & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/90 dark:bg-canvas-dark-paper/90 backdrop-blur-md px-2 py-1 rounded-xs border border-ink/20 shadow-sm font-mono text-[clamp(0.75rem,0.85vw,0.9rem)]">
            <a
              href="#portfolio"
              onClick={(e) => handleNav(e, 'portfolio')}
              onMouseEnter={() => triggerCursor('PLAYGROUND', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 transition-colors rounded-xs ${
                activePage === 'portfolio' ? 'bg-[#88C000] text-ink font-bold shadow-xs' : 'hover:bg-ink hover:text-white dark:hover:bg-accent-acid dark:hover:text-ink'
              }`}
            >
              01 PORTFOLIO
            </a>
            <a
              href="#about"
              onClick={(e) => handleNav(e, 'about')}
              onMouseEnter={() => triggerCursor('ABOUT', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 transition-colors rounded-xs ${
                activePage === 'about' ? 'bg-[#88C000] text-ink font-bold shadow-xs' : 'hover:bg-ink hover:text-white dark:hover:bg-accent-acid dark:hover:text-ink'
              }`}
            >
              02 ABOUT US
            </a>
            <a
              href="#playground"
              onClick={(e) => handleNav(e, 'home', 'playground')}
              onMouseEnter={() => triggerCursor('JUMP', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 hover:bg-ink hover:text-white dark:hover:bg-accent-acid dark:hover:text-ink transition-colors rounded-xs"
            >
              03 LABS
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNav(e, 'contact')}
              onMouseEnter={() => triggerCursor('PAGE', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 transition-colors rounded-xs ${
                activePage === 'contact'
                  ? 'bg-accent-acid text-ink font-bold border border-ink'
                  : 'hover:bg-ink hover:text-white dark:hover:bg-accent-acid dark:hover:text-ink'
              }`}
            >
              04 CONTACT US
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
              onClick={(e) => handleNav(e, 'contact')}
              className={`hidden sm:flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 font-pixel text-[clamp(0.75rem,0.85vw,0.9rem)] font-bold border-2 border-ink rounded-xs shadow-brutalist hover:translate-x-0.5 hover:translate-y-0.5 transition-transform ${
                activePage === 'contact'
                  ? 'bg-accent-coral text-black'
                  : 'bg-ink text-black dark:bg-accent-acid dark:text-ink'
              }`}
            >
              LET'S TALK <ArrowUpRight className="w-4 h-4" />
            </a>
          </MagneticButton>
        </div>
      </div>
    </motion.header>
  );
};
