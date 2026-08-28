import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Sparkles, ArrowUpRight, Compass, Heart, Users, Target, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';

interface ProjectorStorySectionProps {
  className?: string;
}

const STORY_TABS = [
  {
    id: 'journey',
    label: 'OUR JOURNEY',
    title: 'From Visionary Ideas to Intelligent Scale',
    description: 'Founded with a belief that creative design and technical intelligence must operate in harmony, Detqel crafts products that define categories.',
    icon: Compass,
    accent: '#B7E532'
  },
  {
    id: 'values',
    label: 'OUR VALUES',
    title: 'Obsessive Craft & Relentless Execution',
    description: 'We believe whitespace is intentional, typography dictates rhythm, and intelligent code empowers human scale.',
    icon: Heart,
    accent: '#FF6B35'
  },
  {
    id: 'team',
    label: 'OUR TEAM',
    title: 'Engineers, Designers & AI Researchers',
    description: 'A close-knit collective of creative problem solvers who treat every client engagement as a mission-critical partnership.',
    icon: Users,
    accent: '#00A676'
  },
  {
    id: 'vision',
    label: 'OUR VISION',
    title: 'Engineering the Next Frontier of Experiences',
    description: 'Pioneering generative AI workflows, spatial interfaces, and high-performance WebGL ecosystems for future-ready brands.',
    icon: Target,
    accent: '#7C3AED'
  },
];

export const ProjectorStorySection: React.FC<ProjectorStorySectionProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<string>('journey');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const currentTab = STORY_TABS.find((t) => t.id === activeTab) || STORY_TABS[0];

  return (
    <section id="our-story-projector" className={`relative w-full py-16 sm:py-24 px-4 sm:px-8 select-none font-sans overflow-hidden ${className}`}>
      
      {/* Main Glass Workspace Card */}
      <div className="max-w-[1540px] mx-auto relative z-10 bg-black/45 dark:bg-black/65 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl text-white">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: ABOUT US COPY, STICKY NOTES, VINTAGE RADIO */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] animate-ping" />
                <span>03 / ABOUT US</span>
              </div>

              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[0.92]">
                OUR <span className="text-[#7C3AED]">STORY.</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed font-medium">
                DETQEL is an AI-first digital product studio helping startups and brands turn ambitious ideas into scalable products and unforgettable digital experiences.
              </p>
            </div>

            {/* Sticky Notes & Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3.5 py-2 rounded-xl bg-[#FFF066] text-black border border-black/20 font-handwriting text-base font-bold shadow-md -rotate-2 hover:rotate-0 transition-transform">
                📌 Founders Story
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-[#FFC2E2] text-black border border-black/20 font-handwriting text-base font-bold shadow-md rotate-3 hover:rotate-0 transition-transform">
                🚀 Mission Driven
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-[#B2F5EA] text-black border border-black/20 font-handwriting text-base font-bold shadow-md -rotate-1 hover:rotate-0 transition-transform">
                💡 Impact Focused
              </div>
            </div>

            {/* Click to know how we came to build link */}
            <div className="pt-2 border-t border-white/15">
              <a
                href="#about"
                onClick={() => sound.playClick()}
                onMouseEnter={() => triggerCursor('OUR STORY', 'hover')}
                onMouseLeave={() => triggerCursor('', 'default')}
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#B7E532] hover:text-white transition-colors"
              >
                <span>Click to know how we came to build</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Radio / Vintage Workstation Accessory Box */}
            <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/15 backdrop-blur-md flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white font-pixel text-xs font-bold">
                  📻
                </div>
                <div>
                  <span className="font-pixel text-xs font-bold text-white uppercase tracking-wider block">
                    STUDIO BROADCAST
                  </span>
                  <span className="font-mono text-[10px] text-[#B7E532]">
                    LIVE FREQUENCY 104.2 MHZ
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/60">
                <span className="w-2 h-2 rounded-full bg-[#00A676] animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTIVE WORKSTATION / FILM DISPLAY */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Story Navigation Tabs */}
            <div className="bg-white/10 dark:bg-white/5 p-1.5 rounded-2xl border border-white/15 backdrop-blur-md flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
              {STORY_TABS.map((tab) => {
                const isSelected = activeTab === tab.id;
                const IconComp = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveTab(tab.id);
                    }}
                    onMouseEnter={() => {
                      sound.playHover();
                      triggerCursor(tab.label, 'hover');
                    }}
                    onMouseLeave={() => triggerCursor('', 'default')}
                    className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl font-mono text-[11px] font-bold tracking-tight transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#7C3AED] text-white shadow-md'
                        : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Video / Visual Interactive Projector Canvas */}
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/20 bg-black/80 shadow-2xl flex flex-col justify-between p-5 group">
              
              {/* Media Video Background */}
              <video
                src="/images/floating%20world.mp4"
                autoPlay={isPlaying}
                loop
                muted={isMuted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />

              {/* Top Video Header Controls */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[10px] text-[#B7E532]">
                  <Sparkles className="w-3 h-3" />
                  <span>CINEMATIC FILM // 4K 60FPS</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsMuted(!isMuted);
                    }}
                    className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all cursor-pointer"
                    title={isMuted ? 'Unmute Film Audio' : 'Mute Audio'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 opacity-70" /> : <Volume2 className="w-3.5 h-3.5 text-[#B7E532]" />}
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsPlaying(!isPlaying);
                    }}
                    className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all cursor-pointer"
                    title={isPlaying ? 'Pause Film' : 'Play Film'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#B7E532]" />}
                  </button>
                </div>
              </div>

              {/* Center Tagline Subtitle */}
              <div className="relative z-10 my-auto text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTab.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1"
                  >
                    <span className="font-mono text-[11px] text-[#B7E532] tracking-widest uppercase">
                      ( INNOVATION DRIVES — IDEAS SCALE )
                    </span>
                    <h3 className="font-pixel text-xl sm:text-2xl font-black text-white uppercase tracking-wide drop-shadow-md">
                      {currentTab.title}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Video Progress & Description */}
              <div className="relative z-10 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/15 flex items-center justify-between gap-4">
                <p className="font-sans text-xs text-white/90 truncate flex-1">
                  {currentTab.description}
                </p>
                <span className="font-mono text-[10px] text-[#B7E532] shrink-0">
                  LIVE STUDIO ↗
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProjectorStorySection;
