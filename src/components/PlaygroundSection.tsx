import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { Sparkles, RefreshCw, Sticker, Terminal } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface CustomSticker {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
  bg: string;
}

export const PlaygroundSection: React.FC = () => {
  // Scramble text state
  const [inputPhrase, setInputPhrase] = useState('DESIGN IS INTELLIGENCE MADE VISIBLE');
  const [displayText, setDisplayText] = useState('DESIGN IS INTELLIGENCE MADE VISIBLE');
  const [isScrambling, setIsScrambling] = useState(false);

  // Sticker Dropper state
  const [stickers, setStickers] = useState<CustomSticker[]>([]);

  const stickerPhrases = [
    '⚡ SITE OF THE DAY',
    '★ 60 FPS CRAFT',
    '👾 PIXEL OBSESSED',
    'SWISS GRID',
    'NO TEMPLATES',
    'STAY CURIOUS',
    'HANDCRAFTED',
  ];

  const stickerColors = [
    'bg-sticky-yellow text-ink',
    'bg-sticky-pink text-ink',
    'bg-sticky-mint text-ink',
    'bg-sticky-lavender text-ink',
    'bg-accent-acid text-ink',
    'bg-accent-coral text-white',
  ];

  const handleScramble = () => {
    if (isScrambling) return;
    sound.playClick();
    setIsScrambling(true);

    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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

  const handleDropSticker = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const randomPhrase = stickerPhrases[Math.floor(Math.random() * stickerPhrases.length)];
    const randomColor = stickerColors[Math.floor(Math.random() * stickerColors.length)];
    const randomRotation = Math.floor(Math.random() * 24) - 12;

    sound.playSuccess();
    setStickers((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: randomPhrase,
        x,
        y,
        rotation: randomRotation,
        bg: randomColor,
      },
    ]);
  };

  const clearStickers = () => {
    sound.playClick();
    setStickers([]);
  };

  return (
    <section id="playground" className="py-24 px-4 sm:px-8 bg-canvas dark:bg-canvas-dark border-b-2 border-ink">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b-2 border-ink gap-4">
          <div>
            <div className="flex items-center gap-2 text-ink dark:text-gray-300 font-mono text-xs mb-2">
              <span className="bg-ink text-white dark:bg-accent-acid dark:text-ink px-2 py-0.5 font-pixel">
                03
              </span>
              <span>// EXPERIMENTAL LABS</span>
            </div>
            <h2 className="font-pixel text-4xl sm:text-6xl font-black uppercase text-ink dark:text-white">
              INTERACTIVE TOYS<span className="text-accent-coral">.</span>
            </h2>
          </div>

          <p className="font-mono text-xs text-ink dark:text-gray-200 font-medium max-w-xs">
            Test micro-interaction algorithms, character scramblers, and custom sticker drop canvases.
          </p>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Toy 1: Character & Text Scramble Studio */}
          <div className="lg:col-span-6 bg-white dark:bg-canvas-dark-paper p-6 sm:p-8 rounded-xs border-2 border-ink shadow-brutalist flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-ink/20 pb-3 mb-4">
                <span className="font-pixel text-sm font-bold uppercase flex items-center gap-2 text-ink dark:text-white">
                  <Terminal className="w-4 h-4 text-accent-coral" /> TEXT SCRAMBLE ALGORITHM
                </span>
                <span className="font-mono text-[10px] bg-accent-acid text-ink px-2 py-0.5">
                  LIVE ENGINE
                </span>
              </div>

              <p className="font-sans text-sm text-ink dark:text-gray-200 font-medium mb-4">
                Type any title below and run the character scramble reveal sequence:
              </p>

              <input
                type="text"
                value={inputPhrase}
                onChange={(e) => setInputPhrase(e.target.value)}
                maxLength={40}
                className="w-full bg-canvas-paper dark:bg-canvas-dark px-4 py-3 border-2 border-ink rounded-xs font-pixel text-sm font-bold uppercase mb-4 text-ink dark:text-white focus:outline-none focus:border-accent-coral"
                placeholder="ENTER PHRASE..."
              />

              <div className="min-h-[100px] bg-ink text-accent-acid p-6 rounded-xs border-2 border-ink flex items-center justify-center text-center">
                <p className="font-pixel text-xl sm:text-2xl font-bold tracking-wider leading-relaxed">
                  {displayText}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <MagneticButton cursorText="RUN">
                <button
                  onClick={handleScramble}
                  disabled={isScrambling}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent-coral text-white font-pixel text-xs font-bold px-6 py-3 border-2 border-ink shadow-brutalist hover:bg-ink hover:text-white transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isScrambling ? 'animate-spin' : ''}`} />
                  RUN SCRAMBLE MATRIX
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Toy 2: Interactive Sticker Dropper Wall */}
          <div className="lg:col-span-6 bg-white dark:bg-canvas-dark-paper p-6 sm:p-8 rounded-xs border-2 border-ink shadow-brutalist flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-ink/20 pb-3 mb-4">
                <span className="font-pixel text-sm font-bold uppercase flex items-center gap-2 text-ink dark:text-white">
                  <Sticker className="w-4 h-4 text-accent-blue" /> STICKER WALL CANVAS
                </span>
                <button
                  onClick={clearStickers}
                  onMouseEnter={() => triggerCursor('CLEAR', 'hover')}
                  onMouseLeave={() => triggerCursor('', 'default')}
                  className="font-mono text-[10px] bg-canvas-paper dark:bg-canvas-dark text-ink dark:text-gray-300 border border-ink px-2 py-0.5 hover:bg-accent-coral hover:text-white transition-colors"
                >
                  CLEAR WALL ({stickers.length})
                </button>
              </div>

              <p className="font-sans text-sm text-ink dark:text-gray-200 font-medium mb-4">
                Click anywhere inside the box below to drop interactive paper stickers:
              </p>

              {/* Interactive Dropper Area */}
              <div
                onClick={handleDropSticker}
                onMouseEnter={() => triggerCursor('CLICK TO DROP STICKER', 'hover')}
                onMouseLeave={() => triggerCursor('', 'default')}
                className="relative min-h-[220px] bg-grid-pattern border-2 border-dashed border-ink/40 rounded-xs overflow-hidden cursor-crosshair flex items-center justify-center p-4 select-none"
              >
                {stickers.length === 0 && (
                  <div className="text-center font-mono text-xs text-ink dark:text-gray-300 font-bold">
                    <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-80" />
                    CLICK ANYWHERE TO STAMP STICKERS
                  </div>
                )}

                {stickers.map((stk) => (
                  <motion.div
                    key={stk.id}
                    initial={{ scale: 0, rotate: stk.rotation }}
                    animate={{ scale: 1, rotate: stk.rotation }}
                    transition={{ type: 'spring', damping: 12 }}
                    style={{ left: `${stk.x}px`, top: `${stk.y}px` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 font-pixel text-xs font-bold px-3 py-1.5 border-2 border-ink shadow-brutalist-sm rounded-xs ${stk.bg}`}
                  >
                    {stk.text}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="font-mono text-[11px] text-ink dark:text-gray-300 font-bold text-center">
              ⚡ STICKERS STAMPED: <strong className="text-ink dark:text-white">{stickers.length}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
