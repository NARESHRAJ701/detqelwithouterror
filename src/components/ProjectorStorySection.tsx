import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { 
  Power, 
  Box, 
  Users, 
  UserCheck, 
  Calendar, 
  Target, 
  Sparkles, 
  Compass, 
  Heart,
  ArrowUpDown,
  Music,
  Radio,
  ExternalLink,
  BookOpen,
  Book
} from 'lucide-react';

interface ProjectorStorySectionProps {
  className?: string;
}

const STATS_DATA = [
  { value: '25+', label: 'Projects Delivered', icon: Box },
  { value: '12+', label: 'Industries Served', icon: Users },
  { value: '08+', label: 'Team Members', icon: UserCheck },
  { value: '04', label: 'Years of Experience', icon: Calendar },
];

const SLIDES_DATA = [
  {
    id: 'who-we-are',
    badge: 'WHO WE ARE',
    headline: 'A team of creators, engineers and strategists ',
    highlight: 'building the future.',
    description: 'We blend strategy, design, AI and engineering to build digital products that help businesses grow, scale and stand out.',
    icon: Sparkles
  },
  {
    id: 'our-mission',
    badge: '01 // OUR MISSION',
    headline: 'To engineer intelligent digital products that ',
    highlight: 'empower human ambition.',
    description: 'We believe software should feel magical, fast, and indispensable. Our mission is to bridge cutting-edge AI research with world-class design craft.',
    icon: Target
  },
  {
    id: 'our-values',
    badge: '02 // OUR VALUES',
    headline: 'Obsessive craft, radical simplicity & ',
    highlight: 'relentless execution.',
    description: 'Whitespace is part of the layout. Typography dictates the rhythm. Motion guides human focus. We never ship generic templates.',
    icon: Heart
  },
  {
    id: 'our-approach',
    badge: '03 // OUR APPROACH',
    headline: 'Combining strategy, WebGL, AI & ',
    highlight: 'bulletproof fullstack tech.',
    description: 'From rapid spatial prototype to global production infrastructure, we partner closely with founders to transform ambitious visions into reality.',
    icon: Compass
  }
];

const YOUTUBE_PLAYLIST = [
  {
    id: '7VsejGzcJmM',
    title: 'Track 01 // Chill Studio Vibe',
    artist: 'Lofi Beats',
    url: 'https://youtu.be/7VsejGzcJmM?list=RDa7essAiXYLk&t=57',
    embedUrl: 'https://www.youtube.com/embed/7VsejGzcJmM?autoplay=1&start=57'
  },
  {
    id: 'IW6ct9S4MYc',
    title: 'Track 02 // Ambient Focus Flow',
    artist: 'Deep Ambient',
    url: 'https://youtu.be/IW6ct9S4MYc?list=RDIW6ct9S4MYc',
    embedUrl: 'https://www.youtube.com/embed/IW6ct9S4MYc?autoplay=1'
  },
  {
    id: 'dYId6xEdG8U',
    title: 'Track 03 // Creative Groove',
    artist: 'Synthwave / Lofi',
    url: 'https://youtu.be/dYId6xEdG8U?list=RDIW6ct9S4MYc',
    embedUrl: 'https://www.youtube.com/embed/dYId6xEdG8U?autoplay=1'
  }
];

const MANGA_CONFIG = {
  title: 'Nano Machine — Chapter 320',
  url: 'https://nanomachin.com/manga/nano-machine-chapter-320/',
  description: 'Read Chapter 320 of Nano Machine directly on the projected screen in scrollable high-definition format.'
};

