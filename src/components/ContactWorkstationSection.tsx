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
  Copy,
  Printer,
  Bot,
  Building,
  DollarSign,
  User,
  ChevronDown
} from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';

export interface FormDataState {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  budget: string;
  timeline: string;
  projectTypes: string[];
  details: string;
  meetingDate: string;
  file: File | null;
  agreedToTerms: boolean;
}

export const ContactWorkstationSection: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    fullName: 'Naresh Raj',
    email: 'hello@detqel.com',
    company: 'Detqel Studio',
    phone: '+91 95609 13212',
    country: 'India',
    budget: '₹5L - ₹15L',
    timeline: '2 - 3 Months',
    projectTypes: ['Web App', 'Custom AI'],
    details: 'We want to build an AI-powered platform that helps businesses automate their workflows and communication...',
    meetingDate: '',
    file: null,
    agreedToTerms: true
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'printed'>('idle');
  const [ticketId, setTicketId] = useState('#DETQEL-2026-0487');
  const [ticketTimestamp, setTicketTimestamp] = useState('');
  const [lampOn, setLampOn] = useState(true);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [robotState, setRobotState] = useState<'idle' | 'walking' | 'picking' | 'depositing' | 'celebrating'>('idle');
  const [robotMessage, setRobotMessage] = useState('We build AI-Powered Products.');
  const [mugRipple, setMugRipple] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeBook, setActiveBook] = useState<string | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Live Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setCurrentTime(`${hours}:${mins} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard press feedback animation handler
  const handleInputChange = (field: keyof FormDataState, value: any, keyName?: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (keyName) {
      setActiveKey(keyName.toUpperCase());
      sound.playClick();
      setTimeout(() => setActiveKey(null), 150);
    }
  };

  const toggleProjectType = (type: string) => {
    sound.playClick();
    setFormData(prev => {
      const exists = prev.projectTypes.includes(type);
      return {
        ...prev,
        projectTypes: exists
          ? prev.projectTypes.filter(t => t !== type)
          : [...prev.projectTypes, type]
      };
    });
  };

  const [incomingCount, setIncomingCount] = useState(7);

  // Secure API contact submit handler with client-side fallback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.details) {
      alert("Please enter your name, email, and project details.");
      return;
    }

    sound.playClick();
    setFormStatus('submitting');
    setRobotMessage("Processing project request...");

    const generatedTicket = `#DETQEL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTicketId(generatedTicket);
    setTicketTimestamp(timeStr);

    try {
      // Backend API endpoint call
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ticketId: generatedTicket,
          timestamp: new Date().toISOString()
        })
      });
    } catch {
      // Graceful fallback for local development
      console.log("Submitting via studio pipeline fallback.");
    }

    // Trigger Printer & Robot sequence
    setTimeout(() => {
      sound.playProjectorOn();
      setFormStatus('printed');
      setRobotMessage("Printing project receipt ticket...");

      // Robot animation lifecycle
      setTimeout(() => {
        setRobotState('walking');
        setRobotMessage("Retrieving project ticket from printer...");

        setTimeout(() => {
          setRobotState('picking');
          setRobotMessage("Filing ticket into Incoming Projects tray...");

          setTimeout(() => {
            setRobotState('depositing');
            setIncomingCount(prev => prev + 1);

            setTimeout(() => {
              setRobotState('celebrating');
              setRobotMessage("Project Accepted! We'll reply in 24 hrs 🚀");
              sound.playSuccess();
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#E0FF00', '#FF5533', '#2563EB', '#A7F3D0']
              });

              setTimeout(() => {
                setRobotState('idle');
              }, 3500);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1500);
    }, 1800);
  };

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText('hello@detqel.com');
    setCopiedEmail(true);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const scrollToForm = () => {
    sound.playClick();
    const el = document.getElementById('contact-workstation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const keyboardKeys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'SPACE', 'ENTER']
  ];

  const timelineSteps = [
    {
      number: '01',
      title: 'RECEIVED',
      desc: "We've received your message & project ticket.",
      icon: Mail,
      action: 'envelope'
    },
    {
      number: '02',
      title: 'DISCOVERY CALL',
      desc: "We'll schedule a quick 30-min call to map your goals.",
      icon: Headphones,
      action: 'headphones'
    },
    {
      number: '03',
      title: 'PROPOSAL',
      desc: 'You receive a custom architecture proposal & roadmap.',
      icon: FileText,
      action: 'proposal'
    },
    {
      number: '04',
      title: 'BUILD',
      desc: 'We design, iterate, and engineer your product.',
      icon: Code,
      action: 'code'
    },
    {
      number: '05',
      title: 'LAUNCH',
      desc: 'We launch & help you scale with complete confidence.',
      icon: Rocket,
      action: 'rocket'
    }
  ];

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-8 bg-[#F9F8F6] dark:bg-[#100F14] border-t-2 border-ink text-ink dark:text-white font-sans select-none overflow-hidden transition-colors duration-300"
    >
      {/* Background Engineering Grid & Dot Overlay */}
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none z-0" />

      {/* Main Studio Container */}
      <div className="max-w-7xl mx-auto relative z-10">

        {/* LED STATUS BOARD MOUNTED ON STUDIO WALL */}
        <div className="mb-12 flex justify-center">
          <div className="bg-[#121417] text-[#E0FF00] border-4 border-ink p-3.5 sm:p-4 rounded-xs shadow-brutalist max-w-3xl w-full flex flex-wrap items-center justify-between gap-4 font-mono text-xs relative overflow-hidden">
            {/* Glowing Scanline */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent-acid/40 animate-pulse pointer-events-none" />

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-acid animate-ping" />
              <span className="font-pixel text-sm font-bold tracking-wider text-white">
                ⚡ DETQEL STUDIO // LIVE LED STATUS
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[11px]">
              <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 px-2 py-0.5 rounded-xs font-bold">
                ● ACCEPTING NEW PROJECTS
              </span>
              <span className="text-gray-300">
                AVG RESPONSE: <strong className="text-accent-acid">24 HOURS</strong>
              </span>
              <span className="text-gray-400 hidden md:inline">
                IST (UTC+5:30) • WORLDWIDE REMOTE
              </span>
            </div>
          </div>
        </div>

        {/* HERO WORKSTATION HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14" id="contact-workstation">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-5 relative">
            
            {/* Sticky Notes pinned around hero */}
            <div className="hidden sm:block">
              <motion.div
                drag
                dragConstraints={{ left: -30, right: 30, top: -20, bottom: 20 }}
                className="absolute -top-8 -left-4 bg-sticky-yellow text-ink p-3 rounded-xs shadow-sticky border border-amber-300 font-handwriting text-lg font-bold -rotate-6 z-20 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
              >
                <div className="tape-sticker tape-sticker-yellow w-12 h-4 -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
                Great ideas start with a message 😃
              </motion.div>

              <motion.div
                drag
                dragConstraints={{ left: -30, right: 30, top: -20, bottom: 20 }}
                className="absolute top-2 right-4 bg-sticky-pink text-ink p-3 rounded-xs shadow-sticky border border-pink-300 font-handwriting text-base font-bold rotate-6 z-20 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform max-w-[200px]"
              >
                <div className="tape-sticker w-12 h-4 -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
                We can't wait to hear your next big idea! ♡
              </motion.div>
            </div>

            {/* Pixel Heading */}
            <div className="mt-8 sm:mt-12">
              <h1 className="font-pixel text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.98] text-ink dark:text-white mb-6">
                LET'S<br />
                <span className="text-accent-coral">BUILD</span><br />
                SOMETHING<br />
                <span className="text-accent-acid dark:text-accent-acid underline decoration-ink decoration-4 underline-offset-4">
                  AMAZING.
                </span>
              </h1>

              <p className="font-sans text-base sm:text-lg text-ink/80 dark:text-gray-300 leading-relaxed max-w-md mb-6">
                Tell us about your idea and we'll turn it into an unforgettable digital experience.
              </p>

              {/* Handwritten note & arrow pointing to monitor */}
              <div className="relative inline-block mt-2 mb-8">
                <div className="font-handwriting text-2xl sm:text-3xl text-accent-coral dark:text-accent-acid font-bold -rotate-2 hover:scale-105 transition-transform flex items-center gap-2">
                  <span>Fill the form, we'll take it from here!</span>
                  <span className="animate-bounce">→</span>
                </div>
                
                <svg className="w-28 h-10 text-accent-coral dark:text-accent-acid ml-16 -mt-1 hidden sm:block" viewBox="0 0 100 40" fill="none">
                  <path d="M5 10 C30 5, 60 30, 90 20" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2" fill="none" />
                  <path d="M82 14 L92 20 L84 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>

              {/* Stacked Interactive Books on Left Side */}
              <div className="mt-6 flex flex-col gap-1.5 max-w-xs">
                <span className="font-pixel text-[10px] uppercase font-bold text-ink/50 dark:text-gray-400 mb-1">
                  STUDIO ARCHIVE BOOKS:
                </span>
                {[
                  { name: 'BRANDING', color: 'bg-emerald-300 text-ink border-emerald-500' },
                  { name: 'UI/UX DESIGN', color: 'bg-blue-300 text-ink border-blue-500' },
                  { name: 'DEVELOPMENT', color: 'bg-purple-300 text-ink border-purple-500' },
                  { name: 'AI SOLUTIONS', color: 'bg-amber-300 text-ink border-amber-500' }
                ].map((book, i) => (
                  <motion.div
                    key={book.name}
                    onMouseEnter={() => {
                      setActiveBook(book.name);
                      sound.playHover();
                    }}
                    onMouseLeave={() => setActiveBook(null)}
                    animate={{ x: activeBook === book.name ? 12 : 0 }}
                    className={`p-2.5 rounded-xs border-2 border-ink font-pixel text-xs font-bold shadow-brutalist-sm cursor-pointer ${book.color} flex justify-between items-center`}
                  >
                    <span>{book.name}</span>
                    <span className="font-mono text-[9px] opacity-70">VOL. 0{i + 1}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Workstation Column (Monitor + Printer + Robot) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-end">
            
            {/* WORKSTATION DESK BACKING CONTAINER */}
            <div className="relative w-full p-4 sm:p-6 bg-gradient-to-b from-[#8B5A2B] via-[#673F1E] to-[#4A2C11] border-4 border-[#3D210B] rounded-xs shadow-brutalist-lg overflow-hidden">
              
              {/* Wood Grain Texture */}
              <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

              {/* STUDY LAMP LIGHT BEAM OVERLAY */}
              {lampOn && (
                <div className="absolute top-0 left-12 w-72 h-96 bg-gradient-to-b from-amber-200/35 via-amber-100/10 to-transparent pointer-events-none blur-sm z-10 clip-path-cone" />
              )}

              {/* DESK TOP ACCESSORIES BAR */}
              <div className="relative z-20 flex items-end justify-between px-2 pb-3 mb-2 border-b-2 border-amber-900/50">
                
                {/* Interactive Desk Lamp (Left) */}
                <div
                  className="relative flex flex-col items-center cursor-pointer group"
                  onClick={() => {
                    if (lampOn) sound.playProjectorOff();
                    else sound.playProjectorOn();
                    setLampOn(!lampOn);
                  }}
                  title="Toggle Desk Lamp"
                >
                  <div className={`w-8 h-8 rounded-t-full border-2 border-ink relative z-10 flex items-center justify-center transition-colors ${lampOn ? 'bg-amber-400' : 'bg-gray-600'}`}>
                    <div className={`w-3 h-3 rounded-full ${lampOn ? 'bg-yellow-100 animate-pulse' : 'bg-gray-800'}`} />
                  </div>
                  <div className="w-1.5 h-8 bg-gray-800 border-x border-ink" />
                  <div className="w-10 h-2 bg-amber-950 border-2 border-ink rounded-xs" />
                </div>

                {/* DETQEL Coffee Mug (Steaming & Rippling) */}
                <div
                  className="relative flex flex-col items-center cursor-pointer group"
                  onClick={() => {
                    sound.playClick();
                    setMugRipple(true);
                    setTimeout(() => setMugRipple(false), 1000);
                  }}
                  title="Click coffee mug to ripple!"
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-white/80 mb-1"
                    animate={{ y: [-2, -14], opacity: [0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="w-10 h-10 bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-b-md shadow-brutalist-sm relative flex items-center justify-center">
                    <span className="font-pixel text-[9px] font-bold text-accent-coral">AEX</span>
                    {mugRipple && (
                      <span className="absolute inset-1 rounded-full border-2 border-amber-700 animate-ping opacity-60 pointer-events-none" />
                    )}
                    <div className="absolute -right-3 top-2 w-3 h-5 border-2 border-ink rounded-r-md" />
                  </div>
                </div>

                {/* Live Digital Clock */}
                <div className="bg-[#181820] text-accent-acid border-2 border-ink px-3 py-1 rounded-xs font-mono text-xs font-bold shadow-brutalist-sm flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentTime}</span>
                </div>
              </div>

              {/* MAIN MONITOR BROWSER WINDOW (FORM) */}
              <div className="relative z-20 bg-[#F4F2EC] dark:bg-[#181622] border-4 border-ink rounded-xs shadow-2xl overflow-hidden">
                
                {/* Browser Title Bar */}
                <div className="bg-[#242130] text-white px-4 py-2 flex items-center justify-between border-b-2 border-ink">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500 border border-black/40" />
                    <div className="w-3 h-3 rounded-full bg-amber-400 border border-black/40" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 border border-black/40" />
                    <span className="font-mono text-xs font-bold text-gray-300 ml-2">
                      new_message.detqel ⚡
                    </span>
                  </div>

                  <span className="font-pixel text-[10px] text-accent-acid uppercase tracking-wider hidden sm:inline">
                    PROJECT SUBMISSION TERMINAL
                  </span>
                </div>

                {/* Browser Form Body */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
                  
                  {/* Two Column Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-pixel text-xs font-bold uppercase block mb-1 text-ink dark:text-gray-200">
                        YOUR NAME *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 dark:text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onKeyDown={(e) => handleInputChange('fullName', formData.fullName, e.key)}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="Naresh Raj"
                          className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white pl-9 pr-3 py-2 text-sm rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-accent-acid font-sans font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-pixel text-xs font-bold uppercase block mb-1 text-ink dark:text-gray-200">
                        EMAIL ADDRESS *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 dark:text-gray-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onKeyDown={(e) => handleInputChange('email', formData.email, e.key)}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="hello@detqel.com"
                          className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white pl-9 pr-3 py-2 text-sm rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-accent-acid font-sans font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-pixel text-xs font-bold uppercase block mb-1 text-ink dark:text-gray-200">
                        COMPANY / BRAND
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 dark:text-gray-400" />
                        <input
                          type="text"
                          value={formData.company}
                          onKeyDown={(e) => handleInputChange('company', formData.company, e.key)}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="Detqel Studio"
                          className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white pl-9 pr-3 py-2 text-sm rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-accent-acid font-sans font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-pixel text-xs font-bold uppercase block mb-1 text-ink dark:text-gray-200">
                        PHONE NUMBER
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 dark:text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onKeyDown={(e) => handleInputChange('phone', formData.phone, e.key)}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 95609 13212"
                          className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white pl-9 pr-3 py-2 text-sm rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-accent-acid font-sans font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dropdowns for Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-pixel text-xs font-bold uppercase block mb-1 text-ink dark:text-gray-200">
                        BUDGET RANGE
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 dark:text-gray-400" />
                        <select
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white pl-9 pr-8 py-2 text-sm rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-accent-acid font-sans font-medium appearance-none"
                        >
                          <option value="₹5L - ₹15L">₹5L - ₹15L ($5k - $15k)</option>
                          <option value="₹15L - ₹30L">₹15L - ₹30L ($15k - $30k)</option>
                          <option value="₹30L - ₹50L">₹30L - ₹50L ($30k - $50k)</option>
                          <option value="₹50L+">₹50L+ ($50k+)</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-ink/50" />
                      </div>
                    </div>

                    <div>
                      <label className="font-pixel text-xs font-bold uppercase block mb-1 text-ink dark:text-gray-200">
                        TIMELINE
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 dark:text-gray-400" />
                        <select
                          value={formData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                          className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white pl-9 pr-8 py-2 text-sm rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-accent-acid font-sans font-medium appearance-none"
                        >
                          <option value="1 - 2 Sprints">1 - 2 Sprints (Fast Track)</option>
                          <option value="2 - 3 Months">2 - 3 Months (Standard)</option>
                          <option value="Ongoing Retainer">Ongoing Studio Retainer</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-ink/50" />
                      </div>
                    </div>
                  </div>

                  {/* Project Type Multi-Select Pills */}
                  <div>
                    <label className="font-pixel text-xs font-bold uppercase block mb-1.5 text-ink dark:text-gray-200">
                      PROJECT TYPE (SELECT ALL THAT APPLY)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Web App', 'Brand Identity', 'Custom AI', 'WebGL / 3D', 'Automation'].map((type) => {
                        const isSelected = formData.projectTypes.includes(type);
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => toggleProjectType(type)}
                            className={`px-3 py-1.5 rounded-xs font-pixel text-xs font-bold border-2 border-ink shadow-brutalist-sm transition-all ${
                              isSelected
                                ? 'bg-accent-acid text-ink'
                                : 'bg-white dark:bg-canvas-dark-paper text-ink dark:text-white hover:bg-gray-100'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '} {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Details Textarea */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-pixel text-xs font-bold uppercase text-ink dark:text-gray-200">
                        TELL US ABOUT YOUR IDEA *
                      </label>
                      <span className="font-mono text-[10px] opacity-60">
                        {formData.details.length}/500
                      </span>
                    </div>
                    <textarea
                      required
                      maxLength={500}
                      rows={3}
                      value={formData.details}
                      onKeyDown={(e) => handleInputChange('details', formData.details, e.key)}
                      onChange={(e) => handleInputChange('details', e.target.value)}
                      placeholder="Describe your project goals, core features, and aesthetic preferences..."
                      className="w-full bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white p-3 text-sm rounded-xs shadow-brutalist-sm focus:outline-none focus:ring-2 focus:ring-accent-acid font-sans font-medium resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    onMouseEnter={() => triggerCursor('SUBMIT', 'hover')}
                    onMouseLeave={() => triggerCursor('', 'default')}
                    className="w-full py-3.5 bg-accent-acid text-ink border-2 border-ink rounded-xs font-pixel text-base font-extrabold shadow-brutalist hover:bg-accent-coral hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-ink border-t-transparent animate-spin" />
                        PRINTING PROJECT RECEIPT...
                      </>
                    ) : (
                      <>
                        SEND PROJECT REQUEST <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* MECHANICAL KEYBOARD BELOW MONITOR */}
              <div className="relative z-20 mt-3 p-2 bg-[#2D2A3A] border-2 border-ink rounded-xs shadow-md">
                <div className="flex flex-col gap-1 items-center">
                  {keyboardKeys.map((row, rIdx) => (
                    <div key={rIdx} className="flex gap-1">
                      {row.map((key) => {
                        const isPressed = activeKey === key || (key === 'SPACE' && activeKey === ' ');
                        return (
                          <div
                            key={key}
                            className={`px-1.5 py-1 rounded-[2px] font-mono text-[9px] font-bold border transition-all ${
                              isPressed
                                ? 'bg-accent-acid text-ink translate-y-0.5 shadow-none'
                                : 'bg-[#1C1A24] text-gray-300 border-black/50 shadow-[0_2px_0_#000]'
                            } ${key === 'SPACE' ? 'w-24 text-center' : key === 'ENTER' ? 'w-12 text-center' : 'w-5 sm:w-6 text-center'}`}
                          >
                            {key}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* PRINTER & INCOMING PROJECTS TRAY ROW */}
              <div className="relative z-20 grid grid-cols-1 sm:grid-cols-12 gap-4 items-end mt-4 pt-4 border-t-2 border-amber-900/50">
                
                {/* DETQEL PRINTER V1.0 (Left/Center in row) */}
                <div className="sm:col-span-7 bg-[#2A2736] border-2 border-ink p-3 rounded-xs shadow-brutalist relative">
                  
                  {/* Printer Top Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
                    <span className="font-pixel text-[10px] font-bold text-gray-200 uppercase flex items-center gap-1.5">
                      <Printer className="w-3.5 h-3.5 text-accent-acid" />
                      DETQEL PRINTER v1.0
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${formStatus === 'submitting' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
                      <span className="font-mono text-[9px] text-gray-400">
                        {formStatus === 'submitting' ? 'PRINTING...' : 'READY'}
                      </span>
                    </div>
                  </div>

                  {/* Printer Status Screen */}
                  <div className="bg-[#121118] text-emerald-400 p-2 rounded-xs border border-black font-mono text-xs flex items-center justify-between mb-2">
                    <span>{formStatus === 'submitting' ? 'PRINTING RECEIPT...' : formStatus === 'printed' ? 'RECEIPT PRINTED ✓' : 'SYSTEM IDLE'}</span>
                    <span className="animate-spin">{formStatus === 'submitting' ? '⚙️' : '★'}</span>
                  </div>

                  {/* THE PRINTED RECEIPT SLIDING OUT */}
                  <AnimatePresence>
                    {formStatus === 'printed' && (
                      <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                        className="bg-[#FAF8F2] text-ink p-4 rounded-xs border-2 border-ink shadow-brutalist font-mono text-xs space-y-2 relative"
                      >
                        <div className="text-center border-b border-black/20 pb-2">
                          <h4 className="font-pixel text-sm font-bold text-ink uppercase">
                            PROJECT RECEIPT
                          </h4>
                          <span className="text-[10px] text-emerald-700 font-bold block">
                            ✓ Received Successfully!
                          </span>
                        </div>

                        {/* Verified Stamp Badge */}
                        <div className="absolute top-3 right-3 w-10 h-10 rounded-full border-2 border-emerald-600 flex items-center justify-center rotate-12 opacity-80 pointer-events-none">
                          <Check className="w-6 h-6 text-emerald-600" />
                        </div>

                        <div className="space-y-1 text-[11px]">
                          <div><strong>Ticket ID:</strong> {ticketId}</div>
                          <div><strong>Timestamp:</strong> {ticketTimestamp}</div>
                          <div><strong>Client:</strong> {formData.fullName}</div>
                          <div><strong>Company:</strong> {formData.company || 'N/A'}</div>
                          <div><strong>Budget:</strong> {formData.budget}</div>
                        </div>

                        <div className="pt-2 border-t border-black/20 text-[10px] text-ink/80">
                          Thank you, {formData.fullName}! We'll review your project and get back to you within 24 hours.
                        </div>

                        <div className="text-right text-[9px] opacity-60 font-pixel">
                          - The Detqel Team
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* INCOMING PROJECTS TRAY & ROBOT (Right in row) */}
                <div className="sm:col-span-5 flex flex-col items-center justify-end">
                  
                  {/* DETQEL ROBOT ASSISTANT */}
                  <div className="relative mb-2 flex flex-col items-center">
                    {/* Speech Bubble */}
                    <div className="bg-white dark:bg-canvas-dark-paper border-2 border-ink px-2.5 py-1 rounded-xs shadow-brutalist-sm font-pixel text-[9px] font-bold mb-1 max-w-[180px] text-center z-30">
                      {robotMessage}
                    </div>

                    {/* Robot Sprite */}
                    <motion.div
                      animate={
                        robotState === 'celebrating'
                          ? { y: [0, -12, 0], rotate: [0, 10, -10, 0] }
                          : robotState === 'walking'
                          ? { x: [-10, 10, -10] }
                          : { y: [0, -2, 0] }
                      }
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="bg-emerald-400 border-2 border-ink p-2 rounded-xs shadow-brutalist-sm relative text-center"
                    >
                      <Bot className="w-8 h-8 text-ink mx-auto" />
                      <span className="font-pixel text-[7px] text-ink font-bold block mt-0.5">ROBO-DETQEL</span>
                    </motion.div>
                  </div>

                  {/* INCOMING PROJECTS TRAY */}
                  <div className="w-full bg-[#1A1824] border-2 border-ink p-3 rounded-xs text-center shadow-brutalist-sm flex items-center justify-between px-4">
                    <span className="font-pixel text-[10px] font-bold text-accent-acid tracking-wider uppercase">
                      📥 INCOMING PROJECTS
                    </span>
                    <span className="bg-accent-coral text-white font-mono text-xs px-2 py-0.5 rounded-xs font-bold shadow-xs">
                      TODAY: 0{incomingCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* "WHAT HAPPENS NEXT?" TIMELINE SECTION */}
        <div className="mt-24 mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-pixel text-xs uppercase font-bold text-accent-coral tracking-wider block mb-2">
              TRANSPARENT PROCESS
            </span>
            <h2 className="font-pixel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink dark:text-white">
              WHAT HAPPENS NEXT?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {timelineSteps.map((step, idx) => {
              const IconComponent = step.icon;
              const isHovered = hoveredStep === idx;
              return (
                <motion.div
                  key={step.number}
                  onMouseEnter={() => {
                    setHoveredStep(idx);
                    sound.playHover();
                  }}
                  onMouseLeave={() => setHoveredStep(null)}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className={`bg-white dark:bg-canvas-dark-paper border-2 border-ink p-5 rounded-xs shadow-brutalist transition-all flex flex-col justify-between ${
                    isHovered ? 'border-accent-acid bg-accent-acid/10' : ''
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-xs font-bold text-ink/50 dark:text-gray-400">
                        {step.number}
                      </span>
                      <div className={`p-2 rounded-xs border border-ink shadow-xs ${isHovered ? 'bg-accent-acid text-ink' : 'bg-gray-100 dark:bg-canvas-dark'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-pixel text-sm font-bold text-ink dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs text-ink/75 dark:text-gray-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-ink/10 text-[10px] font-mono text-accent-coral font-bold">
                    STEP {step.number} OF 05 →
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* "WAYS TO REACH US" OFFICE OBJECT CARDS */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-pixel text-xs uppercase font-bold text-accent-acid tracking-wider block mb-2">
              DIRECT CHANNELS
            </span>
            <h2 className="font-pixel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink dark:text-white">
              WAYS TO REACH US.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Email Card */}
            <div className="bg-white dark:bg-canvas-dark-paper border-2 border-ink p-6 rounded-xs shadow-brutalist flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-sky-200 dark:bg-sky-900 border-2 border-ink rounded-xs flex items-center justify-center mb-4 shadow-brutalist-sm">
                  <Mail className="w-5 h-5 text-ink dark:text-sky-200" />
                </div>
                <span className="font-pixel text-xs font-bold text-ink/50 uppercase block mb-1">
                  DIRECT EMAIL INBOX
                </span>
                <h3 className="font-pixel text-lg font-bold text-ink dark:text-white mb-2">
                  hello@detqel.com
                </h3>
                <p className="font-sans text-xs text-ink/70 dark:text-gray-300 leading-relaxed">
                  Send your RFPs, project briefs, or general questions anytime.
                </p>
              </div>

              <button
                onClick={handleCopyEmail}
                className="mt-6 inline-flex items-center gap-2 bg-ink text-white dark:bg-accent-acid dark:text-ink px-4 py-2 font-pixel text-xs font-bold border-2 border-ink rounded-xs shadow-brutalist-sm hover:opacity-90 transition-opacity"
              >
                {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedEmail ? 'COPIED TO CLIPBOARD!' : 'COPY EMAIL ADDRESS'}
              </button>
            </div>

            {/* Phone / WhatsApp Card */}
            <div className="bg-white dark:bg-canvas-dark-paper border-2 border-ink p-6 rounded-xs shadow-brutalist flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-emerald-200 dark:bg-emerald-900 border-2 border-ink rounded-xs flex items-center justify-center mb-4 shadow-brutalist-sm">
                  <Phone className="w-5 h-5 text-ink dark:text-emerald-200" />
                </div>
                <span className="font-pixel text-xs font-bold text-ink/50 uppercase block mb-1">
                  PHONE & WHATSAPP
                </span>
                <h3 className="font-pixel text-lg font-bold text-ink dark:text-white mb-2">
                  +91 95609 13212
                </h3>
                <p className="font-sans text-xs text-ink/70 dark:text-gray-300 leading-relaxed">
                  Available Mon - Fri, 10 AM to 7 PM IST for urgent inquiries.
                </p>
              </div>

              <a
                href="https://wa.me/919560913212"
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="mt-6 inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 font-pixel text-xs font-bold border-2 border-ink rounded-xs shadow-brutalist-sm hover:bg-emerald-600 transition-colors"
              >
                CHAT ON WHATSAPP →
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-white dark:bg-canvas-dark-paper border-2 border-ink p-6 rounded-xs shadow-brutalist flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-purple-200 dark:bg-purple-900 border-2 border-ink rounded-xs flex items-center justify-center mb-4 shadow-brutalist-sm">
                  <MapPin className="w-5 h-5 text-ink dark:text-purple-200" />
                </div>
                <span className="font-pixel text-xs font-bold text-ink/50 uppercase block mb-1">
                  HEADQUARTERS & REMOTE
                </span>
                <h3 className="font-pixel text-lg font-bold text-ink dark:text-white mb-2">
                  Chennai, India // Tokyo // SF
                </h3>
                <p className="font-sans text-xs text-ink/70 dark:text-gray-300 leading-relaxed">
                  Serving visionary founders and engineering teams globally.
                </p>
              </div>

              <div className="mt-6 font-mono text-xs text-accent-coral font-bold">
                🌐 GLOBAL COLLABORATIONS OPEN
              </div>
            </div>
          </div>
        </div>

        {/* EVENING FOOTER TRANSITION */}
        <div className="bg-[#121118] text-white p-8 sm:p-14 rounded-xs border-4 border-ink shadow-brutalist text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent-acid" />
          
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="font-pixel text-xs text-accent-acid uppercase tracking-wider block">
              DETQEL CREATIVE STUDIO // EVENING TRANSITION
            </span>

            <h2 className="font-pixel text-4xl sm:text-6xl font-black uppercase leading-none tracking-tight">
              LET'S START<br />
              YOUR NEXT BIG<br />
              <span className="text-accent-acid">PROJECT.</span>
            </h2>

            <p className="font-sans text-base text-gray-300">
              Your idea + Our expertise = Unforgettable digital experiences.
            </p>

            <button
              onClick={scrollToForm}
              onMouseEnter={() => triggerCursor('START', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="inline-flex items-center gap-2 bg-accent-acid text-ink px-8 py-4 font-pixel text-sm font-extrabold border-2 border-ink shadow-brutalist hover:bg-accent-coral hover:text-white transition-all cursor-pointer"
            >
              START A CONVERSATION <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactWorkstationSection;
