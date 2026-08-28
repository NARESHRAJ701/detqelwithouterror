import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Pause, ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, UserCheck } from 'lucide-react';
import { sound } from '../utils/sound';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rohit Sharma',
    role: 'Startup Founder',
    company: 'Go Planet Coffee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: "Detqel understood our vision perfectly and built a product that we're extremely proud of.",
  },
  {
    id: '2',
    name: 'Aadya Reddy',
    role: 'Marketing Head',
    company: 'ARI Matcha',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Their AI solutions genuinely improved our processes and saved us both time and cost.',
  },
  {
    id: '3',
    name: 'Vikram Patel',
    role: 'CTO',
    company: 'Nexora AI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'From concept to scaling, the experience was seamless and world-class.',
  },
  {
    id: '4',
    name: 'Neha Fernandes',
    role: 'Product Owner',
    company: 'MoveFit Digital',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: "Detqel doesn't just build — they build with a mission. That's the difference we always felt.",
  },
];

export const RobotTestimonialScene: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'CLIENTS' | 'REVIEWS'>('REVIEWS');

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    sound.playClick();
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    sound.playClick();
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-8 select-none font-sans overflow-hidden">
      {/* Framed Glass Container */}
      <div className="max-w-[1540px] mx-auto relative z-10 bg-black/45 dark:bg-black/65 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl text-white flex flex-col justify-between space-y-8">
        
        {/* TOP HEADER BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
          
          {/* Left: Title & Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-white tracking-widest uppercase">
              <Sparkles className="w-4 h-4 text-[#B7E532]" />
              <span>TESTIMONIALS. DELIVERY. IMPACT.</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl border border-white/15 font-mono text-[11px]">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('CLIENTS');
                }}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  activeTab === 'CLIENTS' ? 'bg-[#00A676] text-black shadow-xs' : 'text-white/70 hover:text-white'
                }`}
              >
                CLIENTS
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('REVIEWS');
                }}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  activeTab === 'REVIEWS' ? 'bg-[#FF6B35] text-white shadow-xs' : 'text-white/70 hover:text-white'
                }`}
              >
                REVIEWS
              </button>
            </div>
          </div>

          {/* Right: Autoplay toggle & Projects delivered badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setIsPlaying(!isPlaying);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-mono text-xs text-white/90 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#B7E532]" /> : <Play className="w-3.5 h-3.5 text-[#B7E532]" />}
              <span>{isPlaying ? 'AUTOPLAY ON' : 'PAUSED'}</span>
            </button>

            <a
              href="#portfolio"
              onClick={() => sound.playClick()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#B7E532] text-black font-mono text-xs font-bold shadow-md hover:scale-105 transition-transform"
            >
              <span>10+ PROJECTS DELIVERED</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* MIDDLE CONTENT: ROBOT SPEAKER VISUALIZER + TESTIMONIALS CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
          
          {/* Left: Glowing Futuristic Robotic Node (Speaker / Visualizer) */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full border-2 border-white/30 flex items-center justify-center shadow-[0_0_50px_rgba(183,229,50,0.25)] p-2"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #1C232E 0%, #0A0E14 80%)'
              }}
            >
              {/* Outer Glow Halo */}
              <div className="absolute inset-1 rounded-full border border-[#B7E532]/40 animate-pulse" />
              
              {/* Inner LiDAR Dish */}
              <div className="w-24 h-24 rounded-full bg-black/90 border border-white/40 flex flex-col items-center justify-center relative shadow-inner">
                <motion.div
                  animate={{ scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00A676] to-[#B7E532] flex items-center justify-center text-black font-pixel text-base font-black shadow-lg"
                >
                  δ
                </motion.div>
                <span className="font-mono text-[8px] text-[#B7E532] mt-1 font-bold tracking-widest uppercase">
                  DETQEL BOT
                </span>
              </div>
            </motion.div>

            <span className="font-mono text-[11px] text-[#B7E532] font-bold mt-3 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7E532] animate-ping" />
              VERIFIED IMPACT
            </span>
          </div>

          {/* Right: Testimonial Cards Carousel */}
          <div className="lg:col-span-9 relative">
            
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TESTIMONIALS.map((card, idx) => {
                const isSelected = currentIndex === idx;
                return (
                  <motion.div
                    key={card.id}
                    onClick={() => {
                      sound.playClick();
                      setCurrentIndex(idx);
                    }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-white/15 dark:bg-white/10 border-[#B7E532] shadow-[0_0_25px_rgba(183,229,50,0.15)] ring-1 ring-[#B7E532]'
                        : 'bg-black/25 dark:bg-white/5 border-white/10 hover:border-white/30 opacity-75 hover:opacity-100'
                    }`}
                  >
                    {/* User info & Stars */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={card.avatar}
                          alt={card.name}
                          className="w-11 h-11 rounded-full border border-white/30 object-cover shadow-sm"
                        />
                        <div>
                          <h4 className="font-pixel text-sm font-black text-white uppercase tracking-wide">
                            {card.name}
                          </h4>
                          <span className="font-mono text-[10px] text-white/70 block">
                            {card.role} • {card.company}
                          </span>
                        </div>
                      </div>

                      {/* 5-star rating */}
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-[#FF6B35] text-[#FF6B35]" />
                        ))}
                      </div>
                    </div>

                    {/* Quote text */}
                    <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                      "{card.text}"
                    </p>

                    {/* Verified badge */}
                    <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] font-mono text-white/60">
                      <span className="flex items-center gap-1 text-[#00A676]">
                        <UserCheck className="w-3 h-3" /> Verified Client
                      </span>
                      <span className="text-[#B7E532]">5.0 Rating</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      sound.playClick();
                      setCurrentIndex(i);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === i ? 'w-8 bg-[#B7E532]' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM STATUS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4 font-mono text-xs text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A676]" />
            <span>HAPPY CLIENTS, STRONGER PRODUCTS.</span>
          </div>

          <div className="hidden md:block text-white/50">
            KEEP BUILDING, KEEP IMPACTING.
          </div>

          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="text-[#B7E532] hover:underline font-bold flex items-center gap-1"
          >
            <span>BE PART OF OUR STORY</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default RobotTestimonialScene;
