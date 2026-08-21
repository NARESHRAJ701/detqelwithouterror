import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Layers,
  Tag,
  Palette,
  Cpu,
  Code,
  Zap,
  Clock,
  Compass,
  ShieldCheck,
  X,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Search
} from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';

export interface FAQBook {
  id: string;
  number: string;
  category: string;
  spineTitle: string;
  question: string;
  explanation: string;
  color: {
    pastel: string;
    dark: string;
    border: string;
    ribbon: string;
    badgeBg: string;
    badgeText: string;
    accentHex: string;
  };
  icon: React.ComponentType<{ className?: string }>;
  height: string;
  width: string;
  highlights: string[];
  tip: string;
  relatedServices: string[];
  illustrationType: 'rocket' | 'layers' | 'pricing' | 'brand' | 'ai' | 'code' | 'automation' | 'timeline' | 'process' | 'support';
}

const FAQ_BOOKS: FAQBook[] = [
  {
    id: 'getting-started',
    number: '01',
    category: 'Getting Started',
    spineTitle: '01. GETTING STARTED',
    question: 'How do we begin a project with Detqel?',
    explanation: 'We kick off every collaboration with a 45-minute discovery session to align on your vision, technical architecture, and aesthetic direction.',
    color: {
      pastel: 'bg-[#BAE6FD]', // Sky blue
      dark: 'bg-[#0284C7]',
      border: 'border-[#38BDF8]',
      ribbon: 'bg-sky-500',
      badgeBg: 'bg-sky-100 dark:bg-sky-900/50',
      badgeText: 'text-sky-800 dark:text-sky-200',
      accentHex: '#0284C7'
    },
    icon: Rocket,
    height: 'h-64 sm:h-72',
    width: 'w-12 sm:w-14',
    highlights: [
      'Discovery Call & Scope Blueprint',
      'Fixed Proposal & Milestone Roadmap',
      'Design Sprint & Live Interactive Prototypes',
      'Production Build & Edge Deployment'
    ],
    tip: 'Having your brand guidelines, project goals, and inspo links ready can double our discovery speed!',
    relatedServices: ['Product Strategy', 'UI/UX Architecture', 'Brand Discovery'],
    illustrationType: 'rocket'
  },
  {
    id: 'services',
    number: '02',
    category: 'Services',
    spineTitle: '02. SERVICES',
    question: 'What core creative & engineering services do you offer?',
    explanation: 'Detqel is a hybrid digital studio crafting high-end web applications, brand identities, custom AI agents, 3D WebGL experiences, and automated workflows.',
    color: {
      pastel: 'bg-[#A7F3D0]', // Mint green
      dark: 'bg-[#059669]',
      border: 'border-[#34D399]',
      ribbon: 'bg-emerald-500',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-900/50',
      badgeText: 'text-emerald-800 dark:text-emerald-200',
      accentHex: '#059669'
    },
    icon: Layers,
    height: 'h-68 sm:h-76',
    width: 'w-13 sm:w-15',
    highlights: [
      'Full-Stack React & Next.js Applications',
      'Brand Identity & Brutalist Design Systems',
      'Custom LLM Integration & RAG Pipelines',
      'Three.js / WebGL Interactive Shaders'
    ],
    tip: 'Need modular help? You can hire us for a single sprint or as your embedded design & dev team.',
    relatedServices: ['Frontend Dev', 'AI Engineering', 'WebGL Graphics'],
    illustrationType: 'layers'
  },
  {
    id: 'pricing',
    number: '03',
    category: 'Pricing',
    spineTitle: '03. PRICING & RATES',
    question: 'How are your projects priced and structured?',
    explanation: 'We offer crystal-clear fixed-price sprint packages and weekly dedicated studio retainers with zero hidden fees or surprise invoices.',
    color: {
      pastel: 'bg-[#FECDD3]', // Coral pink
      dark: 'bg-[#E11D48]',
      border: 'border-[#FB7185]',
      ribbon: 'bg-rose-500',
      badgeBg: 'bg-rose-100 dark:bg-rose-900/50',
      badgeText: 'text-rose-800 dark:text-rose-200',
      accentHex: '#E11D48'
    },
    icon: Tag,
    height: 'h-60 sm:h-68',
    width: 'w-12 sm:w-14',
    highlights: [
      'Fixed-Scope Sprints starting at $2,500',
      'Weekly Dedicated Studio Retainers',
      'Transparent 50/50 Milestone Payments',
      'No surprise fees—full ownership of code & design'
    ],
    tip: 'Studio retainers are perfect for growing products needing continuous design & feature iteration.',
    relatedServices: ['Sprint Contracts', 'Design Subscriptions', 'Dedicated Team'],
    illustrationType: 'pricing'
  },
  {
    id: 'branding',
    number: '04',
    category: 'Branding',
    spineTitle: '04. BRAND IDENTITY',
    question: 'What is included in Detqel’s branding package?',
    explanation: 'We build living, tactile brand identities complete with bespoke logomarks, typography rules, color tokens, motion assets, and Figma design systems.',
    color: {
      pastel: 'bg-[#DDD6FE]', // Lavender
      dark: 'bg-[#7C3AED]',
      border: 'border-[#A78BFA]',
      ribbon: 'bg-purple-500',
      badgeBg: 'bg-purple-100 dark:bg-purple-900/50',
      badgeText: 'text-purple-800 dark:text-purple-200',
      accentHex: '#7C3AED'
    },
    icon: Palette,
    height: 'h-66 sm:h-74',
    width: 'w-14 sm:w-16',
    highlights: [
      'Vector Logomark & Icon Suite',
      'Typography & Color Palette Tokens',
      'Figma Design System & UI Kit',
      'Interactive Web Guidelines & 3D Assets'
    ],
    tip: 'We export production-ready Tailwind CSS theme tokens so your devs can implement branding instantly.',
    relatedServices: ['Logo Design', 'Design Systems', '3D Asset Creation'],
    illustrationType: 'brand'
  },
  {
    id: 'ai-solutions',
    number: '05',
    category: 'AI Solutions',
    spineTitle: '05. AI SOLUTIONS',
    question: 'How do you integrate custom AI into our product?',
    explanation: 'We design and deploy custom RAG search pipelines, autonomous AI agents, fine-tuned models, and intuitive natural language UI components.',
    color: {
      pastel: 'bg-[#FEF08A]', // Mustard yellow
      dark: 'bg-[#CA8A04]',
      border: 'border-[#FACC15]',
      ribbon: 'bg-amber-500',
      badgeBg: 'bg-amber-100 dark:bg-amber-900/50',
      badgeText: 'text-amber-800 dark:text-amber-200',
      accentHex: '#CA8A04'
    },
    icon: Cpu,
    height: 'h-64 sm:h-72',
    width: 'w-13 sm:w-15',
    highlights: [
      'Custom LLM & Vector Search (RAG)',
      'Conversational AI & Voice Interfaces',
      'Automated Data Processing Pipelines',
      'Secure On-Premise or Cloud Deployment'
    ],
    tip: 'We focus on sub-second streaming latency and strict data privacy so your proprietary data stays safe.',
    relatedServices: ['Vector DBs', 'OpenAI / Anthropic APIs', 'AI UX Design'],
    illustrationType: 'ai'
  },
  {
    id: 'web-development',
    number: '06',
    category: 'Web Development',
    spineTitle: '06. WEB DEVELOPMENT',
    question: 'What tech stack and code standards do you use?',
    explanation: 'We engineer blazingly fast web applications using React, TypeScript, Next.js, Tailwind CSS, Framer Motion, and WebGL for unmatched performance.',
    color: {
      pastel: 'bg-[#BFDBFE]', // Pastel blue
      dark: 'bg-[#2563EB]',
      border: 'border-[#60A5FA]',
      ribbon: 'bg-blue-500',
      badgeBg: 'bg-blue-100 dark:bg-blue-900/50',
      badgeText: 'text-blue-800 dark:text-blue-200',
      accentHex: '#2563EB'
    },
    icon: Code,
    height: 'h-68 sm:h-78',
    width: 'w-14 sm:w-16',
    highlights: [
      'React 18 / Next.js 14 App Router Architecture',
      'Strict TypeScript & Modular Codebases',
      '95+ Lighthouse Performance & SEO Guarantee',
      'Seamless Framer Motion Micro-Animations'
    ],
    tip: 'Every line of code is clean, documented, and delivered via standard GitHub repositories.',
    relatedServices: ['Frontend Engineering', 'Next.js App Router', 'Performance Audits'],
    illustrationType: 'code'
  },
  {
    id: 'automation',
    number: '07',
    category: 'Automation',
    spineTitle: '07. AUTOMATION',
    question: 'Can you automate our business workflows & tools?',
    explanation: 'Yes! We build automated syncs between your CRM, databases, payment gateways, and Slack using n8n, Make, custom webhooks, and Python scripts.',
    color: {
      pastel: 'bg-[#FFEDD5]', // Peach
      dark: 'bg-[#EA580C]',
      border: 'border-[#FB923C]',
      ribbon: 'bg-orange-500',
      badgeBg: 'bg-orange-100 dark:bg-orange-900/50',
      badgeText: 'text-orange-800 dark:text-orange-200',
      accentHex: '#EA580C'
    },
    icon: Zap,
    height: 'h-62 sm:h-70',
    width: 'w-12 sm:w-14',
    highlights: [
      'CRM & Multi-Database Synchronization',
      'Automated Lead Triage & Email Notifications',
      'Custom Webhook Listeners & Microservices',
      'n8n / Make Workflow Engineering'
    ],
    tip: 'Automating administrative tasks saves our clients an average of 15+ operational hours every single week.',
    relatedServices: ['n8n Workflows', 'API Integrations', 'Custom Scripting'],
    illustrationType: 'automation'
  },
  {
    id: 'timeline',
    number: '08',
    category: 'Timeline',
    spineTitle: '08. TIMELINE & DELIVERIES',
    question: 'How long does a typical project take from start to launch?',
    explanation: 'Most projects take between 2 to 6 weeks depending on project scope, iteration cycles, and final testing.',
    color: {
      pastel: 'bg-[#99F6E4]', // Soft mint teal
      dark: 'bg-[#0D9488]',
      border: 'border-[#2DD4BF]',
      ribbon: 'bg-teal-500',
      badgeBg: 'bg-teal-100 dark:bg-teal-900/50',
      badgeText: 'text-teal-800 dark:text-teal-200',
      accentHex: '#0D9488'
    },
    icon: Clock,
    height: 'h-66 sm:h-74',
    width: 'w-13 sm:w-15',
    highlights: [
      'Rapid Design Sprints: 1 to 2 Weeks',
      'Full Web App Engineering: 3 to 5 Weeks',
      'Brand Identity Package: 2 to 3 Weeks',
      'Weekly Async Video Demos & Live Staging'
    ],
    tip: 'We run 1-week iterative sprints so you test working code and prototypes every Friday.',
    relatedServices: ['Agile Sprints', 'Rapid Prototyping', 'Staging Deployments'],
    illustrationType: 'timeline'
  },
  {
    id: 'process',
    number: '09',
    category: 'Process',
    spineTitle: '09. OUR PROCESS',
    question: 'What does working with Detqel look like step-by-step?',
    explanation: 'A collaborative 4-phase framework: Blueprint, Craft, Build, and Launch. You get direct access to our private Slack channel and Figma workspace.',
    color: {
      pastel: 'bg-[#FBCFE8]', // Soft pink
      dark: 'bg-[#DB2777]',
      border: 'border-[#F472B6]',
      ribbon: 'bg-pink-500',
      badgeBg: 'bg-pink-100 dark:bg-pink-900/50',
      badgeText: 'text-pink-800 dark:text-pink-200',
      accentHex: '#DB2777'
    },
    icon: Compass,
    height: 'h-64 sm:h-72',
    width: 'w-14 sm:w-16',
    highlights: [
      '1. Blueprint: Architecture & Wireframing',
      '2. Craft: Visual Aesthetics & Motion Design',
      '3. Build: High-Performance Codebase',
      '4. Launch: Quality Assurance & Handoff'
    ],
    tip: 'No black boxes! You will have a live staging preview link updated daily throughout development.',
    relatedServices: ['Co-Creation', 'Figma Collaboration', 'Daily Staging'],
    illustrationType: 'process'
  },
  {
    id: 'support',
    number: '10',
    category: 'Support',
    spineTitle: '10. SUPPORT & CARE',
    question: 'What post-launch support & maintenance do you provide?',
    explanation: 'Every project includes 30 days of complimentary post-launch support, plus optional monthly care packages for ongoing optimization and updates.',
    color: {
      pastel: 'bg-[#FDE68A]', // Soft amber gold
      dark: 'bg-[#D97706]',
      border: 'border-[#FBBF24]',
      ribbon: 'bg-amber-600',
      badgeBg: 'bg-amber-100 dark:bg-amber-900/50',
      badgeText: 'text-amber-800 dark:text-amber-200',
      accentHex: '#D97706'
    },
    icon: ShieldCheck,
    height: 'h-68 sm:h-76',
    width: 'w-13 sm:w-15',
    highlights: [
      '30-Day Free Warranty & Bug Resolution',
      'Monthly Security & Dependency Updates',
      'Dedicated Support Slack Channel',
      'Video Documentation & Training Guides'
    ],
    tip: 'Our studio care plans ensure your website remains fast, secure, and compatible with new browser updates.',
    relatedServices: ['Care Plans', 'SLA Support', 'Performance Audits'],
    illustrationType: 'support'
  }
];

