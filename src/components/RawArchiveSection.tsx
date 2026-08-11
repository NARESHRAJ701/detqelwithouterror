import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../types';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { ArrowDown, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface RawArchiveItem {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  client: string;
  projectType: string;
  toolsUsed: string;
  image: string;
  thumbnails: string[];
  clipColor: string;
  strokeColor: string;
  clipPos: 'left' | 'center' | 'right';
  rotation: number;
}

const ARCHIVE_ITEMS: RawArchiveItem[] = [
  {
    id: 'planet-coffee',
    title: 'Planet Coffee',
    category: 'Branding / Identity',
    year: '2024',
    description: 'A premium coffee brand identity crafted for a modern café experience. From logo to packaging, we built a strong visual language that brews trust and warmth.',
    client: 'Planet Coffee',
    projectType: 'Brand Identity',
    toolsUsed: 'Figma, Illustrator, Blender',
    image: '/projects/go_planet_coffee.png',
    thumbnails: ['/projects/go_planet_coffee.png', '/projects/billa_hot_sauce.png', '/projects/ari_matcha.png'],
    clipColor: '#3B82F6', // Blue clip
    strokeColor: '#2563EB',
    clipPos: 'left',
    rotation: -3
  },
  {
    id: 'billa-hotsauce',
    title: 'Billa Hotsauce',
    category: 'Branding / Packaging',
    year: '2024',
    description: 'Vibrant artisanal hot sauce packaging design featuring custom character illustrations, bold fiery typography, and high-heat color contrasts.',
    client: 'Billa Ferments',
    projectType: 'Packaging Design',
    toolsUsed: 'Photoshop, Illustrator, Cinema 4D',
    image: '/projects/billa_hot_sauce.png',
    thumbnails: ['/projects/billa_hot_sauce.png', '/projects/go_planet_coffee.png', '/projects/wild_pup.png'],
    clipColor: '#EC4899', // Pink clip
    strokeColor: '#DB2777',
    clipPos: 'center',
    rotation: 2
  },
  {
    id: 'ari-matcha',
    title: 'ARI Matcha',
    category: 'Branding / Packaging',
    year: '2024',
    description: 'Minimalist Japanese ceremonial matcha packaging and identity system with tactile matte finish, traditional calligraphy, and serene green tones.',
    client: 'Ari Tea Collective',
    projectType: 'Luxury Brand & Packaging',
    toolsUsed: 'Figma, KeyShot, Adobe XD',
    image: '/projects/ari_matcha.png',
    thumbnails: ['/projects/ari_matcha.png', '/projects/go_planet_coffee.png', '/projects/fintrack.png'],
    clipColor: '#F59E0B', // Yellow clip
    strokeColor: '#D97706',
    clipPos: 'right',
    rotation: -1
  },
  {
    id: 'wild-pup',
    title: 'Wild Pup',
    category: 'Branding / Packaging',
    year: '2024',
    description: 'Playful pet food brand identity and sustainable tin packaging designed for eco-conscious pet owners with clean Scandinavian pastel colors.',
    client: 'Wild Pup Co.',
    projectType: 'Brand Strategy & Packaging',
    toolsUsed: 'Illustrator, Dimension, Figma',
    image: '/projects/wild_pup.png',
    thumbnails: ['/projects/wild_pup.png', '/projects/billa_hot_sauce.png', '/projects/ari_matcha.png'],
    clipColor: '#84CC16', // Lime clip
    strokeColor: '#65A30D',
    clipPos: 'left',
    rotation: -3
  },
  {
    id: 'fintrack',
    title: 'Fintrack',
    category: 'UI/UX / Web App',
    year: '2024',
    description: 'Next-gen financial telemetry platform with high-density micro-sparklines, real-time analytics, and vibrant brutalist dashboard layouts.',
    client: 'Fintrack Inc.',
    projectType: 'Web Application',
    toolsUsed: 'Figma, React, TailwindCSS',
    image: '/projects/fintrack.png',
    thumbnails: ['/projects/fintrack.png', '/projects/nexora_ai.png', '/projects/movefit.png'],
    clipColor: '#7939a1', // Purple clip
    strokeColor: '#9333EA',
    clipPos: 'right',
    rotation: 3
  }
];

