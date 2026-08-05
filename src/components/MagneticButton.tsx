import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  cursorText?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  cursorText = '',
  strength = 0.35,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 18, stiffness: 220, mass: 0.2 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseEnter = () => {
    sound.playHover();
    if (cursorText) {
      triggerCursor(cursorText, 'magnetic');
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    triggerCursor('', 'default');
  };

  const handleClick = () => {
    sound.playClick();
    if (onClick) onClick();
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};
