import React from 'react';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { MagneticButton } from './MagneticButton';
import { MapPin, CheckCircle2, Zap, ArrowUpRight, Code2, Share2, Globe, FileText } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <footer id="footer" className="relative bg-[#05050A] text-white pt-24 pb-12 px-6 sm:px-12 border-t-[3px] border-dashed border-white/20 overflow-hidden font-mono">
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col gap-20">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Brand */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="font-pixel text-2xl sm:text-3xl tracking-wider font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              DETQEL <span className="text-purple-400">//</span> LABS
            </div>
            <div className="w-12 h-1 bg-purple-500 rounded-none" />
            <p className="font-sans text-white/70 text-sm leading-relaxed max-w-sm">
              A digital product studio crafting AI-powered solutions, immersive web experiences, and bold brands for the future.
            </p>
          </div>

          {/* Center Columns: Links */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Explore */}
            <div className="flex flex-col gap-5">
              <h4 className="font-pixel text-xs text-purple-400 tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-none inline-block"></span> Explore
              </h4>
              <ul className="flex flex-col gap-3 font-sans text-sm text-white/60">
                {['Portfolio', 'Labs', 'Case Studies', 'Services', 'Blog'].map(link => (
                  <li key={link} className="hover:text-purple-300 hover:translate-x-1 transition-transform cursor-pointer w-fit">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Studio */}
            <div className="flex flex-col gap-5">
              <h4 className="font-pixel text-xs text-purple-400 tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-none inline-block"></span> Studio
              </h4>
              <ul className="flex flex-col gap-3 font-sans text-sm text-white/60">
                {['About Us', 'Process', 'Technologies', 'Careers', 'Pricing'].map(link => (
                  <li key={link} className="hover:text-purple-300 hover:translate-x-1 transition-transform cursor-pointer w-fit">
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="flex flex-col gap-5">
              <h4 className="font-pixel text-xs text-purple-400 tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-none inline-block"></span> Connect
              </h4>
              <ul className="flex flex-col gap-3 font-sans text-sm text-white/60">
                {['Contact Us', 'Schedule Call', 'Partnerships', 'Support', 'Privacy Policy'].map(link => (
                  <li key={link} className="hover:text-purple-300 hover:translate-x-1 transition-transform cursor-pointer w-fit">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Studio Status */}
          <div className="lg:col-span-3">
            <div className="border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 rounded-sm relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-600 to-transparent opacity-50" />
              
              <h4 className="font-pixel text-xs text-white/80 tracking-widest uppercase mb-6 flex justify-between items-center">
                _STUDIO STATUS
                <span className="flex gap-1">
                  <span className="w-1 h-3 bg-white/20 animate-pulse delay-75"></span>
                  <span className="w-1 h-4 bg-white/40 animate-pulse delay-150"></span>
                  <span className="w-1 h-2 bg-white/20 animate-pulse delay-300"></span>
                </span>
              </h4>
              
              <div className="flex flex-col gap-4 font-sans text-sm text-white/70">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>Chennai, India</span>
                </div>
                <div className="w-full h-px border-b border-dashed border-white/10" />
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Accepting selected projects</span>
                </div>
                <div className="w-full h-px border-b border-dashed border-white/10" />
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Response time: {'<'} 24 hrs</span>
                </div>
              </div>

              <div className="mt-8">
                <MagneticButton cursorText="EXPLORE">
                  <button
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => triggerCursor('EXPLORE', 'hover')}
                    onMouseLeave={() => triggerCursor('', 'default')}
                    className="w-full group relative flex items-center justify-between bg-transparent border border-purple-500/50 text-white px-5 py-3 font-pixel text-[10px] uppercase hover:bg-purple-500/10 hover:border-purple-400 transition-all overflow-hidden"
                  >
                    <span className="relative z-10">Explore Our Work</span>
                    <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </MagneticButton>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-dashed border-white/20">
          
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="font-pixel text-[10px] text-white/80">
              © 2026 DETQEL LABS
            </span>
            <span className="font-sans text-xs text-white/50">
              Crafted with AI, design systems, and obsessive attention to detail.
            </span>
          </div>

          {/* Abstract Center Pixel Icon */}
          <div className="hidden md:flex items-center justify-center">
             <div className="relative w-8 h-8 flex items-center justify-center opacity-80 hover:opacity-100 hover:rotate-90 transition-all duration-500 cursor-pointer">
                <div className="absolute w-1 h-6 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                <div className="absolute w-6 h-1 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                <div className="absolute w-2 h-2 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)]"></div>
             </div>
          </div>

          <div className="flex items-center gap-4">
            {[Code2, Share2, Globe, FileText].map((Icon, idx) => (
              <MagneticButton key={idx} cursorText="VISIT">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); sound.playClick(); }}
                  onMouseEnter={() => triggerCursor('VISIT', 'hover')}
                  onMouseLeave={() => triggerCursor('', 'default')}
                  className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-sm hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300 transition-all text-white/60"
                >
                  <Icon className="w-4 h-4" />
                </a>
              </MagneticButton>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};
