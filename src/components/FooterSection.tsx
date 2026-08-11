import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { MagneticButton } from './MagneticButton';
import { 
  ArrowUpRight, 
  Copy, 
  Check, 
  MapPin, 
  CheckCircle2, 
  Zap, 
  BarChart3, 
  Sparkles,
  Heart
} from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText('hello@detqel.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleScrollToContact = () => {
    sound.playClick();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'contact';
    }
  };

  return (
    <footer id="footer" className="relative bg-[#050608] text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-t-2 border-ink overflow-hidden font-sans select-none w-full">
      
      {/* Subtle Background Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="w-full relative z-10 flex flex-col gap-8 sm:gap-12">
        
        {/* ========================================================================= */}
        {/* TOP CARD: 04 // INITIATE TRANSMISSION & DIRECT INBOX ACCESS               */}
        {/* ========================================================================= */}
        <div className="bg-[#FAF9F5] text-ink border-2 border-ink rounded-3xl p-6 sm:p-10 lg:p-12 relative shadow-2xl overflow-hidden w-full">
          
          {/* Decorative Corner Grid Crosshairs */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-neutral-300 font-mono text-sm hidden lg:block pointer-events-none">+ &nbsp; &nbsp; &nbsp; &nbsp; + &nbsp; &nbsp; &nbsp; &nbsp; +</div>

          {/* Top Header Bar */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#7939a1] tracking-wider uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7939a1] animate-pulse" />
              <span>04 // INITIATE TRANSMISSION</span>
            </div>

            <MagneticButton cursorText="TALK">
              <button
                onClick={handleScrollToContact}
                onMouseEnter={() => triggerCursor('TALK', 'hover')}
                onMouseLeave={() => triggerCursor('', 'default')}
                className="border-2 border-dashed border-ink px-4 py-1.5 rounded-lg font-pixel text-xs font-bold hover:bg-ink hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </MagneticButton>
          </div>

          {/* Main Grid: Left Headline & Text + Right Dark Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-pixel text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-ink tracking-tight leading-[0.92]">
                LET'S BUILD SOMETHING EXTRAORDINARY<span className="text-[#7939a1]">.</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed max-w-2xl font-medium">
                Have a landmark product, WebGL motion project, AI experience, or bold digital venture in mind? Let's turn ambitious ideas into immersive products, brands, and interfaces.
              </p>
            </div>

            {/* Right Column: Technized Pixel Digital Direct Inbox Access Panel */}
            <div className="lg:col-span-5 relative pt-2 sm:pt-4">
              
              {/* Top Vertical Connector Pin Line matching reference design */}
              <div className="absolute -top-1 right-10 w-0.5 h-4 bg-neutral-900 z-20 hidden sm:block" />

              {/* Outer Card Wrapper with 3D Stepped Pixel Offset Shadow */}
              <div className="relative group">
                
                {/* Stepped Offset Pixel Shadow Background Layer */}
                <div className="absolute inset-0 bg-[#000000] rounded-2xl translate-x-2.5 translate-y-2.5 pointer-events-none border-2 border-neutral-950" />

                {/* Main Technized Dark Card Container */}
                <div className="relative bg-[#090A0E] text-white rounded-2xl p-5 sm:p-7 border-2 border-neutral-800 shadow-2xl overflow-hidden">
                  
                  {/* Background Matrix Dot Grid Texture */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-transparent to-neutral-950/90 pointer-events-none" />

                  {/* Stepped Corner Bracket Markings */}
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-purple-400/50 pointer-events-none select-none">┌</div>
                  <div className="absolute top-2.5 right-3.5 text-[10px] font-mono text-purple-400 font-bold pointer-events-none select-none">┐</div>
                  <div className="absolute bottom-2 left-2 text-[9px] font-mono text-purple-400/50 pointer-events-none select-none">└</div>
                  <div className="absolute bottom-2.5 right-3.5 text-[10px] font-mono text-purple-400/60 pointer-events-none select-none">┘</div>

                  {/* Section Header Label */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] sm:text-xs font-bold text-purple-400 uppercase tracking-widest">
                      DIRECT INBOX ACCESS
                    </span>
                    <div className="flex items-center gap-1 font-mono text-[10px] text-purple-400/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      <span>¬</span>
                    </div>
                  </div>

                  {/* Terminal Email Display Line */}
                  <div className="my-3 py-1">
                    <div className="font-pixel text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide flex items-center gap-2.5 overflow-x-auto py-1">
                      <span className="text-purple-400 font-mono text-xl sm:text-2xl font-black">{'>'}_</span>
                      <a 
                        href="mailto:hello@detqel.com" 
                        onMouseEnter={() => triggerCursor('EMAIL US ✉️', 'hover')}
                        onMouseLeave={() => triggerCursor('', 'default')}
                        className="hover:text-purple-300 transition-colors whitespace-nowrap drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                      >
                        hello@detqel.com
                      </a>
                    </div>
                  </div>

                  {/* Pixelated Dashed Horizontal Divider Line matching reference image */}
                  <div className="w-full h-px border-t-2 border-dashed border-neutral-800 my-4" />

                  {/* 2 Technized Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {/* Copy Email Button */}
                    <button
                      onClick={handleCopyEmail}
                      onMouseEnter={() => triggerCursor('COPY', 'hover')}
                      onMouseLeave={() => triggerCursor('', 'default')}
                      className="bg-[#7939a1] hover:bg-[#682e8c] active:bg-[#5b247c] border border-purple-300/40 text-white font-mono text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-brutalist-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-300" />
                          <span>COPIED! ✓</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>COPY EMAIL ADDRESS</span>
                        </>
                      )}
                    </button>

                    {/* Book A Call Button */}
                    <button
                      onClick={handleScrollToContact}
                      onMouseEnter={() => triggerCursor('BOOK CALL', 'hover')}
                      onMouseLeave={() => triggerCursor('', 'default')}
                      className="bg-[#050608] hover:bg-neutral-900 active:bg-neutral-950 border-2 border-neutral-700 hover:border-white text-white font-mono text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                    >
                      <span>BOOK A CALL</span>
                      <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:text-white" />
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM CARD: MAIN DARK FOOTER (DETQEL //)                                 */}
        {/* ========================================================================= */}
        <div className="bg-[#0C0D12] text-white border-2 border-neutral-800 rounded-3xl p-6 sm:p-10 lg:p-12 relative shadow-2xl space-y-10 w-full">
          
          {/* Top 5-Column Navigation & Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
            
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-pixel text-2xl font-bold tracking-wider text-white">
                DETQEL <span className="text-purple-400">//</span>
              </h3>

              <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-400">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>DETQEL</span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xs">
                A digital product studio crafting AI-powered solutions, immersive web experiences, and bold brands for the future.
              </p>

              <div className="pt-2">
                <a
                  href="#portfolio"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => triggerCursor('WORK', 'hover')}
                  onMouseLeave={() => triggerCursor('', 'default')}
                  className="border border-neutral-700 hover:border-purple-400 hover:text-purple-400 text-white font-mono text-xs font-bold py-2 px-3.5 rounded-lg inline-flex items-center gap-2 transition-all"
                >
                  <span>EXPLORE OUR WORK</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
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
                © 2026 DETQEL
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
                  { label: 'Bē', href: 'https://behance.net' },
                  { label: 'in', href: 'https://linkedin.com' },
                  { label: '📷', href: 'https://instagram.com' },
                  { label: '▶', href: 'https://youtube.com' }
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
