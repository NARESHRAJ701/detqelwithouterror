import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/sound';

interface LaptopPreviewProps {
  onSelectProject: (id: string) => void;
}

export const LaptopPreview: React.FC<LaptopPreviewProps> = ({ onSelectProject }) => {
  const [activeTab, setActiveTab] = useState(0);

  const previews = [
    { id: 'planet-coffee', name: 'PLANET COFFEE', tag: 'BRANDING & WEB' },
    { id: 'ari-matcha', name: 'ARI MATCHA', tag: 'PACKAGING' },
    { id: 'movefit', name: 'MOVEFIT', tag: 'MOBILE APP' }
  ];

  const current = previews[activeTab];

  return (
    <div className="relative flex flex-col items-center select-none cursor-pointer group">
      
      {/* Laptop Screen Casing */}
      <div className="w-56 sm:w-64 h-36 bg-[#201E2C] border-4 border-ink rounded-t-lg p-2 shadow-brutalist relative flex flex-col justify-between">
        
        {/* Webcam */}
        <div className="w-1.5 h-1.5 rounded-full bg-black border border-white/20 mx-auto mb-1" />

        {/* Display Screen */}
        <div
          onClick={() => {
            sound.playProjectorOn();
            onSelectProject(current.id);
          }}
          className="w-full flex-1 bg-[#121118] border-2 border-ink rounded-xs p-2 relative overflow-hidden flex flex-col justify-between text-white font-mono shadow-inner group-hover:border-[#88C000] transition-colors"
        >
          <div className="flex justify-between items-center text-[7.5px] border-b border-white/10 pb-1">
            <span className="text-[#88C000] font-bold">{current.name}</span>
            <span className="opacity-70">{current.tag}</span>
          </div>

          <div className="my-auto text-center space-y-1">
            <div className="font-pixel text-xs font-black text-[#88C000]">
              VIEW LIVE CASE STUDY
            </div>
            <div className="font-pixel text-[8px] opacity-80">
              [ CLICK TO EXPLORE ]
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] opacity-60">
            <span>DETQEL PREVIEW</span>
            <span>2025</span>
          </div>
        </div>

      </div>

      {/* Laptop Keyboard Base */}
      <div className="w-64 sm:w-72 h-4 bg-gradient-to-b from-[#343144] to-[#1D1B28] border-x-4 border-b-4 border-ink rounded-b-md shadow-md flex items-center justify-center relative">
        <div className="w-12 h-1 bg-black/40 rounded-full" />
      </div>

      {/* Taped Sticky Note on Laptop */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          const next = (activeTab + 1) % previews.length;
          setActiveTab(next);
          sound.playClick();
        }}
        className="absolute -bottom-3 -right-2 bg-[#FFF066] text-ink p-1.5 rounded-xs shadow-sticky border border-amber-300 font-handwriting text-[10px] font-bold rotate-6 z-30"
      >
        View All Projects! ⚡
      </motion.div>

    </div>
  );
};
