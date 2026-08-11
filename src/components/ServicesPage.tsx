import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Music,
  ArrowRight,
  Check,
  Plus,
  Printer,
  Sparkles,
  Coffee,
  Heart,
  Palette,
  Layout,
  Code,
  Bot,
  Cloud,
  Database,
  Box,
  Search,
  Compass,
  PenTool,
  Terminal,
  Rocket,
  ChevronRight,
  X,
  Volume2,
  ShieldCheck,
  Zap,
  Star,
  ExternalLink
} from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'brand',
    title: 'Brand Identity',
    description: 'Logos, visual systems, packaging and brand direction.',
    price: 14999,
    icon: Palette,
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Product design, websites, dashboards and mobile interfaces.',
    price: 24999,
    icon: Layout,
    popular: true,
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'Fast, responsive websites and web applications.',
    price: 29999,
    icon: Code,
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    description: 'AI agents, workflows, chatbots and business automation.',
    price: 34999,
    icon: Bot,
    popular: true,
  },
  {
    id: 'saas',
    title: 'SaaS Development',
    description: 'Scalable digital products and startup platforms.',
    price: 49999,
    icon: Cloud,
  },
  {
    id: 'crm',
    title: 'CRM & ERP Systems',
    description: 'Internal tools, operations and business management systems.',
    price: 44999,
    icon: Database,
  },
  {
    id: 'motion',
    title: 'Motion & 3D',
    description: 'Product visuals, animation and interactive experiences.',
    price: 19999,
    icon: Box,
  },
];

const COMBO_PACKS = [
  {
    id: 'startup',
    name: 'Startup Starter',
    price: 69999,
    savings: 'Save ₹9,998',
    services: ['Brand Identity', 'Responsive Web App', 'Basic AI Setup', '2 Weeks Sprint Support'],
    itemIds: ['brand', 'web'],
    badge: 'POPULAR CHOICE',
  },
  {
    id: 'business',
    name: 'Business Builder',
    price: 129999,
    savings: 'Save ₹24,997',
    services: ['Brand Identity Suite', 'UI/UX Design', 'Full-Stack Web App', 'AI Workflow & Automation'],
    itemIds: ['brand', 'uiux', 'web', 'ai'],
    badge: 'BEST VALUE',
  },
  {
    id: 'growth',
    name: 'Growth Machine',
    price: 189999,
    savings: 'Save ₹44,995',
    services: ['Full Visual Identity', 'Enterprise SaaS Platform', 'AI Agent Fleet & RAG', '3D Motion Visuals & Marketing'],
    itemIds: ['brand', 'uiux', 'web', 'ai', 'saas', 'motion'],
    badge: 'ENTERPRISE',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discover',
    icon: Search,
    desc: 'Deep dive into your goals, audience, brand DNA, and technology requirements.',
  },
  {
    step: '02',
    title: 'Strategy',
    icon: Compass,
    desc: 'Architecture blueprint, UX wireframes, design tokens, and AI model selection.',
  },
  {
    step: '03',
    title: 'Design',
    icon: PenTool,
    desc: 'Pixel-perfect interfaces, brand guidelines, motion prototypes, and 3D assets.',
  },
  {
    step: '04',
    title: 'Develop',
    icon: Terminal,
    desc: 'High-performance code, automated pipelines, secure API integrations & AI tuning.',
  },
  {
    step: '05',
    title: 'Launch',
    icon: Rocket,
    desc: 'Deployment, speed optimization, launch checklist, and continuous support.',
  },
];

interface ServicesPageProps {
  onNavigate?: (page: 'home' | 'contact' | 'about' | 'portfolio' | 'services', sectionId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  // Default selected items matching prompt: Brand Identity (14999), UI/UX (24999), AI & Automation (34999) => Total with tax = 88496
  const [selectedIds, setSelectedIds] = useState<string[]>(['brand', 'uiux', 'ai']);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [receiptPrinted, setReceiptPrinted] = useState(true);
  const [robotEyeExpr, setRobotEyeExpr] = useState<'happy' | 'blink' | 'wink'>('happy');
  const [isBaristaModalOpen, setIsBaristaModalOpen] = useState(false);
  
  // AI Barista Quiz State
  const [quizType, setQuizType] = useState<'startup' | 'sme' | 'enterprise'>('startup');
  const [quizGoal, setQuizGoal] = useState<'launch' | 'scale' | 'automate'>('launch');

  // Calculate pricing dynamics
  const selectedServices = SERVICES_DATA.filter((s) => selectedIds.includes(s.id));
  const subtotal = selectedServices.reduce((acc, curr) => acc + curr.price, 0);
  const taxRate = 0.18; // 18% GST
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + tax;

  // Toggle service selection
  const toggleService = (id: string) => {
    sound.playClick();
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Add Combo Bundle
  const applyCombo = (itemIds: string[]) => {
    sound.playSuccess();
    setSelectedIds(Array.from(new Set([...selectedIds, ...itemIds])));
    // Trigger quick confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#C8FF2F', '#0E0E11', '#FFF066']
    });
  };

