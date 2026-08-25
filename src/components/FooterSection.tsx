import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { 
  Copy, 
  Check, 
  MapPin, 
  CheckCircle2, 
  Zap, 
  BarChart3, 
  Sparkles,
  Heart
} from 'lucide-react';

interface FooterSectionProps {
  isTransparent?: boolean;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ isTransparent = false }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText('detqel@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer 
      id="footer" 
      className={`relative ${isTransparent ? 'bg-transparent border-t border-white/10' : 'bg-[#050608] border-t-2 border-ink'} text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12 overflow-hidden font-sans select-none w-full`}
    >
      
      {/* Subtle Background Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="w-full relative z-10 flex flex-col gap-8 sm:gap-12">
        


        {/* ========================================================================= */}
        {/* BOTTOM CARD: MAIN DARK FOOTER (DETQEL //)                                 */}
        {/* ========================================================================= */}
        <div className={`text-white border-2 border-neutral-800 rounded-3xl p-6 sm:p-10 lg:p-12 relative shadow-2xl space-y-10 w-full ${isTransparent ? 'bg-[#0C0D12]/75 backdrop-blur-md' : 'bg-[#0C0D12]'}`}>
          
          {/* Top 5-Column Navigation & Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
            
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-pixel text-2xl font-bold tracking-wider text-white">
                LET'S BUILD SOMETHING TOGETHER<span className="text-purple-400">.</span>
              </h3>

              <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-400">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>GET IN TOUCH</span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xs">
                Have an idea? Need a team to build it? Drop us a line. We're always looking for interesting projects and ambitious partners.
              </p>

              <div className="pt-2">
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => triggerCursor('COPY EMAIL', 'hover')}
                  onMouseLeave={() => triggerCursor('', 'default')}
                  className="border border-neutral-700 hover:border-purple-400 hover:text-purple-400 text-white font-mono text-xs font-bold py-2 px-3.5 rounded-lg inline-flex items-center gap-2 transition-all"
                >
                  <span>{copiedEmail ? 'COPIED!' : 'detqel@gmail.com'}</span>
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Col 2: _EXPLORE */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-mono text-xs font-bold text-purple-400 uppercase tracking-wider">
                _EXPLORE
              </h4>
              <ul className="space-y-2 font-mono text-xs text-neutral-300">
                {[
                  { label: 'Portfolio', href: '#portfolio' },
                  { label: 'Labs', href: '#playground' },
                  { label: 'Case Studies', href: '#portfolio' },
                  { label: 'Services', href: '#services' },
                  { label: 'Blog', href: '#blog' }
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => sound.playClick()}
                      className="hover:text-purple-400 transition-colors flex items-center gap-1.5 w-fit"
                    >
                      <span className="text-purple-500 font-bold">{'>'}</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: _STUDIO */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-mono text-xs font-bold text-purple-400 uppercase tracking-wider">
                _STUDIO
              </h4>
              <ul className="space-y-2 font-mono text-xs text-neutral-300">
                {[
                  { label: 'About Us', href: '#our-story-projector' },
                  { label: 'Our Process', href: '#services' },
                  { label: 'Technologies', href: '#services' },
                  { label: 'Careers', href: '#careers' },
                  { label: 'Pricing', href: '#pricing' }
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => sound.playClick()}
                      className="hover:text-purple-400 transition-colors flex items-center gap-1.5 w-fit"
                    >
                      <span className="text-purple-500 font-bold">{'>'}</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: _CONNECT */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-mono text-xs font-bold text-purple-400 uppercase tracking-wider">
                _CONNECT
              </h4>
              <ul className="space-y-2 font-mono text-xs text-neutral-300">
                {[
                  { label: 'Contact Us', href: '#contact' },
                  { label: 'Schedule Call', href: '#contact' },
                  { label: 'Partnerships', href: '#contact' },
                  { label: 'Support', href: '#contact' },
                  { label: 'Privacy Policy', href: '#privacy' }
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => sound.playClick()}
                      className="hover:text-purple-400 transition-colors flex items-center gap-1.5 w-fit"
                    >
                      <span className="text-purple-500 font-bold">{'>'}</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: _STUDIO STATUS */}
            <div className="lg:col-span-3">
              <div className="border border-dashed border-neutral-700 rounded-2xl p-4 sm:p-5 font-mono text-xs space-y-3 relative bg-neutral-900/60 shadow-inner">
                
                <div className="flex justify-between items-center text-purple-400 font-bold">
                  <span>_STUDIO STATUS</span>
                  <div className="flex items-center gap-1 text-purple-400">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2.5 pt-1 text-neutral-300">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Chennai, India</span>
                  </div>

                  <div className="border-t border-dashed border-neutral-800" />

                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Accepting selected projects</span>
                  </div>

                  <div className="border-t border-dashed border-neutral-800" />

                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Response time: {'<'} 24 hrs</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Bar Divider */}
          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright Left */}
            <div className="space-y-1 text-center md:text-left">
              <div className="font-mono text-xs font-bold text-neutral-300">
                © 2026 Detqel. All rights reserved.
              </div>
              <p className="font-sans text-xs text-neutral-500">
                Crafted with AI, design systems and obsessive attention to detail.
              </p>
            </div>

            {/* Center Pixel Bot Mascot */}
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-base hover:scale-110 transition-transform cursor-pointer">
                👾
              </div>
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            </div>

            {/* Right Call To Action & Social Media Icons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                LET'S CREATE THE FUTURE TOGETHER <Heart className="w-3 h-3 text-purple-400 fill-purple-400 inline" />
              </span>

              <div className="flex items-center gap-2">
                {[
                  { label: 'in', href: 'https://linkedin.com' },
                  { label: 'X', href: 'https://x.com' },
                  { label: '📷', href: 'https://instagram.com' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => triggerCursor(social.label, 'hover')}
                    onMouseLeave={() => triggerCursor('', 'default')}
                    className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-purple-600/80 border border-neutral-700 hover:border-purple-400 flex items-center justify-center font-mono text-xs font-bold text-white transition-all shadow-sm"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default FooterSection;
