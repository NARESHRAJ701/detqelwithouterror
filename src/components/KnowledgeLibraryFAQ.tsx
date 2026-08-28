import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';

interface FAQItem {
  id: string;
  number: string;
  tabTitle: string;
  question: string;
  answer: string;
  color: string;
  tag: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'services',
    number: '01',
    tabTitle: 'WHAT SERVICES?',
    question: 'What services does Detqel provide?',
    answer: 'We provide end-to-end digital solutions including brand identity, custom web development, UI/UX design, AI solutions & LLM integrations, workflow automation, and custom software systems.',
    color: 'bg-[#3FA9E8] text-white',
    tag: 'Full Spectrum'
  },
  {
    id: 'process',
    number: '02',
    tabTitle: 'HOW PROCESS?',
    question: 'How does your process work?',
    answer: 'We work in rapid, transparent sprint cycles: Discovery & Strategy → Interactive Prototyping → Engineering & AI Integration → Launch, Testing & Continuous Optimization.',
    color: 'bg-[#00A676] text-black',
    tag: 'Agile & Fast'
  },
  {
    id: 'timeline',
    number: '03',
    tabTitle: 'PROJECT TIME?',
    question: 'How long does a typical project take?',
    answer: 'Brand systems and MVP websites typically take 2-4 weeks. Comprehensive web applications, custom software, and full AI integrations range from 4-8 weeks.',
    color: 'bg-[#FF6B35] text-white',
    tag: '2-6 Weeks'
  },
  {
    id: 'startups',
    number: '04',
    tabTitle: 'STARTUPS?',
    question: 'Do you work with early-stage startups?',
    answer: 'Absolutely. We love partnering with visionary founders to take ambitious ideas from napkin sketches to venture-ready digital products and scalable architectures.',
    color: 'bg-[#7C3AED] text-white',
    tag: 'Seed to Scale'
  },
  {
    id: 'ai-powered',
    number: '05',
    tabTitle: 'AI POWERED?',
    question: 'Can you build AI-powered products?',
    answer: 'Yes. We specialize in custom LLM agents, intelligent retrieval (RAG), automated business workflows, conversational interfaces, and proprietary AI microservices.',
    color: 'bg-[#B7E532] text-black',
    tag: 'Next-Gen AI'
  },
  {
    id: 'branding',
    number: '06',
    tabTitle: 'BRANDING & DESIGN?',
    question: 'Do you provide branding and design systems?',
    answer: 'Yes. We craft distinct visual identities, design tokens, logo suites, typography guidelines, and complete UI component libraries that help brands stand out.',
    color: 'bg-[#EC4899] text-white',
    tag: 'Visual Identity'
  },
  {
    id: 'full-product',
    number: '07',
    tabTitle: 'FULL PRODUCT?',
    question: 'Can you handle complete product development?',
    answer: 'Yes. From strategic conception and UI/UX design to robust backend architecture, cloud deployment, and ongoing feature scaling, we are your all-in-one creative engineering studio.',
    color: 'bg-[#EAB308] text-black',
    tag: 'End-to-End'
  },
];

export const KnowledgeLibraryFAQ: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('services');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeFAQ = FAQ_ITEMS.find((item) => item.id === activeTabId) || FAQ_ITEMS[0];

  const filteredItems = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tabTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="relative w-full py-16 sm:py-24 px-4 sm:px-8 select-none font-sans overflow-hidden">
      
      {/* Translucent Glass Desk Workstation Card */}
      <div className="max-w-[1540px] mx-auto relative z-10 bg-black/45 dark:bg-black/65 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl text-white">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: TITLE, BADGES, SEARCH BOX & STICKY NOTES */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#B7E532] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] animate-ping" />
                <span>02 / KNOWLEDGE HUB</span>
              </div>

              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[0.92]">
                FREQUENTLY<br />
                ASKED<br />
                <span className="text-[#FF6B35]">QUESTIONS.</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
                Everything you want to know before working with Detqel, put all in place from the start to reveal the answers.
              </p>
            </div>

            {/* Quick Search Input Box */}
            <div className="space-y-2 pt-1">
              <span className="font-mono text-xs font-bold text-white/80 block">
                Still looking for more answers?
              </span>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask us anything..."
                  className="w-full bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#B7E532] font-mono transition-all"
                />
              </div>
            </div>

            {/* Sticky Notes & Studio Decor */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3 py-2 rounded-xl bg-yellow-300/90 text-black border border-black/20 font-handwriting text-base font-bold shadow-md -rotate-3 hover:rotate-0 transition-transform">
                📌 Quick Answers
              </div>
              <div className="px-3 py-2 rounded-xl bg-[#00A676]/90 text-black border border-black/20 font-handwriting text-base font-bold shadow-md rotate-2 hover:rotate-0 transition-transform">
                🌱 Repeat Client Friendly
              </div>
              <div className="px-3 py-2 rounded-xl bg-[#7C3AED]/90 text-white border border-white/20 font-handwriting text-base font-bold shadow-md -rotate-2 hover:rotate-0 transition-transform">
                ✨ 100% Dedicated
              </div>
            </div>

            {/* Question Prompt CTA */}
            <div className="pt-2 border-t border-white/15">
              <a
                href="#contact"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#B7E532] hover:text-white transition-colors"
              >
                <span>HAVE A SPECIFIC QUESTION? TALK TO US</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: HANGING VERTICAL TABS & EXPANDABLE ANSWER CARD */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Hanging Tabs Bar */}
            <div className="bg-white/10 dark:bg-white/5 p-2 rounded-2xl border border-white/15 backdrop-blur-md">
              <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {filteredItems.map((item) => {
                  const isSelected = activeTabId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        sound.playClick();
                        setActiveTabId(item.id);
                      }}
                      onMouseEnter={() => {
                        sound.playHover();
                        triggerCursor(item.tabTitle, 'hover');
                      }}
                      onMouseLeave={() => triggerCursor('', 'default')}
                      className={`px-3 py-2 rounded-xl font-mono text-[11px] font-bold tracking-tight whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        isSelected
                          ? `${item.color} shadow-lg scale-105`
                          : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      <span>{item.number}</span>
                      <span>{item.tabTitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Answer Card Spread */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFAQ.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6"
              >
                {/* Header of Active Tab */}
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold ${activeFAQ.color}`}>
                    {activeFAQ.number} // {activeFAQ.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-white/60">
                    <HelpCircle className="w-3.5 h-3.5 text-[#B7E532]" />
                    <span>FREQUENT INQUIRY</span>
                  </div>
                </div>

                {/* Question */}
                <h3 className="font-pixel text-2xl sm:text-3xl font-black text-white uppercase tracking-wide leading-tight">
                  {activeFAQ.question}
                </h3>

                {/* Answer */}
                <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed font-medium">
                  {activeFAQ.answer}
                </p>

                {/* Highlights footer */}
                <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-white/70">
                  <div className="flex items-center gap-2 text-[#B7E532]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>GUARANTEED CLARITY & DEDICATED SUPPORT</span>
                  </div>
                  <span className="text-white/50">VOL. 2026 // KNOWLEDGE</span>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};

export default KnowledgeLibraryFAQ;
