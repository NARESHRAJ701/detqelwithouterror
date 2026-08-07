import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/sound';

export const WhiteboardProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { title: 'Idea', icon: '💡', desc: 'Brainstorming & User Research' },
    { title: 'Design', icon: '🎨', desc: 'Wireframing & WebGL Shaders' },
    { title: 'Build', icon: '💻', desc: 'Full-Stack React & AI RAG' },
    { title: 'Launch', icon: '🚀', desc: 'Production Handoff & Scaling' }
  ];

  return (
    <div className="w-56 sm:w-64 bg-[#FAF8F3] text-ink border-4 border-gray-400 p-3 rounded-xs shadow-brutalist relative select-none">
      
      {/* Aluminum Frame Pins */}
      <div className="absolute -top-2 left-4 w-3 h-3 rounded-full bg-red-500 border border-black shadow-xs" />
      <div className="absolute -top-2 right-4 w-3 h-3 rounded-full bg-blue-500 border border-black shadow-xs" />

      {/* Header */}
      <div className="border-b-2 border-ink/20 pb-1.5 mb-2 flex justify-between items-center">
        <h4 className="font-pixel text-xs font-black uppercase text-ink">
          BEHIND THE SCENES
        </h4>
        <span className="font-mono text-[8px] opacity-60">PROCESS</span>
      </div>

      {/* Process Flow Diagram */}
      <div className="flex items-center justify-between relative py-2">
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-0.5 bg-ink/30 z-0" />

        {steps.map((s, idx) => (
          <motion.div
            key={s.title}
            onClick={() => {
              sound.playClick();
              setActiveStep(idx);
            }}
            whileHover={{ scale: 1.15 }}
            className="relative z-10 flex flex-col items-center cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center text-xs shadow-xs ${
              activeStep === idx ? 'bg-[#88C000] text-ink' : 'bg-white text-ink'
            }`}>
              {s.icon}
            </div>
            <span className="font-pixel text-[8px] font-bold mt-1 text-center text-ink">
              {s.title}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Active Step Description */}
      {activeStep !== null && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 bg-[#FFF066] p-2 rounded-xs border border-amber-300 font-handwriting text-xs font-bold text-ink"
        >
          {steps[activeStep].title}: {steps[activeStep].desc}
        </motion.div>
      )}

    </div>
  );
};
