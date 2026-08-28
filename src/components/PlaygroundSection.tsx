import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { Terminal, Sticker, RefreshCw, Trash2, Plus, Sparkles, Wand2 } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface CustomSticker {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
  bg: string;
}

const PRESET_STICKERS = [
  '⚡ AI FIRST',
  '✦ DETQEL',
  '🚀 10X SPEED',
  '🔥 INNOVATE',
  '🌱 SCALABLE',
  '✨ PIXEL PERFECT',
  '💡 CRAFT',
];

const STICKER_COLORS = [
  'bg-[#B7E532] text-black border-black/30',
  'bg-[#FF6B35] text-white border-black/30',
  'bg-[#00A676] text-white border-black/30',
  'bg-[#3FA9E8] text-white border-black/30',
  'bg-[#7C3AED] text-white border-black/30',
  'bg-[#FFF066] text-black border-black/30',
];

export const PlaygroundSection: React.FC = () => {
  // Scramble text state
  const [inputPhrase, setInputPhrase] = useState('DESIGN IS INTELLIGENCE MADE VISIBLE');
  const [displayText, setDisplayText] = useState('DESIGN IS INTELLIGENCE MADE VISIBLE');
  const [isScrambling, setIsScrambling] = useState(false);

  // Sticker Wall Canvas state
  const [stickers, setStickers] = useState<CustomSticker[]>([
    { id: 1, text: '✦ DETQEL', x: 80, y: 50, rotation: -4, bg: 'bg-[#B7E532] text-black border-black/30' },
    { id: 2, text: '⚡ AI FIRST', x: 260, y: 90, rotation: 6, bg: 'bg-[#FF6B35] text-white border-black/30' },
    { id: 3, text: '✨ PIXEL PERFECT', x: 170, y: 140, rotation: -2, bg: 'bg-[#00A676] text-white border-black/30' },
  ]);

  const handleScramble = () => {
    if (isScrambling) return;
    sound.playClick();
    setIsScrambling(true);

    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const target = inputPhrase.toUpperCase();
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        target
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return target[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= target.length) {
        clearInterval(interval);
        setIsScrambling(false);
        sound.playSuccess();
      }

      iteration += 1 / 2;
    }, 30);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If clicking directly on the canvas background, drop a random sticker
    if ((e.target as HTMLElement).closest('.sticker-item')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(30, Math.min(rect.width - 60, e.clientX - rect.left));
    const y = Math.max(20, Math.min(rect.height - 40, e.clientY - rect.top));

    const randomText = PRESET_STICKERS[Math.floor(Math.random() * PRESET_STICKERS.length)];
    const randomBg = STICKER_COLORS[Math.floor(Math.random() * STICKER_COLORS.length)];
    const randomRot = Math.floor(Math.random() * 20) - 10;

    sound.playSuccess();
    setStickers((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: randomText,
        x,
        y,
        rotation: randomRot,
        bg: randomBg,
      },
    ]);
  };

  const addPresetSticker = (text: string) => {
    sound.playSuccess();
    const randomBg = STICKER_COLORS[Math.floor(Math.random() * STICKER_COLORS.length)];
    const randomRot = Math.floor(Math.random() * 20) - 10;
    setStickers((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        x: 100 + (prev.length * 25) % 250,
        y: 60 + (prev.length * 20) % 120,
        rotation: randomRot,
        bg: randomBg,
      },
    ]);
  };

  const removeSticker = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const clearStickers = () => {
    sound.playClick();
    setStickers([]);
  };

  return (
    <section id="playground" className="relative w-full py-16 sm:py-24 px-4 sm:px-8 select-none font-sans overflow-hidden">
      
      {/* Translucent Glass Card */}
      <div className="max-w-[1540px] mx-auto relative z-10 bg-black/45 dark:bg-black/65 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl text-white space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#B7E532] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#B7E532] animate-ping" />
              <span>04 / INTERACTIVE</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none">
              INTERACTIVE <span className="text-[#B7E532]">TOYS.</span>
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-white/80 max-w-md font-medium">
            Test micro-interaction algorithms, character creativity, and build smarter digital experiences.
          </p>
        </div>

        {/* 2 Toys Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* TOOL 01: TEXT SCRAMBLE ALGORITHM */}
          <div className="lg:col-span-6 bg-white/10 dark:bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/20 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
                <span className="font-mono text-xs font-bold uppercase flex items-center gap-2 text-white">
                  <Terminal className="w-4 h-4 text-[#FF6B35]" /> TOOL 01 // TEXT SCRAMBLE ALGORITHM
                </span>
                <span className="font-mono text-[10px] bg-[#B7E532] text-black font-bold px-2 py-0.5 rounded-full">
                  LIVE ENGINE
                </span>
              </div>

              <p className="font-sans text-xs text-white/80 mb-3">
                Type any text below and hit the characters scramble reveal sequence:
              </p>

              <input
                type="text"
                value={inputPhrase}
                onChange={(e) => setInputPhrase(e.target.value)}
                maxLength={45}
                className="w-full bg-black/40 border border-white/25 rounded-xl px-4 py-2.5 font-mono text-xs font-bold uppercase text-white focus:outline-none focus:border-[#B7E532] transition-all mb-4"
                placeholder="TYPE PHRASE HERE..."
              />

              {/* Scramble Display Box */}
              <div className="min-h-[110px] bg-black/60 border border-white/20 rounded-2xl p-5 flex items-center justify-center text-center shadow-inner">
                <p className="font-mono text-lg sm:text-xl font-black text-[#B7E532] tracking-wider leading-relaxed">
                  {displayText}
                </p>
              </div>
            </div>

            {/* Run Scramble Button */}
            <MagneticButton cursorText="SCRAMBLE">
              <button
                onClick={handleScramble}
                disabled={isScrambling}
                className="w-full py-3 rounded-xl bg-[#FF6B35] hover:bg-[#B7E532] text-white hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isScrambling ? 'animate-spin' : ''}`} />
                <span>RUN SCRAMBLE ALGORITHM</span>
              </button>
            </MagneticButton>
          </div>

          {/* TOOL 02: STICKER WALL CANVAS */}
          <div className="lg:col-span-6 bg-white/10 dark:bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/20 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
                <span className="font-mono text-xs font-bold uppercase flex items-center gap-2 text-white">
                  <Sticker className="w-4 h-4 text-[#3FA9E8]" /> TOOL 02 // STICKER WALL CANVAS
                </span>
                <button
                  onClick={clearStickers}
                  onMouseEnter={() => triggerCursor('CLEAR', 'hover')}
                  onMouseLeave={() => triggerCursor('', 'default')}
                  className="font-mono text-[10px] bg-white/10 hover:bg-[#FF6B35] text-white px-2.5 py-1 rounded-lg border border-white/20 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>CLEAR ALL ({stickers.length})</span>
                </button>
              </div>

              <p className="font-sans text-xs text-white/80 mb-3">
                Click anywhere on canvas or click presets below to drop & drag stickers:
              </p>

              {/* Preset Quick Droppers */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {PRESET_STICKERS.slice(0, 4).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => addPresetSticker(preset)}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-[10px] font-mono text-white/90 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3 text-[#B7E532]" />
                    <span>{preset}</span>
                  </button>
                ))}
              </div>

              {/* Interactive Canvas */}
              <div
                onClick={handleCanvasClick}
                onMouseEnter={() => triggerCursor('DROP STICKER', 'hover')}
                onMouseLeave={() => triggerCursor('', 'default')}
                className="relative min-h-[170px] bg-black/50 border border-dashed border-white/30 rounded-2xl overflow-hidden cursor-crosshair flex items-center justify-center p-4 select-none shadow-inner"
              >
                {stickers.length === 0 && (
                  <div className="text-center font-mono text-xs text-white/50 font-bold flex flex-col items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-[#B7E532]" />
                    <span>CLICK ANYWHERE & DRAG TO PLACE STICKERS</span>
                  </div>
                )}

                {stickers.map((stk) => (
                  <motion.div
                    key={stk.id}
                    drag
                    dragConstraints={{ left: 0, right: 350, top: 0, bottom: 120 }}
                    initial={{ scale: 0, rotate: stk.rotation }}
                    animate={{ scale: 1, rotate: stk.rotation }}
                    whileHover={{ scale: 1.1, zIndex: 30 }}
                    style={{ left: `${stk.x}px`, top: `${stk.y}px` }}
                    className={`sticker-item absolute -translate-x-1/2 -translate-y-1/2 font-mono text-xs font-black px-3 py-1.5 border rounded-xl shadow-lg cursor-grab active:cursor-grabbing flex items-center gap-1.5 ${stk.bg}`}
                  >
                    <span>{stk.text}</span>
                    <button
                      onClick={(e) => removeSticker(stk.id, e)}
                      className="opacity-50 hover:opacity-100 transition-opacity ml-1"
                      title="Remove"
                    >
                      ×
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="font-mono text-xs text-white/70 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="flex items-center gap-1 text-[#B7E532]">
                <Wand2 className="w-3.5 h-3.5" /> DRAG, DROP & START CREATING
              </span>
              <span>STICKERS: {stickers.length}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PlaygroundSection;
