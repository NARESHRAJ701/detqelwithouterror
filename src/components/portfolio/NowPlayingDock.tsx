import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';
import { sound } from '../../utils/sound';

interface NowPlayingDockProps {
  onSelectProject: (id: string) => void;
}

export const NowPlayingDock: React.FC<NowPlayingDockProps> = ({ onSelectProject }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const drops = [
    { id: 'planet-coffee', name: 'Planet Coffee Branding ☕' },
    { id: 'ari-matcha', name: 'ARI Matcha Packaging 🍵' },
    { id: 'movefit', name: 'Movefit Fitness Website 🏋️' },
    { id: 'billa', name: 'Billa Restaurant Identity 🍕' }
  ];

  const togglePlay = () => {
    sound.playClick();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-2 sm:px-4 py-2 pointer-events-none">
      <div className="max-w-[1520px] mx-auto bg-[#100F17]/95 dark:bg-[#100F17]/95 backdrop-blur-md border-3 border-ink p-2 sm:p-2.5 rounded-xs shadow-brutalist flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto text-white">
        
        {/* Left Track Player Info */}
        <div className="flex items-center gap-3">
          {/* Album Art Icon */}
          <div className="w-8 h-8 rounded-xs bg-[#88C000] border border-black flex items-center justify-center text-ink shrink-0 font-bold shadow-xs">
            <Music className="w-4 h-4" />
          </div>

          <div className="text-left">
            <div className="font-pixel text-[10px] font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Creativity (ft. Ideas)</span>
              <span className="text-[8px] text-[#88C000] font-mono">[NOW PLAYING]</span>
            </div>
            <span className="font-mono text-[9px] text-gray-400 font-bold block">
              DETQEL Studio
            </span>
          </div>

          {/* Play / Pause Toggle Button */}
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-full bg-white text-ink border border-black flex items-center justify-center hover:bg-[#88C000] transition-colors ml-1"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          {/* Soundwave Equalizer Lines */}
          <div className="flex items-end gap-0.5 h-4 ml-1">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={isPlaying ? { height: ['20%', '100%', '30%'] } : { height: '20%' }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-[#88C000] rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Right Marquee Drops Stream */}
        <div className="flex items-center gap-3 overflow-hidden flex-1 max-w-2xl bg-[#181624] border border-white/10 px-3 py-1.5 rounded-xs">
          <span className="font-pixel text-[9px] font-black text-[#88C000] uppercase tracking-wider shrink-0">
            LATEST DROPS →
          </span>

          <div className="overflow-hidden relative w-full">
            <div className="flex gap-6 animate-marquee whitespace-nowrap font-mono text-[10px] font-bold text-gray-300">
              {drops.concat(drops).map((item, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    sound.playProjectorOn();
                    onSelectProject(item.id);
                  }}
                  className="hover:text-[#88C000] cursor-pointer transition-colors"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
