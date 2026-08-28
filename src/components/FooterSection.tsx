import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { Copy, Check, MapPin, Mail, Phone } from 'lucide-react';

interface FooterSectionProps {
  isTransparent?: boolean;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ isTransparent = true }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText('detqel@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer id="footer" className={`relative w-full py-12 sm:py-16 px-4 sm:px-8 select-none font-sans overflow-hidden ${isTransparent ? 'bg-transparent' : 'bg-[#0B2638]'}`}>
      
      {/* Dark Translucent Glass Footer Card */}
      <div className={`max-w-[1540px] mx-auto relative z-10 ${isTransparent ? 'bg-black/60 dark:bg-black/80' : 'bg-[#0A0D0F]'} backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl text-white space-y-10`}>
        
        {/* TOP 5-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          
          {/* Col 1: Brand Info & Callout */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-pixel text-2xl sm:text-3xl font-black tracking-tight text-white block">
                DETQEL<span className="text-[#B7E532]">.</span>
              </span>
              <span className="font-mono text-xs font-bold text-[#B7E532] uppercase tracking-widest block mt-1">
                IMAGINE. INNOVATE. CRAFT.
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm font-medium">
              We build AI-powered digital products, brands, and digital experiences that help startups grow, scale, and stand out.
            </p>

            <div className="pt-2">
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => triggerCursor('COPY EMAIL', 'hover')}
                onMouseLeave={() => triggerCursor('', 'default')}
                className="border border-white/25 hover:border-[#B7E532] hover:text-[#B7E532] text-white font-mono text-xs font-bold py-2 px-3.5 rounded-xl inline-flex items-center gap-2 transition-all cursor-pointer bg-white/5"
              >
                <span>{copiedEmail ? 'COPIED TO CLIPBOARD!' : 'detqel@gmail.com'}</span>
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#B7E532]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Col 2: COMPANY */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#B7E532] uppercase tracking-wider">
              COMPANY
            </h4>
            <ul className="space-y-2 font-mono text-xs text-white/80">
              {[
                { label: 'About Us', href: '#our-story-projector' },
                { label: 'Our Process', href: '#second-section' },
                { label: 'Careers', href: '#careers' },
                { label: 'Blog', href: '#blog' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => sound.playClick()}
                    className="hover:text-[#B7E532] transition-colors flex items-center gap-1.5 w-fit"
                  >
                    <span className="text-[#B7E532] font-bold">{'>'}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: SERVICES */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#B7E532] uppercase tracking-wider">
              SERVICES
            </h4>
            <ul className="space-y-2 font-mono text-xs text-white/80">
              {[
                { label: 'Branding', href: '#services' },
                { label: 'Web Development', href: '#services' },
                { label: 'UI/UX Design', href: '#services' },
                { label: 'AI Solutions', href: '#services' },
                { label: 'Automation', href: '#services' },
                { label: 'Software Dev', href: '#services' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => sound.playClick()}
                    className="hover:text-[#B7E532] transition-colors flex items-center gap-1.5 w-fit"
                  >
                    <span className="text-[#B7E532] font-bold">{'>'}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: RESOURCES */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#B7E532] uppercase tracking-wider">
              RESOURCES
            </h4>
            <ul className="space-y-2 font-mono text-xs text-white/80">
              {[
                { label: 'Case Studies', href: '#portfolio' },
                { label: 'Articles', href: '#blog' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Support', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => sound.playClick()}
                    className="hover:text-[#B7E532] transition-colors flex items-center gap-1.5 w-fit"
                  >
                    <span className="text-[#B7E532] font-bold">{'>'}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: CONTACT & SOCIALS */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs font-bold text-[#B7E532] uppercase tracking-wider">
              STAY CONNECTED
            </h4>
            <div className="space-y-2 font-mono text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B7E532]" />
                <span>hello@detqel.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B7E532]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B7E532]" />
                <span>Chennai, India</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com' },
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'X', href: 'https://x.com' },
                { label: 'Behance', href: 'https://behance.net' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => triggerCursor(s.label, 'hover')}
                  onMouseLeave={() => triggerCursor('', 'default')}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#B7E532] hover:text-black border border-white/20 flex items-center justify-center font-mono text-[10px] font-bold text-white transition-all shadow-sm"
                >
                  {s.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span>© 2026 Detqel. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a href="#privacy" onClick={() => sound.playClick()} className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" onClick={() => sound.playClick()} className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;
