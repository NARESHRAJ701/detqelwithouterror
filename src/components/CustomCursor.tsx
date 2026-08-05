import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export interface CursorState {
  text: string;
  variant: 'default' | 'hover' | 'magnetic' | 'drag' | 'view';
}

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>({
    text: '',
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

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div
        animate={{
          scale: isView ? 3.5 : isHover ? 2.2 : isDrag ? 2.8 : 1,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`flex items-center justify-center rounded-full text-black bg-white transition-colors duration-200 ${
          isView ? 'w-10 h-10' : isHover ? 'w-8 h-8' : isDrag ? 'w-12 h-12' : 'w-4 h-4'
        }`}
      >
        {cursorState.text && (
          <span className="font-pixel text-[8px] font-bold tracking-widest uppercase text-ink px-1 text-center leading-none">
            {cursorState.text}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

// Helper trigger to set cursor state from anywhere
export const triggerCursor = (text = '', variant: CursorState['variant'] = 'default') => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('set-custom-cursor', {
        detail: { text, variant },
      })
    );
  }
};
