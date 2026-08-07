import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/sound';

interface AboutSidebarProps {
  activeSection: number;
  onSelectSection: (index: number) => void;
}

export const DRAWER_SECTIONS = [
  { id: 0, title: 'OUR STORY', tag: '01 / ORIGINS' },
  { id: 1, title: 'OUR MISSION', tag: '02 / PURPOSE' },
  { id: 2, title: 'OUR VALUES', tag: '03 / ETHOS' },
  { id: 3, title: 'OUR TEAM', tag: '04 / PEOPLE' },
  { id: 4, title: 'WHY DETQEL', tag: '05 / ADVANTAGE' },
  { id: 5, title: 'THE JOURNEY', tag: '06 / TIMELINE' }
];

export const AboutSidebar: React.FC<AboutSidebarProps> = ({ activeSection, onSelectSection }) => {
  return (
    <div className="w-full bg-[#181624] border-4 border-ink p-3.5 sm:p-4 rounded-xs shadow-brutalist relative perspective-1000">
      
      {/* Top Cabinet Metallic Header */}
      <div className="flex items-center justify-between border-b-2 border-white/10 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-xs bg-[#88C000] border border-black shadow-xs" />
          <h2 className="font-pixel text-base font-black text-white uppercase tracking-wider">
            ABOUT US
          </h2>
        </div>
        <div className="flex items-center gap-1.5 bg-[#0D0C13] px-2 py-0.5 rounded-xs border border-white/15">
          <span className="w-2 h-2 rounded-full bg-[#88C000] animate-pulse" />
          <span className="font-pixel text-[8px] text-[#88C000] uppercase font-bold tracking-wider">
            SELECT A DRAWER
          </span>
        </div>
      </div>

      {/* 3D ISOMETRIC METALLIC FILING CABINET SLOTS */}
      <div className="space-y-3 relative py-1" style={{ transformStyle: 'preserve-3d' }}>
        {DRAWER_SECTIONS.map((drawer) => {
          const isOpen = activeSection === drawer.id;

          return (
            <div key={drawer.id} className="relative" style={{ transformStyle: 'preserve-3d' }}>
              
              {/* Cabinet Empty Recessed Slot Background */}
              <div className="w-full h-12 bg-[#0C0B12] border-2 border-black rounded-xs shadow-inner relative flex items-center justify-between px-3">
                <span className="font-pixel text-[8px] text-gray-600 font-bold uppercase">
                  SLOT 0{drawer.id + 1} // RECESSED
                </span>
                <div className="w-12 h-1 bg-gray-800 rounded-full" />
              </div>

              {/* PHYSICAL 3D EXTRACTABLE DRAWER UNIT */}
              <motion.div
                onClick={() => {
                  sound.playClick();
                  onSelectSection(drawer.id);
                }}
                animate={{
                  x: isOpen ? 32 : 0,
                  z: isOpen ? 24 : 0,
                  rotateY: isOpen ? -4 : 0,
                  scale: isOpen ? 1.03 : 1
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`absolute inset-0 h-12 rounded-xs border-3 border-ink cursor-pointer transition-colors shadow-[0_6px_20px_rgba(0,0,0,0.5)] flex items-center justify-between px-3 z-10 ${
                  isOpen
                    ? 'bg-[#88C000] text-ink border-black font-extrabold shadow-[0_12px_28px_rgba(0,0,0,0.6)]'
                    : 'bg-gradient-to-r from-[#2A273A] via-[#201E2C] to-[#1A1824] text-gray-200 hover:from-[#322F45] hover:to-[#222032]'
                }`}
              >
                {/* 3D Drawer Side Extension Panel (Visible when extended) */}
                {isOpen && (
                  <div className="absolute -left-7 top-0 bottom-0 w-7 bg-[#1A1824] border-y-2 border-l-2 border-ink rounded-l-xs flex flex-col justify-between p-1 opacity-90 shadow-md">
                    <div className="w-full h-1 bg-[#88C000]" />
                    <div className="w-full h-1 bg-gray-600" />
                    <div className="w-full h-1 bg-[#88C000]" />
                  </div>
                )}

                {/* 3D Metallic Pull Handle & Label Holder */}
                <div className="flex items-center gap-2.5">
                  
                  {/* Heavy Steel 3D Metallic Handle */}
                  <div className={`w-8 h-4 rounded-xs border-2 border-black flex items-center justify-center shadow-xs transition-colors ${
                    isOpen ? 'bg-ink text-[#88C000]' : 'bg-[#3C3852] text-gray-300'
                  }`}>
                    <div className="w-5 h-1 bg-gray-400 border border-black rounded-full" />
                  </div>

                  {/* Section Title */}
                  <span className="font-pixel text-xs sm:text-sm tracking-wider uppercase">
                    {drawer.title}
                  </span>
                </div>

                {/* Status Indicator Tag */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] opacity-70 hidden sm:inline">
                    {drawer.tag}
                  </span>
                  
                  <div className={`px-2 py-0.5 rounded-[2px] font-mono text-[9px] font-bold border transition-colors ${
                    isOpen
                      ? 'bg-ink text-[#88C000] border-black shadow-xs'
                      : 'bg-[#100F17] text-gray-400 border-black/40'
                  }`}>
                    {isOpen ? 'SLID OUT ◄' : 'PULL ▶'}
                  </div>
                </div>

                {/* Bottom Bevel Lighting Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${isOpen ? 'bg-black/30' : 'bg-white/10'}`} />
              </motion.div>

            </div>
          );
        })}
      </div>

      {/* Taped Sticky Note on Bottom of Filing Cabinet */}
      <div className="mt-4 bg-[#FFF066] text-ink p-2.5 rounded-xs shadow-sticky border border-amber-300 font-handwriting text-xs font-bold -rotate-2 relative z-20">
        <div className="tape-sticker tape-sticker-yellow w-8 h-3 -top-1.5 left-1/2 -translate-x-1/2 rounded-xs" />
        We don't just build software. We build digital experiences that create impact. ♥
      </div>

    </div>
  );
};
