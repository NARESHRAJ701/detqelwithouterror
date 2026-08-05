import React from 'react';
import { motion } from 'framer-motion';
import type { StickyNoteData } from '../types';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { Pin } from 'lucide-react';

interface StickyNoteProps {
  note: StickyNoteData;
  className?: string;
}

export const StickyNote: React.FC<StickyNoteProps> = ({ note, className = '' }) => {
  const colorMap = {
    yellow: 'bg-sticky-yellow text-ink border-yellow-300',
    pink: 'bg-sticky-pink text-ink border-pink-300',
    mint: 'bg-sticky-mint text-ink border-teal-200',
    lavender: 'bg-sticky-lavender text-ink border-purple-200',
    orange: 'bg-sticky-orange text-ink border-orange-200',
  };

  const handleDragStart = () => {
    sound.playClick();
    triggerCursor('HOLD', 'drag');
  };

  const handleDragEnd = () => {
    sound.playSuccess();
    triggerCursor('', 'default');
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 300, top: -100, bottom: 300 }}
      whileDrag={{ scale: 1.08, rotate: note.rotation + 4, zIndex: 50 }}
      whileHover={{ scale: 1.04, rotate: note.rotation - 2 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={() => triggerCursor('DRAG ME', 'drag')}
      onMouseLeave={() => triggerCursor('', 'default')}
      initial={{ opacity: 0, scale: 0.8, rotate: note.rotation }}
      animate={{ opacity: 1, scale: 1, rotate: note.rotation }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      className={`absolute cursor-grab active:cursor-grabbing p-4 rounded-xs shadow-sticky border transition-shadow hover:shadow-brutalist max-w-[220px] sm:max-w-[260px] ${colorMap[note.color]} ${className}`}
      style={{ zIndex: 20 }}
    >
      {/* Translucent Tape Strip */}
      <div 
        className="tape-sticker tape-sticker-yellow w-16 h-5 top-[-10px] left-1/2 -translate-x-1/2 rounded-xs"
        style={{ transform: `translateX(-50%) rotate(${note.tapeRotation}deg)` }}
      />

      <div className="flex justify-between items-center mb-2 pt-1 border-b border-black/10 pb-1">
        <span className="font-pixel text-[9px] uppercase tracking-wider opacity-70 flex items-center gap-1">
          <Pin className="w-2.5 h-2.5" /> {note.author || 'NOTE'}
        </span>
        <span className="font-mono text-[9px] opacity-50">★ sticky</span>
      </div>

      <p className="font-handwriting text-lg sm:text-xl font-bold leading-snug">
        {note.text}
      </p>

      <div className="mt-2 text-right">
        <span className="font-pixel text-[8px] opacity-40 uppercase">drag around ↗</span>
      </div>
    </motion.div>
  );
};
