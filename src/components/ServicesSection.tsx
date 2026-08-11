import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import {
  Bot,
  Globe,
  Palette,
  Layout,
  Cpu,
  BarChart3,
  BookOpen,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface Service {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  capabilities: string[];
  deliverables: string;
  phrase: string;
  accentColor: string;
  icon: React.FC<{ className?: string }>;
}

const SERVICES: Service[] = [
  {
    id: 'ai-solutions',
    number: '01',
    label: 'AI SOLUTIONS & AUTOMATION',
    title: 'AI Solutions\n& Automation',
    description:
      'We turn repetitive processes into intelligent workflows using AI agents, automation and connected systems — built to scale with your business.',
    capabilities: ['AI Agents', 'Chatbots & Assistants', 'Workflow Automation', 'AI Integrations', 'Process Intelligence'],
    deliverables: 'AI strategy · Agent pipelines · Automation scripts · Integration APIs · Performance dashboards',
    phrase: 'Let Machines Do the Heavy Lifting.',
    accentColor: '#C8FF2F',
    icon: Bot,
  },
  {
    id: 'web-design',
    number: '02',
    label: 'WEB DESIGN & DEVELOPMENT',
    title: 'Web Design\n& Development',
    description:
      'We engineer fast, responsive and scalable websites and web applications built around real business goals — from pixel-perfect UI to robust backend.',
    capabilities: ['Websites', 'Web Apps', 'Frontend Engineering', 'Backend Systems', 'CMS Integration', 'Performance Optimization'],
    deliverables: 'Website · Web app · API · CMS · Performance audit · Deployment',
    phrase: 'Fast. Reliable. Scalable.',
    accentColor: '#FF5533',
    icon: Globe,
  },
  {
    id: 'branding',
    number: '03',
    label: 'BRANDING & IDENTITY DESIGN',
    title: 'Branding\n& Identity Design',
    description:
      'We create memorable brands and visual systems that connect, communicate and stand apart — from strategy to every pixel of the final mark.',
    capabilities: ['Brand Strategy', 'Logo Systems', 'Visual Identity', 'Brand Guidelines', 'Creative Direction'],
    deliverables: 'Identity systems · Logo design · Typography · Color systems · Brand assets',
    phrase: 'We Make You Unforgettable.',
    accentColor: '#7939a1',
    icon: Palette,
  },
  {
    id: 'uiux',
    number: '04',
    label: 'UI/UX DESIGN',
    title: 'UI/UX\nDesign',
    description:
      'We design intuitive digital experiences that feel clear, useful and effortless across every screen — from first wireframe to shipped product.',
    capabilities: ['UX Strategy', 'User Flows', 'Wireframes', 'UI Systems', 'Prototyping', 'Design Systems'],
    deliverables: 'Wireframes · UI kit · Figma files · Prototypes · Design tokens',
    phrase: 'Design That Actually Works.',
    accentColor: '#3B82F6',
    icon: Layout,
  },
  {
    id: 'software',
    number: '05',
    label: 'SOFTWARE & BUSINESS SYSTEMS',
    title: 'Software &\nBusiness Systems',
    description:
      'We build custom software and internal tools that power your operations — scalable, maintainable systems tailored to your exact workflow.',
    capabilities: ['Custom Software', 'Internal Tools', 'SaaS Products', 'API Development', 'System Architecture'],
    deliverables: 'Custom app · API · Architecture docs · QA suite · Deployment pipeline',
    phrase: 'Built for Scale. Built to Last.',
    accentColor: '#EC4899',
    icon: Cpu,
  },
  {
    id: 'crm-erp',
    number: '06',
    label: 'CRM & ERP',
    title: 'CRM\n& ERP',
    description:
      'We implement, customize and integrate CRM and ERP platforms that streamline sales, operations and business intelligence in one connected hub.',
    capabilities: ['CRM Setup & Customization', 'ERP Implementation', 'Data Migration', 'Sales Automation', 'Reporting & BI'],
    deliverables: 'CRM config · ERP setup · Integrations · Training docs · Analytics dashboards',
    phrase: 'One System. Total Clarity.',
    accentColor: '#F59E0B',
    icon: BarChart3,
  },
  {
    id: 'research',
    number: '07',
    label: 'RESEARCH & PUBLICATION SUPPORT',
    title: 'Research &\nPublication Support',
    description:
      'We support academic and professional research projects from data visualization to polished publication-ready documents and digital reports.',
    capabilities: ['Data Visualization', 'Academic Typesetting', 'Report Design', 'Infographics', 'Digital Publishing'],
    deliverables: 'Visualizations · Formatted documents · Infographics · PDF reports · Publication files',
    phrase: 'Knowledge, Beautifully Presented.',
    accentColor: '#84CC16',
    icon: BookOpen,
  },
];

export const ServicesSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = SERVICES[activeIdx];

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    sound.playClick();
  };

  const handlePrev = () => {
    const newIdx = activeIdx === 0 ? SERVICES.length - 1 : activeIdx - 1;
    handleSelect(newIdx);
  };

  const handleNext = () => {
    const newIdx = activeIdx === SERVICES.length - 1 ? 0 : activeIdx + 1;
    handleSelect(newIdx);
  };

  const ActiveIcon = activeService.icon;

  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-8 bg-canvas dark:bg-canvas-dark border-b-2 border-ink relative overflow-hidden select-none"
    >
      {/* Background Engineering Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-canvas-dark-paper px-3 py-1 border border-ink shadow-brutalist-sm rounded-xs">
              <span className="w-2 h-2 rounded-full bg-accent-acid animate-pulse" />
              <span className="font-mono text-xs font-bold text-ink dark:text-white uppercase tracking-wider">
                BEHIND THE SCENES // RAW ARCHIVE
              </span>
            </div>

            <h2 className="font-pixel text-4xl sm:text-6xl font-black uppercase text-ink dark:text-white tracking-tight leading-tight">
              WHAT WE<br />
              DO BEST<span className="text-accent-coral">.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between self-stretch space-y-6 max-w-md">
            <div className="font-mono text-xs font-bold text-ink dark:text-gray-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-coral" />
              <span>7 SERVICE OFFERINGS</span>
              <span className="text-ink font-bold text-sm">┐</span>
            </div>
            <p className="font-sans text-base text-ink dark:text-gray-200 font-medium leading-relaxed md:text-right">
              From brand identity to AI automation — a full-spectrum studio built for modern businesses that demand excellence.
            </p>
          </div>
        </div>

        {/* MAIN CONTENT: SERVICE LIST + INSPECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">

          {/* LEFT: Service List (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {SERVICES.map((service, idx) => {
              const Icon = service.icon;
              const isActive = activeIdx === idx;

              return (
                <motion.button
                  key={service.id}
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => {
                    sound.playHover();
                    triggerCursor('SELECT', 'hover');
                  }}
                  onMouseLeave={() => triggerCursor('', 'default')}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className={`w-full flex items-center gap-4 px-4 py-3 border-2 rounded-xs text-left transition-all duration-200 ${
                    isActive
                      ? 'border-ink bg-white dark:bg-canvas-dark-paper shadow-brutalist-lg'
                      : 'border-ink/20 bg-white/60 dark:bg-canvas-dark-paper/40 hover:border-ink hover:bg-white dark:hover:bg-canvas-dark-paper hover:shadow-brutalist-sm'
                  }`}
                >
                  {/* Number */}
                  <span className="font-mono text-[10px] font-bold text-ink dark:text-gray-300 w-6 shrink-0">
                    {service.number}
                  </span>

                  {/* Icon badge */}
                  <span
                    className="shrink-0 w-8 h-8 rounded-xs flex items-center justify-center border border-ink/20 transition-colors duration-200"
                    style={{ backgroundColor: isActive ? service.accentColor : 'transparent', color: isActive ? '#111' : service.accentColor }}
                  >
                    <Icon className="w-4 h-4 transition-colors duration-200" />
                  </span>

                  {/* Label */}
                  <span
                    className={`font-pixel text-xs sm:text-sm font-bold uppercase tracking-wide flex-1 text-left ${
                      isActive ? 'text-ink dark:text-white' : 'text-ink dark:text-gray-300'
                    }`}
                  >
                    {service.label}
                  </span>

                  {/* Active indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.15 }}
                        className="shrink-0 w-6 h-6 bg-accent-acid text-ink border border-ink rounded-xs flex items-center justify-center"
                      >
                        <ArrowUpRight className="w-3 h-3" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT: Detail Inspector (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white dark:bg-canvas-dark-paper border-2 border-ink shadow-brutalist-lg rounded-xs p-5 sm:p-6 space-y-6"
              >
                {/* Window Header bar */}
                <div className="flex items-center justify-between pb-3 border-b border-ink/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-ink dark:text-gray-300 uppercase tracking-widest">
                    SERVICE_INSPECTOR // #{activeService.number}
                  </span>
                </div>

                {/* Icon hero */}
                <div
                  className="relative aspect-[16/7] w-full rounded-xs flex items-center justify-center border-2 border-ink overflow-hidden"
                  style={{ backgroundColor: activeService.accentColor + '20' }}
                >
                  <span className="absolute inset-0 flex items-center justify-center font-pixel text-[5rem] font-black uppercase opacity-[0.06] text-ink dark:text-white select-none pointer-events-none leading-none">
                    {activeService.number}
                  </span>
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.35, ease: 'backOut' }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xs border-2 border-ink flex items-center justify-center shadow-brutalist"
                      style={{ backgroundColor: activeService.accentColor }}
                    >
                      <ActiveIcon className="w-8 h-8 sm:w-10 sm:h-10 text-ink" />
                    </div>
                    <span
                      className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs border border-ink"
                      style={{ backgroundColor: activeService.accentColor, color: '#111' }}
                    >
                      {activeService.label}
                    </span>
                  </motion.div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="font-pixel text-2xl sm:text-3xl font-black uppercase text-ink dark:text-white whitespace-pre-line leading-tight">
                    {activeService.title}
                  </h3>
                  <p className="font-sans text-sm text-ink dark:text-gray-200 font-medium leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                {/* Capabilities */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-ink dark:text-gray-300 uppercase tracking-wider block">
                    CAPABILITIES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeService.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="font-mono text-[10px] font-bold px-2 py-0.5 border border-ink/20 rounded-xs bg-canvas-paper dark:bg-canvas-dark text-ink dark:text-white"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="p-3 bg-canvas-paper dark:bg-canvas-dark border border-ink/20 rounded-xs font-mono text-xs space-y-1">
                  <span className="text-ink dark:text-gray-300 block text-[10px]">DELIVERABLES</span>
                  <span className="font-bold text-ink dark:text-white">{activeService.deliverables}</span>
                </div>

                {/* Phrase */}
                <div
                  className="p-3 rounded-xs border-2 border-ink"
                  style={{ backgroundColor: activeService.accentColor + '30' }}
                >
                  <span className="font-pixel text-sm font-bold text-ink dark:text-white italic">
                    "{activeService.phrase}"
                  </span>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={() => sound.playClick()}
                    className="w-full flex items-center justify-between bg-canvas-paper dark:bg-canvas-dark border-2 border-ink p-3 rounded-xs font-pixel text-xs font-bold text-ink dark:text-white hover:bg-ink hover:text-white dark:hover:bg-accent-acid dark:hover:text-ink transition-all shadow-brutalist group"
                  >
                    <span>GET A QUOTE</span>
                    <span className="w-7 h-7 bg-accent-acid text-ink rounded-xs flex items-center justify-center border border-ink group-hover:translate-x-1 transition-transform">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM CONTROLS */}
        <div className="flex items-center justify-between pt-6 border-t-2 border-ink">
          <div className="flex items-center gap-4 font-mono text-xs font-bold text-ink dark:text-gray-200">
            <span className="uppercase font-mono text-[10px] tracking-widest opacity-60">
              {activeService.number} / 07
            </span>
            <div className="flex items-center gap-1.5 pl-4 border-l border-ink/20">
              {SERVICES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => handleSelect(dotIdx)}
                  className={`h-2 rounded-full transition-all ${
                    activeIdx === dotIdx
                      ? 'w-5 bg-accent-coral'
                      : 'w-2 bg-ink/20 dark:bg-white/20 hover:bg-ink/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-xs shadow-brutalist hover:bg-accent-acid hover:text-ink transition-all"
              title="Previous Service"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-xs shadow-brutalist hover:bg-accent-acid hover:text-ink transition-all"
              title="Next Service"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