// Movable SVG Paperclip Component
const Paperclip: React.FC<{ color: string; strokeColor: string; positionStyle?: string }> = ({ color, strokeColor, positionStyle = 'left-6' }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.35, rotate: 18, zIndex: 100, cursor: 'grabbing' }}
      whileHover={{ scale: 1.15, cursor: 'grab' }}
      onDragStart={() => sound.playHover()}
      onDragEnd={() => sound.playClick()}
      title="DRAG ME! Interactive Paperclip"
      className={`absolute -top-5 ${positionStyle} z-30 cursor-grab active:cursor-grabbing touch-none select-none filter drop-shadow-md`}
    >
      <svg width="24" height="48" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 12 5 C 17 5 19 8 19 13 L 19 33 C 19 39 15 43 9 43 C 3 43 1 39 1 33 L 1 12 C 1 5 6 1 12 1 C 18 1 23 5 23 12 L 23 35 C 23 43 17 47 9 47 C 2 47 0 42 0 35"
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 12 5 C 17 5 19 8 19 13 L 19 33 C 19 39 15 43 9 43 C 3 43 1 39 1 33 L 1 12 C 1 5 6 1 12 1 C 18 1 23 5 23 12 L 23 35"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

interface RawArchiveSectionProps {
  onSelectProject?: (project: Project) => void;
}

