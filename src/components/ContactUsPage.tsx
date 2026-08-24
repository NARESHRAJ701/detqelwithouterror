import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Clock,
  Mail,
  Phone,
  MapPin,
  Headphones,
  FileText,
  Code,
  Rocket,
  ArrowRight,
  Check,
  Printer,
  Bot,
  Lightbulb,
  Building,
  User,
  ChevronDown,
  FolderOpen
} from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';

export interface ContactFormState {
  fullName: string;
  email: string;
  company: string;
  details: string;
  budget: string;
  timeline: string;
  source: string;
}

export const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    fullName: 'Naresh Raj',
    email: 'detqel@gmail.com',
    company: 'Detqel Studio',
    details: 'We want to build an AI-powered platform that helps businesses automate their workflows and communication...',
    budget: '₹5L - ₹15L',
    timeline: '2 - 3 Months',
    source: 'Google Search'
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'printed'>('idle');
  const [ticketId, setTicketId] = useState('#DETQEL-2025-0487');
  const [ticketTimestamp, setTicketTimestamp] = useState('10:30 AM');
  const [ticketDate, setTicketDate] = useState('2025-08-05');
  const [deskLampOn, setDeskLampOn] = useState(true);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [robotState, setRobotState] = useState<'idle' | 'blinking' | 'celebrating'>('idle');
  const [currentTime, setCurrentTime] = useState('10:30 AM');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeBookIndex, setActiveBookIndex] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(0);
  const [requestsCount, setRequestsCount] = useState(7);
  const [activeDrawer, setActiveDrawer] = useState<number | null>(0);

  // Quotes Array for Coffee Mug
  const COFFEE_QUOTES = [
    "\"Good design is as little design as possible.\" - Dieter Rams",
    "\"Simplicity is the ultimate sophistication.\" - Leonardo da Vinci",
    "\"Design is not just what it looks like. Design is how it works.\" - Steve Jobs",
    "\"Make it simple, but significant.\" - Don Draper"
  ];

  // Robot AI Fun Facts
  const ROBOT_FACTS = [
    "Did you know? DETQEL streams RAG search vectors under 200ms latency!",
    "Fun fact: 95% of our web apps achieve 98+ Lighthouse performance scores out of the box.",
    "AI Pro-tip: Custom fine-tuned models outperform generic LLM prompts by 4x in workflow accuracy!"
  ];

  // Filing Cabinet FAQ Items
  const FILING_DRAWERS = [
    {
      id: 0,
      title: 'SERVICES & SCOPE',
      items: [
        {
          q: 'What core services does Detqel provide?',
          a: 'Detqel is a hybrid digital studio engineering AI applications, high-performance web apps, brutalist design systems, WebGL graphics, and automated business workflows.'
        },
        {
          q: 'Can we hire Detqel for a single design sprint?',
          a: 'Yes! We offer 1-to-2 week rapid sprint packages as well as ongoing dedicated studio retainers.'
        }
      ]
    },
    {
      id: 1,
      title: 'PRICING & RETAINERS',
      items: [
        {
          q: 'How are projects priced?',
          a: 'We operate on transparent fixed-scope milestone packages (starting at $2.5k / ₹2.5L) or monthly dedicated studio retainers with zero hidden fees.'
        },
        {
          q: 'What are the payment terms?',
          a: 'Standard terms are 50% upfront at discovery kick-off and 50% upon final staging approval and production handoff.'
        }
      ]
    },
    {
      id: 2,
      title: 'AI & ENGINEERING',
      items: [
        {
          q: 'How do you ensure data privacy for custom AI models?',
          a: 'We deploy local vector databases (Pinecone / ChromaDB) and encrypted RAG pipelines so your proprietary data never leaks.'
        },
        {
          q: 'What is your tech stack?',
          a: 'React 18, TypeScript, Next.js 14, Tailwind CSS, Framer Motion, Three.js, Python, OpenAI / Anthropic APIs, and n8n.'
        }
      ]
    },
    {
      id: 3,
      title: 'TIMELINE & SUPPORT',
      items: [
        {
          q: 'How long does a typical build take?',
          a: 'Most full-stack projects range between 2 to 6 weeks. We deliver tangible working code previews every Friday.'
        },
        {
          q: 'What post-launch support is included?',
          a: 'Every project includes 30 days of complimentary warranty support, security updates, and video team guides.'
        }
      ]
    }
  ];

  // Live Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const mins = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const hoursStr = String(hours).padStart(2, '0');
      setCurrentTime(`${hoursStr}:${mins} ${ampm}`);
      
      const yr = now.getFullYear();
      const mo = String(now.getMonth() + 1).padStart(2, '0');
      const da = String(now.getDate()).padStart(2, '0');
      setTicketDate(`${yr}-${mo}-${da}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Robot Random Blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setRobotState(prev => (prev === 'idle' ? 'blinking' : prev));
      setTimeout(() => {
        setRobotState(prev => (prev === 'blinking' ? 'idle' : prev));
      }, 300);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleInputChange = (field: keyof ContactFormState, value: any, keyName?: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (keyName) {
      setActiveKey(keyName.toUpperCase());
      sound.playClick();
      setTimeout(() => setActiveKey(null), 120);
    }
  };

  const executePrintSequence = () => {
    sound.playPrinterSound();
    setFormStatus('submitting');
    setRobotMessage("Printing POS project bill receipt...");

    const generatedTicket = `#DETQEL-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedTicket);
    setTicketTimestamp(currentTime);

    setTimeout(() => {
      sound.playProjectorOn();
      setFormStatus('printed');
      setRequestsCount(prev => prev + 1);
      setRobotState('celebrating');

      sound.playSuccess();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#FF5533', '#2563EB', '#A7F3D0']
      });

      setTimeout(() => {
        setRobotState('idle');
        setRobotMessage("Receipt Printed & Filed! Reply in 24h 🚀");
      }, 3500);
    }, 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.details) {
      alert("Please fill in your name, email, and project details.");
      return;
    }
    executePrintSequence();
  };

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText('detqel@gmail.com');
    setCopiedEmail(true);
    confetti({ particleCount: 40, spread: 40, origin: { y: 0.8 } });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    sound.playSuccess();
    navigator.clipboard.writeText('+91 95609 13212');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const toggleDeskLamp = () => {
    sound.playClick();
    setDeskLampOn(!deskLampOn);
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'SPACE', 'ENTER']
  ];

  return (
    <div className="min-h-screen bg-graph-paper text-ink dark:text-white pt-24 pb-16 px-4 sm:px-8 font-sans select-none relative overflow-hidden transition-colors duration-300">
      
      {/* Ambient Desk Lamp Light Beam Overlay */}
      {deskLampOn && (
        <div className="absolute top-0 left-1/4 w-[700px] h-[850px] bg-gradient-to-b from-amber-200/25 via-amber-100/10 to-transparent blur-3xl pointer-events-none z-10 transition-opacity duration-500" />
      )}

      {/* MAIN WORKSTATION CANVAS CONTAINER */}
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* TOP WALL STICKY NOTES, SPEECH BUBBLE & SHELF */}
        <div className="relative mb-8 hidden md:block h-16">
          
          {/* Top-Left Lamp Toggle Switch */}
          <button
            onClick={toggleDeskLamp}
            className="absolute top-0 left-0 p-2 bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-xs shadow-brutalist hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors z-30 flex items-center gap-1.5 font-pixel text-xs font-bold"
            title="Toggle Ambient Lamp Light"
          >
            <Lightbulb className={`w-4 h-4 ${deskLampOn ? 'text-amber-500 fill-amber-400' : 'text-gray-400'}`} />
            <span>LAMP {deskLampOn ? 'ON 💡' : 'OFF 🌙'}</span>
          </button>

          {/* Sticky Note 1: Purple note top left center */}
          <motion.div
            drag
            dragConstraints={{ left: -20, right: 20, top: -10, bottom: 10 }}
            className="absolute top-0 left-[320px] bg-[#E2D5FF] text-ink p-3 rounded-xs shadow-sticky border border-purple-300 font-handwriting text-xl font-bold -rotate-6 z-20 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
          >
            <div className="tape-sticker w-10 h-3.5 -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
            Great ideas start with a message :-)
          </motion.div>

          {/* Pixel Speech Bubble Center: GOOD IDEAS DESERVE GREAT BUILDERS. */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-white dark:bg-canvas-dark-paper text-ink dark:text-white border-2 border-ink px-4 py-2 rounded-xs shadow-brutalist font-pixel text-xs font-bold uppercase tracking-wider z-20 flex items-center justify-center">
            GOOD IDEAS DESERVE GREAT BUILDERS.
          </div>

          {/* Sticky Note 2: Yellow note top right center */}
          <motion.div
            drag
            dragConstraints={{ left: -20, right: 20, top: -10, bottom: 10 }}
            className="absolute top-0 right-[340px] bg-[#FFF066] text-ink p-3 rounded-xs shadow-sticky border border-amber-300 font-handwriting text-xl font-bold rotate-4 z-20 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
          >
            <div className="tape-sticker tape-sticker-yellow w-10 h-3.5 -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
            Think Innovate Craft
          </motion.div>

          {/* Sticky Note 3: Pink note top far right */}
          <motion.div
            drag
            dragConstraints={{ left: -20, right: 20, top: -10, bottom: 10 }}
            className="absolute top-1 right-[60px] bg-[#FFC2E2] text-ink p-3 rounded-xs shadow-sticky border border-pink-300 font-handwriting text-base font-bold -rotate-3 z-20 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform max-w-[200px]"
          >
            <div className="tape-sticker w-10 h-3.5 -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
            We can't wait to hear your next big idea! ♡
          </motion.div>

          {/* Potted Green Plant on Shelf Top Right */}
          <div className="absolute -top-6 right-0 flex flex-col items-center">
            <div className="w-10 h-14 relative flex flex-col items-center justify-end">
              <div className="w-8 h-8 text-emerald-600 font-bold text-2xl animate-pulse">🪴</div>
              <div className="w-8 h-6 bg-amber-700 border-2 border-ink rounded-b-md shadow-sm" />
            </div>
            <div className="w-20 h-1.5 bg-[#4A2C11] border border-ink rounded-xs" />
          </div>
        </div>

        {/* HERO SECTION GRID (LEFT EDITORIAL HEADLINE + COMPUTER MONITOR & THERMAL PRINTER WORKSTATION) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT COLUMN: Editorial Headline & Desk Props */}
          <div className="lg:col-span-4 pt-2">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-white dark:bg-canvas-dark-paper border border-ink/20 px-3 py-1 rounded-xs shadow-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-ping" />
              <span className="font-pixel text-xs font-bold uppercase tracking-wider text-ink dark:text-gray-200">
                // CONTACT US
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-pixel text-5xl sm:text-6xl font-black text-ink dark:text-white tracking-tight leading-[0.98] mb-4">
              LET'S<br />
              <span className="text-[#8B5CF6]">BUILD</span><br />
              SOMETHING<br />
              AMAZING<span className="text-accent-coral">.</span>
            </h1>

            {/* Paragraph */}
            <p className="font-sans text-sm sm:text-base text-ink/80 dark:text-gray-300 leading-relaxed max-w-sm mb-6 font-medium">
              Tell us about your idea and we'll turn it into an unforgettable digital experience.
            </p>

            {/* Green Scribble Note & Arrow */}
            <div className="relative inline-block mb-8">
              <div className="font-handwriting text-2xl text-[#8B5CF6] dark:text-accent-acid font-bold -rotate-2 flex items-center gap-2">
                <span>Fill the form, we'll take it from here!</span>
                <span className="animate-bounce">→</span>
              </div>
              <svg className="w-24 h-8 text-[#8B5CF6] dark:text-accent-acid ml-12 -mt-1 hidden sm:block" viewBox="0 0 100 30" fill="none">
                <path d="M5 5 C30 20, 70 25, 92 15" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
                <path d="M85 8 L95 15 L87 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Desk Props: Stationery Holder & Stacked Books */}
            <div className="flex items-end gap-3 mt-2">
              
              {/* Stationery Holder & Pencil Box */}
              <div className="w-14 h-16 bg-[#1F1D2B] border-2 border-ink rounded-b-xs p-1 relative flex items-end justify-center shadow-brutalist-sm">
                <div className="absolute -top-6 flex items-end gap-1">
                  <div className="w-2 h-10 bg-amber-400 border border-ink rounded-t-xs" />
                  <div className="w-2 h-12 bg-sky-400 border border-ink rounded-t-xs" />
                  <div className="w-2 h-8 bg-rose-400 border border-ink rounded-t-xs" />
                  <div className="w-2 h-11 bg-emerald-400 border border-ink rounded-t-xs" />
                </div>
                {/* DETQEL Black Block with Pink Heart */}
                <div className="w-7 h-7 rounded-xs bg-[#121118] border border-ink flex items-center justify-center">
                  <span className="text-pink-500 font-bold text-xs">♥</span>
                </div>
              </div>

              {/* Stack of 4 Horizontal Books on Desk */}
              <div className="flex flex-col gap-1 w-44">
                {[
                  { name: 'BRANDING', color: 'bg-emerald-400 text-ink' },
                  { name: 'UI/UX DESIGN', color: 'bg-blue-400 text-ink' },
                  { name: 'DEVELOPMENT', color: 'bg-purple-400 text-ink' },
                  { name: 'AI SOLUTIONS', color: 'bg-amber-400 text-ink' }
                ].map((b, idx) => (
                  <motion.div
                    key={b.name}
                    onMouseEnter={() => {
                      setActiveBookIndex(idx);
                      sound.playHover();
                    }}
                    onMouseLeave={() => setActiveBookIndex(null)}
                    animate={{ x: activeBookIndex === idx ? 8 : 0 }}
                    className={`px-3 py-1 rounded-xs border-2 border-ink font-pixel text-[10px] font-bold shadow-brutalist-sm cursor-pointer ${b.color} flex justify-between items-center`}
                  >
                    <span>{b.name}</span>
                    <span className="font-mono text-[8px] opacity-70">VOL.0{idx + 1}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT & CENTER COLUMN: DESKTOP COMPUTER MONITOR & THERMAL PRINTER */}
          <div className="lg:col-span-8 flex flex-col items-center">
            
            {/* 3D DESK SURFACE */}
            <div className="relative w-full p-4 sm:p-6 bg-[#EFECE6] dark:bg-[#1A1824] border-4 border-ink rounded-md shadow-brutalist overflow-hidden">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end relative z-10">
                
                {/* CENTER MONITOR & FORM (Col 8) */}
                <div className="lg:col-span-8 flex flex-col items-center">
                  
                  {/* REALISTIC COMPUTER MONITOR CASING */}
                  <div className="w-full bg-[#242232] border-[5px] border-[#161522] rounded-t-xl rounded-b-md p-3 shadow-2xl relative">
                    
                    {/* Top Monitor Bezel: Webcam HD & LED Indicator */}
                    <div className="flex items-center justify-between px-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-black border border-white/30 flex items-center justify-center">
                          <div className="w-0.5 h-0.5 rounded-full bg-sky-400" />
                        </div>
                        <span className="font-pixel text-[7px] text-gray-400 uppercase tracking-widest">WEBCAM HD</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                        <span className="font-pixel text-[8px] text-[#8B5CF6] uppercase">LIVE</span>
                      </div>
                    </div>

                    {/* BROWSER WINDOW INSIDE COMPUTER DISPLAY */}
                    <div className="w-full bg-[#FAF8F3] dark:bg-[#15141E] border-2 border-ink rounded-xs overflow-hidden relative shadow-inner">
                      
                      {/* Window Header */}
                      <div className="bg-[#1C1A28] text-white px-3 py-1.5 flex items-center justify-between border-b-2 border-ink">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-black/40" />
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-black/40" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black/40" />
                          <span className="font-mono text-xs font-bold text-gray-300 ml-2">
                            new_message.detqel ⚡
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                          <span className="font-pixel text-[9px] text-[#8B5CF6] uppercase font-bold">PROJECT DETAILS</span>
                        </div>
                      </div>

                      {/* FORM BODY INSIDE MONITOR */}
                      <form onSubmit={handleSubmit} className="p-3.5 sm:p-4 space-y-3">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          
                          {/* Left Column Inputs */}
                          <div className="space-y-2.5">
                            <div>
                              <label className="font-pixel text-[9px] font-bold uppercase block mb-1 text-ink dark:text-gray-200">
                                Your Name
                              </label>
                              <div className="relative">
                                <User className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink/40 dark:text-gray-400" />
                                <input
                                  type="text"
                                  required
                                  value={formData.fullName}
                                  onKeyDown={(e) => handleInputChange('fullName', formData.fullName, e.key)}
                                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                                  placeholder="Naresh Raj"
                                  className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white pl-7 pr-2 py-1 text-xs rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] font-sans font-medium"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="font-pixel text-[9px] font-bold uppercase block mb-1 text-ink dark:text-gray-200">
                                Email Address
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink/40 dark:text-gray-400" />
                                <input
                                  type="email"
                                  required
                                  value={formData.email}
                                  onKeyDown={(e) => handleInputChange('email', formData.email, e.key)}
                                  onChange={(e) => handleInputChange('email', e.target.value)}
                                  placeholder="detqel@gmail.com"
                                  className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white pl-7 pr-2 py-1 text-xs rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] font-sans font-medium"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="font-pixel text-[9px] font-bold uppercase block mb-1 text-ink dark:text-gray-200">
                                Company / Brand
                              </label>
                              <div className="relative">
                                <Building className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink/40 dark:text-gray-400" />
                                <input
                                  type="text"
                                  value={formData.company}
                                  onKeyDown={(e) => handleInputChange('company', formData.company, e.key)}
                                  onChange={(e) => handleInputChange('company', e.target.value)}
                                  placeholder="Detqel Studio"
                                  className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white pl-7 pr-2 py-1 text-xs rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] font-sans font-medium"
                                />
                              </div>
                            </div>

                            {/* Dropdowns row */}
                            <div className="grid grid-cols-3 gap-1.5">
                              <div>
                                <label className="font-pixel text-[8px] font-bold uppercase block mb-0.5 text-ink dark:text-gray-200 truncate">
                                  Budget Range
                                </label>
                                <div className="relative">
                                  <select
                                    value={formData.budget}
                                    onChange={(e) => handleInputChange('budget', e.target.value)}
                                    className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white px-1.5 py-1 text-[10px] rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] font-sans font-medium appearance-none"
                                  >
                                    <option value="₹5L - ₹15L">₹5L - ₹15L</option>
                                    <option value="₹15L - ₹30L">₹15L - ₹30L</option>
                                    <option value="₹30L - ₹50L">₹30L - ₹50L</option>
                                    <option value="₹50L+">₹50L+</option>
                                  </select>
                                  <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-ink/50" />
                                </div>
                              </div>

                              <div>
                                <label className="font-pixel text-[8px] font-bold uppercase block mb-0.5 text-ink dark:text-gray-200 truncate">
                                  Timeline
                                </label>
                                <div className="relative">
                                  <select
                                    value={formData.timeline}
                                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                                    className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white px-1.5 py-1 text-[10px] rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] font-sans font-medium appearance-none"
                                  >
                                    <option value="2 - 3 Months">2 - 3 Months</option>
                                    <option value="1 - 2 Sprints">1 - 2 Sprints</option>
                                    <option value="Ongoing">Ongoing</option>
                                  </select>
                                  <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-ink/50" />
                                </div>
                              </div>

                              <div>
                                <label className="font-pixel text-[8px] font-bold uppercase block mb-0.5 text-ink dark:text-gray-200 truncate">
                                  How did you find us?
                                </label>
                                <div className="relative">
                                  <select
                                    value={formData.source}
                                    onChange={(e) => handleInputChange('source', e.target.value)}
                                    className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white px-1.5 py-1 text-[10px] rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] font-sans font-medium appearance-none"
                                  >
                                    <option value="Google Search">Google Search</option>
                                    <option value="Twitter / X">Twitter / X</option>
                                    <option value="Awwwards">Awwwards</option>
                                    <option value="Referral">Referral</option>
                                  </select>
                                  <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-ink/50" />
                                </div>
                              </div>
                            </div>

                          </div>

                          {/* Right Column Textarea */}
                          <div className="flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <label className="font-pixel text-[9px] font-bold uppercase text-ink dark:text-gray-200">
                                  Tell us about your idea
                                </label>
                                <span className="font-mono text-[9px] opacity-60">
                                  {formData.details.length}/500
                                </span>
                              </div>
                              <textarea
                                required
                                maxLength={500}
                                rows={8}
                                value={formData.details}
                                onKeyDown={(e) => handleInputChange('details', formData.details, e.key)}
                                onChange={(e) => handleInputChange('details', e.target.value)}
                                placeholder="We want to build an AI-powered platform that helps businesses automate their workflows and communication..."
                                className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white p-2 text-xs rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] font-sans font-medium resize-none"
                              />
                            </div>
                          </div>

                        </div>

                        {/* Full Width Neon-Green Submit Button */}
                        <button
                          type="submit"
                          disabled={formStatus === 'submitting'}
                          onMouseEnter={() => triggerCursor('SUBMIT', 'hover')}
                          onMouseLeave={() => triggerCursor('', 'default')}
                          className="w-full py-2.5 bg-[#10b981] text-ink border-2 border-ink rounded-xs font-pixel text-xs sm:text-sm font-black shadow-brutalist hover:bg-accent-coral hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
                        >
                          {formStatus === 'submitting' ? (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-ink border-t-transparent animate-spin" />
                              PRINTING BILL RECEIPT...
                            </>
                          ) : (
                            <>
                              SEND PROJECT REQUEST <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </form>

                    </div>

                    {/* Lower Monitor Bezel: Brand Title & Buttons */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10 px-2">
                      <span className="font-pixel text-[9px] font-bold text-gray-300 tracking-widest">
                        DETQEL STUDIO
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-600 border border-black shadow-inner" />
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-600 border border-black shadow-inner" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] border border-black shadow-inner" />
                      </div>
                    </div>

                  </div>

                  {/* MONITOR STAND & NECK */}
                  <div className="w-20 h-6 bg-gradient-to-b from-[#2a273a] to-[#171622] border-x-2 border-ink shadow-md" />
                  <div className="w-44 h-3 bg-gradient-to-b from-[#3a3650] to-[#1d1b29] border-2 border-ink rounded-xs shadow-lg mb-2" />

                  {/* DESK MAT WITH KEYBOARD, MOUSE & ROBOT MASCOT */}
                  <div className="w-full mt-1 p-2 bg-[#2E2A3E] border-2 border-ink rounded-xs shadow-brutalist-sm flex items-center justify-between gap-2 relative">
                    
                    {/* Robot Mascot sitting on left of desk mat */}
                    <div className="relative flex flex-col items-center">
                      <div className="bg-white dark:bg-canvas-dark-paper border border-ink px-1.5 py-0.5 rounded-xs shadow-xs font-pixel text-[7px] font-bold mb-1 text-center max-w-[130px]">
                        {robotMessage}
                      </div>

                      <motion.div
                        animate={
                          robotState === 'celebrating'
                            ? { y: [0, -10, 0], rotate: [0, 10, -10, 0] }
                            : { y: [0, -2, 0] }
                        }
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="bg-[#8B5CF6] border-2 border-ink p-1 rounded-xs shadow-xs text-center cursor-pointer flex flex-col items-center"
                        onClick={() => {
                          sound.playSuccess();
                          const fact = ROBOT_FACTS[Math.floor(Math.random() * ROBOT_FACTS.length)];
                          setRobotMessage(fact);
                        }}
                      >
                        <Bot className="w-5 h-5 text-ink" />
                        <span className="font-pixel text-[6px] font-black text-ink block">ROBO-DETQEL</span>
                      </motion.div>
                    </div>

                    {/* Vintage Mechanical Keyboard Pad */}
                    <div className="flex-1 p-1.5 bg-[#1F1D2B] border border-ink rounded-xs shadow-inner">
                      <div className="flex flex-col gap-0.5 items-center">
                        {keyboardRows.map((row, rIdx) => (
                          <div key={rIdx} className="flex gap-0.5">
                            {row.map((key) => {
                              const isPressed = activeKey === key || (key === 'SPACE' && activeKey === ' ');
                              return (
                                <div
                                  key={key}
                                  className={`px-1 py-0.5 rounded-[2px] font-mono text-[7px] font-bold border transition-all ${
                                    isPressed
                                      ? 'bg-[#8B5CF6] text-ink translate-y-0.5 shadow-none'
                                      : 'bg-[#15141E] text-gray-300 border-black/40 shadow-[0_1.5px_0_#000]'
                                  } ${key === 'SPACE' ? 'w-16 text-center' : key === 'ENTER' ? 'w-8 text-center' : 'w-3.5 sm:w-4 text-center'}`}
                                >
                                  {key}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vintage Mouse */}
                    <div className="w-7 h-12 bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-t-full rounded-b-md shadow-xs relative flex flex-col items-center justify-start pt-1.5">
                      <div className="w-1 h-2.5 bg-ink/40 rounded-full" />
                    </div>

                  </div>

                </div>

                {/* RIGHT HARDWARE POS THERMAL PRINTER & ACCESSORIES (Col 4) */}
                <div className="lg:col-span-4 flex flex-col items-center justify-end space-y-3">
                  
                  {/* REAL POS THERMAL PRINTER CHASSIS */}
                  <div className="w-full bg-gradient-to-b from-[#343144] via-[#242232] to-[#181724] border-4 border-ink p-3.5 rounded-sm shadow-2xl relative">
                    
                    {/* Metal Top Screw Accents */}
                    <div className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-gray-500 border border-black shadow-inner" />
                    <div className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-gray-500 border border-black shadow-inner" />

                    {/* Printer Brand & Status LED Bar */}
                    <div className="flex items-center justify-between border-b-2 border-white/10 pb-1.5 mb-2">
                      <span className="font-pixel text-[9px] font-black text-gray-200 uppercase tracking-widest flex items-center gap-1.5">
                        <Printer className="w-4 h-4 text-[#8B5CF6]" />
                        DETQEL PRINTER v1.0
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${formStatus === 'submitting' ? 'bg-amber-400 animate-ping' : 'bg-[#8B5CF6]'}`} />
                          <span className="font-pixel text-[7px] text-gray-300">PWR</span>
                        </div>
                        
                        {/* Feed Button */}
                        <button
                          onClick={executePrintSequence}
                          className="px-1.5 py-0.5 bg-gray-700 hover:bg-[#10b981] hover:text-ink text-gray-200 border border-black font-pixel text-[7px] font-bold rounded-[2px] transition-colors"
                          title="Manual Receipt Feed"
                        >
                          FEED 🧾
                        </button>
                      </div>
                    </div>

                    {/* LCD Matrix Display */}
                    <div className="bg-[#0A0910] text-[#8B5CF6] p-2 rounded-xs border-2 border-black font-mono text-[9px] flex items-center justify-between mb-2 shadow-inner">
                      <div>
                        {formStatus === 'idle'
                          ? 'STANDBY // READY'
                          : formStatus === 'submitting'
                          ? 'PRINTING... BUSY [||||||]'
                          : `FILED #${ticketId}`}
                      </div>
                      <span className={formStatus === 'submitting' ? 'animate-spin' : ''}>
                        {formStatus === 'submitting' ? '⚙️' : 'READY'}
                      </span>
                    </div>

                    {/* PRINTER FEED SLOT CUTTER TEETH */}
                    <div className="w-full h-3 bg-[#121118] border-2 border-black rounded-xs mb-1 relative overflow-hidden flex items-center justify-between px-1">
                      <div className="w-full h-1 bg-black/60 shadow-inner" />
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 border-t border-black" />
                    </div>

                    {/* REAL THERMAL BILL RECEIPT ROLLING DOWN */}
                    <AnimatePresence>
                      {formStatus !== 'idle' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          className="w-full bg-[#FAF8F0] text-ink p-3.5 shadow-2xl font-mono text-[9.5px] leading-tight serrated-edge-both border-x-2 border-gray-300 relative overflow-hidden origin-top my-1"
                        >
                          {/* Thermal Paper Background Texture & Vignette */}
                          <div className="absolute inset-0 paper-grain pointer-events-none opacity-20" />

                          {/* Store Bill Receipt Header */}
                          <div className="text-center font-mono text-[8.5px] space-y-0.5 mb-2 border-b border-dashed border-black/30 pb-1.5">
                            <div className="font-pixel text-xs font-black text-ink uppercase tracking-wider">
                              DETQEL STUDIO INC.
                            </div>
                            <div className="text-[7.5px] opacity-80">
                              CREATIVE TECHNOLOGY LABS
                            </div>
                            <div className="text-[7.5px] opacity-70">
                              TEL: +91 95609 13212 | DETQEL@GMAIL.COM
                            </div>
                            <div className="text-[7px] font-bold text-ink/70 mt-1">
                              ==================================
                            </div>
                          </div>

                          {/* Receipt Meta Details */}
                          <div className="space-y-1 text-[8.5px] border-b border-dashed border-black/30 pb-2 mb-2">
                            <div className="flex justify-between">
                              <span><strong>DATE:</strong> {ticketDate}</span>
                              <span><strong>TIME:</strong> {ticketTimestamp}</span>
                            </div>
                            <div className="flex justify-between">
                              <span><strong>TICKET #:</strong></span>
                              <span className="font-bold text-[#8B5CF6] dark:text-emerald-700">{ticketId}</span>
                            </div>
                            <div><strong>CLIENT:</strong> {formData.fullName}</div>
                            <div><strong>EMAIL:</strong> {formData.email}</div>
                            <div><strong>COMPANY:</strong> {formData.company || 'Studio Client'}</div>
                          </div>

                          {/* Bill Line Items Table */}
                          <div className="space-y-1 text-[8px] border-b border-dashed border-black/30 pb-2 mb-2">
                            <div className="flex justify-between font-bold border-b border-black/20 pb-0.5">
                              <span>ITEM / SERVICE</span>
                              <span>QTY</span>
                              <span>BUDGET</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="truncate max-w-[120px]">FULL-STACK BUILD</span>
                              <span>1.0</span>
                              <span>{formData.budget}</span>
                            </div>

                            <div className="flex justify-between">
                              <span>TIMELINE</span>
                              <span>EST</span>
                              <span>{formData.timeline}</span>
                            </div>

                            <div className="flex justify-between">
                              <span>DISCOVERY CHANNEL</span>
                              <span>SRC</span>
                              <span>{formData.source}</span>
                            </div>
                          </div>

                          {/* Bill Pricing Breakdown */}
                          <div className="space-y-0.5 text-[8.5px] border-b border-dashed border-black/30 pb-2 mb-2">
                            <div className="flex justify-between">
                              <span>SUBTOTAL:</span>
                              <span>$ 0.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>ESTIMATED TAX (0%):</span>
                              <span>$ 0.00</span>
                            </div>
                            <div className="flex justify-between font-bold text-[9.5px] pt-1">
                              <span>TOTAL ESTIMATE:</span>
                              <span>Priceless</span>
                            </div>
                          </div>

                          {/* GREEN APPROVAL STAMP */}
                          <div className="absolute bottom-12 right-2 w-20 h-10 border-2 border-emerald-600 text-emerald-700 rounded-xs flex flex-col items-center justify-center rotate-[-12deg] bg-emerald-50/80 p-0.5 shadow-sm pointer-events-none">
                            <span className="font-pixel text-[8px] font-black uppercase tracking-wider">RECEIVED</span>
                            <span className="font-mono text-[7px] font-bold">✓ APPROVED</span>
                          </div>

                          {/* Barcode & QR Code Footer */}
                          <div className="flex flex-col items-center justify-center space-y-1 pt-1">
                            {/* Barcode Lines */}
                            <div className="flex items-center justify-center gap-0.5 h-6 w-full opacity-80">
                              {[3,1,2,4,1,3,2,1,4,2,3,1,2,4,1,3,1,2,4,2].map((w, i) => (
                                <div key={i} className="bg-black h-full" style={{ width: `${w}px` }} />
                              ))}
                            </div>
                            <div className="font-mono text-[7px] opacity-70 tracking-widest">
                              * {ticketId.replace('#', '')} *
                            </div>
                            <div className="text-[7px] text-center opacity-80 pt-1">
                              Thank you for choosing DETQEL Studio!<br />
                              *** CUSTOMER COPY ***
                            </div>
                          </div>

                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                  {/* INCOMING PROJECTS TRAY & DIGITAL CLOCK */}
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full bg-[#171622] border-2 border-ink p-2 rounded-xs shadow-brutalist-sm flex items-center justify-between px-3">
                      <span className="font-pixel text-[9px] font-bold text-[#8B5CF6] uppercase">
                        📥 INCOMING PROJECTS TRAY
                      </span>
                      <span className="bg-accent-coral text-white font-mono text-[10px] px-1.5 py-0.5 rounded-xs font-bold">
                        0{requestsCount}
                      </span>
                    </div>

                    {/* Clock & Standing Books Row */}
                    <div className="flex items-center justify-between gap-2 w-full">
                      {/* LED Digital Desk Clock */}
                      <div className="bg-[#12111A] text-[#8B5CF6] border-2 border-ink px-3 py-1.5 rounded-xs font-mono text-xs font-extrabold shadow-brutalist-sm flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{currentTime}</span>
                      </div>

                      {/* Black DETQEL Mug */}
                      <div
                        onClick={triggerMugQuote}
                        className="w-8 h-8 bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-b-md shadow-xs relative flex items-center justify-center cursor-pointer group"
                        title="Click Coffee Mug"
                      >
                        <span className="font-pixel text-[7px] font-bold text-accent-coral">DETQEL</span>
                        <div className="absolute -right-2 top-1.5 w-2 h-4 border-2 border-ink rounded-r-md" />
                      </div>

                      {/* 2 Standing Vertical Books */}
                      <div className="flex gap-1">
                        <div className="w-3.5 h-9 bg-amber-800 border border-ink text-white font-pixel text-[6px] font-bold flex items-center justify-center tracking-tighter shadow-xs" style={{ writingMode: 'vertical-rl' }}>
                          DEEAND
                        </div>
                        <div className="w-3.5 h-9 bg-emerald-800 border border-ink text-white font-pixel text-[6px] font-bold flex items-center justify-center tracking-tighter shadow-xs" style={{ writingMode: 'vertical-rl' }}>
                          GUIDLEEM
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>

        {/* PROCESS SECTION ("WHAT HAPPENS NEXT?") */}
        <div className="mb-16">
          
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-6 border-b-2 border-ink/20 pb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
            <h2 className="font-pixel text-lg font-extrabold uppercase text-ink dark:text-white tracking-wider">
              • WHAT HAPPENS NEXT?
            </h2>
          </div>

          {/* 5-Step Horizontal Journey */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              {
                num: '01',
                title: 'RECEIVED',
                desc: "We've received your message.",
                icon: Mail,
                highlight: true
              },
              {
                num: '02',
                title: 'DISCOVERY CALL',
                desc: "We'll schedule a quick call to understand your goals.",
                icon: Headphones
              },
              {
                num: '03',
                title: 'PROPOSAL',
                desc: "You'll receive a custom proposal and roadmap.",
                icon: FileText
              },
              {
                num: '04',
                title: 'BUILD',
                desc: "We build, iterate and bring your idea to life.",
                icon: Code
              },
              {
                num: '05',
                title: 'LAUNCH',
                desc: "We launch and help you scale with confidence.",
                icon: Rocket
              }
            ].map((step, idx) => {
              const IconComp = step.icon;
              const isHovered = hoveredStep === idx;
              return (
                <motion.div
                  key={step.num}
                  onMouseEnter={() => {
                    setHoveredStep(idx);
                    sound.playHover();
                  }}
                  whileHover={{ y: -6 }}
                  className={`bg-white dark:bg-canvas-dark-paper border-2 border-ink p-4 rounded-xs shadow-brutalist transition-all flex flex-col justify-between relative ${
                    step.highlight || isHovered ? 'ring-2 ring-[#8B5CF6] bg-[#8B5CF6]/10' : ''
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-xs font-bold text-ink/60 dark:text-gray-400">
                        {step.num} - {step.title}
                      </span>
                    </div>

                    <div className="w-12 h-12 mx-auto bg-[#8B5CF6]/10 border-2 border-ink rounded-full flex items-center justify-center mb-3 relative">
                      <IconComp className="w-6 h-6 text-ink dark:text-white" />
                      {step.highlight && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border border-ink flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    <p className="font-sans text-xs text-ink/80 dark:text-gray-300 leading-relaxed text-center font-medium">
                      {step.desc}
                    </p>
                  </div>

                  {idx < 4 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 font-mono text-xs text-ink/40 font-bold">
                      →
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* OTHER WAYS TO REACH US SECTION */}
        <div className="mb-16">
          
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-6 border-b-2 border-ink/20 pb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
            <h2 className="font-pixel text-lg font-extrabold uppercase text-ink dark:text-white tracking-wider">
              • OTHER WAYS TO REACH US
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            {/* Box 1: Multi-Channel Communication Panel */}
            <div className="bg-white dark:bg-canvas-dark-paper border-2 border-ink p-5 rounded-xs shadow-brutalist space-y-3.5">
              
              <div className="flex items-center justify-between border-b border-ink/10 pb-2">
                <span className="font-pixel text-xs font-bold text-ink dark:text-white uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  COMMUNICATION PANEL
                </span>
              </div>

              {/* Email item */}
              <div className="flex items-center justify-between p-2 rounded-xs border border-ink/20 bg-gray-50 dark:bg-canvas-dark">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-ink dark:text-gray-300" />
                  <div>
                    <span className="font-pixel text-[9px] uppercase text-ink/50 block">Email</span>
                    <span className="font-mono text-xs font-bold text-ink dark:text-white">detqel@gmail.com</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="font-pixel text-[9px] bg-[#10b981] text-ink px-2 py-1 border border-ink rounded-xs font-bold shadow-xs hover:bg-accent-coral hover:text-white transition-colors"
                >
                  {copiedEmail ? 'COPIED!' : 'COPY'}
                </button>
              </div>

              {/* Phone item */}
              <div className="flex items-center justify-between p-2 rounded-xs border border-ink/20 bg-gray-50 dark:bg-canvas-dark">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-ink dark:text-gray-300" />
                  <div>
                    <span className="font-pixel text-[9px] uppercase text-ink/50 block">Phone / WhatsApp</span>
                    <span className="font-mono text-xs font-bold text-ink dark:text-white">+91 95609 13212</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="font-pixel text-[9px] bg-[#10b981] text-ink px-2 py-1 border border-ink rounded-xs font-bold shadow-xs hover:bg-accent-coral hover:text-white transition-colors"
                >
                  {copiedPhone ? 'COPIED!' : 'COPY'}
                </button>
              </div>

              {/* Location item */}
              <div className="flex items-center gap-2.5 p-2 rounded-xs border border-ink/20 bg-gray-50 dark:bg-canvas-dark">
                <MapPin className="w-4 h-4 text-ink dark:text-gray-300" />
                <div>
                  <span className="font-pixel text-[9px] uppercase text-ink/50 block">Location</span>
                  <span className="font-mono text-xs font-bold text-ink dark:text-white">Chennai, India</span>
                </div>
              </div>

              {/* Social Channels Panel */}
              <div className="pt-2 border-t border-ink/10 flex items-center justify-between gap-1">
                {[
                  { id: 'linkedin', label: 'LINKEDIN', url: 'https://linkedin.com' },
                  { id: 'github', label: 'GITHUB', url: 'https://github.com' },
                  { id: 'instagram', label: 'INSTAGRAM', url: 'https://instagram.com' }
                ].map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 bg-[#1F1D2B] text-gray-200 hover:bg-[#8B5CF6] hover:text-ink border border-ink rounded-xs font-pixel text-[10px] font-bold shadow-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>

            </div>

            {/* Box 2: WE WORK WITH */}
            <div className="bg-white dark:bg-canvas-dark-paper border-2 border-ink p-5 rounded-xs shadow-brutalist relative">
              
              <div className="flex items-center justify-between border-b border-ink/10 pb-2 mb-4">
                <span className="font-pixel text-xs font-bold text-ink dark:text-white uppercase">
                  • WE WORK WITH •
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">🚀</span>
                  <span className="font-pixel text-[10px] font-bold">Startups</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">🏛️</span>
                  <span className="font-pixel text-[10px] font-bold">Enterprises</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">💼</span>
                  <span className="font-pixel text-[10px] font-bold">Agencies</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">⭐</span>
                  <span className="font-pixel text-[10px] font-bold">Creators</span>
                </div>
              </div>

              {/* Taped Sticky Note on bottom left */}
              <div className="absolute -bottom-5 left-3 bg-[#FFF066] text-ink p-2 rounded-xs shadow-sticky border border-amber-300 font-handwriting text-xs font-bold rotate-2 z-20">
                Open to global collaborations! 🌐
              </div>
            </div>

            {/* Box 3: AVERAGE RESPONSE TIME & STICKY NOTE */}
            <div className="relative">
              <div className="bg-white dark:bg-canvas-dark-paper border-2 border-ink p-5 rounded-xs shadow-brutalist">
                
                <div className="flex items-center justify-between border-b border-ink/10 pb-2 mb-3">
                  <span className="font-pixel text-xs font-bold text-ink dark:text-white uppercase">
                    AVERAGE RESPONSE TIME •
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-pixel text-4xl font-black text-[#8B5CF6]">24</span>
                  <span className="font-pixel text-lg font-bold text-ink dark:text-gray-200">hrs</span>
                </div>

                <p className="font-sans text-xs text-ink/70 dark:text-gray-300 mb-3 flex items-center gap-1.5 font-medium">
                  <span>We usually reply within a day.</span>
                  <Bot className="w-4 h-4 text-[#8B5CF6]" />
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-xs overflow-hidden border border-ink/20">
                  <div className="bg-[#8B5CF6] h-full w-[85%]" />
                </div>
              </div>

              {/* Pink Sticky Note on Right */}
              <div className="absolute -top-3 -right-3 bg-[#FFC2E2] text-ink p-2.5 rounded-xs shadow-sticky border border-pink-300 font-handwriting text-xs font-bold -rotate-6 z-20 max-w-[150px]">
                Let's create something the world will remember. :-)
              </div>
            </div>

          </div>
        </div>

        {/* INTERACTIVE FILING CABINET FAQ SECTION */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 border-b-2 border-ink/20 pb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
            <h2 className="font-pixel text-lg font-extrabold uppercase text-ink dark:text-white tracking-wider">
              INTERACTIVE FILING CABINET // KNOWLEDGE BASE
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Metallic Filing Cabinet Drawers */}
            <div className="lg:col-span-5 bg-[#201E2C] border-4 border-ink p-4 rounded-xs shadow-brutalist space-y-3">
              <span className="font-pixel text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                SELECT A FILING DRAWER TO OPEN:
              </span>

              {FILING_DRAWERS.map((drawer) => {
                const isOpen = activeDrawer === drawer.id;
                return (
                  <motion.div
                    key={drawer.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveDrawer(drawer.id);
                    }}
                    animate={{ x: isOpen ? 12 : 0 }}
                    className={`p-3.5 rounded-xs border-2 border-ink cursor-pointer font-pixel text-xs font-bold transition-all shadow-brutalist-sm flex justify-between items-center ${
                      isOpen
                        ? 'bg-[#8B5CF6] text-ink'
                        : 'bg-[#15141E] text-gray-200 hover:bg-gray-800'
                    }`}
                  >
                    <span>📁 {drawer.title}</span>
                    <span className="font-mono text-[10px] opacity-80">
                      {isOpen ? 'DRAWER OPEN ▼' : 'PULL OUT ▶'}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column: Unfolded Hanging Folder Document View */}
            <div className="lg:col-span-7 bg-white dark:bg-canvas-dark-paper border-4 border-ink p-6 rounded-xs shadow-brutalist">
              {activeDrawer !== null && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-ink/10 pb-3">
                    <span className="font-pixel text-sm font-bold text-ink dark:text-white uppercase flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-accent-coral" />
                      UNFOLDED FILE FOLDER // {FILING_DRAWERS[activeDrawer].title}
                    </span>
                    <span className="font-mono text-xs text-ink/50 font-bold">DETQEL ARCHIVE</span>
                  </div>

                  <div className="space-y-4">
                    {FILING_DRAWERS[activeDrawer].items.map((item, i) => (
                      <div key={i} className="bg-paper-grain p-4 rounded-xs border-2 border-ink/20 space-y-2">
                        <h4 className="font-pixel text-xs font-bold text-ink dark:text-white flex items-start gap-2">
                          <span className="text-accent-coral font-mono">Q:</span> {item.q}
                        </h4>
                        <p className="font-sans text-xs text-ink/80 dark:text-gray-300 leading-relaxed pl-5 font-medium">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>



      </div>
    </div>
  );
};

export default ContactUsPage;
