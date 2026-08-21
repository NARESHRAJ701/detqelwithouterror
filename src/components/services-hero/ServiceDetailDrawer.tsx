import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ServiceItemData } from './types';
import { X, CheckCircle2, ArrowRight, Sparkles, Box } from 'lucide-react';
import { sound } from '../../utils/sound';
import { triggerCursor } from '../CustomCursor';

interface ServiceDetailDrawerProps {
  service: ServiceItemData | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ServiceDetailDrawer: React.FC<ServiceDetailDrawerProps> = ({
  service,
  onClose,
  onContactClick
}) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Tactile Paper Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-xl w-full bg-[#FFFDF9] dark:bg-[#181920] border-3 border-[#1E1E24] rounded-xl shadow-[10px_10px_0px_#1E1E24] p-6 sm:p-8 z-10 select-none overflow-hidden"
        >
          {/* Paper Corner Tape Details */}
          <div className="absolute -top-2 left-6 w-12 h-4 bg-amber-200/80 border border-amber-300 -rotate-3" />
          <div className="absolute -top-2 right-12 w-12 h-4 bg-amber-200/80 border border-amber-300 rotate-2" />

          {/* Close Button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            onMouseEnter={() => triggerCursor('CLOSE', 'hover')}
            onMouseLeave={() => triggerCursor('', 'default')}
            className="absolute top-4 right-4 p-2 rounded-md bg-[#F4F3EF] dark:bg-[#252833] border-2 border-[#1E1E24] hover:bg-[#1E1E24] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-md text-xs font-mono font-bold text-white border-2 border-[#1E1E24] shadow-xs"
              style={{ backgroundColor: service.color }}
            >
              SERVICE #{service.number}
            </span>

            <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-gray-400 uppercase tracking-wider">
              INSPECTION_MODE
            </span>
          </div>

          <h2 className="font-pixel text-2xl sm:text-3xl font-black text-[#1E1E24] dark:text-white uppercase tracking-tight mb-2">
            {service.title}
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#4B5563] dark:text-gray-300 font-medium leading-relaxed mb-6">
            {service.fullDesc}
          </p>

          {/* Capabilities Grid */}
          <div className="mb-6 space-y-2">
            <h4 className="font-mono text-xs font-bold text-[#1E1E24] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: service.color }} />
              CORE CAPABILITIES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.capabilities.map((cap, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs font-sans font-semibold text-[#1E1E24] dark:text-gray-200 bg-[#FAF8F5] dark:bg-[#20222B] p-2 rounded-md border border-[#1E1E24]/20"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: service.color }}
                  />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="mb-6 space-y-2">
            <h4 className="font-mono text-xs font-bold text-[#1E1E24] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5" style={{ color: service.color }} />
              WHAT YOU GET (DELIVERABLES)
            </h4>
            <div className="space-y-1.5">
              {service.deliverables.map((del, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs font-mono font-medium text-[#4B5563] dark:text-gray-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t-2 border-[#1E1E24]/20">
            <button
              onClick={() => {
                sound.playSuccess();
                onClose();
                onContactClick();
              }}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md border-2 border-[#1E1E24] text-white font-pixel text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[4px_4px_0px_#1E1E24] hover:shadow-[2px_2px_0px_#1E1E24] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              style={{ backgroundColor: service.color }}
            >
              <span>GET STARTED WITH {service.title.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-md border-2 border-[#1E1E24] font-mono text-xs font-bold uppercase text-[#1E1E24] dark:text-white hover:bg-[#F4F3EF] dark:hover:bg-[#252833] transition-colors"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
