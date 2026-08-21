import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ServiceItemData } from './types';
import { sound } from '../../utils/sound';
import { triggerCursor } from '../CustomCursor';
import {
  Sparkles,
  Code2,
  PenTool,
  TrendingUp,
  Cog,
  Headphones,
  ArrowRight
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItemData;
  isActive: boolean;
  onSelect: (id: string) => void;
  onAnchorUpdate?: (id: string, anchor: { x: number; y: number }) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isActive,
  onSelect,
  onAnchorUpdate
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Measure card anchor port on render and resize
  useEffect(() => {
    const updateAnchor = () => {
      if (!cardRef.current || !onAnchorUpdate) return;
      const parent = cardRef.current.closest('.services-hero-container');
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();

      // Connector attaches to the inner edge (right edge for left cards, left edge for right cards)
      const xPx = service.cardSide === 'left' ? cardRect.right : cardRect.left;
      const yPx = cardRect.top + cardRect.height * 0.5;

      const xPercent = ((xPx - parentRect.left) / parentRect.width) * 100;
      const yPercent = ((yPx - parentRect.top) / parentRect.height) * 100;

      onAnchorUpdate(service.id, { x: xPercent, y: yPercent });
    };

    updateAnchor();
    window.addEventListener('resize', updateAnchor);
    return () => window.removeEventListener('resize', updateAnchor);
  }, [service.id, service.cardSide, onAnchorUpdate, isActive]);

  // Render dedicated pixel-art style icon
  const renderIcon = () => {
    const iconClasses = "w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center border-2 border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] relative overflow-hidden";

    switch (service.iconType) {
      case 'branding':
        return (
          <div className={`${iconClasses} bg-purple-500 text-white`}>
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
        );
      case 'web':
        return (
          <div className={`${iconClasses} bg-blue-500 text-white`}>
            <Code2 className="w-5 h-5" strokeWidth={2.5} />
          </div>
        );
      case 'uiux':
        return (
          <div className={`${iconClasses} bg-emerald-500 text-white`}>
            <PenTool className="w-4.5 h-4.5" strokeWidth={2.5} />
          </div>
        );
      case 'seo':
        return (
          <div className={`${iconClasses} bg-amber-500 text-white`}>
            <TrendingUp className="w-5 h-5" strokeWidth={2.5} />
          </div>
        );
      case 'automation':
        return (
          <div className={`${iconClasses} bg-red-500 text-white`}>
            <Cog className="w-5 h-5 animate-spin-slow" strokeWidth={2.5} />
          </div>
        );
      case 'support':
        return (
          <div className={`${iconClasses} bg-cyan-500 text-white`}>
            <Headphones className="w-5 h-5" strokeWidth={2.5} />
          </div>
        );
      default:
        return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  const handleClick = () => {
    sound.playRepulsorSound();
    onSelect(service.id);
  };

  return (
    <motion.div
      ref={cardRef}
      id={`card-${service.id}`}
      onClick={handleClick}
      onMouseEnter={() => {
        sound.playHover();
        triggerCursor('EXPLORE', 'hover');
      }}
      onMouseLeave={() => triggerCursor('', 'default')}
      whileHover={{ y: -3, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative cursor-pointer transition-all duration-300 select-none ${
        isActive ? 'z-30' : 'z-10'
      }`}
    >
      {/* Top Number Tab Pill */}
      <div
        className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-t-md text-[11px] font-mono font-bold tracking-wider text-white border-2 border-b-0 border-[#1E1E24] shadow-xs z-10"
        style={{ backgroundColor: service.color }}
      >
        {service.number}
      </div>

      {/* Main Handcrafted Paper Body */}
      <div
        className={`relative bg-[#FFFDF9] dark:bg-[#1C1D24] border-2 border-[#1E1E24] rounded-lg p-3.5 sm:p-4 transition-all duration-300 ${
          isActive
            ? 'shadow-[6px_6px_0px_#1E1E24] ring-2 ring-offset-2'
            : 'shadow-[3px_3px_0px_rgba(30,30,36,0.8)] hover:shadow-[5px_5px_0px_#1E1E24]'
        }`}
        style={{
          borderColor: '#1E1E24',
          ...(isActive ? ({ '--tw-ring-color': service.color } as any) : {})
        }}
      >
        {/* Paper Grain Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-lg paper-grain opacity-60" />

        {/* Subtle dot texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-lg"
          style={{
            backgroundImage: `radial-gradient(#1E1E24 0.6px, transparent 0.6px)`,
            backgroundSize: '6px 6px'
          }}
        />

        {/* Paper Tape / Staple Detail — slightly larger for realism */}
        <div className="absolute -top-1.5 right-3 w-9 h-3.5 bg-amber-100/70 border border-amber-300/50 rotate-3 shadow-xs pointer-events-none" />

        {/* Second tape on left side (for more paper feel) */}
        {isActive && (
          <div className="absolute -top-1 left-5 w-7 h-3 bg-amber-100/50 border border-amber-300/40 -rotate-6 shadow-xs pointer-events-none" />
        )}

        {/* Card Header & Content */}
        <div className="flex items-start gap-3 relative z-10">
          {/* Service Icon Badge */}
          <div className="shrink-0 pt-0.5">
            {renderIcon()}
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-pixel text-[13px] sm:text-[15px] font-bold text-[#1E1E24] dark:text-white tracking-wide uppercase leading-tight mb-1">
              {service.title}
            </h3>
            <p className="font-sans text-[11px] sm:text-[12px] text-[#4B5563] dark:text-gray-300 leading-snug font-medium">
              {service.shortDesc}
            </p>
          </div>

          {/* Small Arrow Action Badge */}
          <div
            className={`shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-[#1E1E24] flex items-center justify-center text-white transition-transform duration-200 ${
              isActive ? 'rotate-90 scale-110' : 'hover:translate-x-0.5'
            }`}
            style={{ backgroundColor: service.color }}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Active Expanded: Description + Quick Bullets (fade/slide) */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden pt-3 mt-2.5 border-t border-dashed border-[#1E1E24]/20"
            >
              <div className="space-y-2.5">
                {/* Short description */}
                <p className="font-sans text-[11px] text-[#4B5563] dark:text-gray-300 leading-relaxed">
                  {service.fullDesc.length > 120
                    ? service.fullDesc.substring(0, 120) + '…'
                    : service.fullDesc}
                </p>

                {/* Quick bullet points */}
                <div className="flex flex-wrap gap-1.5">
                  {service.quickBullets.map((bullet) => (
                    <span
                      key={bullet}
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-bold bg-[#F4F3EF] dark:bg-[#252833] border border-[#1E1E24]/25 rounded-sm text-[#1E1E24] dark:text-gray-200"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: service.color }}
                      />
                      {bullet}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
