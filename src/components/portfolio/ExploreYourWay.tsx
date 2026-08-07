import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Sparkles, ShoppingBag, FolderArchive, Lock, Layout } from 'lucide-react';
import { sound } from '../../utils/sound';

interface ExploreYourWayProps {
  onSelectModule: (mod: string) => void;
}

export const ExploreYourWay: React.FC<ExploreYourWayProps> = ({ onSelectModule }) => {
  const modules = [
    { id: 'ARCADE', title: 'ARCADE', sub: 'Featured Projects', icon: Gamepad2 },
    { id: 'PINBALL', title: 'PINBALL', sub: 'Surprise Me', icon: Sparkles },
    { id: 'VENDOR', title: 'VENDOR', sub: 'By Category', icon: ShoppingBag },
    { id: 'ARCHIVE', title: 'ARCHIVE', sub: 'All Work', icon: FolderArchive },
    { id: 'LOCKERS', title: 'LOCKERS', sub: 'Case Studies', icon: Lock },
    { id: 'WHITEBOARD', title: 'WHITEBOARD', sub: 'Our Process', icon: Layout }
  ];

  return (
    <div className="w-full bg-[#181624] border-4 border-ink p-4 sm:p-6 rounded-lg shadow-brutalist relative select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-white/10 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#88C000] animate-ping" />
          <h3 className="font-pixel text-lg font-black uppercase text-white tracking-wider">
            EXPLORE PROJECTS YOUR WAY
          </h3>
        </div>
        <span className="font-mono text-xs text-gray-400 font-bold hidden sm:inline">
          6 CREATIVE MODULES
        </span>
      </div>

      {/* Grid of 6 Control Modules */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {modules.map((m) => {
          const IconComp = m.icon;
          return (
            <motion.div
              key={m.id}
              onClick={() => {
                sound.playClick();
                onSelectModule(m.id);
              }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="bg-[#100F17] hover:bg-[#88C000] hover:text-ink border-2 border-ink p-3 rounded-xs shadow-brutalist-sm cursor-pointer transition-colors flex flex-col justify-between items-center text-center group"
            >
              <div className="w-10 h-10 rounded-xs bg-[#1F1D2B] group-hover:bg-ink group-hover:text-[#88C000] border border-ink flex items-center justify-center text-[#88C000] mb-2 shadow-xs transition-colors">
                <IconComp className="w-5 h-5" />
              </div>

              <div>
                <h4 className="font-pixel text-xs font-black uppercase tracking-wider text-white group-hover:text-ink">
                  {m.title}
                </h4>
                <span className="font-mono text-[9px] text-gray-400 group-hover:text-ink/80 block font-bold mt-0.5">
                  {m.sub}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