export const ProjectorStorySection: React.FC<ProjectorStorySectionProps> = ({ className = '' }) => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [isScreenPulledDown, setIsScreenPulledDown] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isWarmingUp, setIsWarmingUp] = useState<boolean>(false);
  
  // Projector Modes: 'STORY' | 'MUSIC' | 'COMIC'
  const [activeMode, setActiveMode] = useState<'STORY' | 'MUSIC' | 'COMIC'>('STORY');
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  
  const sectionRef = useRef<HTMLElement>(null);

  // Power Toggle
  const togglePower = () => {
    if (isOn) {
      sound.playProjectorOff();
      setIsOn(false);
      setIsWarmingUp(false);
    } else {
      sound.playProjectorOn();
      setIsWarmingUp(true);
      setIsScreenPulledDown(true); // Pull down screen when powering on
      setTimeout(() => {
        setIsOn(true);
        setIsWarmingUp(false);
      }, 300);
    }
  };

  // Toggle Screen Pull Down / Retract
  const toggleScreenPull = () => {
    sound.playClick();
    const nextPulled = !isScreenPulledDown;
    setIsScreenPulledDown(nextPulled);
    
    if (!nextPulled && isOn) {
      setIsOn(false);
      sound.playProjectorOff();
    } else if (nextPulled && !isOn) {
      setIsWarmingUp(true);
      sound.playProjectorOn();
      setTimeout(() => {
        setIsOn(true);
        setIsWarmingUp(false);
      }, 300);
    }
  };

  // Switch Mode
  const switchMode = (mode: 'STORY' | 'MUSIC' | 'COMIC') => {
    sound.playClick();
    setActiveMode(mode);

    if (!isOn) {
      setIsWarmingUp(true);
      sound.playProjectorOn();
      setTimeout(() => {
        setIsOn(true);
        setIsWarmingUp(false);
      }, 300);
    }
    setIsScreenPulledDown(true);
  };

  // Switch Track
  const selectTrack = (index: number) => {
    sound.playClick();
    setCurrentTrackIndex(index);
    if (activeMode !== 'MUSIC') {
      setActiveMode('MUSIC');
    }
    if (!isOn) {
      setIsOn(true);
      setIsScreenPulledDown(true);
    }
  };

  // Scroll Behavior: Auto power off when scrolling out of view
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If section scrolls completely out of view, turn off projector
      if (rect.bottom < 0 || rect.top > windowHeight) {
        if (isOn) setIsOn(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOn]);

  const currentSlideData = SLIDES_DATA[activeSlide] || SLIDES_DATA[0];
  const currentTrack = YOUTUBE_PLAYLIST[currentTrackIndex];

  return (
    <section 
      ref={sectionRef}
      id="our-story-projector" 
      className={`relative w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 border-b-2 border-ink transition-colors duration-1000 overflow-hidden font-sans select-none ${
        isOn 
          ? 'bg-[#0b0d11] text-white' 
          : 'bg-[#ebe7e0] dark:bg-[#15171c] text-ink dark:text-white'
      } ${className}`}
    >
      {/* Background Room Lighting Effect Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 z-0 ${
          isOn ? 'opacity-80' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 75% 50%, rgba(20, 24, 33, 0.4) 0%, rgba(8, 9, 12, 0.95) 80%)'
        }}
      />

      {/* Wall Texture Grid & Pinned Notes Background Layer */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />

      <div className="max-w-[1600px] w-[92vw] mx-auto relative z-10">
        
        {/* Main 2-Column Office Environment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[750px]">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: STORY HEADER, PINNED WALL NOTES, PHYSICAL DESK & PROJECTOR */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between relative space-y-8">
            
            {/* 1. Header Text & Pinned Wall Notes */}
            <div className="space-y-4 relative">
              
              {/* Pinned Architectural Wireframe & Sticky Notes on the Wall */}
              <div className="absolute -top-6 -right-4 hidden sm:flex flex-col gap-2 pointer-events-none opacity-90 z-0">
                {/* Wireframe Sketch Note */}
                <div className="w-28 h-20 bg-white/90 dark:bg-canvas-dark-paper/90 border border-ink/40 rounded-xs shadow-md p-2 rotate-3 text-[8px] font-mono leading-tight text-ink/70">
                  <div className="w-full h-1 bg-ink/30 mb-1" />
                  <div className="grid grid-cols-2 gap-1 mb-1">
                    <div className="h-6 bg-ink/10 rounded-xs" />
                    <div className="h-6 bg-ink/10 rounded-xs" />
                  </div>
                  <span>UI WIREFRAME // v2</span>
                </div>

                {/* Sticky Notes */}
                <div className="flex gap-2">
                  <div className="bg-[#fef08a] text-yellow-950 font-pixel text-[9px] font-bold p-2 shadow-md -rotate-6 rounded-xs border border-yellow-300">
                    <div>AI</div>
                    <div>DESIGN</div>
                    <div>CODE</div>
                    <div>AUTOMATE</div>
                  </div>
                  <div className="bg-[#fbcfe8] text-pink-950 font-pixel text-[9px] font-bold p-2 shadow-md rotate-6 rounded-xs border border-pink-300">
                    <div>RESEARCH</div>
                    <div>BUILD</div>
                    <div>SCALE</div>
                  </div>
                </div>
              </div>

              {/* Title Section */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 font-mono text-xs mb-2 transition-colors duration-500">
                  <span className={`px-2 py-0.5 font-pixel font-bold transition-colors ${
                    isOn ? 'bg-accent-acid text-ink' : 'bg-ink text-white dark:bg-accent-acid dark:text-ink'
                  }`}>
                    02
                  </span>
                  <span className={isOn ? 'text-white/70' : 'text-ink/60 dark:text-gray-400'}>
                    // ABOUT US — OUR STORY
                  </span>
                </div>

                <h2 className="font-pixel text-4xl sm:text-6xl font-black uppercase tracking-tight text-accent-acid transition-colors duration-500">
                  OUR STORY<span className="text-accent-coral">.</span>
                </h2>

                <p className={`font-sans text-sm sm:text-base leading-relaxed max-w-md mt-3 transition-colors duration-500 ${
                  isOn ? 'text-white/80' : 'text-ink/80 dark:text-gray-300'
                }`}>
                  DETQEL is an AI-first digital product studio helping startups and brands turn ambitious ideas into scalable products and unforgettable digital experiences.
                </p>
              </div>

              {/* Playful Handwritten Annotation Pointing to Projector */}
              <div className="pt-2 flex items-center gap-3 relative z-10">
                <div className="font-mono text-xs font-bold text-accent-acid italic tracking-wide animate-pulse">
                  Click the projector to know us better
                </div>
                <svg className="w-12 h-8 text-accent-acid" viewBox="0 0 50 30" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M 5 5 Q 25 25 45 15" strokeDasharray="3 3" />
                  <polygon points="45,15 38,10 40,20" fill="currentColor" />
                </svg>
              </div>

            </div>

            {/* 2. Physical Wooden Desk with Office Props & Projector Chassis */}
            <div className="relative mt-auto pt-8">
              
              {/* Floating Equalizer Notes when Music is Playing */}
              <AnimatePresence>
                {activeMode === 'MUSIC' && isOn && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -25 }}
                    exit={{ opacity: 0, y: -40 }}
                    className="absolute -top-12 left-1/3 z-40 flex items-center gap-1.5 bg-neutral-900/90 text-accent-acid px-3 py-1.5 rounded-full border border-accent-acid/50 shadow-xl backdrop-blur-md font-mono text-xs font-bold"
                  >
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-1 bg-accent-acid h-3 animate-pulse" style={{ animationDuration: '0.4s' }} />
                      <span className="w-1 bg-accent-acid h-2 animate-pulse" style={{ animationDuration: '0.7s' }} />
                      <span className="w-1 bg-accent-acid h-3.5 animate-pulse" style={{ animationDuration: '0.5s' }} />
                    </div>
                    <span>🎵 PROJECTING MUSIC</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wooden Desk Surface */}
              <div className="w-full h-12 bg-gradient-to-r from-[#8b5a2b] via-[#a06832] to-[#734821] rounded-t-lg shadow-xl border-t-2 border-[#b87d3b] relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-dot-pattern" />
              </div>

              {/* Desk Office Props */}
              <div className="absolute bottom-12 left-0 right-0 flex items-end justify-between px-2 pointer-events-auto">
                
                {/* Left Desk Items: Plant, Mug, Wireframe Notebook */}
                <div className="flex items-end gap-3 sm:gap-4">
                  {/* DETQEL Coffee Mug */}
                  <div className="w-10 h-11 bg-neutral-900 border-2 border-neutral-700 rounded-b-lg rounded-tr-md shadow-lg relative flex items-center justify-center group cursor-pointer"
                       title="DETQEL Mug">
                    <span className="font-pixel text-[8px] font-bold text-white tracking-widest">DETQEL</span>
                    <div className="absolute -left-2 top-2 w-2.5 h-6 border-2 border-neutral-700 rounded-l-md" />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-2 bg-white/40 rounded-full blur-[1px] animate-ping" />
                  </div>

                  {/* Wireframe Notebook */}
                  <div className="hidden sm:block w-24 h-16 bg-stone-100 border border-neutral-400 shadow-md p-1.5 rotate-[-4deg] rounded-xs font-mono text-[7px] text-neutral-800">
                    <div className="border-b border-dashed border-neutral-400 pb-1 font-bold flex justify-between">
                      <span>DETQEL</span>
                      <span>v3.4</span>
                    </div>
                    <div className="mt-1 space-y-1">
                      <div className="w-full h-1 bg-neutral-300 rounded" />
                      <div className="w-3/4 h-1 bg-accent-acid/60 rounded" />
                    </div>
                  </div>

                  {/* Potted Plant */}
                  <div className="hidden md:flex flex-col items-center">
                    <div className="flex gap-1 -mb-1">
                      <div className="w-2.5 h-5 bg-emerald-600 rounded-t-full rotate-[-15deg]" />
                      <div className="w-3 h-6 bg-emerald-500 rounded-t-full" />
                      <div className="w-2.5 h-5 bg-emerald-600 rounded-t-full rotate-[15deg]" />
                    </div>
                    <div className="w-8 h-8 bg-amber-900 rounded-b-md border border-amber-950" />
                  </div>
                </div>

                {/* Metallic Projector Appliance Chassis */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={togglePower}
                  onMouseEnter={() => triggerCursor('POWER ON/OFF 💡', 'hover')}
                  onMouseLeave={() => triggerCursor('', 'default')}
                  className={`relative w-52 sm:w-60 h-28 sm:h-32 bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 border-2 border-neutral-500 rounded-xl shadow-2xl cursor-pointer p-3 flex flex-col justify-between transition-all ${
                    isOn ? 'shadow-[0_0_40px_rgba(139,92,246,0.4)]' : ''
                  }`}
                >
                  {/* Top Vents & Brand Badge */}
                  <div className="flex justify-between items-center border-b border-neutral-400 dark:border-neutral-700 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      {/* Power Status LED */}
                      <span className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        isWarmingUp 
                          ? 'bg-amber-400 animate-ping' 
                          : isOn 
                            ? 'bg-accent-acid shadow-[0_0_8px_#8B5CF6] animate-pulse' 
                            : 'bg-red-500'
                      }`} />
                      <span className="font-mono text-[9px] font-bold text-neutral-700 dark:text-neutral-300">
                        {isWarmingUp ? 'WARMING UP...' : 'PROJ-4K // DETQEL'}
                      </span>
                    </div>

                    {/* Quick Mode Buttons on Projector Chassis */}
                    <div className="flex items-center gap-1">
                      {/* Music Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          switchMode('MUSIC');
                        }}
                        onMouseEnter={() => triggerCursor('MUSIC MODE', 'hover')}
                        onMouseLeave={() => triggerCursor('', 'default')}
                        className={`p-1 rounded-full border transition-all ${
                          activeMode === 'MUSIC' && isOn 
                            ? 'bg-accent-acid text-ink border-accent-acid' 
                            : 'bg-neutral-800 text-white/80 border-neutral-600 hover:bg-neutral-700'
                        }`}
                        title="Play Youtube Music Stream"
                      >
                        <Music className="w-3 h-3" />
                      </motion.button>

                      {/* Comic Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          switchMode('COMIC');
                        }}
                        onMouseEnter={() => triggerCursor('READ MANGA', 'hover')}
                        onMouseLeave={() => triggerCursor('', 'default')}
                        className={`p-1 rounded-full border transition-all ${
                          activeMode === 'COMIC' && isOn 
                            ? 'bg-accent-acid text-ink border-accent-acid' 
                            : 'bg-neutral-800 text-white/80 border-neutral-600 hover:bg-neutral-700'
                        }`}
                        title="Read Nano Machine Chapter 320 Manga"
                      >
                        <BookOpen className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Front Lens & Grille */}
                  <div className="flex items-center justify-between gap-3 my-auto">
                    {/* Speaker Grille */}
                    <div className="grid grid-cols-4 gap-1">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-700" />
                      ))}
                    </div>

                    {/* Projector Lens / Power ON-OFF Button */}
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePower();
                      }}
                      onMouseEnter={() => triggerCursor('POWER ON/OFF 💡', 'hover')}
                      onMouseLeave={() => triggerCursor('', 'default')}
                      className={`relative w-14 h-14 rounded-full border-4 border-neutral-400 dark:border-neutral-600 flex items-center justify-center overflow-hidden shadow-brutalist-sm shrink-0 transition-all cursor-pointer ${
                        isOn 
                          ? 'bg-accent-acid text-ink shadow-[0_0_25px_rgba(139,92,246,0.8)]' 
                          : 'bg-neutral-800 text-white hover:bg-neutral-700'
                      }`}
                      title="Click to Turn Projector ON / OFF"
                    >
                      {/* Glass Lens & Illuminated Power Icon */}
                      <div className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isOn 
                          ? 'bg-gradient-to-r from-purple-300 via-white to-purple-200 text-ink shadow-[0_0_20px_#8B5CF6]' 
                          : 'bg-neutral-700 text-white/80'
                      }`}>
                        <Power className={`w-5 h-5 ${isOn ? 'animate-pulse text-purple-950' : 'text-white'}`} />
                      </div>
                    </motion.button>
                  </div>

                  {/* Projector Beam Volumetric Cone Effect */}
                  <AnimatePresence>
                    {isOn && isScreenPulledDown && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="absolute left-full top-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[300px] pointer-events-none z-30 origin-left hidden sm:block"
                        style={{
                          background: 'polygon(0% 45%, 100% 0%, 100% 100%, 0% 55%)',
                          clipPath: 'polygon(0% 46%, 100% 0%, 100% 100%, 0% 54%)'
                        }}
                      >
                        {/* Volumetric Gradient */}
                        <div className="w-full h-full bg-gradient-to-r from-amber-100/60 via-amber-200/25 to-transparent backdrop-blur-[1px] relative overflow-hidden">
                          {/* Floating dust particles inside beam */}
                          <div className="absolute inset-0 bg-dot-pattern opacity-40 animate-pulse" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: PULL-DOWN PROJECTION SCREEN & PROJECTED MODES               */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-between relative pt-6 sm:pt-0">
            
            {/* Screen Top Slider Mode Switcher & Pull Control */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 px-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {/* Pull / Retract Button */}
                <button
                  onClick={toggleScreenPull}
                  onMouseEnter={() => triggerCursor(isScreenPulledDown ? 'FLIP UP' : 'PULL DOWN', 'hover')}
                  onMouseLeave={() => triggerCursor('', 'default')}
                  className="flex items-center gap-1 font-mono text-[10px] font-bold bg-neutral-900 text-white px-2.5 py-1 rounded-full border border-neutral-700 hover:bg-accent-acid hover:text-ink transition-colors cursor-pointer shadow-sm"
                >
                  <ArrowUpDown className="w-3 h-3" />
                  <span>{isScreenPulledDown ? 'FLIP UP' : 'PULL DOWN'}</span>
                </button>

                {/* Mode Slider Buttons on Top Bar */}
                <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded-full border border-neutral-700">
                  <button
                    onClick={() => switchMode('STORY')}
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold transition-all ${
                      activeMode === 'STORY'
                        ? 'bg-accent-acid text-ink shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    01 STORY
                  </button>

                  <button
                    onClick={() => switchMode('MUSIC')}
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold transition-all flex items-center gap-1 ${
                      activeMode === 'MUSIC'
                        ? 'bg-accent-acid text-ink shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Music className="w-3 h-3" />
                    <span>02 MUSIC</span>
                  </button>

                  <button
                    onClick={() => switchMode('COMIC')}
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold transition-all flex items-center gap-1 ${
                      activeMode === 'COMIC'
                        ? 'bg-accent-acid text-ink shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>03 COMICS</span>
                  </button>
                </div>
              </div>

              <span className="font-mono text-[10px] text-neutral-500 uppercase hidden md:inline">
                {isScreenPulledDown ? '[ SCREEN: EXTENDED ]' : '[ SCREEN: RETRACTED ]'}
              </span>
            </div>

            {/* Main Pull-down Screen Container */}
            <div className="relative w-full flex-1 min-h-[500px] flex flex-col">
              
              {/* Screen Top Roller Bar */}
              <div className="w-full h-5 bg-neutral-900 border-2 border-neutral-700 rounded-t-sm flex justify-between items-center px-3 z-30 shadow-md">
                <div className="w-3 h-3 rounded-full bg-neutral-700" />
                <div className="w-24 h-1.5 bg-neutral-700 rounded-full" />
                <div className="w-3 h-3 rounded-full bg-neutral-700" />
              </div>

              {/* Animated Pull-Down / Retract Screen Surface Wrapper */}
              <motion.div
                initial={false}
                animate={{
                  scaleY: isScreenPulledDown ? 1 : 0.02,
                  opacity: isScreenPulledDown ? 1 : 0.4
                }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 18,
                  mass: 1.1
                }}
                style={{ transformOrigin: 'top' }}
                className="relative flex-1 w-full flex flex-col justify-between"
              >
                {/* White Projection Canvas Surface */}
                <div className={`relative flex-1 w-full border-x-4 border-b-4 border-neutral-900 transition-all duration-700 overflow-hidden flex flex-col justify-between p-4 sm:p-6 ${
                  isOn 
                    ? 'bg-[#faf8f3] dark:bg-[#f7f4eb] text-neutral-900 shadow-[0_0_60px_rgba(255,255,255,0.25)]' 
                    : 'bg-[#fcfbf9] text-transparent shadow-inner'
                }`}>
                  
                  {/* Projector Edge Keystone & Texture Overlay when ON */}
                  {isOn && (
                    <>
                      {/* Vignette Shadow */}
                      <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.15)] pointer-events-none z-10" />
                      {/* Subtle Film Grain */}
                      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none z-10" />
                    </>
                  )}

                  {/* ========================================================================= */}
                  {/* CONTENT AREA: PROJECTED MODE (STORY / MUSIC / COMICS)                      */}
                  {/* ========================================================================= */}
                  {isOn && isScreenPulledDown ? (
                    activeMode === 'COMIC' ? (
                      /* MODE 3: PROJECTED MANGA / COMIC READER (NANO MACHINE CHAPTER 320) */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-20 h-full flex flex-col justify-between space-y-3"
                      >
                        {/* Header Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 bg-neutral-900 text-white px-3 py-1.5 rounded-xs font-mono text-xs shadow-md">
                          <div className="flex items-center gap-2">
                            <Book className="w-4 h-4 text-accent-acid" />
                            <span className="font-bold">{MANGA_CONFIG.title}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={MANGA_CONFIG.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-accent-acid text-ink font-bold px-2.5 py-0.5 rounded-xs hover:scale-105 transition-transform text-[10px] flex items-center gap-1"
                            >
                              <span>OPEN SOURCE WEBSITE</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>

                        {/* Interactive Scrollable Manga Reader Frame */}
                        <div className="relative flex-1 w-full min-h-[420px] rounded-xs border-2 border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl flex flex-col">
                          {/* Top Embedded Iframe with fallbacks */}
                          <iframe 
                            src={MANGA_CONFIG.url}
                            title={MANGA_CONFIG.title}
                            className="w-full flex-1 border-0 min-h-[400px] bg-neutral-900"
                            allowFullScreen
                          />

                          {/* Soft Glare & Vignette over manga reader */}
                          <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.3)] pointer-events-none" />
                        </div>

                        {/* Reader Bottom Controls & Website Indicator */}
                        <div className="flex flex-wrap items-center justify-between gap-2 bg-neutral-900 text-white p-2 rounded-xs border border-neutral-700 font-mono text-xs">
                          <div className="flex items-center gap-2 text-[10px] text-white/80">
                            <span className="w-2 h-2 rounded-full bg-accent-acid animate-ping" />
                            <span>SOURCE: NANOMACHIN.COM // SCROLL TO READ</span>
                          </div>

                          <a
                            href={MANGA_CONFIG.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-acid font-bold text-[10px] hover:underline flex items-center gap-1"
                          >
                            <span>LAUNCH FULL MANGA TAB</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </motion.div>
                    ) : activeMode === 'MUSIC' ? (
                      /* MODE 2: YOUTUBE MUSIC VIDEO PROJECTED DIRECTLY ON THE SCREEN CANVAS */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-20 h-full flex flex-col justify-between space-y-4"
                      >
                        {/* Projected Video Header Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 bg-neutral-900 text-white px-3 py-1.5 rounded-xs font-mono text-xs shadow-md">
                          <div className="flex items-center gap-2">
                            <Radio className="w-4 h-4 text-accent-acid animate-pulse" />
                            <span className="font-bold">DETQEL PROJECTOR CINEMA // YOUTUBE STREAM</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setActiveMode('STORY')}
                              className="bg-accent-acid text-ink font-bold px-2.5 py-0.5 rounded-xs hover:scale-105 transition-transform text-[10px]"
                            >
                              BACK TO STORY
                            </button>
                          </div>
                        </div>

                        {/* Live YouTube Video Player Embedded Directly on the Projected Screen */}
                        <div className="relative flex-1 w-full aspect-video min-h-[260px] rounded-xs border-2 border-neutral-800 bg-black overflow-hidden shadow-2xl">
                          <iframe 
                            className="w-full h-full object-cover"
                            src={currentTrack.embedUrl}
                            title={currentTrack.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] pointer-events-none" />
                        </div>

                        {/* Track Selection Bar Below Projected Video */}
                        <div className="flex flex-wrap items-center justify-between gap-2 bg-neutral-900 text-white p-2 sm:p-2.5 rounded-xs border border-neutral-700 font-mono text-xs">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-accent-acid font-bold text-[10px]">TRACKS:</span>
                            {YOUTUBE_PLAYLIST.map((track, idx) => (
                              <button
                                key={track.id}
                                onClick={() => selectTrack(idx)}
                                className={`px-2.5 py-1 rounded-xs transition-all text-[10px] font-bold ${
                                  currentTrackIndex === idx
                                    ? 'bg-accent-acid text-ink shadow-sm'
                                    : 'bg-neutral-800 text-white/70 hover:text-white'
                                }`}
                              >
                                {track.title.split('// ')[1] || track.title}
                              </button>
                            ))}
                          </div>

                          <a
                            href={currentTrack.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-acid hover:underline text-[10px] flex items-center gap-1"
                          >
                            <span>OPEN ON YOUTUBE</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </motion.div>
                    ) : (
                      /* MODE 1: STANDARD DETQEL STORY PRESENTATION SLIDES */
                      <motion.div
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-20 h-full flex flex-col justify-between space-y-6"
                      >
                        {/* Presentation Top Section */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                          
                          {/* Left Text Block */}
                          <div className="md:col-span-7 space-y-4">
                            <div className="inline-flex items-center gap-2 bg-neutral-900 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-widest">
                              <Sparkles className="w-3 h-3 text-accent-acid" />
                              <span>{currentSlideData.badge}</span>
                            </div>

                            <h3 className="font-sans text-2xl sm:text-4xl font-extrabold text-neutral-900 leading-tight">
                              {currentSlideData.headline}
                              <span className="text-accent-acid-green bg-emerald-100 px-1 border-b-2 border-accent-acid">
                                {currentSlideData.highlight}
                              </span>
                            </h3>

                            <p className="font-sans text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                              {currentSlideData.description}
                            </p>
                          </div>

                          {/* Right Pinned Realistic Team Photo */}
                          <div className="md:col-span-5 flex justify-center md:justify-end">
                            <div className="relative bg-white p-2 sm:p-2.5 border border-neutral-300 shadow-xl rotate-[3deg] max-w-[220px] transition-transform hover:scale-105">
                              {/* Yellow Masking Tape */}
                              <div className="absolute -top-3 left-1/3 w-12 h-3.5 bg-yellow-300/80 border border-yellow-400 rotate-[-5deg]" />
                              {/* Paperclip */}
                              <div className="absolute top-1 right-3 w-2.5 h-6 border-2 border-neutral-600 rounded-t-full" />

                              <img 
                                src="/images/detqel_team_photo.png" 
                                alt="DETQEL Team Photo" 
                                className="w-full aspect-[4/3] object-cover rounded-xs"
                              />
                              <div className="mt-2 text-center font-mono text-[9px] font-bold text-neutral-700 uppercase tracking-wider">
                                DETQEL CREATIVE CREW © 2026
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* 4 Clean Statistic Cards Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-300">
                          {STATS_DATA.map((stat, idx) => {
                            const IconComp = stat.icon;
                            return (
                              <div 
                                key={idx}
                                className="bg-white/80 backdrop-blur-xs p-3 rounded-xs border border-neutral-300 shadow-xs hover:border-neutral-900 transition-colors"
                              >
                                <div className="flex items-center gap-1.5 text-accent-acid-green font-pixel font-bold text-xl sm:text-2xl mb-0.5">
                                  <IconComp className="w-4 h-4 text-neutral-800" />
                                  <span>{stat.value}</span>
                                </div>
                                <div className="font-mono text-[10px] text-neutral-600 font-bold uppercase tracking-wider">
                                  {stat.label}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                      </motion.div>
                    )
                  ) : (
                    /* Projector OFF or Screen Retracted State: Blank Canvas */
                    <div className="h-full flex items-center justify-center">
                      <span className="font-mono text-xs text-neutral-400/50 uppercase tracking-widest">
                        [ PROJECTION SCREEN — BLANK CANVAS ]
                      </span>
                    </div>
                  )}

                </div>

                {/* Bottom Screen Weighted Roller Handle Bar & Interactive Pull Ring */}
                <div className="w-full h-4 bg-neutral-900 rounded-b-sm flex justify-center items-center relative z-30">
                  <motion.button
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleScreenPull}
                    onMouseEnter={() => triggerCursor(isScreenPulledDown ? 'RETRACT SCREEN' : 'PULL DOWN SCREEN', 'hover')}
                    onMouseLeave={() => triggerCursor('', 'default')}
                    className="w-6 h-6 rounded-full border-2 border-neutral-400 bg-neutral-800 -mb-4 shadow-lg flex items-center justify-center cursor-pointer group"
                    title={isScreenPulledDown ? 'Click to flip up / retract screen' : 'Click to pull down screen'}
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-acid group-hover:animate-ping" />
                  </motion.button>
                </div>
              </motion.div>

            </div>

            {/* Slide Navigation Bar Below Screen (When in Presentation Mode) */}
            {isOn && isScreenPulledDown && activeMode === 'STORY' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex flex-wrap items-center justify-between gap-2 bg-neutral-900 text-white p-2.5 rounded-xs border border-neutral-700 font-mono text-xs shadow-lg z-20"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  {SLIDES_DATA.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => {
                        sound.playClick();
                        setActiveSlide(idx);
                      }}
                      className={`px-2.5 py-1 rounded-xs transition-all font-bold ${
                        activeSlide === idx 
                          ? 'bg-accent-acid text-ink shadow-sm' 
                          : 'text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {slide.badge.split('// ')[1] || slide.badge}
                    </button>
                  ))}
                </div>

                <div className="text-[10px] text-white/50 hidden sm:block">
                  SLIDE {activeSlide + 1} OF {SLIDES_DATA.length}
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
