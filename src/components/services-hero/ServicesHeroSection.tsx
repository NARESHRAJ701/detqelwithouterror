import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SERVICES_HERO_DATA } from './types';
import { HeroCopy } from './HeroCopy';
import { ServiceCard } from './ServiceCard';
import { ConnectorLayer } from './ConnectorLayer';
import { GauntletScene } from './GauntletScene';
import { ServiceDetailDrawer } from './ServiceDetailDrawer';
import { sound } from '../../utils/sound';
import { triggerCursor } from '../CustomCursor';
import { ArrowRight } from 'lucide-react';

interface ServicesHeroSectionProps {
  onNavigate?: (page: 'home' | 'contact' | 'about' | 'portfolio' | 'services', sectionId?: string) => void;
}

export const ServicesHeroSection: React.FC<ServicesHeroSectionProps> = ({ onNavigate }) => {
  const [activeServiceId, setActiveServiceId] = useState<string | null>('branding');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [stoneAnchors, setStoneAnchors] = useState<Record<string, { x: number; y: number }>>({});
  const [cardAnchors, setCardAnchors] = useState<Record<string, { x: number; y: number }>>({});

  // Get active service data object
  const activeService = SERVICES_HERO_DATA.find((s) => s.id === activeServiceId) || null;

  // Handle service selection
  const handleSelectService = useCallback((id: string) => {
    setActiveServiceId(id);
  }, []);

  // Update 3D projected stone coordinates
  const handleStonesProjected = useCallback((positions: Record<string, { x: number; y: number }>) => {
    setStoneAnchors(positions);
  }, []);

  // Update card anchor coordinates
  const handleCardAnchorUpdate = useCallback((id: string, anchor: { x: number; y: number }) => {
    setCardAnchors((prev) => ({ ...prev, [id]: anchor }));
  }, []);

  const handleNav = (page: 'home' | 'contact' | 'about' | 'portfolio' | 'services', sectionId?: string) => {
    sound.playClick();
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else {
      if (page === 'contact') window.location.hash = 'contact';
      else if (page === 'about') window.location.hash = 'about';
      else if (page === 'portfolio') window.location.hash = 'portfolio';
      else window.location.hash = sectionId || '';
    }
  };

  const leftCards = SERVICES_HERO_DATA.filter((s) => s.cardSide === 'left');
  const rightCards = SERVICES_HERO_DATA.filter((s) => s.cardSide === 'right');

  return (
    <section
      id="services-hero"
      className="services-hero-container relative w-full min-h-screen bg-[#FBF9F5] dark:bg-[#111216] text-[#1E1E24] dark:text-white select-none overflow-hidden flex flex-col justify-between pt-3 pb-8"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. LAYERED PAPER-CUT BACKGROUND
      ───────────────────────────────────────────────────────────── */}

      {/* Paper grain texture overlay */}
      <div className="absolute inset-0 pointer-events-none paper-grain" />

      {/* Extremely subtle dot marks (not a grid) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018] dark:opacity-[0.012]"
        style={{
          backgroundImage: `radial-gradient(#1E1E24 0.8px, transparent 0.8px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Faint concentric dotted circles — centered behind gauntlet */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <svg className="w-[700px] h-[700px] opacity-[0.06] dark:opacity-[0.04]" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="160" fill="none" stroke="#1E1E24" strokeWidth="0.8" strokeDasharray="2 4" />
          <circle cx="400" cy="400" r="260" fill="none" stroke="#1E1E24" strokeWidth="0.8" strokeDasharray="3 6" />
          <circle cx="400" cy="400" r="350" fill="none" stroke="#1E1E24" strokeWidth="0.6" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* Minimal faint circuit trace SVG overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <svg className="w-[900px] h-[900px] opacity-[0.04] dark:opacity-[0.025]" viewBox="0 0 900 900">
          {/* Horizontal trace */}
          <line x1="100" y1="450" x2="800" y2="450" stroke="#1E1E24" strokeWidth="0.5" strokeDasharray="1 3" />
          {/* Vertical trace */}
          <line x1="450" y1="100" x2="450" y2="800" stroke="#1E1E24" strokeWidth="0.5" strokeDasharray="1 3" />
          {/* Small node dots */}
          <circle cx="450" cy="450" r="3" fill="#1E1E24" opacity="0.3" />
          <circle cx="300" cy="450" r="2" fill="#10B981" opacity="0.3" />
          <circle cx="600" cy="450" r="2" fill="#10B981" opacity="0.3" />
          <circle cx="450" cy="300" r="2" fill="#10B981" opacity="0.3" />
          <circle cx="450" cy="600" r="2" fill="#10B981" opacity="0.3" />
        </svg>
      </div>

      {/* Corner masking tape decorative elements */}
      <div className="absolute top-6 left-6 w-14 h-4 bg-amber-100/40 border border-amber-200/30 -rotate-12 pointer-events-none hidden lg:block" />
      <div className="absolute top-8 right-10 w-12 h-3.5 bg-amber-100/40 border border-amber-200/30 rotate-6 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-10 left-12 w-10 h-3 bg-amber-100/40 border border-amber-200/30 rotate-3 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-12 h-3.5 bg-amber-100/40 border border-amber-200/30 -rotate-8 pointer-events-none hidden lg:block" />

      {/* Small floating pixel fragments (very subtle) */}
      <div className="absolute top-[15%] left-[18%] w-1.5 h-1.5 bg-emerald-500/15 pointer-events-none hidden lg:block" />
      <div className="absolute top-[25%] right-[22%] w-1 h-1 bg-emerald-500/12 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-[20%] left-[25%] w-1.5 h-1.5 bg-[#1E1E24]/8 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-[30%] right-[15%] w-1 h-1 bg-[#1E1E24]/6 pointer-events-none hidden lg:block" />

      {/* Tiny technical label — bottom left */}
      <div className="absolute bottom-14 left-[20%] font-mono text-[9px] text-emerald-600/40 font-bold hidden md:block pointer-events-none">
        DETQEL_CORE: ONLINE ✦
      </div>


      {/* ─────────────────────────────────────────────────────────────
          3. MAIN HERO INTERACTION STAGE
      ───────────────────────────────────────────────────────────── */}
      <div className="relative max-w-[1520px] w-full mx-auto px-3 sm:px-6 my-auto flex flex-col items-center justify-center min-h-[660px] lg:min-h-[740px]">
        {/* SVG CIRCUIT CONNECTOR LAYER */}
        <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none">
          <ConnectorLayer
            activeServiceId={activeServiceId}
            cardAnchors={cardAnchors}
            stoneAnchors={stoneAnchors}
          />
        </div>

        {/* 3-COLUMN DESKTOP HERO GRID */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center relative z-10">
          {/* ================= LEFT COLUMN: HERO COPY & 3 CARDS ================= */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Hero Copy (Services badge, massive headline, stats, CTA) */}
            <HeroCopy onExploreClick={() => setIsDetailOpen(true)} />

            {/* Left 3 Paper-Cut Service Cards (01, 02, 03) */}
            <div className="flex flex-col gap-3.5 pt-2">
              {leftCards.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isActive={activeServiceId === service.id}
                  onSelect={handleSelectService}
                  onAnchorUpdate={handleCardAnchorUpdate}
                />
              ))}
            </div>
          </div>

          {/* ================= CENTER COLUMN: 3D GAUNTLET HERO ================= */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[500px] sm:min-h-[580px] lg:min-h-[680px]">
            {/* Central 3D Canvas with High-Detail Voxel Mechanical Gauntlet */}
            <div className="w-full h-[450px] sm:h-[540px] lg:h-[640px] relative">
              <GauntletScene
                activeServiceId={activeServiceId}
                onSelectService={handleSelectService}
                onStonesProjected={handleStonesProjected}
              />
            </div>

            {/* Base Pedestal Pixel Badge: ONE PARTNER. ALL SOLUTIONS. */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative -mt-6 sm:-mt-8 z-20 bg-[#121318] dark:bg-[#0A0B0E] border-2 border-[#1E1E24] px-5 sm:px-7 py-2.5 rounded-sm shadow-[4px_4px_0px_#1E1E24] flex items-center justify-center text-center cursor-pointer group hover:border-[#00D586] transition-colors"
              onClick={() => {
                sound.playClick();
                setIsDetailOpen(true);
              }}
            >
              {/* Corner tech notches */}
              <span className="w-1.5 h-1.5 bg-[#00D586] absolute -top-1 -left-1" />
              <span className="w-1.5 h-1.5 bg-[#00D586] absolute -top-1 -right-1" />
              <span className="w-1.5 h-1.5 bg-[#00D586] absolute -bottom-1 -left-1" />
              <span className="w-1.5 h-1.5 bg-[#00D586] absolute -bottom-1 -right-1" />

              <div className="space-y-0.5">
                <div className="font-pixel text-[11px] sm:text-xs font-bold tracking-widest text-white uppercase">
                  ONE PARTNER.
                </div>
                <div className="font-pixel text-xs sm:text-sm font-black tracking-wider text-[#00D586] uppercase">
                  ALL SOLUTIONS.
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: 3 CARDS & DETAIL TRIGGER ================= */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-3.5 pt-2">
            {/* Right 3 Paper-Cut Service Cards (04, 05, 06) */}
            {rightCards.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isActive={activeServiceId === service.id}
                onSelect={handleSelectService}
                onAnchorUpdate={handleCardAnchorUpdate}
              />
            ))}

            {/* Quick Helper / Inspection Mode Card */}
            {activeService && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={activeService.id}
                onClick={() => {
                  sound.playClick();
                  setIsDetailOpen(true);
                }}
                className="mt-2 p-3 rounded-lg border-2 border-dashed border-[#1E1E24]/30 bg-white/70 dark:bg-[#1E2028]/70 cursor-pointer hover:bg-white dark:hover:bg-[#1E2028] shadow-xs transition-all flex items-center justify-between text-left"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#4B5563] dark:text-gray-400 block">
                    ACTIVE POWER STONE // #{activeService.number}
                  </span>
                  <span className="font-pixel text-xs font-bold text-[#1E1E24] dark:text-white uppercase">
                    {activeService.title} Details
                  </span>
                </div>

                <div
                  className="w-7 h-7 rounded-sm flex items-center justify-center text-white text-xs font-bold border border-[#1E1E24]"
                  style={{ backgroundColor: activeService.color }}
                >
                  ↗
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. DEEP DIVE SERVICE INSPECTOR MODAL
      ───────────────────────────────────────────────────────────── */}
      <ServiceDetailDrawer
        service={isDetailOpen ? activeService : null}
        onClose={() => setIsDetailOpen(false)}
        onContactClick={() => handleNav('contact')}
      />
    </section>
  );
};
