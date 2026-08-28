import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowRight, ExternalLink, SlidersHorizontal, X, ChevronLeft, ChevronRight, Maximize2, Film } from 'lucide-react';
import { ProjectsSection } from '../ProjectsSection';
import { client } from '../../lib/sanity';
import { sound } from '../../utils/sound';
import { CREATIVE_ASSETS } from '../../data/creativeAssets';
import type { CreativeAsset } from '../../data/creativeAssets';

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ────────────────────────────────────────────────────────────────────

type FilterKey = 'ALL' | 'BRANDING' | 'WEB DEVELOPMENT' | 'UI/UX DESIGN' | 'APPLICATIONS' | 'MOTION' | 'OTHERS';

interface PortfolioProject {
  id: string;
  number: string;
  title: string;
  category: FilterKey;
  categoryLabel: string;
  description: string;
  accent: string;
  accentText: string;
  bgGradient: string;
  voxelColor: string;
  tags: string[];
}

const PROJECTS: PortfolioProject[] = [
  {
    id: 'ayura-candles',
    number: '01',
    title: 'Ayura Candles',
    category: 'BRANDING',
    categoryLabel: 'BRANDING',
    description: 'Brand identity, packaging & website for a premium Ayurvedic candle brand.',
    accent: '#FF6B35',
    accentText: 'text-orange-500',
    bgGradient: 'from-orange-50 to-amber-50',
    voxelColor: '#FF6B35',
    tags: ['Logo', 'Packaging', 'Website'],
  },
  {
    id: 'solarex-energy',
    number: '02',
    title: 'Solarex Energy',
    category: 'WEB DEVELOPMENT',
    categoryLabel: 'WEB DEVELOPMENT',
    description: 'Corporate website for a solar & renewable energy company.',
    accent: '#7939a1',
    accentText: 'text-purple-600',
    bgGradient: 'from-purple-50 to-cyan-50',
    voxelColor: '#7939a1',
    tags: ['React', 'Next.js', 'Motion'],
  },
  {
    id: 'lifelinex-app',
    number: '03',
    title: 'LifelineX App',
    category: 'UI/UX DESIGN',
    categoryLabel: 'UI/UX DESIGN',
    description: 'Emergency service app connecting users to ambulance, fuel & mechanics.',
    accent: '#06B6D4',
    accentText: 'text-cyan-500',
    bgGradient: 'from-cyan-50 to-blue-50',
    voxelColor: '#06B6D4',
    tags: ['UX', 'UI Kit', 'Figma'],
  },
  {
    id: 'neostep',
    number: '04',
    title: 'Neostep',
    category: 'BRANDING',
    categoryLabel: 'BRANDING',
    description: 'Branding, logo & product mockups for a modern footwear brand.',
    accent: '#FF6B35',
    accentText: 'text-orange-500',
    bgGradient: 'from-orange-50 to-yellow-50',
    voxelColor: '#FF6B35',
    tags: ['Identity', 'Mockups', '3D'],
  },
  {
    id: 'brew-aura',
    number: '05',
    title: 'Brew Aura',
    category: 'WEB DEVELOPMENT',
    categoryLabel: 'WEB DEVELOPMENT',
    description: 'Restaurant website with elegant UI and seamless user experience.',
    accent: '#7939a1',
    accentText: 'text-purple-600',
    bgGradient: 'from-purple-50 to-pink-50',
    voxelColor: '#7939a1',
    tags: ['Website', 'UI/UX', 'CMS'],
  },
  {
    id: 'go-planet-coffee',
    number: '06',
    title: 'Go Planet Coffee',
    category: 'MOTION',
    categoryLabel: 'MOTION DESIGN',
    description: 'Motion branding & social media content that brews engagement.',
    accent: '#EAB308',
    accentText: 'text-yellow-500',
    bgGradient: 'from-yellow-50 to-amber-50',
    voxelColor: '#EAB308',
    tags: ['Motion', 'Social', 'Video'],
  },
];

const FILTERS: FilterKey[] = ['ALL', 'BRANDING', 'WEB DEVELOPMENT', 'UI/UX DESIGN', 'APPLICATIONS', 'MOTION', 'OTHERS'];

// ─── VOXEL SCENE COMPONENTS ───────────────────────────────────────────────────

// Floating Cube – purely CSS/SVG voxel cube with 3 visible faces
const VoxelCube: React.FC<{
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}> = ({ size = 16, color = '#7939a1', style, className = '' }) => {
  const face = `${size}px`;
  const h = size * 0.5;
  const w = size;
  const dark = shadeHex(color, -30);
  const mid = shadeHex(color, -15);
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: face, height: `${h + size}px`, ...style }}
    >
      {/* top face */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0,
          width: w, height: h,
          background: color,
          clipPath: 'polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)',
        }}
      />
      {/* left face */}
      <div
        style={{
          position: 'absolute', top: h * 0.5, left: 0,
          width: w / 2, height: h * 1.5,
          background: dark,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 80%)',
        }}
      />
      {/* right face */}
      <div
        style={{
          position: 'absolute', top: h * 0.5, left: w / 2,
          width: w / 2, height: h * 1.5,
          background: mid,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 0% 100%)',
        }}
      />
    </div>
  );
};

function shadeHex(hex: string, pct: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * pct);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `rgb(${R},${G},${B})`;
}

