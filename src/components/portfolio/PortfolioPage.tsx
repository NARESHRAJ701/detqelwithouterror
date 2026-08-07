import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArcadeMachine } from './ArcadeMachine';
import { PinballMachine } from './PinballMachine';
import { ProjectVendor } from './ProjectVendor';
import { ClawMachine } from './ClawMachine';
import { ArchiveShelf } from './ArchiveShelf';
import { CaseStudyDoor } from './CaseStudyDoor';
import { WhiteboardProcess } from './WhiteboardProcess';
import { FilterClipboard } from './FilterClipboard';
import { LaptopPreview } from './LaptopPreview';
import { RobotMascot } from '../about/RobotMascot';
import { CRTMonitor } from '../about/CRTMonitor';
import { CoffeeWidget } from '../about/CoffeeWidget';
import { ExploreYourWay } from './ExploreYourWay';
import { NowPlayingDock } from './NowPlayingDock';

interface PortfolioPageProps {
  onSelectProject: (project: any) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onSelectProject }) => {
  const [selectedCat, setSelectedCat] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const sampleProjects = {
    'planet-coffee': {
      id: 'planet-coffee',
      title: 'Planet Coffee Branding & Web',
      category: 'Branding & Web',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      description: 'Bespoke identity system, packaging, and custom WebGL e-commerce experience for an artisanal coffee roaster.',
      fullDescription: 'Planet Coffee needed a brand strategy and digital platform that matched their commitment to sustainable bean sourcing. We designed a vibrant pixel-aesthetic identity system and built a high-speed web application with 3D product previews.',
      tags: ['Branding', 'WebGL', 'Next.js', 'Tailwind CSS', 'Shopify'],
      link: 'https://detqel.com'
    },
    'ari-matcha': {
      id: 'ari-matcha',
      title: 'ARI Matcha Packaging',
      category: 'Packaging',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
      description: 'Minimalist Japanese matcha tea tin packaging and web store.',
      fullDescription: 'Crafted custom matte tin packaging, bamboo whisk gift boxes, and a high-converting web shop.',
      tags: ['Packaging', 'Design', 'E-Commerce'],
      link: 'https://detqel.com'
    },
    'movefit': {
      id: 'movefit',
      title: 'Movefit Fitness App',
      category: 'Mobile Apps',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      description: 'AI-assisted workout tracker and real-time posture correction app.',
      fullDescription: 'Engineered a mobile app utilizing computer vision to analyze exercise form and suggest real-time posture adjustments.',
      tags: ['Mobile App', 'AI', 'React Native'],
      link: 'https://detqel.com'
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const normX = (clientX / innerWidth - 0.5) * 2;
    const normY = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x: normX, y: normY });
  };

  const handleOpenProject = (id: string) => {
    const proj = (sampleProjects as any)[id] || sampleProjects['planet-coffee'];
    onSelectProject(proj);
  };

  const handleRandomProject = () => {
    const keys = Object.keys(sampleProjects);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    handleOpenProject(randomKey);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-graph-paper text-ink dark:text-white pt-24 pb-28 px-4 sm:px-8 font-sans select-none relative overflow-hidden transition-colors duration-300"
    >
      
      {/* Ambient Overhead Studio Spotlights */}
      <div className="absolute top-0 left-1/3 w-[800px] h-[900px] bg-gradient-to-b from-amber-300/20 via-amber-100/5 to-transparent blur-3xl pointer-events-none z-10" />

      {/* MAIN 3D ISOMETRIC CREATIVE LAB ROOM CANVAS */}
      <div className="max-w-[1560px] mx-auto relative z-10 space-y-12">
        
        {/* 3D ISOMETRIC ROOM CONTAINER WITH MOUSE PARALLAX TILT */}
        <motion.div
          animate={{
            rotateX: 4 + mousePos.y * 2,
            rotateY: mousePos.x * 3
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 24 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="p-4 sm:p-6 bg-[#EFECE6] dark:bg-[#1A1824] border-4 border-ink rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.6)] space-y-8 relative overflow-hidden transition-transform duration-200"
        >
          
          {/* Neon Sign Header Above Machines */}
          <div className="w-full flex items-center justify-center pt-2">
            <div className="bg-[#121118] text-[#88C000] border-3 border-ink px-6 py-2 rounded-xs shadow-brutalist font-pixel text-xs sm:text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#88C000] animate-ping" />
              WORK IS SERIOUS. PLAY IS SERIOUSLY FUN.
            </div>
          </div>

          {/* SECTION 1: HERO CREATIVE ROOM (LEFT EDITORIAL + 3D EXPLORABLE MACHINES) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" style={{ transformStyle: 'preserve-3d' }}>
            
            {/* Left Editorial Heading Column (Col 3) */}
            <div className="lg:col-span-3 space-y-4 pt-2">
              <div className="inline-flex items-center gap-2 bg-white dark:bg-canvas-dark-paper border border-ink/20 px-3 py-1 rounded-xs shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#88C000] animate-ping" />
                <span className="font-pixel text-xs font-bold uppercase tracking-wider text-ink dark:text-gray-200">
                  WELCOME TO THE
                </span>
              </div>

              <h1 className="font-pixel text-4xl sm:text-5xl font-black text-ink dark:text-white tracking-tight leading-[0.98]">
                CREATIVE<br />
                PLAYGROUND<span className="text-[#88C000]">.</span>
              </h1>

              <p className="font-sans text-xs sm:text-sm text-ink/80 dark:text-gray-300 leading-relaxed font-medium">
                Explore our work in the most fun way possible. Every object here opens a story.
              </p>

              {/* Green Scribble Note */}
              <div className="font-handwriting text-xl text-[#88C000] font-bold -rotate-2 flex items-center gap-2 pt-2">
                <span>Pick something, play around!</span>
                <span className="animate-bounce">→</span>
              </div>

              {/* CRT Computer & Desk Lamp on Left Desk */}
              <div className="pt-4 flex flex-col items-center">
                <CRTMonitor />
              </div>
            </div>

            {/* 3D Explorable Studio Room Machines & Objects (Col 9) */}
            <div className="lg:col-span-9 flex flex-wrap items-end justify-center lg:justify-between gap-6" style={{ transformStyle: 'preserve-3d' }}>
              
              {/* Project Claw Machine */}
              <ClawMachine onSelectRandomProject={handleRandomProject} />

              {/* Arcade Machine */}
              <ArcadeMachine onSelectProject={handleOpenProject} />

              {/* Pinball Machine */}
              <PinballMachine onSelectCategory={(cat) => setSelectedCat(cat)} />

              {/* Project Vendor */}
              <ProjectVendor onSelectCategory={(cat) => setSelectedCat(cat)} />

              {/* Archive Shelves */}
              <ArchiveShelf onSelectCategory={(cat) => setSelectedCat(cat)} />

              {/* Case Study Door */}
              <CaseStudyDoor onEnter={() => handleOpenProject('planet-coffee')} />

            </div>

          </div>

          {/* SECTION 2: WORKSTATION DESK OBJECTS & WHITEBOARD */}
          <div className="pt-6 border-t-2 border-ink/20 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            
            {/* Left Side: Robot Mascot & Lounge Coffee Table */}
            <div className="md:col-span-4 flex items-end justify-between gap-4">
              <RobotMascot activeSection={0} />
              
              {/* Coffee Table & Mug */}
              <div className="flex flex-col items-center">
                <CoffeeWidget />
                <div className="w-20 h-2 bg-[#4A2C11] border border-ink rounded-xs mt-1" />
              </div>
            </div>

            {/* Center Side: Whiteboard Process */}
            <div className="md:col-span-4 flex justify-center">
              <WhiteboardProcess />
            </div>

            {/* Right Side: Laptop Preview & Filter Clipboard */}
            <div className="md:col-span-4 flex items-end justify-end gap-4">
              <LaptopPreview onSelectProject={handleOpenProject} />
              <FilterClipboard
                selectedCat={selectedCat}
                onSelectCategory={(cat) => setSelectedCat(cat)}
              />
            </div>

          </div>

          {/* SECTION 3: EXPLORE PROJECTS YOUR WAY CONTROL PANEL */}
          <div className="pt-4">
            <ExploreYourWay onSelectModule={(mod) => {
              if (mod === 'PINBALL' || mod === 'CLAW') {
                handleRandomProject();
              } else {
                handleOpenProject('planet-coffee');
              }
            }} />
          </div>

        </motion.div>

      </div>

      {/* FIXED BOTTOM MARQUEE DOCK */}
      <NowPlayingDock onSelectProject={handleOpenProject} />

    </div>
  );
};

export default PortfolioPage;
