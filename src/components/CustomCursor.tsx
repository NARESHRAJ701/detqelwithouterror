import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Eye } from 'lucide-react';

export interface CursorState {
  text: string;
  image?: string;
  variant: 'default' | 'hover' | 'magnetic' | 'drag' | 'view';
}

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>({
    text: '',
    image: undefined,
    variant: 'default'
  });
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for fluid movement
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide native cursor on non-touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleCustomCursorEvent = (e: CustomEvent<CursorState>) => {
      if (e.detail) {
        setCursorState(e.detail);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('set-custom-cursor' as any, handleCustomCursorEvent as EventListener);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('set-custom-cursor' as any, handleCustomCursorEvent as EventListener);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const isView = cursorState.variant === 'view';
  const isHover = cursorState.variant === 'hover' || cursorState.variant === 'magnetic';
  const isDrag = cursorState.variant === 'drag';
  const hasImage = Boolean(cursorState.image);
  const hasText = Boolean(cursorState.text);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Precision Center Point Dot */}
      <motion.div
        animate={{
          scale: isDrag ? 1.8 : isView ? 1.3 : isHover ? 1.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        className="w-3.5 h-3.5 rounded-full bg-accent-acid border-2 border-ink shadow-brutalist-sm flex items-center justify-center"
      >
        <span className="w-1 h-1 rounded-full bg-ink" />
      </motion.div>

      {/* Floating Offset Content (Live Image Preview Card or Text Badge) */}
      <AnimatePresence mode="wait">
        {hasImage ? (
          /* FLOATING IMAGE PREVIEW POPUP CARD */
          <motion.div
            key={cursorState.image}
            initial={{ opacity: 0, scale: 0.6, x: 16, y: -45 }}
            animate={{ opacity: 1, scale: 1, x: 20, y: -55 }}
            exit={{ opacity: 0, scale: 0.6, x: 16, y: -45 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute top-0 left-0 pointer-events-none w-44 sm:w-52 h-28 sm:h-32 bg-ink border-2 border-ink rounded-xs p-1 shadow-brutalist overflow-hidden z-20 flex flex-col"
          >
            <div className="relative w-full h-full rounded-2xs overflow-hidden bg-neutral-900">
              <img
                src={cursorState.image}
                alt="Project Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1.5 right-1.5 bg-accent-acid text-ink font-pixel text-[9px] font-bold px-1.5 py-0.5 rounded-xs border border-ink shadow-xs flex items-center gap-1">
                <Eye className="w-2.5 h-2.5" />
                <span>PREVIEW</span>
              </div>
            </div>
          </motion.div>
        ) : hasText ? (
          /* FLOATING TEXT BADGE */
          <motion.div
            key={cursorState.text}
            initial={{ opacity: 0, scale: 0.75, x: 10, y: -20 }}
            animate={{ opacity: 1, scale: 1, x: 14, y: -26 }}
            exit={{ opacity: 0, scale: 0.75, x: 10, y: -20 }}
            transition={{ type: 'spring', stiffness: 450, damping: 24 }}
            className="absolute top-0 left-0 whitespace-nowrap pointer-events-none bg-ink text-accent-acid border-2 border-ink rounded-xs px-2.5 py-1 shadow-brutalist flex items-center gap-1 font-pixel text-[10px] font-bold tracking-tight uppercase z-10"
          >
            <span>{cursorState.text}</span>
            {isView ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-accent-acid" />
            ) : (
              <Sparkles className="w-2.5 h-2.5 text-accent-coral" />
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

// Helper trigger to set cursor state from anywhere
export const triggerCursor = (
  text = '',
  variant: CursorState['variant'] = 'default',
  image?: string
) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('set-custom-cursor', {
        detail: { text, variant, image },
      })
    );
  }
};