// ── Hero Voxel Scene ───────────────────────────────────────────────────────────
const HeroVoxelScene: React.FC = () => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-full flex items-end justify-center"
      style={{ height: 320 }}
    >
      {/* Platform */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: 340, height: 80 }}>
        {/* platform top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 340, height: 50,
          background: '#EBEBEB',
          clipPath: 'polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)',
        }} />
        {/* platform left */}
        <div style={{
          position: 'absolute', top: 25, left: 0, width: 170, height: 55,
          background: '#D0D0D0',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 80%)',
        }} />
        {/* platform right */}
        <div style={{
          position: 'absolute', top: 25, left: 170, width: 170, height: 55,
          background: '#C0C0C0',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 0% 100%)',
        }} />
      </div>

      {/* Monitor */}
      <div className="absolute" style={{ bottom: 70, left: '50%', transform: 'translateX(-50%)' }}>
        {/* screen body */}
        <div style={{
          width: 140, height: 90,
          background: '#1a1a2e',
          borderRadius: 4,
          border: '3px solid #111',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          {/* screen bezel purple top */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: '#7939a1', borderRadius: '3px 3px 0 0' }} />
          <div style={{ textAlign: 'center', color: '#C8FF2F', fontFamily: 'monospace', fontSize: 10, fontWeight: 900, lineHeight: 1.3 }}>
            DETQEL<br />BUILDS<br />IMPACT.
          </div>
        </div>
        {/* monitor neck */}
        <div style={{ width: 20, height: 18, background: '#888', margin: '0 auto', borderLeft: '1px solid #666', borderRight: '1px solid #666' }} />
        {/* monitor base */}
        <div style={{ width: 60, height: 6, background: '#999', margin: '0 auto', borderRadius: 2, border: '1px solid #666' }} />
      </div>

      {/* Keyboard */}
      <div className="absolute" style={{ bottom: 54, left: 'calc(50% + 30px)' }}>
        <div style={{
          width: 80, height: 18, background: '#DCDCDC', borderRadius: 2, border: '1px solid #aaa',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2,
        }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ width: 8, height: 10, background: '#bbb', borderRadius: 1, border: '0.5px solid #999' }} />
          ))}
        </div>
      </div>

      {/* Lamp */}
      <div className="absolute" style={{ bottom: 55, left: 'calc(50% - 100px)' }}>
        <div style={{ width: 6, height: 40, background: '#aaa', margin: '0 auto', borderRadius: 2 }} />
        <div style={{ width: 28, height: 14, background: '#FFD700', borderRadius: '50%', marginTop: -4, border: '2px solid #aaa', boxShadow: '0 4px 12px rgba(255,215,0,0.5)' }} />
      </div>

      {/* Plant */}
      <div className="absolute" style={{ bottom: 56, left: 'calc(50% + 90px)' }}>
        <div style={{ width: 16, height: 20, background: '#8B6914', borderRadius: '2px 2px 0 0', border: '1px solid #5a4008' }} />
        <div style={{ position: 'absolute', bottom: 18, left: 2, width: 12, height: 20, background: '#22C55E', borderRadius: '50% 50% 10% 10%' }} />
        <div style={{ position: 'absolute', bottom: 22, left: -2, width: 10, height: 16, background: '#16A34A', borderRadius: '50% 50% 10% 10%', transform: 'rotate(-20deg)' }} />
        <div style={{ position: 'absolute', bottom: 22, left: 10, width: 10, height: 16, background: '#16A34A', borderRadius: '50% 50% 10% 10%', transform: 'rotate(20deg)' }} />
      </div>

      {/* Floating cubes */}
      {[
        { x: -130, y: 160, color: '#7939a1', size: 20, delay: 0 },
        { x: 140, y: 140, color: '#06B6D4', size: 16, delay: 0.5 },
        { x: -90, y: 80, color: '#FF6B35', size: 12, delay: 1 },
        { x: 160, y: 60, color: '#EAB308', size: 14, delay: 1.5 },
        { x: -150, y: 40, color: '#84CC16', size: 10, delay: 0.8 },
        { x: 120, y: 20, color: '#EC4899', size: 12, delay: 1.2 },
        { x: 60, y: 10, color: '#7939a1', size: 8, delay: 0.3 },
        { x: -60, y: 20, color: '#06B6D4', size: 10, delay: 0.7 },
      ].map((cube, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ right: 'calc(50%)', bottom: 0, marginRight: cube.x, marginBottom: cube.y }}
          animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: cube.delay, ease: 'easeInOut' }}
        >
          <VoxelCube size={cube.size} color={cube.color} />
        </motion.div>
      ))}

      {/* Pixel particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`p${i}`}
          className="absolute rounded-none"
          style={{
            width: 4, height: 4,
            background: ['#7939a1', '#06B6D4', '#FF6B35', '#EAB308', '#84CC16', '#EC4899', '#7939a1', '#06B6D4'][i],
            right: `${20 + i * 11}%`,
            bottom: `${10 + (i % 3) * 25}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  );
};

// ── Stat Icon Cubes ────────────────────────────────────────────────────────────
const StatIcon: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <motion.div
    whileHover={{ rotate: 15, scale: 1.15 }}
    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    className="flex-shrink-0"
  >
    <div className="relative w-10 h-10 flex items-center justify-center text-lg" style={{ filter: `drop-shadow(2px 4px 0 ${shadeHex(color, -40)})` }}>
      <div className="absolute inset-0 rounded-sm" style={{ background: color }} />
      <span className="relative z-10">{children}</span>
    </div>
  </motion.div>
);

// ── Project Voxel Artwork ──────────────────────────────────────────────────────
const ProjectArtwork: React.FC<{ project: any; isHovered: boolean }> = ({ project, isHovered }) => {
  const artMap: Record<string, React.ReactNode> = {
    'ayura-candles': <AyuraArt accent={project.accent} hover={isHovered} />,
    'ayura-candeo': <AyuraArt accent={project.accent} hover={isHovered} />,
    'solarex-energy': <SolarexArt accent={project.accent} hover={isHovered} />,
    'solarix-energy': <SolarexArt accent={project.accent} hover={isHovered} />,
    'lifelinex-app': <LifelineXArt accent={project.accent} hover={isHovered} />,
    'lifelinex': <LifelineXArt accent={project.accent} hover={isHovered} />,
    'neostep': <NeostepArt accent={project.accent} hover={isHovered} />,
    'brew-aura': <BrewAuraArt accent={project.accent} hover={isHovered} />,
    'go-planet-coffee': <GoPlanetArt accent={project.accent} hover={isHovered} />,
  };
  const projectId = project.slug?.current || project.id || '';
  return <>{artMap[projectId] || <DefaultArt color={project.accent} hover={isHovered} />}</>;
};

// Individual artwork components using CSS/SVG voxels
const AyuraArt: React.FC<{ accent: string; hover: boolean }> = ({ accent, hover }) => (
  <div className="relative w-full h-full flex items-end justify-center pb-2">
    {/* Stone platform */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: 120, height: 32, background: '#C8C4BE', clipPath: 'polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} />
    <div className="absolute" style={{ bottom: 0, left: 'calc(50% - 60px)', width: 60, height: 28, background: '#A8A49E', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 80%)' }} />
    <div className="absolute" style={{ bottom: 0, left: '50%', width: 60, height: 28, background: '#988E88', clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 0% 100%)' }} />
    {/* Candle jar */}
    <div className="absolute" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
      <div style={{ width: 32, height: 38, background: '#E8DCC8', border: '2px solid #C8B89A', borderRadius: '4px 4px 6px 6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 8, fontFamily: 'monospace', fontWeight: 900, color: '#5A3A1A', textAlign: 'center', lineHeight: 1.2 }}>AYURA</span>
      </div>
      {/* Flame */}
      <motion.div
        animate={{ scaleY: hover ? [1, 1.3, 1] : 1, opacity: hover ? [1, 0.8, 1] : 1 }}
        transition={{ duration: 0.6, repeat: Infinity }}
        style={{ width: 10, height: 16, background: 'linear-gradient(to top, #FF6B35, #FFD700)', borderRadius: '50% 50% 30% 30%', margin: '0 auto', marginTop: -2, boxShadow: '0 0 8px rgba(255,100,0,0.6)' }}
      />
    </div>
    {/* Plants */}
    <div className="absolute" style={{ bottom: 12, left: '28%' }}>
      <div style={{ width: 12, height: 16, background: '#8B6914', borderRadius: 2 }} />
      <div style={{ width: 10, height: 14, background: '#22C55E', borderRadius: '50%', marginTop: -8, marginLeft: 1 }} />
    </div>
    {/* Floating cubes */}
    {[[-30, 40], [55, 50], [-45, 65]].map(([x, y], i) => (
      <motion.div key={i} className="absolute" style={{ bottom: y, left: `calc(50% + ${x}px)` }}
        animate={{ y: hover ? [0, -6, 0] : [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>
        <VoxelCube size={i === 0 ? 14 : 10} color={i === 1 ? '#7939a1' : accent} />
      </motion.div>
    ))}
  </div>
);

const SolarexArt: React.FC<{ accent: string; hover: boolean }> = ({ accent, hover }) => (
  <div className="relative w-full h-full flex items-end justify-center pb-2">
    {/* Laptop */}
    <div className="absolute bottom-4" style={{ left: '50%', transform: 'translateX(-50%)' }}>
      {/* Screen */}
      <div style={{ width: 110, height: 72, background: '#1a1a2e', border: '2px solid #333', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ width: '90%', height: '85%', background: 'linear-gradient(135deg, #0e4a6e, #1a6b9a)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 7, color: '#fff', textAlign: 'center', fontFamily: 'monospace', fontWeight: 700, lineHeight: 1.4 }}>SOLAREX{'\n'}CLEAN ENERGY</span>
        </div>
      </div>
      {/* Base */}
      <div style={{ width: 120, height: 8, background: '#C0C0C0', borderRadius: '0 0 4px 4px', border: '2px solid #999', marginLeft: -5 }} />
    </div>
    {/* Solar panels */}
    {[[-50, 10], [60, 15]].map(([x, y], i) => (
      <div key={i} className="absolute" style={{ bottom: y, left: `calc(50% + ${x}px)` }}>
        <div style={{ width: 24, height: 16, background: '#1e40af', border: '1px solid #1d4ed8', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, padding: 2 }}>
          {[...Array(6)].map((_, j) => <div key={j} style={{ background: '#3b82f6', borderRadius: 1 }} />)}
        </div>
      </div>
    ))}
    {/* Wind turbine */}
    <div className="absolute" style={{ bottom: 8, right: '18%' }}>
      <div style={{ width: 3, height: 40, background: '#888', margin: '0 auto' }} />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{ width: 20, height: 20, position: 'absolute', top: 0, left: -9 }}>
        {[0, 120, 240].map(r => (
          <div key={r} style={{ position: 'absolute', width: 3, height: 12, background: '#aaa', transformOrigin: '50% 100%', transform: `rotate(${r}deg)`, top: -10, left: 9 }} />
        ))}
      </motion.div>
    </div>
    {/* Floating cubes */}
    {[[-60, 70], [75, 55], [55, 80]].map(([x, y], i) => (
      <motion.div key={i} className="absolute" style={{ bottom: y, left: `calc(50% + ${x}px)` }}
        animate={{ y: hover ? [0, -6, 0] : [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
        <VoxelCube size={10} color={i % 2 === 0 ? accent : '#06B6D4'} />
      </motion.div>
    ))}
  </div>
);

const LifelineXArt: React.FC<{ accent: string; hover: boolean }> = ({ accent, hover }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Phone */}
    <motion.div
      animate={{ y: hover ? -8 : 0, rotateY: hover ? 8 : 0 }}
      transition={{ duration: 0.4 }}
      style={{ perspective: 400 }}
    >
      <div style={{ width: 80, height: 140, background: '#1a1a1a', borderRadius: 10, border: '3px solid #333', padding: 4, boxShadow: '4px 8px 20px rgba(0,0,0,0.3)' }}>
        <div style={{ width: '100%', height: '100%', background: '#f0f4ff', borderRadius: 7, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 4 }}>
          <div style={{ background: '#06B6D4', height: 14, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 5, color: '#fff', fontFamily: 'monospace', fontWeight: 900 }}>LIFELINEX</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, marginTop: 4, flex: 1 }}>
            {[
              { label: '🚑', bg: '#ef4444', text: 'AMBU' },
              { label: '⛽', bg: '#f97316', text: 'FUEL' },
              { label: '🔧', bg: '#3b82f6', text: 'MECH' },
              { label: '🆘', bg: '#dc2626', text: 'SOS' },
            ].map((item, i) => (
              <div key={i} style={{ background: item.bg, borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                <span style={{ fontSize: 10 }}>{item.label}</span>
                <span style={{ fontSize: 5, color: '#fff', fontFamily: 'monospace', fontWeight: 700 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
    {/* Floating cubes */}
    {[[-60, 30], [70, 20], [-55, -20], [65, -30]].map(([x, y], i) => (
      <motion.div key={i} className="absolute" style={{ top: `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)` }}
        animate={{ y: hover ? [0, -6, 0] : [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>
        <VoxelCube size={10} color={i % 2 === 0 ? accent : '#7939a1'} />
      </motion.div>
    ))}
  </div>
);

const NeostepArt: React.FC<{ accent: string; hover: boolean }> = ({ accent, hover }) => (
  <div className="relative w-full h-full flex items-end justify-center pb-4">
    {/* Shoebox */}
    <div className="absolute" style={{ bottom: 4, left: 'calc(50% - 55px)' }}>
      <div style={{ width: 80, height: 28, background: '#1a1a1a', borderRadius: 3, border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 7, color: '#fff', fontFamily: 'monospace', fontWeight: 900 }}>NEOSTEP</span>
      </div>
      <div style={{ width: 80, height: 14, background: '#2d2d2d', borderRadius: '0 0 3px 3px' }} />
    </div>
    {/* Sneaker */}
    <motion.div className="absolute" style={{ bottom: 28, left: 'calc(50% - 15px)' }}
      animate={{ y: hover ? -8 : 0, rotate: hover ? -5 : 0 }} transition={{ duration: 0.4 }}>
      <div style={{ width: 70, height: 32, position: 'relative' }}>
        {/* shoe body */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 70, height: 22, background: '#E8E8E8', borderRadius: '4px 10px 0 0', border: '1.5px solid #ccc' }} />
        {/* tongue */}
        <div style={{ position: 'absolute', bottom: 12, left: 12, width: 20, height: 20, background: '#fff', borderRadius: 4, border: '1px solid #ddd' }} />
        {/* sole */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 70, height: 8, background: accent, borderRadius: '0 0 4px 4px' }} />
        {/* swoosh */}
        <div style={{ position: 'absolute', bottom: 8, left: 20, width: 30, height: 8, background: '#333', borderRadius: '0 50% 50% 0', opacity: 0.7 }} />
      </div>
    </motion.div>
    {/* Floating cubes */}
    {[[-70, 60], [80, 55], [-50, 80]].map(([x, y], i) => (
      <motion.div key={i} className="absolute" style={{ bottom: y, left: `calc(50% + ${x}px)` }}
        animate={{ y: hover ? [0, -6, 0] : [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
        <VoxelCube size={12} color={i % 2 === 0 ? accent : '#84CC16'} />
      </motion.div>
    ))}
  </div>
);

const BrewAuraArt: React.FC<{ accent: string; hover: boolean }> = ({ accent, hover }) => (
  <div className="relative w-full h-full flex items-end justify-center pb-2">
    {/* Laptop */}
    <div className="absolute bottom-4" style={{ left: '50%', transform: 'translateX(-50%)' }}>
      <div style={{ width: 110, height: 72, background: '#1a1a1a', border: '2px solid #333', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ width: '90%', height: '85%', background: 'linear-gradient(135deg, #1a0a00, #3d1a00)', borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
          <span style={{ fontSize: 6, color: '#FFD700', fontFamily: 'serif', fontWeight: 700, textAlign: 'center', lineHeight: 1.3 }}>GOOD FOOD.{'\n'}GOOD MOOD.</span>
          <div style={{ width: 30, height: 16, background: accent, borderRadius: 2, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 5, color: '#fff', fontFamily: 'monospace', fontWeight: 700 }}>VISIT</span>
          </div>
        </div>
      </div>
      <div style={{ width: 120, height: 8, background: '#888', borderRadius: '0 0 4px 4px', border: '2px solid #666', marginLeft: -5 }} />
    </div>
    {/* Coffee cup */}
    <div className="absolute" style={{ bottom: 8, left: '22%' }}>
      <div style={{ width: 18, height: 20, background: '#6B3A2A', borderRadius: '0 0 4px 4px', border: '1px solid #5A2A1A' }} />
      <div style={{ width: 4, height: 8, border: '1.5px solid #6B3A2A', borderLeft: 'none', borderRadius: '0 4px 4px 0', position: 'absolute', right: -4, top: 4 }} />
    </div>
    {/* Plants */}
    <div className="absolute" style={{ bottom: 8, right: '20%' }}>
      <div style={{ width: 12, height: 14, background: '#5A8B4A', borderRadius: 2, border: '1px solid #4A7A3A' }} />
      <div style={{ width: 8, height: 12, background: '#22C55E', borderRadius: '50%', marginTop: -6, marginLeft: 2 }} />
    </div>
    {/* Floating cubes */}
    {[[-65, 70], [80, 60], [60, 80]].map(([x, y], i) => (
      <motion.div key={i} className="absolute" style={{ bottom: y, left: `calc(50% + ${x}px)` }}
        animate={{ y: hover ? [0, -6, 0] : [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>
        <VoxelCube size={10} color={i % 2 === 0 ? accent : '#EC4899'} />
      </motion.div>
    ))}
  </div>
);

const GoPlanetArt: React.FC<{ accent: string; hover: boolean }> = ({ accent, hover }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Clapperboard */}
    <motion.div animate={{ rotate: hover ? [0, -10, 10, 0] : 0 }} transition={{ duration: 0.5 }}>
      <div style={{ width: 90, height: 80, background: '#1a1a1a', borderRadius: 6, border: '3px solid #333', position: 'relative', boxShadow: '4px 6px 0 #333' }}>
        {/* Striped top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 22, background: '#fff', borderRadius: '3px 3px 0 0', overflow: 'hidden', display: 'flex' }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ flex: 1, background: i % 2 === 0 ? '#1a1a1a' : '#fff', transform: 'skewX(-10deg)' }} />
          ))}
        </div>
        {/* Play icon */}
        <div style={{ position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderTop: '16px solid transparent', borderBottom: '16px solid transparent', borderLeft: `28px solid ${accent}` }} />
      </div>
    </motion.div>
    {/* Floating cubes */}
    {[[-60, -20], [70, -10], [-50, 20], [65, 25]].map(([x, y], i) => (
      <motion.div key={i} className="absolute" style={{ top: `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)` }}
        animate={{ y: hover ? [0, -8, 0] : [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
        <VoxelCube size={12} color={i % 2 === 0 ? accent : '#7939a1'} />
      </motion.div>
    ))}
  </div>
);

const DefaultArt: React.FC<{ color: string; hover: boolean }> = ({ color, hover }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div animate={{ y: hover ? -8 : 0 }} transition={{ duration: 0.4 }}>
      <VoxelCube size={48} color={color} />
    </motion.div>
  </div>
);

// ── CTA Voxel Scene ───────────────────────────────────────────────────────────
const CTARocketScene: React.FC = () => (
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    className="relative w-48 h-48 flex items-end justify-center"
  >
    {/* Cloud platform */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: 100, height: 28, background: '#E8E8E8', borderRadius: 20, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }} />
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2" style={{ width: 80, height: 20, background: '#F0F0F0', borderRadius: 16 }} />
    {/* Rocket body */}
    <div className="absolute" style={{ bottom: 22, left: '50%', transform: 'translateX(-50%)' }}>
      {/* Flame */}
      <motion.div
        animate={{ scaleY: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{ width: 20, height: 30, background: 'linear-gradient(to top, transparent, #FF6B35, #FFD700)', borderRadius: '50% 50% 20% 20%', margin: '0 auto' }}
      />
      {/* Body */}
      <div style={{ width: 30, height: 60, background: '#7939a1', borderRadius: '50% 50% 20% 20%', margin: '0 auto', border: '2px solid #5a2a7a', marginTop: -8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 14, height: 14, background: '#C8FF2F', borderRadius: '50%', border: '2px solid #333' }} />
      </div>
      {/* Wings */}
      <div style={{ position: 'absolute', bottom: 8, left: -12, width: 12, height: 20, background: '#5a2a7a', clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)' }} />
      <div style={{ position: 'absolute', bottom: 8, right: -12, width: 12, height: 20, background: '#5a2a7a', clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%)' }} />
    </div>
    {/* Floating star cubes */}
    {[[-50, 80], [55, 90], [-35, 120], [40, 110]].map(([x, y], i) => (
      <motion.div key={i} className="absolute" style={{ bottom: y, left: `calc(50% + ${x}px)` }}
        animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}>
        <VoxelCube size={8} color={['#7939a1', '#06B6D4', '#EAB308', '#EC4899'][i]} />
      </motion.div>
    ))}
  </motion.div>
);

// ── Project Card ──────────────────────────────────────────────────────────────
const MotionLink = motion(Link);

const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 8);
    rotateY.set(x * 8);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  }, [rotateX, rotateY]);

  return (
    <MotionLink
      to={`/work/${project.slug?.current || project.id}`}
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer select-none block"
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        perspective: 800,
        boxShadow: isHovered
          ? '0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)'
          : '0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* Category label row */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: project.accent }}>
          {project.categoryLabel}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 hover:border-gray-400 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
        </motion.button>
      </div>

      {/* Artwork area */}
      <div
        className={`relative mx-3 rounded-lg overflow-hidden bg-gradient-to-br ${project.bgGradient}`}
        style={{ height: 200 }}
      >
        {/* Subtle grid in artwork */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <ProjectArtwork project={project} isHovered={isHovered} />
        {/* Pixel particles */}
        {isHovered && [...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-none"
            style={{ background: project.accent, top: `${20 + i * 20}%`, left: `${10 + i * 22}%` }}
            animate={{ y: [0, -16, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Card footer */}
      <div className="px-4 py-4">
        <h3 className="font-pixel text-base font-black text-gray-900 mb-1 leading-tight">{project.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {project.description}
        </p>
        <motion.button
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all"
          style={{ color: project.accent }}
          whileHover={{ gap: 8 }}
        >
          VIEW PROJECT
          <motion.span animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.span>
        </motion.button>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: project.accent }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </MotionLink>
  );
};

// ── Magnetic Button ───────────────────────────────────────────────────────────
const MagBtn: React.FC<{ children: React.ReactNode; primary?: boolean; onClick?: () => void }> = ({ children, primary = false, onClick }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  if (primary) {
    return (
      <motion.button
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onClick}
        whileHover={{ y: -3 }}
        whileTap={{ y: 1 }}
        className="relative inline-flex items-center gap-2 font-pixel text-sm font-bold text-white px-6 py-3 rounded-lg select-none"
        style={{
          x: sx, y: sy,
          background: '#7939a1',
          boxShadow: '0 6px 0 #4a1a6e, 0 8px 16px rgba(121,57,161,0.35)',
          border: '2px solid #5a2a8a',
        }}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      whileHover={{ y: -2 }}
      className="inline-flex items-center gap-2 font-pixel text-sm font-bold text-gray-900 px-6 py-3 rounded-lg bg-white border-2 border-gray-900 select-none"
      style={{ x: sx, y: sy, boxShadow: '0 3px 0 #111, 0 4px 8px rgba(0,0,0,0.08)' }}
    >
      {children}
    </motion.button>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

interface PortfolioPageProps {
  onSelectProject?: (project: any) => void;
}

type CreativeFilterKey = 'ALL' | 'LOGO' | 'BUSINESS_CARD' | 'SOCIAL_MEDIA';

const CREATIVE_FILTERS: { key: CreativeFilterKey; label: string }[] = [
  { key: 'ALL', label: 'ALL DESIGNS' },
  { key: 'LOGO', label: 'LOGOS' },
  { key: 'BUSINESS_CARD', label: 'BUSINESS CARDS' },
  { key: 'SOCIAL_MEDIA', label: 'POSTERS & MEDIA' },
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onSelectProject }) => {
  // Parallax scroll setup
  const { scrollY } = useScroll();
  const bgGridY = useTransform(scrollY, value => `${-value * 0.3}px`);
  const blob1Y = useTransform(scrollY, value => -value * 0.15);
  const blob2Y = useTransform(scrollY, value => -value * 0.25);
  const blob3Y = useTransform(scrollY, value => -value * 0.35);
  const dotsY = useTransform(scrollY, value => -value * 0.2);

  // Tabs for switching portfolios
  const [portfolioTab, setPortfolioTab] = useState<'CASE_STUDIES' | 'CREATIVE_DESIGNS'>('CASE_STUDIES');

  // Case Studies States
  const [activeFilter, setActiveFilter] = useState<FilterKey>('ALL');
  const [projects, setProjects] = useState<any[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Creative Designs States
  const [activeCreativeFilter, setActiveCreativeFilter] = useState<CreativeFilterKey>('ALL');

  // Lightbox States
  const [lightboxAsset, setLightboxAsset] = useState<CreativeAsset | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  useEffect(() => {
    client
      .fetch(`*[_type == "project"] | order(sortOrder asc, _createdAt desc)`)
      .then((data) => {
        if (data && data.length > 0) {
          const mappedData = data.map((proj: any, idx: number) => {
            // Find standard category filter key
            let filterCat: FilterKey = 'OTHERS';
            const catLower = (proj.category || '').toLowerCase();
            if (catLower.includes('branding') || catLower.includes('identity')) {
              filterCat = 'BRANDING';
            } else if (catLower.includes('web development') || catLower.includes('development')) {
              filterCat = 'WEB DEVELOPMENT';
            } else if (catLower.includes('ui/ux') || catLower.includes('design')) {
              filterCat = 'UI/UX DESIGN';
            } else if (catLower.includes('app')) {
              filterCat = 'APPLICATIONS';
            } else if (catLower.includes('motion')) {
              filterCat = 'MOTION';
            }

            return {
              ...proj,
              id: proj.slug?.current || proj._id,
              number: String(idx + 1).padStart(2, '0'),
              category: filterCat,
              categoryLabel: proj.category || 'OTHER',
              description: proj.shortDescription || '',
              accent: proj.accentColor || '#7939a1',
              accentText: 'text-purple-600',
              bgGradient: proj.bgGradient || 'from-purple-50 to-pink-50',
              voxelColor: proj.accentColor || '#7939a1',
              tags: proj.services || [],
            };
          });
          setProjects(mappedData);
          setDisplayedProjects(mappedData);
        } else {
          setProjects(PROJECTS);
          setDisplayedProjects(PROJECTS);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects in portfolio:', err);
        setProjects(PROJECTS);
        setDisplayedProjects(PROJECTS);
        setLoading(false);
      });
  }, []);

  const handleFilter = (f: FilterKey) => {
    sound.playClick();
    setActiveFilter(f);
    // Animate out then in
    setDisplayedProjects([]);
    setTimeout(() => {
      setDisplayedProjects(f === 'ALL' ? projects : projects.filter(p => p.category === f));
    }, 150);
  };

  const handleCreativeFilter = (f: CreativeFilterKey) => {
    sound.playClick();
    setActiveCreativeFilter(f);
  };

  // Filtered Creative Assets
  const filteredCreativeAssets = activeCreativeFilter === 'ALL'
    ? CREATIVE_ASSETS
    : CREATIVE_ASSETS.filter(asset => asset.category === activeCreativeFilter);

  // Lightbox navigation
  const handleNextLightbox = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playClick();
    const nextIdx = (lightboxIndex + 1) % filteredCreativeAssets.length;
    setLightboxIndex(nextIdx);
    setLightboxAsset(filteredCreativeAssets[nextIdx]);
  };

  const handlePrevLightbox = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playClick();
    const prevIdx = (lightboxIndex - 1 + filteredCreativeAssets.length) % filteredCreativeAssets.length;
    setLightboxIndex(prevIdx);
    setLightboxAsset(filteredCreativeAssets[prevIdx]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxAsset) return;
      if (e.key === 'ArrowRight') {
        handleNextLightbox();
      } else if (e.key === 'ArrowLeft') {
        handlePrevLightbox();
      } else if (e.key === 'Escape') {
        sound.playClick();
        setLightboxAsset(null);
        setLightboxIndex(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxAsset, lightboxIndex, filteredCreativeAssets]);

  const STATS = [
    { value: '120+', label: ['PROJECTS', 'DELIVERED'], icon: '🎮', color: '#7939a1' },
    { value: '50+', label: ['HAPPY', 'CLIENTS'], icon: '🚀', color: '#06B6D4' },
    { value: '8+', label: ['INDUSTRIES', 'SERVED'], icon: '🏆', color: '#84CC16' },
    { value: '4.9/5', label: ['CLIENT', 'RATING'], icon: '⭐', color: '#EAB308' },
  ];

  const WORKFLOW = ['STRATEGY', 'DESIGN', 'DEVELOPMENT', 'LAUNCH', 'GROWTH'];

  return (
    <div
      className="min-h-screen pt-20 pb-0 relative overflow-hidden"
      style={{ background: '#F7F7F3', color: '#111111', fontFamily: 'Space Grotesk, sans-serif' }}
    >
      {/* Parallax Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30" 
          style={{ background: 'radial-gradient(circle, #7939a1, transparent)', top: '10%', left: '-10%', y: blob1Y }} 
        />
        <motion.div 
          className="absolute w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-20" 
          style={{ background: 'radial-gradient(circle, #06B6D4, transparent)', top: '40%', right: '-5%', y: blob2Y }} 
        />
        <motion.div 
          className="absolute w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-20" 
          style={{ background: 'radial-gradient(circle, #EAB308, transparent)', top: '70%', left: '15%', y: blob3Y }} 
        />
      </div>

      {/* Background grid */}
      <motion.div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        backgroundPositionY: bgGridY,
      }} />

      {/* Pixel particle dots background */}
      <motion.div className="fixed pointer-events-none overflow-hidden" style={{ top: '-100vh', bottom: '-100vh', left: 0, right: 0, y: dotsY }}>
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1"
            style={{ background: ['#7939a1', '#06B6D4', '#FF6B35', '#EAB308', '#84CC16'][i % 5], left: `${(i * 47) % 100}%`, top: `${(i * 37) % 100}%`, opacity: 0.3 }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 relative z-10">

        {/* ── SECTION 01: HERO ─────────────────────────────────────────────── */}
        <section className="pt-8 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[520px]">
          {/* Left */}
          <div className="space-y-7">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-gray-400" />
              <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest">// OUR WORK</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-pixel text-5xl sm:text-6xl xl:text-7xl font-black text-gray-900 leading-none tracking-tight">
                WORK WE'RE<br />
                <span style={{ color: '#7939a1' }}>PROUD OF</span>
                <span className="text-gray-900">_</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-md" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              A collection of digital products, brands & experiences crafted with purpose and built to perform.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <MagBtn primary onClick={() => {
                sound.playClick();
                const el = document.getElementById('portfolio-gallery-start');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                VIEW ALL PROJECTS <ArrowUpRight className="w-4 h-4" />
              </MagBtn>
              <MagBtn onClick={() => {
                sound.playClick();
                const el = document.getElementById('contact');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/contact';
                }
              }}>
                START A PROJECT <ArrowRight className="w-4 h-4" />
              </MagBtn>
            </div>

            {/* Tiny decoration */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex gap-1">
                {['#7939a1', '#06B6D4', '#FF6B35', '#EAB308'].map(c => (
                  <div key={c} className="w-2 h-2 rounded-none" style={{ background: c }} />
                ))}
              </div>
              <span className="font-mono text-xs text-gray-400">CRAFTED WITH PURPOSE</span>
            </div>
          </div>

          {/* Right – Voxel Scene */}
          <div className="relative flex items-center justify-center" style={{ minHeight: 320 }}>
            {/* Glow behind scene */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(121,57,161,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
            </div>
            <HeroVoxelScene />
          </div>
        </section>

        {/* ── SECTION 02: STATS BAR ────────────────────────────────────────── */}
        <section className="py-6 mb-8">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-gray-100">
            {STATS.map((stat) => (
              <motion.div
                key={stat.value}
                className="flex items-center gap-3 px-4 first:pl-0 last:pr-0"
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <StatIcon color={stat.color}>{stat.icon}</StatIcon>
                <div>
                  <div className="font-pixel text-2xl font-black" style={{ color: '#111111' }}>{stat.value}</div>
                  <div className="font-mono text-[10px] font-bold text-gray-400 leading-tight uppercase tracking-wider">
                    {stat.label[0]}<br />{stat.label[1]}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PORTFOLIO TYPE TOGGLE ────────────────────────────────────────── */}
        <div id="portfolio-gallery-start" className="flex justify-center mb-12 scroll-mt-24">
          <div className="inline-flex p-1.5 bg-white rounded-xl border border-gray-200 shadow-sm max-w-full overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                sound.playClick();
                setPortfolioTab('CASE_STUDIES');
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2.5 px-6 py-3 rounded-lg font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
              style={portfolioTab === 'CASE_STUDIES' ? {
                background: '#7939a1',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(121,57,161,0.3)',
              } : {
                color: '#555',
              }}
            >
              👾 Case Studies
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setPortfolioTab('CREATIVE_DESIGNS');
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2.5 px-6 py-3 rounded-lg font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
              style={portfolioTab === 'CREATIVE_DESIGNS' ? {
                background: '#7939a1',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(121,57,161,0.3)',
              } : {
                color: '#555',
              }}
            >
              🎨 Creative Gallery
            </button>
          </div>
        </div>

        {portfolioTab === 'CASE_STUDIES' ? (
          <>
            {/* ── SECTION 03: FILTER BAR ──────────────────────────────────────── */}
            <section className="mb-10">
              <div ref={filterBarRef} className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
                {/* Label */}
                <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white font-mono text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap shadow-sm">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  FILTER WORK
                </div>

                {/* Filters */}
                {FILTERS.map(f => (
                  <motion.button
                    key={f}
                    onClick={() => handleFilter(f)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-shrink-0 px-4 py-2 rounded-lg font-pixel text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap"
                    style={activeFilter === f ? {
                      background: '#7939a1',
                      color: '#fff',
                      borderColor: '#7939a1',
                      boxShadow: '0 4px 12px rgba(121,57,161,0.3)',
                    } : {
                      background: '#fff',
                      color: '#555',
                      borderColor: '#e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    {f}
                  </motion.button>
                ))}
              </div>
            </section>

            {/* ── SECTION 04: PROJECT GRID ─────────────────────────────────────── */}
            <section className="mb-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {loading ? (
                    [...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse bg-white border border-gray-200 rounded-xl overflow-hidden" style={{ height: 350 }}>
                        <div className="h-6 w-1/4 bg-gray-200 m-4 rounded" />
                        <div className="mx-3 bg-gray-200 rounded-lg" style={{ height: 200 }} />
                        <div className="p-4 space-y-2">
                          <div className="h-5 w-3/4 bg-gray-200 rounded" />
                          <div className="h-4 w-5/6 bg-gray-200 rounded" />
                        </div>
                      </div>
                    ))
                  ) : (
                    displayedProjects.map((project, i) => (
                      <ProjectCard key={project.id} project={project} index={i} />
                    ))
                  )}
                  {displayedProjects.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="xl:col-span-3 md:col-span-2 flex flex-col items-center justify-center py-24 text-center"
                    >
                      <div className="mb-4"><VoxelCube size={40} color="#7939a1" /></div>
                      <p className="font-pixel text-lg text-gray-400">NO PROJECTS IN THIS CATEGORY YET.</p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </section>

            {/* ── SECTION 04.5: FEATURED PROJECTS (Moved from Home) ─────────────── */}
            <div className="mb-20 -mx-6 sm:-mx-10 rounded-2xl overflow-hidden shadow-2xl">
              <ProjectsSection onSelectProject={onSelectProject || (() => {})} />
            </div>
          </>
        ) : (
          <>
            {/* ── CREATIVE GALLERY FILTER BAR ─────────────────────────────────── */}
            <section className="mb-10">
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
                {/* Label */}
                <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white font-mono text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap shadow-sm">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  FILTER DESIGNS
                </div>

                {/* Filters */}
                {CREATIVE_FILTERS.map(f => (
                  <motion.button
                    key={f.key}
                    onClick={() => handleCreativeFilter(f.key)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-shrink-0 px-4 py-2 rounded-lg font-pixel text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap"
                    style={activeCreativeFilter === f.key ? {
                      background: '#7939a1',
                      color: '#fff',
                      borderColor: '#7939a1',
                      boxShadow: '0 4px 12px rgba(121,57,161,0.3)',
                    } : {
                      background: '#fff',
                      color: '#555',
                      borderColor: '#e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    {f.label}
                  </motion.button>
                ))}
              </div>
            </section>

            {/* ── CREATIVE GALLERY MASONRY GRID ──────────────────────────────── */}
            <section className="mb-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCreativeFilter}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 [column-fill:_balance]"
                >
                  {filteredCreativeAssets.map((asset, idx) => (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
                      onClick={() => {
                        sound.playClick();
                        setLightboxAsset(asset);
                        setLightboxIndex(idx);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className="break-inside-avoid group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-brutalist hover:border-gray-900 cursor-pointer block"
                    >
                      {/* Image / Video area */}
                      <div className="relative w-full overflow-hidden bg-gray-50 flex items-center justify-center">
                        {asset.type === 'video' ? (
                          <div className="relative w-full aspect-square">
                            <video
                              src={asset.src}
                              muted
                              loop
                              autoPlay
                              playsInline
                              className="w-full h-full object-cover rounded-t-xl"
                            />
                            <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm p-1.5 rounded-md border border-white/10 z-10 text-white">
                              <Film className="w-3.5 h-3.5 animate-pulse" />
                            </div>
                          </div>
                        ) : (
                          <img
                            src={asset.src}
                            alt={asset.title}
                            loading="lazy"
                            className={`w-full object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105 ${
                              asset.aspectRatio === 'square' ? 'aspect-square' :
                              asset.aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-[1.6/1]'
                            }`}
                          />
                        )}

                        {/* Interactive overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 text-white">
                          <span className="font-mono text-[9px] font-bold tracking-wider uppercase bg-[#B7E532] text-gray-900 px-2 py-0.5 border border-gray-900">
                            VIEW DETAILS
                          </span>
                          <Maximize2 className="w-4 h-4 text-[#B7E532]" />
                        </div>
                      </div>

                      {/* Info Area */}
                      <div className="p-4 border-t border-gray-100 bg-white">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-purple-600 block mb-1">
                          {asset.categoryLabel}
                        </span>
                        <h3 className="font-pixel text-sm font-black text-gray-900 mb-1 leading-tight group-hover:text-purple-700 transition-colors">
                          {asset.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {asset.description}
                        </p>
                      </div>

                      {/* Custom bottom edge hover animation */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7939a1] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredCreativeAssets.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <VoxelCube size={40} color="#7939a1" />
                  <p className="font-pixel text-lg text-gray-400 mt-4">NO DESIGNS FOUND IN THIS CATEGORY.</p>
                </div>
              )}
            </section>
          </>
        )}

        {/* ── SECTION 05: CREATIVE CTA ─────────────────────────────────────── */}
        <section className="mb-0">
          <div
            className="relative rounded-2xl overflow-hidden border border-gray-200"
            style={{ background: '#F0EDF8', minHeight: 280 }}
          >
            {/* Grid background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

            {/* Purple glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 500, height: 300, background: 'radial-gradient(ellipse, rgba(121,57,161,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center px-8 py-12 md:px-12">

              {/* Left: Rocket */}
              <div className="flex justify-center md:justify-start">
                <CTARocketScene />
              </div>

              {/* Center: CTA text */}
              <div className="text-center space-y-4">
                <div className="font-mono text-xs text-gray-500 uppercase tracking-widest">// NEXT PROJECT</div>
                <h2 className="font-pixel text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
                  HAVE A PROJECT<br />
                  <span style={{ color: '#7939a1' }}>IN MIND?</span>_
                </h2>
                <p className="text-lg font-black text-gray-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  LET'S BUILD IT.
                </p>
                <p className="text-base text-gray-500 leading-relaxed">
                  Let's build something great together.<br />
                  We'd love to hear your idea.
                </p>
                <MagBtn primary onClick={onSelectProject ? () => { sound.playClick(); onSelectProject(null); } : () => { sound.playClick(); window.location.href = '/contact'; }}>
                  LET'S TALK <ArrowRight className="w-4 h-4" />
                </MagBtn>
              </div>

              {/* Right: Workflow */}
              <div className="flex justify-center md:justify-end">
                <div className="space-y-2 relative">
                  {/* Purple portal cube stack */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <VoxelCube size={40} color="#7939a1" />
                      <div className="absolute -top-2 -right-2">
                        <VoxelCube size={20} color="#06B6D4" />
                      </div>
                      <div className="absolute -bottom-2 -left-3">
                        <VoxelCube size={16} color="#EAB308" />
                      </div>
                    </div>
                  </div>
                  {WORKFLOW.map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-sm border-2 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: '#7939a1', background: i === 0 ? '#7939a1' : 'transparent' }}>
                        {i === 0 && <div className="w-2 h-2 bg-white rounded-none" />}
                      </div>
                      <span className="font-mono text-xs font-bold text-gray-700 tracking-wider">{step}</span>
                      {i < WORKFLOW.length - 1 && (
                        <div className="absolute left-2.5 font-mono text-gray-300 text-xs" style={{ marginTop: 22 }}>↓</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

            {/* Floating decoration cubes */}
            {[
              { top: '10%', left: '8%', color: '#7939a1', size: 14 },
              { top: '20%', right: '10%', color: '#06B6D4', size: 10 },
              { bottom: '15%', left: '15%', color: '#EAB308', size: 12 },
              { bottom: '20%', right: '8%', color: '#EC4899', size: 10 },
            ].map((cube, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ top: cube.top, bottom: (cube as any).bottom, left: cube.left, right: (cube as any).right }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.6 }}
              >
                <VoxelCube size={cube.size} color={cube.color} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 mt-8">
          <span className="font-mono text-xs text-gray-400">© 2024 DETQEL. ALL RIGHTS RESERVED.</span>
          <span className="font-mono text-xs text-gray-400">
            DESIGN WITH <span style={{ color: '#7939a1' }}>PURPOSE</span>. CODE WITH <span style={{ color: '#7939a1' }}>PRECISION</span>.
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-gray-400">FOLLOW US</span>
            {['in', 'Be', '@'].map(s => (
              <div key={s} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center font-mono text-xs text-gray-500 hover:border-gray-700 hover:text-gray-900 cursor-pointer transition-colors">
                {s}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── LIGHTBOX MODAL ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxAsset && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                sound.playClick();
                setLightboxAsset(null);
                setLightboxIndex(-1);
              }}
              className="fixed inset-0 bg-[#0B2638]/95 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white border-2 border-gray-900 shadow-brutalist-lg rounded-xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto text-gray-900"
            >
              {/* Header Bar */}
              <div className="flex justify-between items-center px-6 py-4 border-b-2 border-gray-900 bg-gray-50 flex-shrink-0">
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="px-2 py-0.5 font-pixel font-bold bg-[#B7E532] text-gray-900 border border-gray-900 uppercase">
                    {lightboxAsset.categoryLabel}
                  </span>
                  <span className="hidden sm:inline text-gray-500 font-bold">
                    // ASSET {lightboxIndex + 1} OF {filteredCreativeAssets.length}
                  </span>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setLightboxAsset(null);
                    setLightboxIndex(-1);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="p-2 bg-white border-2 border-gray-900 rounded-lg hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Area */}
              <div className="relative flex-1 bg-gray-50 flex items-center justify-center p-6 min-h-[300px] overflow-hidden group/content">
                {/* Previous Button */}
                <button
                  onClick={handlePrevLightbox}
                  onMouseEnter={() => sound.playHover()}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 border-2 border-gray-900 hover:bg-gray-100 hover:scale-105 transition-all shadow-md text-gray-900 md:opacity-0 md:group-hover/content:opacity-100 animate-fade-in"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Media Viewer */}
                <div className="max-w-full max-h-[50vh] sm:max-h-[60vh] flex items-center justify-center rounded-lg overflow-hidden border border-gray-200 bg-white p-2 shadow-sm">
                  {lightboxAsset.type === 'video' ? (
                    <video
                      key={lightboxAsset.id}
                      src={lightboxAsset.src}
                      controls
                      autoPlay
                      playsInline
                      className="max-w-full max-h-[48vh] sm:max-h-[58vh] object-contain rounded-md"
                    />
                  ) : (
                    <img
                      key={lightboxAsset.id}
                      src={lightboxAsset.src}
                      alt={lightboxAsset.title}
                      className="max-w-full max-h-[48vh] sm:max-h-[58vh] object-contain rounded-md select-none"
                    />
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextLightbox}
                  onMouseEnter={() => sound.playHover()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 border-2 border-gray-900 hover:bg-gray-100 hover:scale-105 transition-all shadow-md text-gray-900 md:opacity-0 md:group-hover/content:opacity-100 animate-fade-in"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Details Footer */}
              <div className="px-6 py-5 bg-white border-t-2 border-gray-900 flex-shrink-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-pixel text-lg font-black uppercase text-gray-900">{lightboxAsset.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {lightboxAsset.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={lightboxAsset.src}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => sound.playHover()}
                      onClick={() => sound.playSuccess()}
                      className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-900 rounded-lg font-pixel text-xs font-bold bg-white text-gray-900 hover:bg-purple-600 hover:text-white transition-all shadow-sm"
                    >
                      VIEW FULLSIZE <Maximize2 className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* hide scrollbar for filter bar */}
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default PortfolioPage;
