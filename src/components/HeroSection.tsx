import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PenTool, Code, Cpu, Heart, Trophy, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set('.gsap-animate', { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set('.gsap-animate', { opacity: 0, y: 30 });
      gsap.set('.gsap-scale', { scaleX: 0, transformOrigin: 'left center' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      });

      tl.to('.gsap-animate', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }, 0);
      
      tl.to('.gsap-scale', {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, 0.2);

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="second-section" ref={sectionRef} className="relative w-full bg-[#050608] border-y border-[#1E2640]/50 text-white overflow-hidden selection:bg-[#00FF9D] selection:text-[#050608]">
      
      {/* Micro labels / Framing */}
      <div className="absolute top-4 left-6 text-[10px] uppercase font-mono tracking-widest text-gray-500 z-20 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#00FF9D] inline-block" />
        VARIATION 4
      </div>
      
      {/* 50/50 Split Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[50vh] max-h-[600px]">
        
        {/* LEFT SIDE: Content */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10 lg:py-12">
          {/* Subtle background grid on left only */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* Headline */}
          <div className="font-pixel text-[40px] sm:text-[50px] lg:text-[60px] xl:text-[72px] font-black leading-[0.85] tracking-tight uppercase relative z-10 mb-5 mt-4 lg:mt-0">
            <div className="gsap-animate text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">WE BUILD</div>
            <div className="gsap-animate flex items-baseline">
              <span className="text-[#00FF9D] drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">WORLDS.</span>
              <span className="inline-block w-2.5 h-2.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-[#EF4444] ml-2 lg:ml-3 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            </div>
          </div>

          {/* Emerald Banner */}
          <div className="gsap-scale w-max bg-[#00FF9D] text-[#050608] font-mono font-bold text-[10px] sm:text-xs px-3 py-1.5 mb-5 tracking-wider uppercase shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
            IDEAS BECOME LIVING EXPERIENCES.
          </div>

          {/* Paragraph */}
          <p className="gsap-animate font-mono text-xs sm:text-sm text-gray-300 max-w-md leading-relaxed mb-8">
            We fuse design, technology, AI, motion<br className="hidden sm:block" />
            and storytelling to craft digital<br className="hidden sm:block" />
            worlds that connect, inspire and last.
          </p>

          {/* 4 Pillars */}
          <div className="gsap-animate flex flex-col sm:flex-row flex-wrap lg:flex-nowrap gap-4 sm:gap-3 lg:gap-4 mb-8">
            <div className="flex-1 min-w-[90px] pr-2 sm:border-r border-[#1E2640]/50">
              <PenTool className="w-3.5 h-3.5 text-gray-400 mb-1.5" strokeWidth={1.5} />
              <div className="font-mono text-[9px] font-bold text-[#00FF9D] mb-0.5">DESIGN</div>
              <div className="font-mono text-[10px] text-gray-400 leading-tight">Crafting meaningful visuals.</div>
            </div>
            <div className="flex-1 min-w-[90px] pr-2 sm:border-r border-[#1E2640]/50">
              <Code className="w-3.5 h-3.5 text-gray-400 mb-1.5" strokeWidth={1.5} />
              <div className="font-mono text-[9px] font-bold text-[#00FF9D] mb-0.5">TECHNOLOGY</div>
              <div className="font-mono text-[10px] text-gray-400 leading-tight">Building scalable solutions.</div>
            </div>
            <div className="flex-1 min-w-[90px] pr-2 sm:border-r border-[#1E2640]/50 lg:border-r">
              <Cpu className="w-3.5 h-3.5 text-gray-400 mb-1.5" strokeWidth={1.5} />
              <div className="font-mono text-[9px] font-bold text-[#00FF9D] mb-0.5">AI &amp; MOTION</div>
              <div className="font-mono text-[10px] text-gray-400 leading-tight">Adding intelligence in motion.</div>
            </div>
            <div className="flex-1 min-w-[90px]">
              <Heart className="w-3.5 h-3.5 text-gray-400 mb-1.5" strokeWidth={1.5} />
              <div className="font-mono text-[9px] font-bold text-[#00FF9D] mb-0.5">STORYTELLING</div>
              <div className="font-mono text-[10px] text-gray-400 leading-tight">Telling stories that leave an impact.</div>
            </div>
          </div>

          {/* CTA */}
          <button className="gsap-animate group relative flex items-center gap-2 w-max px-4 py-2 border border-[#00FF9D] text-white font-mono text-[10px] tracking-wider uppercase overflow-hidden transition-colors duration-300 hover:bg-[#00FF9D]/10">
            <span className="relative z-10">EXPLORE OUR WORK</span>
            <ArrowUpRight className="w-3 h-3 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* RIGHT SIDE: Video Background */}
        <div className="relative w-full h-[30vh] lg:h-full overflow-hidden group">
          
          {/* Subtle gradient overlay to blend left edge on desktop */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#050608] via-[#050608]/80 to-transparent z-10 pointer-events-none" />
          
          {/* Top gradient to blend with torn paper transition above */}
          <div className="absolute inset-x-0 top-0 h-16 lg:h-24 bg-gradient-to-b from-[#050608] via-[#050608]/60 to-transparent z-10 pointer-events-none" />
          
          <video
            ref={videoRef}
            src="/images/floating%20world.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] group-hover:brightness-110"
          />

          {/* Accent bars top right */}
          <div className="absolute top-6 right-6 lg:top-8 lg:right-8 flex items-center gap-1.5 z-20">
            <div className="w-2 h-6 bg-[#8B5CF6]" />
            <div className="w-2 h-6 bg-[#F97316]" />
          </div>

          {/* Floating Glass Info Card */}
          <div className="absolute top-20 right-6 lg:top-24 lg:right-12 z-20 max-w-[220px] bg-black/40 backdrop-blur-md border border-white/10 p-5 shadow-2xl">
            <div className="font-mono text-[10px] text-gray-300 mb-2 uppercase tracking-widest">CREATIVE TECH</div>
            <div className="font-mono text-xs font-bold text-[#00FF9D] mb-4">20+ GLOBAL AWARDS</div>
            <p className="font-mono text-[10px] text-gray-400 leading-relaxed mb-4">
              Honored by leading platforms for pushing the boundaries of creativity and tech.
            </p>
            <Trophy className="w-5 h-5 text-[#00FF9D]" strokeWidth={1.5} />
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;

