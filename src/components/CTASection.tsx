import React from 'react';
import { sound } from '../utils/sound';
import { ArrowUpRight, Sparkles, Send } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface CTASectionProps {
  onNavigate?: (page: 'home' | 'contact' | 'about' | 'portfolio' | 'services') => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative w-full py-16 sm:py-20 px-4 sm:px-8 select-none font-sans overflow-hidden">
      
      {/* Translucent Glass CTA Card */}
      <div className="max-w-[1540px] mx-auto relative z-10 bg-black/50 dark:bg-black/70 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-14 lg:p-16 shadow-2xl text-white text-center flex flex-col items-center justify-center space-y-6">
        
        {/* Glow Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#B7E532] font-mono text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START A CONVERSATION</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Heading */}
        <h2 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] max-w-3xl">
          HAVE A PROJECT<br />
          <span className="text-[#B7E532] drop-shadow-[0_4px_20px_rgba(183,229,50,0.35)]">
            IN MIND?
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="font-sans text-base sm:text-lg text-white/90 max-w-lg leading-relaxed font-medium">
          Let's build something meaningful together. We bring strategy, world-class design, and AI engineering under one roof.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          
          {/* Primary CTA */}
          <MagneticButton cursorText="TALK">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                sound.playClick();
                if (onNavigate) onNavigate('contact');
                else window.location.hash = 'contact';
              }}
              className="px-6 sm:px-8 py-3.5 rounded-2xl bg-[#B7E532] hover:bg-white text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>LET'S TALK</span>
              <Send className="w-4 h-4" />
            </a>
          </MagneticButton>

          {/* Secondary CTA */}
          <MagneticButton cursorText="WORK">
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                sound.playClick();
                if (onNavigate) onNavigate('portfolio');
                else window.location.hash = 'portfolio';
              }}
              className="px-6 sm:px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>VIEW OUR WORK</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </MagneticButton>

        </div>

      </div>
    </section>
  );
};

export default CTASection;
