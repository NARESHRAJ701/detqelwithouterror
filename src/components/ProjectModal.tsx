import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../types';
import { MockupCanvas } from './MockupCanvas';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';
import { X, ExternalLink, Award, Code2 } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-ink/80 backdrop-blur-md"
        />

        {/* Modal Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-white dark:bg-canvas-dark-paper border-2 border-ink shadow-brutalist-lg rounded-xs overflow-hidden z-10 my-auto text-ink dark:text-white"
        >
          {/* Modal Header Bar */}
          <div className="flex justify-between items-center px-6 py-4 border-b-2 border-ink bg-canvas-paper dark:bg-canvas-dark">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className={`px-2 py-0.5 font-pixel font-bold text-ink ${project.bgAccent}`}>
                PROJECT #{project.number}
              </span>
              <span className="hidden sm:inline opacity-60">// {project.category}</span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              onMouseEnter={() => triggerCursor('CLOSE', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="p-2 bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-xs hover:bg-accent-coral hover:text-white transition-all shadow-brutalist-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Grid */}
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8">
            {/* Title & Badge */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs bg-ink text-white dark:bg-accent-acid dark:text-ink px-3 py-1 font-bold">
                <Award className="w-4 h-4" /> {project.badgeText}
              </div>
              <h2 className="font-pixel text-4xl sm:text-6xl font-black uppercase tracking-tight">
                {project.title}
              </h2>
              <p className="font-sans text-xl text-ink/80 dark:text-gray-300 font-medium">
                {project.subtitle}
              </p>
            </div>

            {/* Interactive High-Def Canvas Showcase Frame */}
            <div className="w-full aspect-[16/9] min-h-[300px] border-2 border-ink rounded-xs overflow-hidden shadow-brutalist">
              <MockupCanvas type={project.mockupType} accentColor={project.accentColor} imageSrc={project.image} title={project.title} />
            </div>

            {/* Detailed Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-canvas-paper dark:bg-canvas-dark border-2 border-ink font-mono text-xs">
              <div>
                <span className="text-ink/60 dark:text-gray-400">CLIENT</span>
                <p className="font-bold text-sm mt-0.5">{project.client}</p>
              </div>
              <div>
                <span className="text-ink/60 dark:text-gray-400">ROLE</span>
                <p className="font-bold text-sm mt-0.5">{project.role}</p>
              </div>
              <div>
                <span className="text-ink/60 dark:text-gray-400">YEAR</span>
                <p className="font-bold text-sm mt-0.5">{project.year}</p>
              </div>
              <div>
                <span className="text-ink/60 dark:text-gray-400">IMPACT METRICS</span>
                <p className="font-bold text-sm mt-0.5 text-accent-coral">{project.metrics}</p>
              </div>
            </div>

            {/* Deep-Dive Case Study Paragraph */}
            <div className="space-y-4 text-lg text-ink/80 dark:text-gray-300 leading-relaxed font-sans">
              <h3 className="font-pixel text-xl uppercase font-bold text-ink dark:text-white">
                PROJECT OVERVIEW & ARCHITECTURE
              </h3>
              <p>{project.fullDescription}</p>
            </div>

            {/* Tech Tags List */}
            <div>
              <span className="font-mono text-xs font-bold text-ink/60 dark:text-gray-400 block mb-2">
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs font-bold px-3 py-1 bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-xs shadow-brutalist-sm"
                  >
                    ⚡ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t-2 border-ink">
              <MagneticButton cursorText="LAUNCH">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playSuccess()}
                  className="inline-flex items-center gap-2 bg-ink text-white dark:bg-accent-acid dark:text-ink px-6 py-3 font-pixel text-sm font-bold border-2 border-ink shadow-brutalist hover:bg-accent-coral hover:text-white transition-all"
                >
                  LIVE DEMO PREVIEW <ExternalLink className="w-4 h-4" />
                </a>
              </MagneticButton>

              <MagneticButton cursorText="GITHUB">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 bg-white dark:bg-canvas-dark-paper text-ink dark:text-white px-6 py-3 font-mono text-xs font-bold border-2 border-ink shadow-brutalist hover:bg-sticky-yellow hover:text-ink transition-all"
                >
                  SOURCE CODE <Code2 className="w-4 h-4" />
                </a>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