  // Toggle music sound
  const handleToggleMusic = () => {
    sound.playClick();
    const playing = sound.toggleCafeAmbient();
    setIsMusicPlaying(playing);
  };

  // Handle receipt print
  const handlePrintReceipt = () => {
    sound.playPrinterSound();
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      setReceiptPrinted(true);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C8FF2F', '#0E0E11', '#FFC2E2', '#FFF066']
      });
    }, 1200);
  };

  // Robot expression timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRobotEyeExpr('blink');
      setTimeout(() => setRobotEyeExpr('happy'), 300);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (page: 'home' | 'contact' | 'about' | 'portfolio' | 'services', sectionId?: string) => {
    sound.playClick();
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else {
      window.location.hash = page === 'home' ? (sectionId || '') : page;
    }
  };

  const handleBaristaSubmit = () => {
    sound.playSuccess();
    let recommended: string[] = ['brand', 'web'];
    if (quizType === 'startup' && quizGoal === 'automate') recommended = ['web', 'ai'];
    if (quizType === 'sme') recommended = ['brand', 'uiux', 'web', 'ai'];
    if (quizType === 'enterprise') recommended = ['uiux', 'web', 'ai', 'saas', 'crm'];

    setSelectedIds(recommended);
    setIsBaristaModalOpen(false);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#C8FF2F', '#00E676', '#FFF066']
    });
  };

  return (
    <div className="w-full bg-[#F7F3EA] text-ink min-h-screen relative font-sans bg-graph-paper selection:bg-[#C8FF2F] selection:text-black">
      {/* Paper Grain Overlay */}
      <div className="paper-grain fixed inset-0 pointer-events-none z-10 opacity-[0.035]" />

      {/* STICKY TOP NAVIGATION BAR */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#F7F3EA]/90 backdrop-blur-md border-b-2 border-black px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xs bg-black text-[#C8FF2F] flex items-center justify-center font-pixel text-lg font-bold border-2 border-black shadow-[2px_2px_0px_#000] group-hover:bg-[#C8FF2F] group-hover:text-black transition-colors">
              D
            </div>
            <div className="flex flex-col">
              <span className="font-pixel text-lg sm:text-xl font-bold tracking-tight text-black flex items-center gap-1.5">
                DETQEL <span className="w-2 h-2 rounded-full bg-[#C8FF2F] border border-black/40" />
              </span>
              <span className="font-mono text-[9px] text-black/60 uppercase tracking-wider">Creative Studio</span>
            </div>
          </a>

          {/* Centered Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white border-2 border-black p-1 rounded-full shadow-[3px_3px_0px_#000] font-mono text-xs font-semibold">
            <button
              onClick={() => handleNavClick('home')}
              className="px-4 py-1.5 rounded-full hover:bg-black/5 transition-colors text-black"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="px-4 py-1.5 rounded-full bg-[#C8FF2F] text-black font-bold border-2 border-black shadow-[1px_1px_0px_#000]"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('home', 'playground')}
              className="px-4 py-1.5 rounded-full hover:bg-black/5 transition-colors text-black"
            >
              Playground
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="px-4 py-1.5 rounded-full hover:bg-black/5 transition-colors text-black"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('home', 'mascots')}
              className="px-4 py-1.5 rounded-full hover:bg-black/5 transition-colors text-black"
            >
              Mascots
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-1.5 rounded-full hover:bg-black/5 transition-colors text-black"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-3">
            {/* Music Icon Button */}
            <button
              onClick={handleToggleMusic}
              onMouseEnter={() => triggerCursor('CAFÉ MUSIC', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className={`p-2.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] transition-all ${
                isMusicPlaying
                  ? 'bg-[#C8FF2F] text-black rotate-12 scale-105 shadow-[0_0_15px_rgba(200,255,47,0.6)]'
                  : 'bg-white text-black hover:bg-[#FFF066]'
              }`}
              title="Toggle Café Audio Ambiance"
            >
              {isMusicPlaying ? (
                <div className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4 animate-bounce" />
                  <span className="text-[10px] font-mono font-bold pr-1">PLAYING</span>
                </div>
              ) : (
                <Music className="w-4 h-4" />
              )}
            </button>

            {/* Lime Green CTA Button */}
            <button
              onClick={() => handleNavClick('contact')}
              onMouseEnter={() => triggerCursor('TALK TO US', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="flex items-center gap-2 bg-[#C8FF2F] text-black font-pixel text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] hover:shadow-[0_0_18px_rgba(200,255,47,0.8)] transition-all"
            >
              LET'S TALK <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION — CREATIVE CAFÉ COUNTER SCENE */}
      <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 pb-16 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col justify-center pr-0 lg:pr-6 z-20">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 bg-white border-2 border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_#000] w-fit mb-6">
              <Sparkles className="w-4 h-4 text-black fill-[#C8FF2F]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                FRESHLY BREWED CREATIVE SOLUTIONS
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-pixel text-4xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
              OUR <span className="bg-[#C8FF2F] text-black px-3 py-1 inline-block border-2 border-black shadow-[4px_4px_0px_#000] transform -rotate-1">SERVICES.</span> <br />
              SERVED FRESH.
            </h1>

            {/* Supporting Copy */}
            <p className="font-sans text-lg sm:text-xl text-black/80 max-w-xl font-medium leading-relaxed mb-8">
              Choose what you need and we’ll build it with design, code and AI.
            </p>

            {/* Heart Doodle & Sticky Note Row */}
            <div className="relative flex flex-wrap items-center gap-6 pt-2">
              {/* Yellow Sticky Note */}
              <motion.div
                whileHover={{ rotate: 1, scale: 1.03 }}
                className="bg-[#FFF066] text-black border-2 border-black p-4 rounded-xs shadow-[4px_4px_0px_#000] max-w-xs relative"
              >
                <div className="tape-sticker tape-sticker-yellow w-14 h-4 top-[-8px] left-1/2 -translate-x-1/2 rounded-xs border border-black/20" />
                <p className="font-handwriting text-xl sm:text-2xl font-bold leading-tight">
                  "Good ideas start with the right blend."
                </p>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/10">
                  <span className="font-pixel text-[9px] uppercase tracking-wider opacity-60">
                    ★ DETQEL BARISTA
                  </span>
                  <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                </div>
              </motion.div>

              {/* Hand drawn heart SVG doodle */}
              <div className="hidden sm:block">
                <svg className="w-16 h-16 text-black opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M 30,40 C 20,20 0,30 20,60 C 40,80 50,90 50,90 C 50,90 60,80 80,60 C 100,30 80,20 70,40 C 60,50 50,60 50,60 Z" />
                  <path d="M 55,25 Q 75,10 85,25" strokeDasharray="3 3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hero Right — Interactive Café Counter Scene */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px]">
            {/* Wall Frame / Chalkboard background container */}
            <div className="w-full h-full bg-[#EFE9DC] border-4 border-black rounded-sm shadow-[8px_8px_0px_#000] p-4 sm:p-6 relative flex flex-col justify-between overflow-hidden">
              
              {/* Background Engineering Grid inside Cafe scene */}
              <div className="absolute inset-0 bg-graph-paper opacity-50 pointer-events-none" />

              {/* Pendant Lamp Hanging from Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
                <div className="w-0.5 h-16 bg-black" />
                <div className="w-16 h-10 bg-black rounded-t-full relative flex justify-center">
                  <div className="absolute -bottom-2 w-12 h-4 bg-[#FFF066] rounded-full blur-xs opacity-90 animate-pulse" />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 h-64 bg-gradient-to-b from-[#FFF066]/30 via-[#FFF066]/10 to-transparent pointer-events-none blur-sm" />
                </div>
              </div>

              {/* Framed Chalkboard "TODAY'S SPECIAL" on Top Right Wall */}
              <motion.div
                whileHover={{ rotate: 1, scale: 1.02 }}
                className="absolute top-4 right-4 bg-[#1E232A] text-white border-2 border-black p-3 sm:p-4 rounded-xs shadow-[3px_3px_0px_#000] max-w-[200px] z-20"
              >
                <div className="flex items-center justify-between border-b border-white/20 pb-1 mb-1.5">
                  <span className="font-pixel text-[10px] text-[#C8FF2F] uppercase tracking-wider font-bold">
                    TODAY'S SPECIAL
                  </span>
                  <Star className="w-3.5 h-3.5 text-[#C8FF2F] fill-[#C8FF2F]" />
                </div>
                <div className="font-handwriting text-xl sm:text-2xl text-white font-bold tracking-wide">
                  AI Solutions
                </div>
                <p className="font-mono text-[9px] text-white/70 mt-1">
                  Freshly brewed agents & workflow automation.
                </p>
              </motion.div>

              {/* Pink Sticky Note on Top Left Wall */}
              <motion.div
                whileHover={{ rotate: -2, scale: 1.05 }}
                className="absolute top-6 left-6 bg-[#FFC2E2] text-black border-2 border-black p-3 rounded-xs shadow-[3px_3px_0px_#000] max-w-[170px] z-20 transform -rotate-3"
              >
                <p className="font-handwriting text-sm sm:text-base font-bold leading-tight">
                  We don’t just build services, we craft experiences.
                </p>
              </motion.div>

              {/* Main Café Image Asset Render & Robot Scene */}
              <div className="relative w-full h-[320px] sm:h-[380px] mt-auto flex items-end justify-center z-10">
                {/* Generated Cafe Hero Scene Background Image */}
                <img
                  src="images/detqel_cafe_hero.png"
                  alt="DETQEL Creative Cafe Counter Scene"
                  className="w-full h-full object-cover rounded-xs border-2 border-black shadow-[4px_4px_0px_#000]"
                />

                {/* Animated Rising Steam Particles over Coffee Machine */}
                <div className="absolute top-[25%] left-[30%] flex flex-col items-center pointer-events-none">
                  <motion.div
                    animate={{ y: [-5, -25], opacity: [0, 0.8, 0], scale: [0.8, 1.2] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
                    className="w-4 h-4 rounded-full bg-white/60 blur-xs mb-1"
                  />
                  <motion.div
                    animate={{ y: [-5, -30], opacity: [0, 0.9, 0], scale: [0.6, 1.4] }}
                    transition={{ repeat: Infinity, duration: 2.8, delay: 0.5, ease: 'easeOut' }}
                    className="w-5 h-5 rounded-full bg-white/70 blur-xs"
                  />
                </div>

                {/* Interactive Mascot Coffee Mug Glow Overlay */}
                <div className="absolute bottom-6 right-[22%] bg-[#C8FF2F]/20 border-2 border-[#C8FF2F] px-2 py-0.5 rounded-full font-mono text-[9px] text-black font-bold shadow-[0_0_10px_#C8FF2F] backdrop-blur-xs flex items-center gap-1 animate-pulse">
                  <Coffee className="w-3 h-3 text-black" /> DETQEL MUG
                </div>
              </div>

              {/* Counter Label Footer */}
              <div className="mt-3 pt-2 border-t-2 border-black flex items-center justify-between text-xs font-mono text-black font-bold z-20 bg-white/80 backdrop-blur-xs p-2 rounded-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C8FF2F] border border-black animate-ping" />
                  BARISTA ROBOT: ONLINE ({robotEyeExpr.toUpperCase()})
                </span>
                <span className="text-black/70">DETQEL STUDIO CAFÉ #2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN MAIN CONTENT SECTION */}
      <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-10 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN — OUR MENU (SERVICES) */}
          <div className="lg:col-span-7 bg-[#F4F3EF] border-3 border-black rounded-sm shadow-[8px_8px_0px_#000] p-6 sm:p-8 relative">
            
            {/* Lime Green Menu Header Label Tab */}
            <div className="absolute -top-5 left-6 bg-[#C8FF2F] text-black font-pixel text-xs sm:text-sm font-bold px-4 py-1.5 border-2 border-black shadow-[3px_3px_0px_#000] uppercase tracking-wider flex items-center gap-2">
              <Coffee className="w-4 h-4" /> OUR MENU (SERVICES)
            </div>

            {/* Menu Header Description */}
            <div className="mt-4 mb-6 flex justify-between items-end border-b-2 border-black pb-4">
              <div>
                <h2 className="font-pixel text-2xl sm:text-3xl font-bold tracking-tight">
                  SELECT YOUR INGREDIENTS
                </h2>
                <p className="font-mono text-xs text-black/70 mt-1">
                  Click the plus (+) icon to add services directly into your project recipe.
                </p>
              </div>
              <span className="hidden sm:inline-block font-mono text-xs bg-white border border-black px-2.5 py-1 rounded-xs font-bold">
                {selectedIds.length} SELECTED
              </span>
            </div>

            {/* Service Rows */}
            <div className="space-y-4">
              {SERVICES_DATA.map((service) => {
                const isSelected = selectedIds.includes(service.id);
                const IconComp = service.icon;

                return (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.01, x: 4 }}
                    transition={{ duration: 0.15 }}
                    className={`p-4 sm:p-5 border-2 border-black rounded-xs transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-white shadow-[4px_4px_0px_#000] border-l-8 border-l-[#C8FF2F]'
                        : 'bg-[#F7F3EA]/70 hover:bg-white hover:shadow-[2px_2px_0px_#000]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Service Icon */}
                      <div className={`p-3 rounded-xs border-2 border-black shadow-[2px_2px_0px_#000] ${
                        isSelected ? 'bg-[#C8FF2F] text-black' : 'bg-white text-black'
                      }`}>
                        <IconComp className="w-6 h-6" />
                      </div>

                      {/* Details */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-pixel text-lg sm:text-xl font-bold text-black">
                            {service.title}
                          </h3>
                          {service.popular && (
                            <span className="font-mono text-[9px] bg-[#FFF066] text-black font-bold border border-black px-1.5 py-0.5 rounded-xs">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-sm text-black/75 mt-1 max-w-md font-medium leading-relaxed">
                          {service.description}
                        </p>
                        <div className="font-mono text-xs font-bold text-black mt-2">
                          ₹{service.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Circular Action Button */}
                    <button
                      onClick={() => toggleService(service.id)}
                      onMouseEnter={() => triggerCursor(isSelected ? 'REMOVE' : 'ADD', 'hover')}
                      onMouseLeave={() => triggerCursor('', 'default')}
                      className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#000] transition-all flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#C8FF2F] text-black rotate-45 scale-105 hover:bg-red-400'
                          : 'bg-white text-black hover:bg-[#C8FF2F] hover:scale-110'
                      }`}
                      title={isSelected ? 'Remove from recipe' : 'Add to recipe'}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Handwritten Note at Bottom */}
            <div className="mt-8 pt-4 border-t-2 border-black flex items-center justify-between flex-wrap gap-2">
              <p className="font-handwriting text-xl sm:text-2xl font-bold text-black">
                Pick your services and let’s build magic together! →
              </p>
              <button
                onClick={() => setSelectedIds(SERVICES_DATA.map((s) => s.id))}
                className="font-mono text-xs text-black underline hover:text-[#7939a1] font-bold"
              >
                Select All Services
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN — YOUR PROJECT CLIPBOARD & RECEIPT */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* CLIPBOARD PANEL */}
            <div className="bg-[#FFFDF9] border-3 border-black rounded-sm shadow-[8px_8px_0px_#000] p-6 sm:p-8 relative">
              
              {/* Metallic Clipboard Clip Top */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-800 border-2 border-black w-32 h-8 rounded-t-md shadow-[2px_2px_0px_#000] flex items-center justify-center">
                <div className="w-16 h-2 bg-gray-400 rounded-full border border-black" />
              </div>

              {/* Title Header */}
              <div className="text-center border-b-2 border-dashed border-black/30 pb-4 mb-6 pt-2">
                <span className="font-pixel text-xs text-black/60 uppercase tracking-widest block">ORDER BRIEF</span>
                <h2 className="font-pixel text-2xl sm:text-3xl font-bold">YOUR PROJECT</h2>
                <span className="font-mono text-[10px] text-black/50">DETQEL STUDIO RECIPE INVOICE</span>
              </div>

              {/* Selected Services List */}
              <div className="space-y-3 min-h-[160px] mb-6">
                <AnimatePresence>
                  {selectedServices.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center justify-between text-sm border-b border-black/10 pb-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#C8FF2F] border border-black flex items-center justify-center text-black text-[10px]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                        <span className="font-sans font-bold text-black">{item.title}</span>
                      </div>
                      <span className="font-mono font-bold text-black">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pricing Totals */}
              <div className="border-t-2 border-black pt-4 space-y-2 mb-6 font-mono text-sm">
                <div className="flex justify-between text-black/70">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-black/70">
                  <span>GST Tax (18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-lg sm:text-xl font-bold text-black border-t-2 border-black pt-3">
                  <span className="font-pixel">TOTAL</span>
                  <span className="font-mono text-2xl text-black bg-[#C8FF2F] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Full Width Lime Green Start Project Button */}
              <button
                onClick={() => handleNavClick('contact')}
                onMouseEnter={() => triggerCursor('START PROJECT', 'hover')}
                onMouseLeave={() => triggerCursor('', 'default')}
                className="w-full bg-[#C8FF2F] text-black font-pixel text-base sm:text-lg font-bold py-4 rounded-xs border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] transition-all flex items-center justify-center gap-2"
              >
                START MY PROJECT <ArrowRight className="w-5 h-5" />
              </button>

              {/* Print Receipt Button */}
              <button
                onClick={handlePrintReceipt}
                disabled={isPrinting}
                className={`w-full mt-3 bg-white hover:bg-gray-100 text-black font-mono text-xs font-bold py-2 border-2 border-black rounded-xs flex items-center justify-center gap-2 transition-colors ${
                  isPrinting ? 'opacity-50 cursor-wait' : ''
                }`}
              >
                <Printer className={`w-4 h-4 ${isPrinting ? 'animate-spin' : ''}`} />
                {isPrinting ? 'PRINTING RECEIPT...' : 'Print Project Summary Receipt'}
              </button>
            </div>

            {/* RECEIPT PRINTER & THERMAL RECEIPT DISPLAY */}
            <AnimatePresence>
              {receiptPrinted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative bg-white border-2 border-black p-6 rounded-xs shadow-[6px_6px_0px_#000] serrated-edge-both"
                >
                  <div className="text-center font-mono border-b border-dashed border-black/30 pb-3 mb-3">
                    <p className="font-pixel font-bold text-sm">DETQEL STUDIO // RECEIPT</p>
                    <p className="text-[10px] text-black/60">ORDER SUMMARY #{Math.floor(1000 + Math.random() * 9000)}</p>
                    <p className="text-[9px] text-black/40">DATE: {new Date().toLocaleDateString()}</p>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs mb-4">
                    {selectedServices.map((s) => (
                      <div key={s.id} className="flex justify-between">
                        <span className="truncate pr-2">1x {s.title}</span>
                        <span>₹{s.price.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-black/40 pt-2 font-mono text-xs space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>TAX (18%)</span>
                      <span>₹{tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm pt-1 border-t border-black">
                      <span>TOTAL DUE</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Receipt Barcode SVG */}
                  <div className="mt-4 pt-3 border-t border-dashed border-black/30 flex flex-col items-center">
                    <div className="w-full h-8 bg-black flex items-center justify-between px-2 text-white font-mono text-[8px]">
                      |||||| |||| |||||||| ||||| |||||||
                    </div>
                    <span className="font-mono text-[8px] mt-1 text-black/50">THANK YOU FOR BREWING WITH US</span>
                  </div>

                  {/* Sticky Note below receipt */}
                  <motion.div
                    whileHover={{ rotate: 1, scale: 1.04 }}
                    className="absolute -bottom-4 -right-2 bg-[#FFF066] text-black border-2 border-black p-3 rounded-xs shadow-[3px_3px_0px_#000] max-w-[200px] z-20 transform rotate-3"
                  >
                    <p className="font-handwriting text-sm font-bold leading-tight">
                      Your idea. Our process. Great impact. :)
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* OUR PROCESS RECIPE & CHEF'S RECOMMENDATION SECTION */}
      <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-12 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* PROCESS RECIPE PANEL (WIDE) */}
          <div className="lg:col-span-8 bg-[#F4F3EF] border-3 border-black rounded-sm shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2 border-b-2 border-black pb-4">
                <div>
                  <span className="font-pixel text-xs text-[#7939a1] font-bold uppercase tracking-wider">METHODOLOGY</span>
                  <h2 className="font-pixel text-2xl sm:text-3xl font-bold">OUR PROCESS RECIPE</h2>
                </div>
                <span className="font-mono text-xs bg-[#C8FF2F] border border-black px-3 py-1 font-bold rounded-xs shadow-[1px_1px_0px_#000]">
                  5-STEP WORKFLOW
                </span>
              </div>

              {/* 5 Steps Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                {PROCESS_STEPS.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      whileHover={{ y: -4 }}
                      className="bg-white border-2 border-black p-4 rounded-xs shadow-[3px_3px_0px_#000] flex flex-col justify-between relative group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-pixel text-xs bg-black text-[#C8FF2F] px-2 py-0.5 rounded-xs font-bold">
                          {step.step}
                        </span>
                        <div className="p-1.5 bg-[#F7F3EA] rounded-xs border border-black group-hover:bg-[#C8FF2F] transition-colors">
                          <StepIcon className="w-4 h-4 text-black" />
                        </div>
                      </div>

                      <h3 className="font-pixel text-base font-bold text-black mb-1">
                        {step.title}
                      </h3>
                      <p className="font-sans text-xs text-black/70 font-medium leading-normal">
                        {step.desc}
                      </p>

                      {/* Arrow connecting to next step */}
                      {idx < PROCESS_STEPS.length - 1 && (
                        <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-black">
                          <ChevronRight className="w-5 h-5 text-black stroke-[3]" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-black flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#00E676]" /> GUARANTEED QUALITY & RAPID SPRINT CYCLES
              </span>
              <span className="text-black/60 hidden sm:inline">DETQEL KITCHEN LABS</span>
            </div>
          </div>

          {/* CHEF'S RECOMMENDATION CARD (DARK CHALKBOARD) */}
          <div className="lg:col-span-4 bg-[#1B1F26] text-white border-3 border-black rounded-sm shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            
            {/* Top Label */}
            <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
              <span className="font-pixel text-xs text-[#C8FF2F] uppercase tracking-wider font-bold">
                CHEF'S RECOMMENDATION
              </span>
              <Sparkles className="w-4 h-4 text-[#C8FF2F]" />
            </div>

            {/* Main Featured Content */}
            <div className="my-auto text-center flex flex-col items-center">
              {/* Isometric Cube Graphic */}
              <div className="relative w-36 h-36 mb-4 flex items-center justify-center">
                <img
                  src="images/detqel_isometric_cube.png"
                  alt="Glowing Isometric Cube"
                  className="w-full h-full object-contain rounded-xs filter drop-shadow-[0_0_12px_#C8FF2F]"
                />
              </div>

              <h3 className="font-pixel text-2xl font-bold text-white mb-2">
                Growth Automation
              </h3>

              {/* Lime Green Highlight Text */}
              <div className="bg-[#C8FF2F] text-black font-mono text-xs font-bold px-3 py-1 rounded-full border border-black shadow-[2px_2px_0px_#000] mb-3">
                Perfect for scaling teams
              </div>

              <p className="font-sans text-sm text-white/80 font-medium leading-relaxed max-w-xs">
                "Automate smarter. Scale faster. We handle the tech, you focus on growth."
              </p>
            </div>

            {/* Action Link */}
            <button
              onClick={() => {
                applyCombo(['web', 'ai', 'saas']);
              }}
              className="w-full mt-6 bg-[#C8FF2F] text-black font-pixel text-sm font-bold py-3 rounded-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
            >
              ADD CHEF'S SPECIAL <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* COMBO PACKS (POPULAR) SECTION */}
      <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-12 z-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FFF066] border-2 border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_#000] font-mono text-xs font-bold uppercase mb-3">
            <Coffee className="w-3.5 h-3.5" /> CURATED BUNDLES
          </div>
          <h2 className="font-pixel text-3xl sm:text-4xl font-bold text-black">
            COMBO PACKS (POPULAR)
          </h2>
          <p className="font-sans text-base text-black/75 mt-2 font-medium">
            Pre-configured service stacks engineered to save time and budget.
          </p>
        </div>

        {/* 3 Equal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMBO_PACKS.map((combo) => (
            <motion.div
              key={combo.id}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F4F3EF] border-3 border-black rounded-sm shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col justify-between relative hover:bg-white transition-colors"
            >
              {/* Badge */}
              <div className="absolute -top-4 right-6 bg-[#C8FF2F] text-black font-mono text-[10px] font-bold border-2 border-black px-2.5 py-1 rounded-xs shadow-[2px_2px_0px_#000]">
                {combo.badge}
              </div>

              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#FFF066] border-2 border-black rounded-xs shadow-[2px_2px_0px_#000]">
                    <Coffee className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-pixel text-xl font-bold text-black">{combo.name}</h3>
                    <span className="font-mono text-xs text-green-700 font-bold">{combo.savings}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono text-3xl font-bold text-black">
                    ₹{combo.price.toLocaleString('en-IN')}
                  </span>
                  <span className="font-mono text-xs text-black/60 block mt-1">+ applicable GST</span>
                </div>

                {/* Included Services Bullet Points */}
                <div className="space-y-2.5 mb-8">
                  {combo.services.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-sans font-medium text-black">
                      <span className="w-4 h-4 rounded-full bg-[#C8FF2F] border border-black flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lime Green Add Button */}
              <button
                onClick={() => applyCombo(combo.itemIds)}
                onMouseEnter={() => triggerCursor('ADD BUNDLE', 'hover')}
                onMouseLeave={() => triggerCursor('', 'default')}
                className="w-full bg-[#C8FF2F] text-black font-pixel text-sm font-bold py-3.5 rounded-xs border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-black hover:text-[#C8FF2F] transition-all flex items-center justify-center gap-2"
              >
                SELECT {combo.name.toUpperCase()} <Plus className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI BARISTA RECOMMENDATION CARD */}
      <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-10 z-20">
        <div className="bg-[#FFF066] border-3 border-black rounded-sm shadow-[8px_8px_0px_#000] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] flex-shrink-0">
              <Bot className="w-8 h-8 text-black" />
            </div>
            <div>
              <span className="font-pixel text-xs text-black/70 uppercase tracking-wider font-bold block">AI BARISTA ASSISTANT</span>
              <h3 className="font-pixel text-2xl sm:text-3xl font-bold text-black leading-tight">
                Not sure what you need? Let our AI barista recommend the perfect mix!
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsBaristaModalOpen(true)}
            onMouseEnter={() => triggerCursor('QUIZ ME', 'hover')}
            onMouseLeave={() => triggerCursor('', 'default')}
            className="flex-shrink-0 bg-[#C8FF2F] text-black font-pixel text-sm sm:text-base font-bold px-6 py-4 rounded-xs border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-black hover:text-[#C8FF2F] transition-all flex items-center gap-2"
          >
            GET RECOMMENDATION <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* FOOTER CTA BANNER */}
      <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-12 z-20">
        <div className="bg-[#C8FF2F] border-4 border-black rounded-sm shadow-[10px_10px_0px_#000] p-8 sm:p-14 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-2xl">
            <h2 className="font-pixel text-3xl sm:text-5xl font-bold text-black leading-tight mb-4">
              READY TO BREW SOMETHING AMAZING?
            </h2>
            <p className="font-sans text-lg sm:text-xl font-medium text-black/90">
              Pick your services, share your ideas and let’s create magic together.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => handleNavClick('contact')}
                className="bg-black text-[#C8FF2F] font-pixel text-base font-bold px-7 py-4 rounded-xs border-2 border-black shadow-[4px_4px_0px_#FFF] hover:bg-white hover:text-black transition-all flex items-center gap-2"
              >
                LET'S TALK <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className="font-mono text-sm font-bold text-black hover:underline flex items-center gap-1"
              >
                Schedule a call <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Smiling Coffee Cup Illustration Right */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center flex-shrink-0">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-36 h-36 bg-white border-3 border-black rounded-3xl shadow-[6px_6px_0px_#000] flex flex-col items-center justify-center p-4 relative"
            >
              <Coffee className="w-12 h-12 text-black mb-2" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black" />
                <span className="w-2 h-2 rounded-full bg-black" />
              </div>
              <div className="w-6 h-3 border-b-3 border-black rounded-b-full mt-1" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* DARK FOOTER */}
      <footer className="w-full bg-[#0E0E11] text-white border-t-4 border-black py-10 px-4 sm:px-8 z-30 relative">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Left */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#C8FF2F] text-black font-pixel text-lg font-bold border-2 border-white flex items-center justify-center">
              D
            </div>
            <div>
              <span className="font-pixel text-lg font-bold tracking-tight text-white flex items-center gap-2">
                DETQEL STUDIO <span className="text-xs text-[#C8FF2F] font-mono">// LABS</span>
              </span>
              <p className="font-mono text-xs text-white/50">
                © 2026 Detqel Studio. All rights reserved.
              </p>
            </div>
          </div>

          {/* Heart center credit */}
          <div className="font-mono text-xs text-white/70 flex items-center gap-1.5">
            Crafted with <Heart className="w-4 h-4 text-[#C8FF2F] fill-[#C8FF2F]" /> & Coffee for digital creators
          </div>

          {/* Socials Right */}
          <div className="flex items-center gap-4 font-mono text-xs font-bold">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#C8FF2F] transition-colors">
              LinkedIn
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="hover:text-[#C8FF2F] transition-colors">
              Dribbble
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#C8FF2F] transition-colors">
              Instagram
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#C8FF2F] transition-colors">
              X (Twitter)
            </a>
          </div>
        </div>
      </footer>

      {/* AI BARISTA QUIZ MODAL */}
      <AnimatePresence>
        {isBaristaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#F7F3EA] border-4 border-black p-6 sm:p-8 rounded-sm shadow-[10px_10px_0px_#000] max-w-lg w-full relative"
            >
              <button
                onClick={() => setIsBaristaModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 bg-white border-2 border-black rounded-xs shadow-[2px_2px_0px_#000] hover:bg-red-400"
              >
                <X className="w-5 h-5 text-black" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <Bot className="w-8 h-8 text-black fill-[#C8FF2F]" />
                <div>
                  <h3 className="font-pixel text-xl font-bold">AI BARISTA RECOMMENDATION</h3>
                  <p className="font-mono text-xs text-black/60">Step 1 of 2 — Tell us your project goals</p>
                </div>
              </div>

              <div className="space-y-4 my-6">
                <div>
                  <label className="font-pixel text-xs uppercase text-black block mb-2 font-bold">1. What type of business are you?</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'startup', label: 'Startup' },
                      { id: 'sme', label: 'Growth SME' },
                      { id: 'enterprise', label: 'Enterprise' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setQuizType(t.id as any)}
                        className={`p-3 border-2 border-black rounded-xs font-mono text-xs font-bold transition-all ${
                          quizType === t.id ? 'bg-[#C8FF2F] text-black shadow-[2px_2px_0px_#000]' : 'bg-white text-black'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-pixel text-xs uppercase text-black block mb-2 font-bold">2. Primary Objective?</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'launch', label: 'Fast Launch' },
                      { id: 'scale', label: 'Scale Up' },
                      { id: 'automate', label: 'AI & Automate' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setQuizGoal(g.id as any)}
                        className={`p-3 border-2 border-black rounded-xs font-mono text-xs font-bold transition-all ${
                          quizGoal === g.id ? 'bg-[#C8FF2F] text-black shadow-[2px_2px_0px_#000]' : 'bg-white text-black'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleBaristaSubmit}
                className="w-full bg-[#C8FF2F] text-black font-pixel text-base font-bold py-3.5 rounded-xs border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-black hover:text-[#C8FF2F] transition-all flex items-center justify-center gap-2"
              >
                BREW MY RECOMMENDATION <Sparkles className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
