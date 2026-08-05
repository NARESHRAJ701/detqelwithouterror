import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { MagneticButton } from './MagneticButton';
import { ArrowUp, Copy, Check, Code2, Globe, FileText, Share2 } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText('hello@aex-studio.design');
    setCopied(true);

    // Confetti Explosion
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#E0FF00', '#FF5533', '#2563EB', '#C084FC'],
      });
    } catch {
      // Fallback
    }

    setTimeout(() => setCopied(false), 3000);
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'GITHUB', url: 'https://github.com', icon: Code2, color: 'hover:bg-accent-acid hover:text-ink' },
    { name: 'TWITTER / X', url: 'https://twitter.com', icon: Share2, color: 'hover:bg-accent-blue hover:text-white' },
    { name: 'DRIBBBLE', url: 'https://dribbble.com', icon: Globe, color: 'hover:bg-accent-coral hover:text-white' },
    { name: 'LINKEDIN', url: 'https://linkedin.com', icon: Globe, color: 'hover:bg-accent-purple hover:text-white' },
    { name: 'READ.CV', url: 'https://read.cv', icon: FileText, color: 'hover:bg-sticky-yellow hover:text-ink' },
  ];

  return (
    <footer id="contact" className="relative bg-ink text-white dark:bg-canvas-dark-paper pt-24 pb-12 px-4 sm:px-8 border-t-2 border-ink overflow-hidden">
      {/* Background Subtle Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Playful Badge */}
        <div className="flex justify-between items-center mb-12 border-b border-white/20 pb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-accent-acid">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-acid animate-ping" />
            <span>04 // INITIATE TRANSMISSION</span>
          </div>

          <MagneticButton cursorText="TOP">
            <button
              onClick={scrollToTop}
              onMouseEnter={() => triggerCursor('TOP', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="p-3 bg-white text-ink border-2 border-white rounded-xs shadow-brutalist hover:bg-accent-acid hover:border-accent-acid transition-all"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </MagneticButton>
        </div>

        {/* Massive Headline "LET'S TALK" */}
        <div className="mb-16">
          <h2 className="font-pixel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none text-white hover:text-accent-acid transition-colors duration-300">
            LET'S TALK<span className="text-accent-coral">.</span>
          </h2>
          <p className="font-sans text-xl sm:text-2xl text-white/70 max-w-2xl mt-4 font-medium">
            Have a landmark product, WebGL motion project, or creative venture in mind? Let’s build something extraordinary together.
          </p>
        </div>

        {/* Massive Copy Email Banner */}
        <div className="mb-20">
          <div className="bg-canvas-dark-paper dark:bg-canvas-dark p-6 sm:p-10 rounded-xs border-2 border-white/20 shadow-brutalist flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-accent-acid uppercase font-bold block mb-1">
                DIRECT INBOX ACCESS
              </span>
              <span className="font-pixel text-2xl sm:text-4xl font-bold tracking-tight text-white select-all">
                hello@aex-studio.design
              </span>
            </div>

            <MagneticButton cursorText={copied ? 'COPIED!' : 'COPY'}>
              <button
                onClick={handleCopyEmail}
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-accent-acid text-ink px-8 py-4 font-pixel text-sm font-bold border-2 border-ink shadow-brutalist hover:bg-accent-coral hover:text-white transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-900" /> COPIED TO CLIPBOARD!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" /> COPY EMAIL ADDRESS
                  </>
                )}
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Social Links Grid */}
        <div className="mb-16">
          <span className="font-mono text-xs text-white/50 uppercase font-bold block mb-4">
            NETWORK & CHANNELS
          </span>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <MagneticButton key={link.name} cursorText="OPEN">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    className={`inline-flex items-center gap-2 bg-white/10 text-white font-mono text-xs font-bold px-5 py-3 border border-white/20 rounded-xs transition-all ${link.color}`}
                  >
                    <IconComponent className="w-4 h-4" /> {link.name}
                  </a>
                </MagneticButton>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50">
          <div>
            <span>© 2026 AEX STUDIO. HANDCRAFTED WITH PRECISION.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>TOKYO // SF // ZURICH</span>
            <span>★ AWWWARDS SITE OF THE DAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
