import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { Volume2, VolumeX, Moon, Sun, ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activePage?: 'home' | 'contact' | 'about' | 'portfolio' | 'services';
  onNavigate?: (page: 'home' | 'contact' | 'about' | 'portfolio' | 'services', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  activePage = 'home',
  onNavigate
}) => {
  const [soundOn, setSoundOn] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleNav = (e: React.MouseEvent, page: 'home' | 'contact' | 'about' | 'portfolio' | 'services', sectionId?: string) => {
    e.preventDefault();
    sound.playClick();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else {
      if (page === 'contact') {
        window.location.hash = 'contact';
      } else if (page === 'about') {
        window.location.hash = 'about';
      } else if (page === 'portfolio') {
        window.location.hash = 'portfolio';
      } else if (page === 'services') {
        window.location.hash = 'services';
      } else {
        window.location.hash = sectionId || '';
      }
    }
  };

  const navLinks = [
    { label: 'HOME', page: 'home' as const, id: '' },
    { label: '01 SERVICES', page: 'home' as const, id: 'services' },
    { label: '02 PORTFOLIO', page: 'portfolio' as const, id: '' },
    { label: '03 ABOUT US', page: 'about' as const, id: '' },
    { label: '04 OUR PROCESS', page: 'home' as const, id: 'second-section' },
    { label: '05 BLOG', page: 'home' as const, id: 'our-story-projector' },
    { label: '06 CONTACT US', page: 'contact' as const, id: '' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4 pointer-events-none transition-all duration-300"
      >
        <div
          className={`max-w-[1600px] w-full mx-auto flex items-center justify-between pointer-events-auto px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-black/35 dark:bg-black/50 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Left: Brand Logo & Available Pill */}
          <div className="flex items-center gap-3">
            <MagneticButton cursorText="HOME">
              <a
                href="#"
                onClick={(e) => handleNav(e, 'home')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 text-white shadow-sm hover:scale-105 transition-all group"
              >
                <span className="font-pixel text-base sm:text-lg font-black tracking-tight text-white drop-shadow-sm">
                  DETQEL<span className="text-[#B7E532]">.</span>
                </span>
              </a>
            </MagneticButton>

            {/* Available Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 dark:bg-black/30 backdrop-blur-md border border-white/20 text-white/90 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#B7E532] animate-pulse shadow-[0_0_8px_#B7E532]" />
              <span className="tracking-wide">Available for Projects — Let's build something amazing.</span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/20 dark:bg-black/30 backdrop-blur-xl px-2.5 py-1 rounded-xl border border-white/30 dark:border-white/15 shadow-sm font-mono text-[12px]">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={`#${item.id}`}
                onClick={(e) => handleNav(e, item.page, item.id)}
                onMouseEnter={() => triggerCursor(item.label, 'hover')}
                onMouseLeave={() => triggerCursor('', 'default')}
                className={`px-3 py-1.5 transition-all rounded-lg font-bold ${
                  (item.page === activePage && (!item.id || item.page !== 'home'))
                    ? 'bg-[#B7E532] text-[#0A0D0F] shadow-xs'
                    : 'text-white/90 hover:text-white hover:bg-white/25 dark:hover:bg-white/15'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Controls & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => triggerCursor(soundOn ? 'MUTE' : 'UNMUTE', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="p-2 bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 text-white rounded-xl shadow-sm hover:bg-white/30 transition-all cursor-pointer"
              title="Toggle Sound Effects"
              aria-label="Toggle Sound"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 opacity-60 text-white" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              onMouseEnter={() => triggerCursor(darkMode ? 'LIGHT' : 'DARK', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="p-2 bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 text-white rounded-xl shadow-sm hover:bg-white/30 transition-all cursor-pointer"
              title="Toggle Theme Mode"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#B7E532]" /> : <Moon className="w-4 h-4 text-white" />}
            </button>

            {/* Primary CTA Button: LET'S TALK */}
            <MagneticButton cursorText="TALK">
              <a
                href="#contact"
                onClick={(e) => handleNav(e, 'contact')}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 font-mono text-xs font-bold rounded-xl bg-white/90 hover:bg-[#B7E532] text-[#0A0D0F] border border-white/50 shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </MagneticButton>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 text-white rounded-xl shadow-sm hover:bg-white/30 transition-all cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Animated Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-3 top-20 z-40 bg-[#0B2638]/95 dark:bg-[#0A0D0F]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl lg:hidden text-white flex flex-col space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B7E532]" />
                <span className="font-pixel text-sm font-bold text-white uppercase tracking-wider">NAVIGATION</span>
              </div>
              <span className="font-mono text-[10px] text-[#B7E532]">ONLINE ●</span>
            </div>

            <div className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={`#${item.id}`}
                  onClick={(e) => handleNav(e, item.page, item.id)}
                  className="px-4 py-2.5 rounded-xl font-mono text-sm font-bold hover:bg-white/15 text-white/90 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B7E532]" />
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-white/15">
              <a
                href="#contact"
                onClick={(e) => handleNav(e, 'contact')}
                className="w-full py-3 bg-[#B7E532] text-[#0A0D0F] font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