export const KnowledgeLibraryFAQ: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<FAQBook | null>(null);
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lampOn, setLampOn] = useState(true);
  const [catState, setCatState] = useState<'sleeping' | 'stretching' | 'yawning' | 'meowing' | 'purring'>('sleeping');

  // Keyboard shortcut listener to close open book modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedBook) {
        sound.playClick();
        setSelectedBook(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBook]);

  // Idle animation for cat yawning/stretching
  useEffect(() => {
    const catInterval = setInterval(() => {
      const actions: ('stretching' | 'yawning' | 'purring')[] = ['stretching', 'yawning', 'purring'];
      const nextAction = actions[Math.floor(Math.random() * actions.length)];
      setCatState(nextAction);
      setTimeout(() => setCatState('sleeping'), 3200);
    }, 10000);

    return () => {
      clearInterval(catInterval);
    };
  }, []);

  const triggerCatAction = () => {
    sound.playHover();
    const actions: ('stretching' | 'yawning' | 'meowing' | 'purring')[] = ['stretching', 'yawning', 'meowing', 'purring'];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    setCatState(randomAction);
    setTimeout(() => setCatState('sleeping'), 3500);
  };

  const handleBookHover = (book: FAQBook) => {
    setHoveredBookId(book.id);
    sound.playHover();
    triggerCursor('PULL 📖', 'drag');
  };

  const handleBookLeave = () => {
    setHoveredBookId(null);
    triggerCursor('', 'default');
  };

  const handleBookClick = (book: FAQBook) => {
    sound.playSuccess();
    setSelectedBook(book);
    triggerCursor('READ 📖', 'hover');
  };

  const filteredBooks = FAQ_BOOKS.filter(
    b =>
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.spineTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedIndex = selectedBook ? FAQ_BOOKS.findIndex(b => b.id === selectedBook.id) : -1;

  const navigateBook = (direction: 'next' | 'prev') => {
    if (selectedIndex === -1) return;
    sound.playClick();
    let newIndex = direction === 'next' ? selectedIndex + 1 : selectedIndex - 1;
    if (newIndex < 0) newIndex = FAQ_BOOKS.length - 1;
    if (newIndex >= FAQ_BOOKS.length) newIndex = 0;
    setSelectedBook(FAQ_BOOKS[newIndex]);
  };

  return (
    <section
      id="faq"
      className="relative py-24 px-4 sm:px-8 border-b-2 border-ink overflow-hidden select-none font-sans transition-colors duration-300"
      style={{ backgroundImage: 'url(/images/faq_bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Daylight Ray Overlay from Top-Left */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-amber-100/40 via-amber-50/10 to-transparent dark:from-indigo-900/10 dark:via-purple-950/5 pointer-events-none z-0" />

      {/* Floating Ambient Dust Particles in Sunlight */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-300/60 dark:bg-purple-300/30 blur-[0.5px]"
            style={{
              top: `${(i * 18 + 7) % 90}%`,
              left: `${(i * 23 + 5) % 85}%`
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.2, 0.7, 0.2]
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      {/* Swaying Hanging Plants Vines at Top Right */}
      <motion.div
        className="absolute top-0 right-10 sm:right-24 z-10 pointer-events-none hidden sm:block"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Vine Stem */}
          <path d="M60 0 C60 40, 45 80, 55 130 C60 150, 50 170, 52 180" stroke="#15803D" strokeWidth="3" fill="none" />
          <path d="M60 0 C70 30, 80 70, 72 120 C68 145, 75 165, 70 175" stroke="#16A34A" strokeWidth="2" fill="none" />
          
          {/* Vine Leaves */}
          <path d="M55 30 C35 25, 30 45, 52 38 Z" fill="#22C55E" />
          <path d="M62 45 C82 40, 85 60, 64 53 Z" fill="#15803D" />
          <path d="M50 70 C30 65, 25 85, 48 78 Z" fill="#4ADE80" />
          <path d="M70 85 C90 80, 95 100, 72 93 Z" fill="#16A34A" />
          <path d="M53 110 C33 105, 28 125, 51 118 Z" fill="#22C55E" />
          <path d="M71 130 C91 125, 96 145, 73 138 Z" fill="#15803D" />
          <path d="M51 155 C31 150, 26 170, 49 163 Z" fill="#4ADE80" />
        </svg>
      </motion.div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Sticky Notes Pinned to Wall */}
        <div className="hidden xl:block">
          {/* Sticky 1: Think */}
          <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -30, bottom: 30 }}
            className="absolute -top-12 left-10 bg-sticky-yellow text-ink p-3 rounded-xs shadow-sticky border border-amber-300 font-handwriting text-xl font-bold -rotate-6 z-20 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
          >
            <div className="tape-sticker tape-sticker-yellow w-12 h-4 -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
            📌 Think.
          </motion.div>

          {/* Sticky 2: Innovate */}
          <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -30, bottom: 30 }}
            className="absolute top-4 left-[340px] bg-sticky-mint text-ink p-3 rounded-xs shadow-sticky border border-teal-300 font-handwriting text-xl font-bold rotate-6 z-20 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
          >
            <div className="tape-sticker w-12 h-4 -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
            🌱 Innovate
          </motion.div>

          {/* Sticky 3: Craft */}
          <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -30, bottom: 30 }}
            className="absolute -top-10 right-48 bg-sticky-pink text-ink p-3 rounded-xs shadow-sticky border border-pink-300 font-handwriting text-xl font-bold -rotate-3 z-20 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
          >
            <div className="tape-sticker w-12 h-4 -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
            🎨 Craft with Love
          </motion.div>

          {/* Sticky 4: Build With Curiosity */}
          <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -30, bottom: 30 }}
            className="absolute bottom-6 left-6 bg-sticky-lavender text-ink p-3 rounded-xs shadow-sticky border border-purple-300 font-handwriting text-lg font-bold rotate-4 z-20 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
          >
            <div className="tape-sticker w-12 h-4 -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
            🚀 Build With Curiosity
          </motion.div>
        </div>

        {/* Section Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Heading & Handwritten Callout */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white dark:bg-canvas-dark-paper border border-ink/20 px-3 py-1 rounded-xs shadow-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-accent-acid animate-ping" />
                <span className="font-pixel text-xs font-bold uppercase tracking-wider text-ink dark:text-gray-200">
                  KNOWLEDGE LIBRARY // VOL. 2026
                </span>
              </div>

              {/* Bold Pixel Heading */}
              <h2 className="font-pixel text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0E0E11] dark:text-white tracking-tight leading-[1.02] mb-4">
                FREQUENTLY<br />
                ASKED<br />
                <span className="text-accent-coral underline decoration-accent-acid decoration-4 underline-offset-4">
                  QUESTIONS.
                </span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-ink/80 dark:text-gray-300 leading-relaxed max-w-md mb-6">
                Everything you need to know before working with Detqel. Pull a book from the shelf to reveal the answer.
              </p>

              {/* Handwritten Note & SVG Hand-drawn Arrow */}
              <div className="relative inline-block mt-2 mb-6">
                <div className="font-handwriting text-2xl sm:text-3xl text-accent-coral dark:text-amber-300 font-bold -rotate-3 hover:scale-105 transition-transform flex items-center gap-2">
                  <span>Pick a book to learn more</span>
                  <span className="animate-bounce">→</span>
                </div>
                
                {/* SVG Arrow pointing right */}
                <svg className="w-24 h-10 text-accent-coral dark:text-amber-300 ml-12 -mt-1 hidden sm:block" viewBox="0 0 100 40" fill="none">
                  <path d="M5 10 C30 5, 60 30, 90 20" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2" fill="none" />
                  <path d="M82 14 L92 20 L84 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            </div>

            {/* Quick Search Input */}
            <div className="relative max-w-sm mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 dark:text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQ books by keyword..."
                className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white pl-9 pr-4 py-2 text-sm rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-accent-acid font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono opacity-60 hover:opacity-100"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Creative Office Environment & Desktop Shelf Decor */}
          <div className="lg:col-span-7 flex flex-col justify-end">
            
            {/* Top Shelf Accessories Bar: Study Lamp (Centered) & Animated Sleeping Cat (Right Corner) */}
            <div className="relative flex items-end justify-between px-3 sm:px-6 pb-2 border-b-4 border-[#5A381E] bg-gradient-to-r from-[#8B5A2B]/25 via-transparent to-[#8B5A2B]/25 rounded-t-xs min-h-[95px]">
              
              {/* LEFT SPACER (For visual balance) */}
              <div className="w-16 hidden sm:block pointer-events-none" />

              {/* CENTER: Interactive Study Lamp */}
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center cursor-pointer group select-none z-30"
                onClick={() => {
                  if (lampOn) {
                    sound.playProjectorOff();
                  } else {
                    sound.playProjectorOn();
                  }
                  setLampOn(!lampOn);
                }}
                title="Click to toggle Study Lamp light"
              >
                {/* Lamp Dome Shade & Glow Bulb */}
                <div className={`w-10 h-9 rounded-t-full border-2 border-ink shadow-md relative z-20 flex items-center justify-center transition-colors ${lampOn ? 'bg-amber-400 dark:bg-amber-500' : 'bg-gray-400 dark:bg-gray-700'}`}>
                  <div className={`w-3.5 h-3.5 rounded-full border border-ink/40 transition-colors ${lampOn ? 'bg-yellow-100 shadow-[0_0_16px_#FCD34D] animate-pulse' : 'bg-gray-600'}`} />
                </div>
                {/* Gooseneck Arm Stem & Brass Base */}
                <div className="w-1.5 h-11 bg-gradient-to-b from-gray-700 to-amber-900 border-x border-ink -mt-0.5 relative z-20" />
                <div className="w-12 h-2.5 bg-amber-900 dark:bg-amber-950 rounded-xs border-2 border-ink shadow-brutalist-sm relative z-20" />

                {/* Single Soft Light Beam Cone (Fades out halfway down the wooden board) */}
                {lampOn && (
                  <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[520px] sm:w-[680px] max-w-[90vw] h-[220px] sm:h-[250px] bg-gradient-to-b from-amber-300/30 via-amber-200/12 to-transparent clip-path-cone blur-[2px] pointer-events-none z-10 opacity-80 transition-opacity" />
                )}

                {/* Hover Tooltip Label */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-pixel text-[8px] font-bold bg-white dark:bg-canvas-dark-paper border border-ink px-1 rounded-xs mt-1 shadow-xs whitespace-nowrap z-30">
                  {lampOn ? 'TURN OFF 💡' : 'TURN ON 💡'}
                </span>
              </div>

              {/* RIGHT CORNER: Animated Sleeping Pixel Cat */}
              <div
                className="relative flex flex-col items-end cursor-pointer group select-none z-20 pb-1 ml-auto"
                onClick={triggerCatAction}
                title="Click to pet the sleeping cat!"
              >
                {/* Floating ZZZ bubbles when sleeping */}
                {catState === 'sleeping' && (
                  <div className="absolute -top-7 right-4 flex items-center gap-1 pointer-events-none z-30">
                    <motion.span
                      animate={{ y: [-2, -18], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.9] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: 0 }}
                      className="font-pixel text-xs text-indigo-500 dark:text-indigo-300 font-bold"
                    >
                      z
                    </motion.span>
                    <motion.span
                      animate={{ y: [-2, -22], opacity: [0, 1, 0], scale: [0.9, 1.3, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                      className="font-pixel text-sm text-purple-600 dark:text-purple-300 font-bold"
                    >
                      Z
                    </motion.span>
                    <motion.span
                      animate={{ y: [-2, -26], opacity: [0, 1, 0], scale: [1, 1.4, 1.1] }}
                      transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
                      className="font-pixel text-base text-amber-600 dark:text-amber-300 font-bold"
                    >
                      Z
                    </motion.span>
                  </div>
                )}

                {/* Interactive Action Speech Bubble */}
                {catState !== 'sleeping' && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: -4 }}
                    className="absolute -top-9 right-0 bg-white dark:bg-canvas-dark-paper text-ink dark:text-white border-2 border-ink px-2.5 py-1 rounded-xs shadow-brutalist-sm font-handwriting text-base font-bold whitespace-nowrap z-40"
                  >
                    {catState === 'stretching' && '🐾 Big Stretchhh! ~'}
                    {catState === 'yawning' && '🥱 *Yawwnn*...'}
                    {catState === 'purring' && '💖 *Purrrr*...'}
                    {catState === 'meowing' && '🐱 *Meow!*'}
                  </motion.div>
                )}

                {/* Sleeping Cat & Cushion Frame */}
                <div className="relative flex items-center justify-center mt-3">
                  {/* Cozy Red Checkered Cushion */}
                  <div className="w-20 h-5 bg-rose-500 dark:bg-rose-900 border-2 border-ink rounded-md shadow-brutalist-sm relative" />

                  {/* Animated Curled Cat Body */}
                  <motion.div
                    animate={
                      catState === 'stretching'
                        ? { scaleX: [1, 1.25, 1], y: [0, -6, 0] }
                        : catState === 'yawning'
                        ? { scaleY: [1, 1.2, 1], rotate: [0, -5, 0] }
                        : { y: [0, -1.5, 0] }
                    }
                    transition={{ duration: catState === 'sleeping' ? 2.5 : 1.2, repeat: catState === 'sleeping' ? Infinity : 0 }}
                    className="absolute -top-3.5 right-1 flex items-center bg-amber-400 dark:bg-amber-600 border-2 border-ink px-2 py-1 rounded-full shadow-sm"
                  >
                    {/* Cat Ears */}
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-ink absolute -top-2 left-1" />
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-ink absolute -top-2 left-4" />
                    
                    {/* Cat Face Expressions */}
                    <span className="font-pixel text-xs text-ink font-bold leading-none">
                      {catState === 'sleeping' ? '(=^.^)💤' : catState === 'yawning' ? '(=O.O=)' : '(=^.^)🐾'}
                    </span>

                    {/* Tail Wiggling */}
                    <motion.div
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-4 h-1.5 bg-amber-600 dark:bg-amber-800 border border-ink rounded-full absolute -right-2 top-1"
                    />
                  </motion.div>
                </div>

                <span className="font-pixel text-[8px] text-ink dark:text-amber-200 font-bold mt-1 uppercase tracking-wider">
                  SLEEPING CAT 🐾
                </span>
              </div>
            </div>

            {/* MAIN HANDCRAFTED WOODEN BOOKSHELF FRAME */}
            <div className="relative p-4 sm:p-6 bg-gradient-to-b from-[#8B5A2B] via-[#673F1E] to-[#4A2C11] border-4 border-[#3D210B] rounded-xs shadow-brutalist-lg overflow-hidden">
              
              {/* Wood Grain Texture Overlay */}
              <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
              
              {/* Metallic Brass Corner Brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-300" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-300" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-300" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-300" />

              {/* Inner Wooden Backing Box (Adjusted UI Lighting for Lamp ON/OFF) */}
              <div
                className={`relative border-2 border-[#241308] p-4 sm:p-6 rounded-xs shadow-inner min-h-[340px] flex items-end justify-center overflow-x-auto no-scrollbar transition-all duration-500 ${
                  lampOn
                    ? 'bg-[#361E0E] dark:bg-[#120B06] shadow-[inset_0_0_50px_rgba(251,191,36,0.12)]'
                    : 'bg-[#0E0704] dark:bg-[#070302] shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]'
                }`}
              >
                {/* Warm Ambient Illumination Overlay over Wooden Backing when Lamp ON */}
                {lampOn && (
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-400/12 via-amber-300/4 to-transparent pointer-events-none z-0 transition-opacity duration-500" />
                )}

                {/* Dark Shadow Overlay when Lamp OFF */}
                {!lampOn && (
                  <div className="absolute inset-0 bg-black/60 pointer-events-none z-0 transition-opacity duration-500" />
                )}

                {/* Dark Cabinet Guidance Prompt when Lamp is OFF */}
                {!lampOn && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 transition-opacity duration-500 px-4 text-center">
                    <div className="bg-black/65 border border-amber-400/30 px-4 py-2.5 rounded-xs backdrop-blur-xs shadow-lg">
                      <span className="font-pixel text-xs sm:text-sm text-amber-300 uppercase tracking-widest block animate-pulse">
                        💡 CLICK THE STUDY LAMP ABOVE TO REVEAL FAQ BOOKS
                      </span>
                    </div>
                  </div>
                )}

                {/* Wooden Shelf Base Board */}
                <div className="absolute bottom-0 left-0 right-0 h-5 bg-[#543315] border-t-2 border-[#8B5A2B] shadow-md z-0" />

                {/* THE 10 BOOKS ROW (Hidden when Lamp OFF, Revealed when Lamp ON) */}
                <div
                  className={`relative z-10 flex items-end justify-center gap-1.5 sm:gap-2.5 px-2 pb-5 min-w-[620px] sm:min-w-0 transition-all duration-500 ease-in-out ${
                    lampOn
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  {filteredBooks.map((book, idx) => {
                    const IconComp = book.icon;
                    const isHovered = hoveredBookId === book.id;
                    
                    // Shelf displacement physics logic
                    let shiftX = 0;
                    if (hoveredBookId) {
                      const hoveredIdx = filteredBooks.findIndex(b => b.id === hoveredBookId);
                      if (hoveredIdx !== -1 && idx !== hoveredIdx) {
                        shiftX = idx < hoveredIdx ? -6 : 6;
                      }
                    }

                    return (
                      <motion.div
                        key={book.id}
                        onMouseEnter={() => handleBookHover(book)}
                        onMouseLeave={handleBookLeave}
                        onClick={() => handleBookClick(book)}
                        animate={{
                          y: isHovered ? -18 : 0,
                          scale: isHovered ? 1.06 : 1,
                          x: shiftX,
                          rotateZ: isHovered ? (idx % 2 === 0 ? -1.5 : 1.5) : 0
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                        className={`relative cursor-pointer flex flex-col justify-between p-2 rounded-xs border-2 border-ink shadow-brutalist-sm transition-shadow ${book.color.pastel} ${book.height} ${book.width}`}
                      >
                        {/* Gold Foil Top Spine Line */}
                        <div className="w-full h-1 bg-amber-400/80 border-b border-black/20 rounded-xs mb-1" />

                        {/* Pixel Icon on Spine */}
                        <div className="flex flex-col items-center gap-1 mt-1">
                          <div className={`p-1 rounded-xs bg-white/80 dark:bg-black/30 border border-ink/30 shadow-xs ${book.color.badgeText}`}>
                            <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <span className="font-mono text-[8px] font-bold text-ink/70">#{book.number}</span>
                        </div>

                        {/* Vertical Printed Title on Spine */}
                        <div className="my-auto flex items-center justify-center py-2">
                          <span
                            className="font-pixel text-[10px] sm:text-xs font-bold tracking-widest text-ink uppercase whitespace-nowrap"
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            {book.spineTitle}
                          </span>
                        </div>

                        {/* Gold Foil Bottom Spine Line */}
                        <div className="w-full h-1 bg-amber-400/80 border-t border-black/20 rounded-xs mt-1" />

                        {/* Bookmark Ribbon Hanging from Bottom Spine */}
                        <motion.div
                          animate={{ rotate: isHovered ? [-4, 4, -4] : 0 }}
                          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                          className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-2.5 h-6 ${book.color.ribbon} border-x border-b border-ink/40 shadow-xs rounded-b-xs z-20`}
                        />

                        {/* Floating Dust Particles on Hover */}
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: [0.8, 0], y: -25 }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Shelf Footer Note */}
            <div className="flex items-center justify-between mt-3 text-xs font-mono opacity-70 px-1">
              <span className="flex items-center gap-1.5 text-ink dark:text-gray-300">
                <BookOpen className="w-3.5 h-3.5 text-accent-coral" />
                10 HANDCRAFTED BOOKS IN LIBRARY
              </span>
              <span className="text-ink dark:text-gray-400">CLICK ANY BOOK TO OPEN 📖</span>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING OPEN BOOK MODAL (THE 2-PAGE DESIGN JOURNAL SPREAD) */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                sound.playClick();
                setSelectedBook(null);
              }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-0"
            />

            {/* Floating Open Hardcover Book Spread Container */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotateY: -25, y: 40 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotateY: 25, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative z-10 w-full max-w-5xl bg-[#3D210B] p-2 sm:p-4 rounded-xs border-4 border-ink shadow-2xl overflow-hidden my-auto"
            >
              {/* Close Button (X) */}
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedBook(null);
                }}
                className="absolute top-4 right-4 z-30 p-2 bg-accent-coral text-white border-2 border-ink rounded-xs shadow-brutalist hover:bg-rose-600 transition-colors"
                title="Close Book (ESC)"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Book Controls */}
              <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
                <button
                  onClick={() => navigateBook('prev')}
                  className="p-1.5 bg-white dark:bg-canvas-dark-paper text-ink dark:text-white border-2 border-ink rounded-xs shadow-brutalist-sm hover:bg-accent-acid hover:text-ink transition-colors flex items-center gap-1 font-mono text-xs font-bold"
                >
                  <ChevronLeft className="w-4 h-4" /> PREV BOOK
                </button>
                <button
                  onClick={() => navigateBook('next')}
                  className="p-1.5 bg-white dark:bg-canvas-dark-paper text-ink dark:text-white border-2 border-ink rounded-xs shadow-brutalist-sm hover:bg-accent-acid hover:text-ink transition-colors flex items-center gap-1 font-mono text-xs font-bold"
                >
                  NEXT BOOK <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 2-PAGE SPREAD CONTENT BOX (Authentic Paper Journal Spread) */}
              <div className="grid grid-cols-1 md:grid-cols-2 bg-[#FBF9F5] text-[#0E0E11] border-2 border-[#1E1007] rounded-xs shadow-inner relative overflow-hidden mt-12 md:mt-0">
                
                {/* Center Book Spine Fold Shadow */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/15 via-black/5 to-black/15 pointer-events-none z-20" />

                {/* LEFT PAGE */}
                <div className="p-6 sm:p-8 border-b-2 md:border-b-0 md:border-r-2 border-slate-300 flex flex-col justify-between relative bg-paper-grain">
                  <div>
                    {/* Category & Book Number Header */}
                    <div className="flex items-center justify-between mb-4">
                      {(() => {
                        const BookIcon = selectedBook.icon;
                        return (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xs font-pixel text-xs font-bold border border-slate-900/20 shadow-xs ${selectedBook.color.badgeBg} ${selectedBook.color.badgeText}`}>
                            <BookIcon className="w-3.5 h-3.5" />
                            {selectedBook.category.toUpperCase()}
                          </span>
                        );
                      })()}
                      <span className="font-mono text-xs text-slate-600 font-bold">
                        VOL. 2026 // BOOK #{selectedBook.number}
                      </span>
                    </div>

                    {/* Question Title */}
                    <h3 className="font-pixel text-2xl sm:text-3xl font-extrabold text-[#0E0E11] leading-tight mb-4">
                      {selectedBook.question}
                    </h3>

                    {/* Short Explanation */}
                    <p className="font-sans text-base text-slate-800 leading-relaxed mb-6 font-medium">
                      {selectedBook.explanation}
                    </p>

                    {/* Highlights / Blueprint List */}
                    <div className="space-y-2.5 mb-6">
                      <h4 className="font-pixel text-xs uppercase font-bold tracking-wider text-slate-600 mb-2">
                        KEY BLUEPRINT HIGHLIGHTS:
                      </h4>
                      {selectedBook.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-mono text-xs sm:text-sm text-slate-900 font-semibold">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Left Page Footer */}
                  <div className="pt-4 border-t border-slate-300 flex justify-between items-center text-[10px] font-mono text-slate-500 font-bold">
                    <span>DETQEL KNOWLEDGE LIBRARY</span>
                    <span>PAGE 01</span>
                  </div>
                </div>

                {/* RIGHT PAGE */}
                <div className="p-6 sm:p-8 flex flex-col justify-between relative bg-paper-grain">
                  <div>
                    {/* Pro Tips Box */}
                    <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-xs shadow-sticky mb-6 relative">
                      <div className="tape-sticker tape-sticker-yellow w-14 h-4 -top-2 left-6 rounded-xs" />
                      <div className="flex items-center gap-2 mb-1 text-amber-900 font-pixel text-xs font-bold">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        STUDIO PRO TIP
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-amber-950 font-medium leading-normal">
                        {selectedBook.tip}
                      </p>
                    </div>

                    {/* Related Services */}
                    <div className="mb-6">
                      <h4 className="font-pixel text-xs uppercase font-bold tracking-wider text-slate-600 mb-2.5">
                        RELATED SERVICES & CAPABILITIES:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBook.relatedServices.map((service, i) => (
                          <span
                            key={i}
                            className="bg-white border-2 border-slate-900 text-slate-900 px-2.5 py-1 rounded-xs font-mono text-xs font-bold shadow-brutalist-sm"
                          >
                            ⚡ {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Call to Action Box */}
                    <div className="bg-white border-2 border-slate-900 p-4 rounded-xs shadow-brutalist">
                      <h4 className="font-pixel text-sm font-bold text-slate-900 mb-1">
                        Ready to take the next step?
                      </h4>
                      <p className="font-sans text-xs text-slate-700 font-medium mb-3">
                        Let's turn your ideas into a high-impact digital experience.
                      </p>
                      <a
                        href="#contact"
                        onClick={() => {
                          sound.playSuccess();
                          setSelectedBook(null);
                        }}
                        className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-accent-coral px-4 py-2 font-pixel text-xs font-bold border-2 border-slate-900 rounded-xs shadow-brutalist-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                      >
                        LET'S BUILD TOGETHER <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Right Page Footer */}
                  <div className="pt-4 border-t border-slate-300 flex justify-between items-center text-[10px] font-mono text-slate-500 font-bold mt-6">
                    <span>HANDCRAFTED FOR CREATIVE EXCELLENCE</span>
                    <span>PAGE 02</span>
                  </div>

                  {/* Hanging Bookmark Ribbon Trailing off Right Page */}
                  <div className={`absolute bottom-0 right-8 w-4 h-12 ${selectedBook.color.ribbon} border-x border-b border-ink/40 shadow-md rounded-b-xs pointer-events-none`} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default KnowledgeLibraryFAQ;
