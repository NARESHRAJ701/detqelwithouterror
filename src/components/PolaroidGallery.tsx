import React from 'react';
import { motion } from 'framer-motion';
import type { PolaroidData } from '../types';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { Camera, Sparkles } from 'lucide-react';

interface PolaroidGalleryProps {
  items: PolaroidData[];
}

export const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 py-6">
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30, rotate: item.rotation }}
          whileInView={{ opacity: 1, y: 0, rotate: item.rotation }}
          whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onMouseEnter={() => {
            sound.playHover();
            triggerCursor('INSPECT', 'view');
          }}
          onMouseLeave={() => triggerCursor('', 'default')}
          className="relative bg-white dark:bg-canvas-dark-paper p-4 rounded-xs border-2 border-ink shadow-brutalist hover:shadow-brutalist-lg transition-all duration-300 group"
        >
          {/* Tape Effect on Top */}
          <div
            className="tape-sticker w-20 h-6 -top-3 left-1/2 -translate-x-1/2 z-10"
            style={{ transform: `translateX(-50%) rotate(${idx % 2 === 0 ? '-3deg' : '4deg'})` }}
          />

          {/* Image Container with Gradient Illustration */}
          <div className={`relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br ${item.imageBg} border border-ink/20 flex flex-col justify-between p-4 group-hover:brightness-105 transition-all`}>
            <div className="flex justify-between items-start text-ink font-mono text-[10px] uppercase font-bold tracking-wider">
              <span className="bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-full border border-ink/20 flex items-center gap-1">
                <Camera className="w-3 h-3" /> {item.date}
              </span>
              <span className="bg-accent-acid text-ink px-2 py-0.5 font-pixel text-[8px]">
                RAW FRAME #{idx + 1}
              </span>
            </div>

            <div className="my-auto text-center py-4">
              <Sparkles className="w-8 h-8 mx-auto text-ink/40 mb-1 group-hover:rotate-180 transition-transform duration-500" />
              <h4 className="font-pixel text-lg sm:text-xl font-bold tracking-tight text-ink drop-shadow-xs">
                {item.title}
              </h4>
            </div>

            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag, tIdx) => (
                <span key={tIdx} className="bg-ink text-white font-mono text-[9px] px-1.5 py-0.5 uppercase">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Polaroid Bottom Caption Area */}
          <div className="pt-4 pb-1 text-center">
            <p className="font-handwriting text-xl text-ink dark:text-gray-200 font-bold leading-tight">
              "{item.caption}"
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
