import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Pause, RotateCcw } from 'lucide-react';
import { sound } from '../utils/sound';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  tapeColor: string;
  pinType: 'tape' | 'pin' | 'clip' | 'yellow-tape';
  rotation: number;
  offsetY: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rohit Sharma',
    company: 'Go Planet Coffee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Detqel understood our vision perfectly and delivered a brand that our customers love.',
    tapeColor: 'bg-purple-400/70',
    pinType: 'tape',
    rotation: -4,
    offsetY: -10
  },
  {
    id: '2',
    name: 'Ananya Reddy',
    company: 'ARI Matcha',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 4.5,
    text: 'Their design process is insanely good. Every detail was crafted with purpose and clarity.',
    tapeColor: 'bg-emerald-500',
    pinType: 'pin',
    rotation: 2,
    offsetY: 15
  },
  {
    id: '3',
    name: 'Vikram Patel',
    company: 'Nexora AI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'From product thinking to development, the Detqel team is world-class.',
    tapeColor: 'bg-amber-400/70',
    pinType: 'tape',
    rotation: -2,
    offsetY: -5
  },
  {
    id: '4',
    name: 'Billa Ferments',
    company: 'Billa Hotsauce',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 4.5,
    text: 'Hyper-vibrant design with liquid WebGL shaders that blew our audience away!',
    tapeColor: 'bg-rose-400/80',
    pinType: 'clip',
    rotation: 3,
    offsetY: 20
  },
  {
    id: '5',
    name: 'Meera Iyer',
    company: 'MoveFit',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'They feel like an extension of our team. Super reliable and extremely talented.',
    tapeColor: 'bg-sky-400/70',
    pinType: 'yellow-tape',
    rotation: 5,
    offsetY: 10
  }
];

const renderRatingStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-2 mb-2.5">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <Star 
                key={i} 
                className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.7)]" 
              />
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative w-4 h-4">
                <Star className="w-4 h-4 text-gray-600 fill-gray-700/40 absolute inset-0" />
                <div className="overflow-hidden w-[50%] absolute inset-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.7)]" />
                </div>
              </div>
            );
          } else {
            return (
              <Star 
                key={i} 
                className="w-4 h-4 text-gray-600 fill-gray-700/40" 
              />
            );
          }
        })}
      </div>

      {/* Rating numerical value display beside stars */}
      <span className="font-mono text-xs font-black text-amber-300 bg-amber-950/80 border border-amber-500/50 px-1.5 py-0.5 rounded-sm shadow-xs">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export const RobotTestimonialScene: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section className="py-16 px-4 sm:px-8 bg-[#EFECE6] dark:bg-[#18171C] border-y-2 border-ink relative overflow-hidden select-none">
      
      {/* Warm Oak Tabletop Texture Backdrop */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      {/* Main Isolated Scene Container */}
      <div className="max-w-7xl mx-auto relative min-h-[580px] flex flex-col justify-between p-6 bg-[#F5F2EC] dark:bg-[#1E1C24] border-2 border-ink rounded-xs shadow-brutalist-lg overflow-hidden">
        
        {/* Soft Afternoon Sunlight Overlay from Left */}
        <div className="absolute top-0 left-0 bottom-0 w-1/2 bg-gradient-to-r from-amber-100/30 via-amber-50/10 to-transparent pointer-events-none z-10" />

        {/* Top Control Header Bar */}
        <div className="flex flex-wrap justify-between items-center z-20 font-mono text-xs mb-4 gap-3">
          {/* Left Controls: BOT Title + Horizontal PLANS & IMPACT Row Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-white dark:bg-canvas-dark-paper px-3 py-1.5 border-2 border-ink shadow-brutalist-sm rounded-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-acid animate-ping" />
              <span className="font-bold text-ink dark:text-white uppercase tracking-wider">
                TESTIMONIAL_DELIVERY_BOT_v2.4
              </span>
            </div>

            {/* PLANS & IMPACT Row Order Buttons */}
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
              <div className="bg-[#059669] text-white px-3 py-1.5 border-2 border-ink rounded-xs shadow-brutalist-sm">
                PLANS
              </div>
              <div className="bg-[#D97706] text-white px-3 py-1.5 border-2 border-ink rounded-xs shadow-brutalist-sm">
                IMPACT
              </div>
            </div>
          </div>

          {/* Right Controls: Pause / Resume Drive & Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                sound.playClick();
              }}
              className="flex items-center gap-1.5 bg-white dark:bg-canvas-dark-paper px-3 py-1.5 border-2 border-ink shadow-brutalist-sm hover:bg-accent-acid hover:text-ink font-bold transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'PAUSE MOTION' : 'RESUME DRIVE'}</span>
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setTimeout(() => setIsPlaying(true), 50);
                sound.playClick();
              }}
              className="p-1.5 bg-white dark:bg-canvas-dark-paper border-2 border-ink shadow-brutalist-sm hover:bg-accent-coral hover:text-white transition-all"
              title="Reset Position"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* DYNAMIC SCENE CANVAS: ROBOT VACUUM + ROPE + TESTIMONIAL CARDS */}
        <div className="relative w-full h-[400px] my-auto flex items-center overflow-hidden">
          
          {/* Curved Motion Track & Leftward Arrows */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0">
            <svg className="w-full h-24 stroke-ink/30 dark:stroke-white/30" fill="none" strokeDasharray="8 8">
              <path d="M 0 40 Q 300 10 600 50 T 1200 40" strokeWidth="2.5" />
            </svg>
            <div className="absolute left-1/4 flex items-center gap-2 font-mono text-xs text-ink/50 dark:text-white/50 font-bold animate-pulse">
              <span>← ← CLEAN DESK PATH</span>
            </div>
          </div>

          {/* DRIVING CONTAINER: ROBOT LEADS ON LEFT, PULLING ROPE & CARDS ON RIGHT */}
          <motion.div
            animate={isPlaying ? { x: ['65%', '-45%'] } : {}}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex items-center gap-0 relative z-20 cursor-grab active:cursor-grabbing"
          >
            {/* 1. ULTRA-SLEEK 3D APPLE-STYLE ROBOTIC VACUUM CLEANER (LEADS ON THE LEFT) */}
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-48 h-48 rounded-full z-30 group shrink-0 select-none"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #F1F1F5 60%, #E2E2EA 100%)',
                boxShadow: '0 25px 40px -12px rgba(0,0,0,0.35), inset 0 2px 4px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.15), 0 0 0 3px #0E0E11'
              }}
            >
              {/* Front Scanning Laser Headlight Beam (Projecting to the left ←) */}
              <div 
                className="absolute right-full top-1/2 -translate-y-1/2 w-28 h-20 pointer-events-none opacity-60 z-0"
                style={{
                  background: 'polygon(100% 50%, 0% 0%, 0% 100%)',
                  backgroundClip: 'polygon',
                  backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(224,255,0,0.35) 100%)',
                  clipPath: 'polygon(100% 50%, 0% 15%, 0% 85%)'
                }}
              />

              {/* Front Bumper Shield on Left (Direction of travel ←) */}
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-16 rounded-l-full border-l-2 border-y-2 border-ink shadow-sm z-40 flex items-center justify-center"
                style={{ background: 'linear-gradient(180deg, #7939a1 0%, #B2E600 100%)' }}
              >
                <div className="w-1.5 h-6 bg-black/40 rounded-full animate-pulse" />
              </div>

              {/* Chrome Metallic Tow Hitch at Rear (Right Side) */}
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-6 rounded-r-md border-2 border-ink shadow-md z-40 flex items-center justify-center bg-gradient-to-r from-gray-200 via-gray-100 to-gray-400">
                <div className="w-2 h-2 rounded-full bg-ink flex items-center justify-center text-[7px] text-accent-acid font-bold">
                  ⚓
                </div>
              </div>

              {/* Outer Metallic Bevel Ring */}
              <div className="absolute inset-2 rounded-full border border-black/15 shadow-inner" />

              {/* Dark Tinted Glass Faceplate Dish */}
              <div 
                className="absolute inset-5 rounded-full border-2 border-ink flex flex-col items-center justify-center overflow-hidden z-20"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #1A1A22 0%, #0E0E11 70%, #050507 100%)',
                  boxShadow: 'inset 0 4px 12px rgba(255,255,255,0.15), 0 4px 10px rgba(0,0,0,0.4)'
                }}
              >
                {/* White Gloss Light Reflection Streak */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xs pointer-events-none" />

                {/* Glowing Neon Lime LED Halo Ring */}
                <div className="w-24 h-24 rounded-full border-2 border-accent-acid shadow-[0_0_20px_#7939a1,inset_0_0_10px_#7939a1] flex flex-col items-center justify-center relative">
                  
                  {/* Central Raised LiDAR Turret Dome */}
                  <div 
                    className="w-14 h-14 rounded-full border border-white/30 shadow-lg flex items-center justify-center relative"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #2C2C38 0%, #121218 80%)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.4)'
                    }}
                  >
                    {/* Rotating LiDAR Laser Indicator */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-1 rounded-full border-t-2 border-l-2 border-accent-acid opacity-90"
                    />

                    <div className="text-center font-mono text-[8px] text-white font-black tracking-widest leading-none z-10">
                      DETQEL
                      <span className="block text-[6px] text-accent-acid mt-0.5 font-pixel">ROBOTICS</span>
                    </div>
                  </div>

                </div>

                {/* Left Sensor Status Light */}
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-acid animate-ping shadow-[0_0_8px_#7939a1]" />
              </div>

              {/* Dual Spinning Side Sweeper Brushes Underneath */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-3 left-4 w-9 h-9 pointer-events-none z-10 flex items-center justify-center"
              >
                <div className="w-full h-0.5 bg-ink rotate-0 absolute" />
                <div className="w-full h-0.5 bg-ink rotate-60 absolute" />
                <div className="w-full h-0.5 bg-ink rotate-120 absolute" />
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-3 left-4 w-9 h-9 pointer-events-none z-10 flex items-center justify-center"
              >
                <div className="w-full h-0.5 bg-ink rotate-0 absolute" />
                <div className="w-full h-0.5 bg-ink rotate-60 absolute" />
                <div className="w-full h-0.5 bg-ink rotate-120 absolute" />
              </motion.div>

            </motion.div>

            {/* 2. REALISTIC TAUT JUTE ROPE CONNECTOR */}
            <div className="w-24 h-10 flex items-center justify-center relative -mx-1 z-20 shrink-0">
              <svg className="w-full h-full stroke-amber-800 dark:stroke-amber-500" fill="none">
                {/* Taut tension rope path */}
                <path d="M 0 20 Q 45 14, 96 20" strokeWidth="4" strokeDasharray="4 2" />
              </svg>
            </div>

            {/* 3. TESTIMONIAL CARDS TRAIL (PULLED BEHIND ROBOT ON THE RIGHT) */}
            <div className="flex items-center -space-x-8 pl-1">
              {TESTIMONIALS.map((card, idx) => {
                const isActive = activeCard === card.id;

                return (
                  <motion.div
                    key={card.id}
                    style={{ translateY: card.offsetY }}
                    animate={{ rotate: [card.rotation - 1, card.rotation + 1, card.rotation - 1] }}
                    transition={{ duration: 3 + idx, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                    onMouseEnter={() => {
                      setActiveCard(card.id);
                      sound.playHover();
                    }}
                    onMouseLeave={() => setActiveCard(null)}
                    className={`relative w-64 bg-[#232129] border-2 border-ink rounded-xs p-4 shadow-brutalist transition-all duration-300 text-white ${
                      isActive ? 'ring-2 ring-accent-acid z-40 scale-105' : 'z-10'
                    }`}
                  >
                    {/* Tape / Pin Decorative Element */}
                    {card.pinType === 'tape' && (
                      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 ${card.tapeColor} border border-black/20 rotate-[-2deg] shadow-xs`} />
                    )}
                    {card.pinType === 'pin' && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-ink shadow-sm" />
                    )}
                    {card.pinType === 'clip' && (
                      <div className="absolute -top-4 right-4 w-3 h-6 border-2 border-accent-coral rounded-sm rotate-12" />
                    )}
                    {card.pinType === 'yellow-tape' && (
                      <div className={`absolute -top-3 right-6 w-16 h-5 ${card.tapeColor} border border-black/20 rotate-[3deg] shadow-xs`} />
                    )}

                    {/* Client Avatar & Details */}
                    <div className="flex items-center gap-3 mb-3 pt-1">
                      <img
                        src={card.avatar}
                        alt={card.name}
                        className="w-10 h-10 rounded-full border-2 border-ink object-cover"
                      />
                      <div>
                        <h4 className="font-pixel text-sm sm:text-base font-bold text-white leading-tight tracking-wide">
                          {card.name}
                        </h4>
                        <span className="font-mono text-[10px] text-gray-300 font-bold block">
                          {card.company}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating with Rating Number Badge */}
                    {renderRatingStars(card.rating)}

                    {/* Testimonial Quote Text */}
                    <p className="font-sans text-xs sm:text-sm text-white leading-relaxed font-medium">
                      "{card.text}"
                    </p>

                    {/* Corner Doodle */}
                    <div className="absolute bottom-1 right-2 text-[9px] font-handwriting text-gray-400">
                      verified client ✓
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

        </div>

        {/* BOTTOM ISOLATED DESK BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t-2 border-ink font-mono text-xs text-ink/70 dark:text-gray-400 gap-3 z-20">
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-accent-coral" />
            <span>ROBOT DELIVERY PATH // RIGHT TO LEFT</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>ROPE TENSION: NOMINAL</span>
            <span>CLEAN SPEED: 0.4 M/S</span>
            <span className="bg-accent-acid text-ink font-bold px-2 py-0.5 border border-ink">
              5 HAPPY CLIENTS COLLECTED
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
