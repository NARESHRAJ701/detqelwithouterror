import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ShieldCheck, Users, Sparkles } from 'lucide-react';
import { sound } from '../../utils/sound';

export const CoreValues: React.FC = () => {
  const values = [
    {
      title: 'INNOVATION',
      desc: 'We embrace new ideas and technologies.',
      icon: Sparkles
    },
    {
      title: 'QUALITY',
      desc: 'We build with precision and attention to detail.',
      icon: Lightbulb
    },
    {
      title: 'COLLABORATION',
      desc: 'We grow together with our clients.',
      icon: Users
    },
    {
      title: 'INTEGRITY',
      desc: 'We value honesty, transparency and trust.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="w-full bg-[#181624] text-white border-3 border-ink p-4 sm:p-5 rounded-xs shadow-brutalist relative overflow-hidden">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b-2 border-white/10 pb-2 mb-4">
        <h3 className="font-pixel text-base font-extrabold uppercase text-[#88C000] tracking-wider flex items-center gap-2">
          <span>❖</span> CORE VALUES
        </h3>
        <span className="w-2 h-2 rounded-full bg-[#88C000] animate-ping" />
      </div>

      {/* Grid of 4 Core Values */}
      <div className="space-y-3">
        {values.map((v) => {
          const IconComp = v.icon;
          return (
            <motion.div
              key={v.title}
              onMouseEnter={() => sound.playHover()}
              whileHover={{ x: 6 }}
              className="p-2.5 rounded-xs border border-white/10 bg-[#100F17] hover:border-[#88C000] transition-colors flex items-start gap-3 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xs bg-[#88C000]/20 border border-[#88C000] flex items-center justify-center text-[#88C000] shrink-0 mt-0.5">
                <IconComp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-pixel text-xs font-bold text-white uppercase group-hover:text-[#88C000] transition-colors">
                  {v.title}
                </h4>
                <p className="font-sans text-xs text-gray-300 font-medium leading-tight">
                  {v.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Attached Sticky Note on Bottom Right */}
      <div className="mt-4 bg-[#FFC2E2] text-ink p-2.5 rounded-xs shadow-sticky border border-pink-300 font-handwriting text-xs font-bold -rotate-3 text-center">
        We listen. We build. We deliver. We care. ♥
      </div>

    </div>
  );
};
