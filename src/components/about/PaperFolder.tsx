import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaperFolderProps {
  activeSection: number;
}

const PAGE_CONTENTS = [
  {
    title: 'OUR STORY',
    subtitle: 'DETQEL ORIGIN & EVOLUTION',
    body: [
      "DetQel started with a group of curious minds who simply loved building things.",
      "What began as a small idea gradually grew into DetQel, a creative technology company working on websites, applications, and software solutions.",
      "Through real projects and hands-on experience, DetQel learned, improved, and shaped the way it works.",
      "Today, DetQel focuses on creating digital products that are reliable, easy to use, and genuinely useful for businesses, while continuously evolving with new technologies and ideas."
    ],
    tag: '© EST. 2022'
  },
  {
    title: 'OUR MISSION',
    subtitle: 'ENGINEERING PURPOSEFUL TECH',
    body: [
      "To build software and digital products that bridge human creativity with cutting-edge engineering.",
      "We strive to solve real-world problems through clean architecture, brutalist precision, and micro-interactions that leave a lasting impression.",
      "Every line of code we ship is crafted to be maintainable, performant, and delightful to experience."
    ],
    tag: 'PURPOSE // 02'
  },
  {
    title: 'OUR VALUES',
    subtitle: 'CRAFTSMANSHIP & TRANSPARENCY',
    body: [
      "We believe in radical transparency, unyielding craftsmanship, continuous innovation, and long-term client partnerships.",
      "No shortcuts. No dark patterns. Just honest, high-impact digital products built with pride."
    ],
    tag: 'ETHOS // 03'
  },
  {
    title: 'OUR TEAM',
    subtitle: 'DREAMERS & BUILDERS',
    body: [
      "A collective of passionate designers, full-stack engineers, AI researchers, and digital strategists committed to pushing the boundaries of the web.",
      "We combine design aesthetics with rigorous full-stack engineering to solve complex business problems."
    ],
    tag: 'PEOPLE // 04'
  },
  {
    title: 'WHY DETQEL',
    subtitle: 'BESPOKE DIGITAL EXCELLENCE',
    body: [
      "Because we treat every project as our flagship masterpiece. No boilerplate templates, no generic code—just bespoke digital engineering tailored to your brand vision.",
      "We deliver tangible code previews every week and guarantee production-ready execution."
    ],
    tag: 'ADVANTAGE // 05'
  },
  {
    title: 'THE JOURNEY',
    subtitle: 'CONSTANT LEARNING & GROWTH',
    body: [
      "From late-night code sprints in 2022 to shipping AI-powered platforms and WebGL experiences for global clients today, our journey is defined by constant learning and growth.",
      "We are building for the long haul, continuously expanding our technological capabilities."
    ],
    tag: 'TIMELINE // 06'
  }
];

export const PaperFolder: React.FC<PaperFolderProps> = ({ activeSection }) => {
  const currentDoc = PAGE_CONTENTS[activeSection] || PAGE_CONTENTS[0];

  return (
    <div className="w-full relative min-h-[460px] sm:min-h-[500px]">
      
      {/* Heavy Manila Folder Outer Backing */}
      <div className="absolute inset-0 bg-[#D4C3A3] dark:bg-[#3D372E] border-4 border-ink rounded-lg shadow-brutalist overflow-hidden transform rotate-[-0.5deg]">
        {/* Folder Top Manila Tab */}
        <div className="absolute -top-1 left-6 px-5 py-1 bg-[#C7B593] dark:bg-[#4A4338] border-2 border-b-0 border-ink rounded-t-md font-pixel text-xs font-bold text-ink dark:text-gray-200">
          📁 DETQEL ARCHIVE // {currentDoc.title}
        </div>
      </div>

      {/* Layered Paper Sheets Stack Visual (Behind) */}
      <div className="absolute inset-x-2 top-3 bottom-2 bg-[#F7F5EE] dark:bg-[#1E1C28] border-2 border-ink rounded-md transform rotate-[0.5deg] shadow-sm pointer-events-none" />
      <div className="absolute inset-x-3 top-4 bottom-3 bg-[#FAF8F2] dark:bg-[#161522] border-2 border-ink rounded-md transform rotate-[-0.2deg] shadow-sm pointer-events-none" />

      {/* ACTIVE UNFOLDED PAPER SHEET (Front) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ x: 40, opacity: 0, rotate: 1.5 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          exit={{ x: -40, opacity: 0, rotate: -1.5 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="relative z-10 p-6 sm:p-8 bg-[#FAF8F3] dark:bg-[#181624] text-ink dark:text-white border-3 border-ink rounded-md shadow-brutalist min-h-[440px] sm:min-h-[480px] flex flex-col justify-between"
        >
          {/* Paper Clip Visual on Top Left of Page */}
          <div className="absolute -top-3 left-6 w-3.5 h-7 border-2 border-ink rounded-t-full bg-gray-300 dark:bg-gray-700 z-20 shadow-xs" />

          {/* Document Header */}
          <div>
            <div className="flex items-center justify-between border-b-2 border-ink/20 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#88C000]" />
                <h3 className="font-pixel text-lg sm:text-xl font-extrabold uppercase text-ink dark:text-white tracking-wider flex items-center gap-2">
                  <span>📝</span> {currentDoc.title}
                </h3>
              </div>
              <span className="font-mono text-xs font-bold text-ink/60 dark:text-gray-400">
                {currentDoc.subtitle}
              </span>
            </div>

            {/* Document Body Paragraphs */}
            <div className="space-y-3.5 font-sans text-sm sm:text-base text-ink/85 dark:text-gray-200 leading-relaxed font-medium">
              {currentDoc.body.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Document Footer Stamp & Metadata */}
          <div className="pt-4 border-t-2 border-ink/20 flex items-center justify-between font-mono text-xs font-bold">
            <span className="text-ink/60 dark:text-gray-400">{currentDoc.tag}</span>
            <div className="flex items-center gap-1.5 bg-[#88C000]/15 text-ink dark:text-[#88C000] px-2.5 py-1 border border-ink rounded-xs font-pixel text-[10px] uppercase">
              <span>CONFIDENTIAL</span>
            </div>
          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
};
