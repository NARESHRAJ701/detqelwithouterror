import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/sound';

interface ArchiveShelfProps {
  onSelectCategory: (cat: string) => void;
}

export const ArchiveShelf: React.FC<ArchiveShelfProps> = ({ onSelectCategory }) => {
  const [openBox, setOpenBox] = useState<string | null>(null);

  const boxes = [
    { label: 'A', name: 'WEBSITES & WEBGL', color: 'bg-emerald-700' },
    { label: 'B', name: 'AI & AUTOMATION', color: 'bg-amber-700' },
    { label: 'C', name: 'BRANDING & DESIGN', color: 'bg-purple-700' }
  ];

  const handleToggle = (label: string, name: string) => {
    sound.playClick();
    if (openBox === label) {
      setOpenBox(null);
    } else {
      setOpenBox(label);
      onSelectCategory(name);
    }
  };

  return (
    <div className="relative select-none cursor-pointer group perspective-1000">
      
      {/* 3D Header Badge */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#121118] text-amber-300 border-2 border-ink px-3 py-1 rounded-t-sm shadow-brutalist font-pixel text-xs font-black uppercase tracking-widest z-30 flex items-center gap-1.5 transform translate-z-10">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        ARCHIVE SHELVES
      </div>

      {/* 3D WOODEN BOOKCASE CONTAINER */}
      <motion.div
        whileHover={{ rotateY: -6, rotateX: 4, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-48 sm:w-52 h-72 bg-[#4A2E16] border-4 border-[#301D0B] p-3 rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative flex flex-col justify-between"
      >
        {/* 3D Left Wood Depth */}
        <div className="absolute -left-5 top-0 bottom-0 w-5 bg-[#331E0D] border-y-4 border-l-4 border-[#251508] rounded-l-lg transform -skew-y-12 origin-right shadow-md pointer-events-none" />

        <div className="space-y-3 my-auto" style={{ transformStyle: 'preserve-3d' }}>
          {boxes.map((b) => {
            const isOpen = openBox === b.label;
            return (
              <div key={b.label} className="relative" style={{ transformStyle: 'preserve-3d' }}>
                
                {/* Shelf Bay Slot Background */}
                <div className="w-full h-14 bg-[#1F1208] border-2 border-black rounded-xs shadow-inner relative flex items-center justify-between px-2">
                  <span className="font-pixel text-[8px] text-amber-700 font-bold uppercase">
                    SLOT {b.label}
                  </span>
                </div>

                {/* 3D EXTENDABLE STORAGE BOX */}
                <motion.div
                  onClick={() => handleToggle(b.label, b.name)}
                  animate={{
                    x: isOpen ? 28 : 0,
                    z: isOpen ? 20 : 0,
                    rotateY: isOpen ? -5 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className={`absolute inset-0 h-14 rounded-xs border-3 border-black cursor-pointer font-pixel text-xs font-bold text-white shadow-xl transition-colors flex items-center justify-between px-3 ${b.color} ${
                    isOpen ? 'ring-2 ring-[#88C000] brightness-125' : 'hover:brightness-110'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-xs bg-black/40 border border-white/20 flex items-center justify-center font-black text-xs">
                      {b.label}
                    </div>
                    <span className="text-[9.5px] font-extrabold uppercase tracking-wide">{b.name}</span>
                  </div>

                  <span className="font-mono text-[8.5px] bg-black/40 px-1.5 py-0.5 rounded-[1px]">
                    {isOpen ? 'OPEN' : 'PULL'}
                  </span>
                </motion.div>

              </div>
            );
          })}
        </div>

      </motion.div>
    </div>
  );
};