export const RawArchiveSection: React.FC<RawArchiveSectionProps> = ({ onSelectProject }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const activeItem = ARCHIVE_ITEMS[selectedIndex];
  const [activeImage, setActiveImage] = useState<string>(activeItem.image);

  // Update active image when selection changes
  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    setActiveImage(ARCHIVE_ITEMS[idx].image);
    sound.playClick();
  };

  const handlePrev = () => {
    const newIdx = selectedIndex === 0 ? ARCHIVE_ITEMS.length - 1 : selectedIndex - 1;
    handleSelect(newIdx);
  };

  const handleNext = () => {
    const newIdx = selectedIndex === ARCHIVE_ITEMS.length - 1 ? 0 : selectedIndex + 1;
    handleSelect(newIdx);
  };

  return (
    <section className="py-24 px-4 sm:px-8 bg-canvas dark:bg-canvas-dark border-b-2 border-ink relative overflow-hidden select-none">
      {/* Background Engineering Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP SECTION HEADER (EXACT REFERENCE REPRODUCTION) */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-6">
          
          {/* Left Header Group */}
          <div className="space-y-4 max-w-2xl">
            {/* Portfolio Badge */}
            <div className="inline-flex items-center gap-2 bg-white dark:bg-canvas-dark-paper px-3 py-1 border border-ink shadow-brutalist-sm rounded-xs">
              <span className="w-2 h-2 rounded-full bg-accent-acid animate-pulse" />
              <span className="font-mono text-xs font-bold text-ink dark:text-white uppercase tracking-wider">
                PORTFOLIO
              </span>
            </div>

            {/* Brutalist Title */}
            <h2 className="font-pixel text-4xl sm:text-6xl font-black uppercase text-ink dark:text-white tracking-tight leading-tight">
              PROJECTS THAT<br />
              TELL STORIES<span className="text-accent-coral">.</span>
            </h2>
          </div>

          {/* Right Header Description & Metric Tag */}
          <div className="flex flex-col items-start md:items-end justify-between self-stretch space-y-6 max-w-md">
            {/* Top Right Counter Badge */}
            <div className="font-mono text-xs font-bold text-ink dark:text-gray-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-coral" />
              <span>50+ PROJECTS DELIVERED</span>
              <span className="text-ink font-bold text-sm">┐</span>
            </div>

            {/* Subtitle Description */}
            <p className="font-sans text-base text-ink dark:text-gray-200 font-medium leading-relaxed md:text-right">
              A curated selection of digital experiences we've designed, engineered, and shipped for brands and ambitious teams.
            </p>
          </div>
        </div>

        {/* MAIN CONTENT AREA: CARDS + LIVE INSPECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT CARDS CLUSTER (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top Row Cards (3 Items: Planet Coffee, Billa Hotsauce, ARI Matcha) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ARCHIVE_ITEMS.slice(0, 3).map((item, idx) => {
                const isSelected = selectedIndex === idx;
                const clipPosClass = item.clipPos === 'left' ? 'left-6' : item.clipPos === 'center' ? 'left-1/2 -translate-x-1/2' : 'right-6';

                return (
                  <motion.div
                    key={item.id}
                    initial={{ rotate: item.rotation }}
                    whileHover={{ scale: 1.04, rotate: 0, zIndex: 40 }}
                    onClick={() => handleSelect(idx)}
                    onMouseEnter={() => {
                      sound.playHover();
                      triggerCursor('INSPECT', 'hover');
                    }}
                    onMouseLeave={() => triggerCursor('', 'default')}
                    className={`relative bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-xs p-3 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'shadow-brutalist-lg border-ink ring-2 ring-accent-acid z-30 scale-[1.02]'
                        : 'shadow-brutalist opacity-90 hover:opacity-100'
                    }`}
                  >
                    {/* Movable Metallic Paperclip */}
                    <Paperclip color={item.clipColor} strokeColor={item.strokeColor} positionStyle={clipPosClass} />

                    {/* Window Controls Header */}
                    <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-ink/10">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>

                    {/* Card Hero Image */}
                    <div className="aspect-[4/3] w-full overflow-hidden border border-ink/20 bg-neutral-900 mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Card Footer Labels */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-ink dark:text-white font-sans">{item.title}</span>
                      <span className="text-[10px] text-ink/50 dark:text-gray-400">{item.category}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Row Cards (2 Items: Wild Pup, Fintrack) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto sm:mx-0">
              {ARCHIVE_ITEMS.slice(3, 5).map((item, idx) => {
                const realIdx = idx + 3;
                const isSelected = selectedIndex === realIdx;
                const clipPosClass = item.clipPos === 'left' ? 'left-6' : item.clipPos === 'center' ? 'left-1/2 -translate-x-1/2' : 'right-6';

                return (
                  <motion.div
                    key={item.id}
                    initial={{ rotate: item.rotation }}
                    whileHover={{ scale: 1.04, rotate: 0, zIndex: 40 }}
                    onClick={() => handleSelect(realIdx)}
                    onMouseEnter={() => {
                      sound.playHover();
                      triggerCursor('INSPECT', 'hover');
                    }}
                    onMouseLeave={() => triggerCursor('', 'default')}
                    className={`relative bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-xs p-3 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'shadow-brutalist-lg border-ink ring-2 ring-accent-acid z-30 scale-[1.02]'
                        : 'shadow-brutalist opacity-90 hover:opacity-100'
                    }`}
                  >
                    {/* Movable Metallic Paperclip */}
                    <Paperclip color={item.clipColor} strokeColor={item.strokeColor} positionStyle={clipPosClass} />

                    {/* Window Controls Header */}
                    <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-ink/10">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>

                    {/* Card Hero Image */}
                    <div className="aspect-[4/3] w-full overflow-hidden border border-ink/20 bg-neutral-900 mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Card Footer Labels */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-ink dark:text-white font-sans">{item.title}</span>
                      <span className="text-[10px] text-ink/50 dark:text-gray-400">{item.category}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* RIGHT LIVE INSPECTOR PANEL (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            
            <div className="relative bg-white dark:bg-canvas-dark-paper border-2 border-ink shadow-brutalist-lg rounded-xs p-5 sm:p-6 space-y-6">
              
              {/* Top Paperclip on Inspector Window */}
              <Paperclip color="#84CC16" strokeColor="#65A30D" positionStyle="right-8" />

              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-ink/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <span className="font-mono text-[10px] font-bold text-ink/40 dark:text-gray-500 uppercase tracking-widest">
                  CASE_INSPECTOR // #{selectedIndex + 1}
                </span>
              </div>

              {/* Main Active Hero Preview Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-2 border-ink rounded-xs bg-neutral-900 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={activeItem.title}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover object-center"
                  />
                </AnimatePresence>
              </div>

              {/* Project Title & Detailed Description */}
              <div className="space-y-2">
                <h3 className="font-pixel text-2xl sm:text-3xl font-black uppercase text-ink dark:text-white">
                  {activeItem.title}
                </h3>
                <p className="font-sans text-sm text-ink/75 dark:text-gray-300 leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              {/* Project Specs Grid */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-canvas-paper dark:bg-canvas-dark border border-ink/20 rounded-xs font-mono text-xs">
                <div>
                  <span className="text-ink/50 dark:text-gray-400 block text-[10px]">CLIENT</span>
                  <span className="font-bold text-ink dark:text-white">{activeItem.client}</span>
                </div>
                <div>
                  <span className="text-ink/50 dark:text-gray-400 block text-[10px]">YEAR</span>
                  <span className="font-bold text-ink dark:text-white">{activeItem.year}</span>
                </div>
                <div>
                  <span className="text-ink/50 dark:text-gray-400 block text-[10px]">PROJECT TYPE</span>
                  <span className="font-bold text-ink dark:text-white">{activeItem.projectType}</span>
                </div>
                <div>
                  <span className="text-ink/50 dark:text-gray-400 block text-[10px]">TOOLS USED</span>
                  <span className="font-bold text-ink dark:text-white">{activeItem.toolsUsed}</span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold text-ink/50 dark:text-gray-400 uppercase tracking-wider block">
                  ASSET ARCHIVE THUMBNAILS
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {activeItem.thumbnails.map((thumb, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => {
                        setActiveImage(thumb);
                        sound.playClick();
                      }}
                      className={`aspect-square w-full rounded-xs overflow-hidden border ${
                        activeImage === thumb ? 'border-2 border-ink ring-2 ring-accent-acid' : 'border-ink/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={thumb} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onSelectProject) {
                      // Map to project type if needed
                      onSelectProject({
                        id: activeItem.id,
                        number: `0${selectedIndex + 1}`,
                        title: activeItem.title,
                        subtitle: activeItem.description,
                        shortDescription: activeItem.description,
                        year: activeItem.year,
                        category: activeItem.category,
                        serviceTags: [activeItem.projectType],
                        deliverables: [activeItem.projectType],
                        image: activeItem.image,
                        tags: activeItem.toolsUsed.split(', '),
                        accentColor: activeItem.clipColor,
                        bgAccent: 'bg-accent-acid',
                        textAccent: 'text-accent-acid',
                        borderAccent: 'border-accent-acid',
                        badgeText: 'SELECTED WORK',
                        description: activeItem.description,
                        fullDescription: activeItem.description,
                        client: activeItem.client,
                        role: activeItem.projectType,
                        metrics: '100% Client Satisfaction',
                        mockupType: 'custom-image',
                        liveUrl: '#',
                        githubUrl: '#'
                      });
                    }
                  }}
                  className="w-full flex items-center justify-between bg-canvas-paper dark:bg-canvas-dark border-2 border-ink p-3 rounded-xs font-pixel text-xs font-bold text-ink dark:text-white hover:bg-ink hover:text-white dark:hover:bg-accent-acid dark:hover:text-ink transition-all shadow-brutalist group"
                >
                  <span>VIEW FULL PROJECT</span>
                  <span className="w-7 h-7 bg-accent-acid text-ink rounded-xs flex items-center justify-center border border-ink group-hover:translate-x-1 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM CONTROLS FOOTER (EXACT REFERENCE REPRODUCTION) */}
        <div className="flex items-center justify-between pt-6 border-t-2 border-ink">
          
          {/* Scroll & Pagination Indicator */}
          <div className="flex items-center gap-4 font-mono text-xs font-bold text-ink/70 dark:text-gray-300">
            <span className="p-1 border border-ink rounded-xs bg-white dark:bg-canvas-dark-paper shadow-brutalist-sm">
              <ArrowDown className="w-4 h-4" />
            </span>
            <span className="uppercase">SCROLL TO EXPLORE</span>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5 pl-4 border-l border-ink/20">
              {ARCHIVE_ITEMS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => handleSelect(dotIdx)}
                  className={`h-2 rounded-full transition-all ${
                    selectedIndex === dotIdx
                      ? 'w-5 bg-accent-coral'
                      : 'w-2 bg-ink/20 dark:bg-white/20 hover:bg-ink/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Prev / Next Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-xs shadow-brutalist hover:bg-accent-acid hover:text-ink transition-all"
              title="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-xs shadow-brutalist hover:bg-accent-acid hover:text-ink transition-all"
              title="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
