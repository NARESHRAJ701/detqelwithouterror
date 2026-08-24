import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
  Sparkles,
  MousePointer,
  ArrowUpRight,
  Cpu,
  Zap,
  Palette,
  Check,
  Search,
  BarChart3,
  Settings,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE PIECE DATA & METRICS
// ─────────────────────────────────────────────────────────────────────────────

export interface ServicePiece {
  id: string;
  number: string;
  titleLines: string[];     // Intentional multi-line title breaks
  description: string;
  bgColor: string;          // Cardboard surface color
  accentColor: string;      // High contrast text/icon color
  shadowColor: string;      // Darker bevel shadow color
  outwardX: number;         // Detach translation X
  outwardY: number;         // Detach translation Y
  rotation: number;         // Detach rotation
  visualType: 'branding' | 'graphic' | 'web' | 'ai' | 'automation' | 'software' | 'crm' | 'research';
  titleFontSizeSvg: string; // Tailored font size for SVG foreignObject
}

const SERVICE_PIECES: ServicePiece[] = [
  {
    id: '01',
    number: '01',
    titleLines: ['BRANDING'],
    description: 'Build a brand people remember.',
    bgColor: '#E6BA68',       // Warm Honey Ochre
    accentColor: '#4A3408',
    shadowColor: '#C49746',
    outwardX: -36,
    outwardY: -32,
    rotation: -3.5,
    visualType: 'branding',
    titleFontSizeSvg: 'text-3xl lg:text-4xl xl:text-[40px]',
  },
  {
    id: '02',
    number: '02',
    titleLines: ['GRAPHIC', 'DESIGN'],
    description: 'Visuals that make your brand stand out.',
    bgColor: '#A5B58B',       // Muted Sage Green
    accentColor: '#1E3310',
    shadowColor: '#83946A',
    outwardX: 0,
    outwardY: -40,
    rotation: 2,
    visualType: 'graphic',
    titleFontSizeSvg: 'text-2xl lg:text-3xl xl:text-[34px]',
  },
  {
    id: '03',
    number: '03',
    titleLines: ['WEB', 'DEVELOPMENT'],
    description: 'Fast, modern websites built to perform.',
    bgColor: '#96B9D6',       // Soft Sky Blue
    accentColor: '#102F4C',
    shadowColor: '#7599B8',
    outwardX: 36,
    outwardY: -32,
    rotation: 3.5,
    visualType: 'web',
    titleFontSizeSvg: 'text-2xl lg:text-3xl xl:text-[34px]',
  },
  {
    id: '04',
    number: '04',
    titleLines: ['AI', 'SOLUTIONS'],
    description: 'AI tools, agents and intelligent workflows.',
    bgColor: '#B59EC9',       // Muted Lavender Purple
    accentColor: '#2C1445',
    shadowColor: '#937BAC',
    outwardX: -42,
    outwardY: 0,
    rotation: -2.5,
    visualType: 'ai',
    titleFontSizeSvg: 'text-3xl lg:text-4xl xl:text-[40px]',
  },
  {
    id: '05',
    number: '05',
    titleLines: ['AUTOMATION'],
    description: 'Connect your tools. Remove repetitive work.',
    bgColor: '#E68F70',       // Warm Terracotta
    accentColor: '#4A1403',
    shadowColor: '#C56D4E',
    outwardX: 0,
    outwardY: -20,
    rotation: 1.5,
    visualType: 'automation',
    titleFontSizeSvg: 'text-2xl lg:text-3xl xl:text-[34px]',
  },
  {
    id: '06',
    number: '06',
    titleLines: ['SOFTWARE', 'DEVELOPMENT'],
    description: 'Custom software built around your business.',
    bgColor: '#DFC79C',       // Sand Wheat Cardboard
    accentColor: '#3B2A0E',
    shadowColor: '#BEA476',
    outwardX: 42,
    outwardY: 0,
    rotation: 2.5,
    visualType: 'software',
    titleFontSizeSvg: 'text-2xl lg:text-3xl xl:text-[34px]',
  },
  {
    id: '07',
    number: '07',
    titleLines: ['RESEARCH &', 'PUBLICATION'],
    description: 'Research, journals and digital publication support.',
    bgColor: '#89C2B6',       // Mint Teal Cardboard
    accentColor: '#0B332B',
    shadowColor: '#679F94',
    outwardX: -32,
    outwardY: 36,
    rotation: -3,
    visualType: 'research',
    titleFontSizeSvg: 'text-2xl lg:text-3xl xl:text-[34px]',
  },
  {
    id: '08',
    number: '08',
    titleLines: ['CRM / ERP', '/ LMS'],
    description: 'Business systems that keep everything connected.',
    bgColor: '#81A6CB',       // Dusty Slate Blue
    accentColor: '#0B233D',
    shadowColor: '#5F84AA',
    outwardX: 32,
    outwardY: 36,
    rotation: 3,
    visualType: 'crm',
    titleFontSizeSvg: 'text-2xl lg:text-3xl xl:text-[32px]',
  },
];

// 4 Credibility Metric Blocks
const CREDIBILITY_METRICS = [
  {
    value: '25+',
    label: 'CLIENT PROJECTS COMPLETED',
    sub: 'Delivered across global markets',
    accent: '#E63946',
  },
  {
    value: '100%',
    label: 'SOLUTIONS DELIVERED',
    sub: 'On-time & production-grade',
    accent: '#2A9D8F',
  },
  {
    value: '8',
    label: 'CORE CAPABILITIES',
    sub: 'Strategy, design, tech & AI',
    accent: '#E76F51',
  },
  {
    value: 'END-TO-END',
    label: 'FROM IDEA TO DEPLOYMENT',
    sub: 'Full lifecycle execution',
    accent: '#2B401B',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 100% PERFECT MATHEMATICAL JIGSAW PATH ENGINE
// ─────────────────────────────────────────────────────────────────────────────

interface CutSegment {
  forward: string;
  reverse: string;
}

function createCanonicalCut(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  tabDepth: number,
  isTabRightOrDown: boolean
): CutSegment {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);

  const ux = dx / len;
  const uy = dy / len;

  const dirMultiplier = isTabRightOrDown ? 1 : -1;
  const nx = -uy * dirMultiplier;
  const ny = ux * dirMultiplier;

  const pAx = x1 + ux * 0.36 * len;
  const pAy = y1 + uy * 0.36 * len;

  const pBx = x1 + ux * 0.64 * len;
  const pBy = y1 + uy * 0.64 * len;

  const headX = x1 + ux * 0.50 * len + nx * tabDepth;
  const headY = y1 + uy * 0.50 * len + ny * tabDepth;

  const cp1x = pAx + nx * tabDepth * 0.35;
  const cp1y = pAy + ny * tabDepth * 0.35;

  const cp2x = headX - ux * 0.14 * len;
  const cp2y = headY - uy * 0.14 * len;

  const cp3x = headX + ux * 0.14 * len;
  const cp3y = headY + uy * 0.14 * len;

  const cp4x = pBx + nx * tabDepth * 0.35;
  const cp4y = pBy + ny * tabDepth * 0.35;

  const forward =
    `L ${pAx.toFixed(1)} ${pAy.toFixed(1)} ` +
    `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${headX.toFixed(1)} ${headY.toFixed(1)} ` +
    `C ${cp3x.toFixed(1)} ${cp3y.toFixed(1)}, ${cp4x.toFixed(1)} ${cp4y.toFixed(1)}, ${pBx.toFixed(1)} ${pBy.toFixed(1)} ` +
    `L ${x2.toFixed(1)} ${y2.toFixed(1)}`;

  const reverse =
    `L ${pBx.toFixed(1)} ${pBy.toFixed(1)} ` +
    `C ${cp4x.toFixed(1)} ${cp4y.toFixed(1)}, ${cp3x.toFixed(1)} ${cp3y.toFixed(1)}, ${headX.toFixed(1)} ${headY.toFixed(1)} ` +
    `C ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${pAx.toFixed(1)} ${pAy.toFixed(1)} ` +
    `L ${x1.toFixed(1)} ${y1.toFixed(1)}`;

  return { forward, reverse };
}

// CANVAS VIEWBOX: (0 0 1180 750)
const CUT_V11 = createCanonicalCut(400, 20, 400, 255, 42, true);   // Cut 1: P1-P2
const CUT_V21 = createCanonicalCut(780, 20, 780, 255, 42, false);  // Cut 2: P2-P3
const CUT_H11 = createCanonicalCut(20, 255, 400, 255, 40, false);  // Cut 3: P1-P4
const CUT_H12 = createCanonicalCut(400, 255, 780, 255, 40, true);  // Cut 4: P2-P5
const CUT_H13 = createCanonicalCut(780, 255, 1160, 255, 40, false);// Cut 5: P3-P6
const CUT_V12 = createCanonicalCut(400, 255, 380, 490, 42, true);  // Cut 6: P4-P5
const CUT_V22 = createCanonicalCut(780, 255, 750, 490, 42, true);  // Cut 7: P5-P6
const CUT_H21 = createCanonicalCut(20, 490, 380, 490, 40, true);   // Cut 8: P4-P7
const CUT_H22 = createCanonicalCut(380, 490, 750, 490, 40, true);   // Cut 9: P5-P7/8
const CUT_H23 = createCanonicalCut(750, 490, 1160, 490, 40, true);  // Cut 10: P6-P8
const CUT_V31 = createCanonicalCut(750, 490, 750, 730, 42, true);   // Cut 11: P7-P8

function buildPiecePath(idx: number): string {
  switch (idx) {
    case 0:
      return `M 20 20 L 400 20 ${CUT_V11.forward} ${CUT_H11.reverse} L 20 255 Z`;
    case 1:
      return `M 400 20 L 780 20 ${CUT_V21.forward} ${CUT_H12.reverse} ${CUT_V11.reverse} Z`;
    case 2:
      return `M 780 20 L 1160 20 L 1160 255 ${CUT_H13.reverse} ${CUT_V21.reverse} Z`;
    case 3:
      return `M 20 255 ${CUT_H11.forward} ${CUT_V12.forward} ${CUT_H21.reverse} L 20 490 Z`;
    case 4:
      return `M 400 255 ${CUT_H12.forward} ${CUT_V22.forward} ${CUT_H22.reverse} ${CUT_V12.reverse} Z`;
    case 5:
      return `M 780 255 ${CUT_H13.forward} L 1160 490 ${CUT_H23.reverse} ${CUT_V22.reverse} Z`;
    case 6:
      return `M 20 490 ${CUT_H21.forward} ${CUT_H22.forward} ${CUT_V31.forward} L 20 730 Z`;
    case 7:
      return `M 750 490 ${CUT_H23.forward} L 1160 730 L 750 730 ${CUT_V31.reverse} Z`;
    default:
      return '';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const PuzzleServicesSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tappedIdx, setTappedIdx] = useState<number | null>(null);
  const pieceRefs = useRef<(SVGGElement | null)[]>([]);

  const activeIdx = hoveredIdx !== null ? hoveredIdx : tappedIdx;

  // GSAP Detach & Reconnect Physical 3D Animation
  useEffect(() => {
    SERVICE_PIECES.forEach((piece, idx) => {
      const el = pieceRefs.current[idx];
      if (!el) return;

      const isCurrentActive = activeIdx === idx;

      if (isCurrentActive) {
        gsap.to(el, {
          x: piece.outwardX,
          y: piece.outwardY,
          rotation: piece.rotation,
          scale: 1.035,
          transformOrigin: '50% 50%',
          duration: 0.55,
          ease: 'back.out(1.5)',
          overwrite: 'auto',
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }
    });
  }, [activeIdx]);

  const handleMouseMove = (e: React.MouseEvent<SVGGElement>, idx: number) => {
    if (activeIdx !== idx) return;
    const el = pieceRefs.current[idx];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) * 0.12;
    const relY = (e.clientY - (rect.top + rect.height / 2)) * 0.12;

    const piece = SERVICE_PIECES[idx];
    gsap.to(el, {
      x: piece.outwardX + relX,
      y: piece.outwardY + relY,
      duration: 0.25,
      ease: 'power1.out',
    });
  };

  const handleTouchTap = (idx: number) => {
    setTappedIdx(tappedIdx === idx ? null : idx);
  };

  return (
    <section className="relative w-full bg-[#F3EFE6] text-[#1A1A1A] py-16 sm:py-24 px-4 sm:px-8 overflow-hidden select-none border-b border-[#D8D2C4]">
      {/* Background Tactile Paper Grain Noise */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#C2B8A3 1px, transparent 1px), radial-gradient(#C2B8A3 1px, #F3EFE6 1px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      />

      <div className="max-w-[1520px] mx-auto relative z-10">

        {/* ── 2-COLUMN EDITORIAL COMPOSITION ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">

          {/* ── LEFT COLUMN: CREDIBILITY & AGENCY INFORMATION PANEL ─────── */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 h-full py-1">

            {/* Title & Headline Block */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#666053] uppercase font-bold">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#E63946]" />
                <span>01 / SERVICES</span>
              </div>

              <h2 className="font-pixel text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111] leading-none">
                EVERY IDEA NEEDS A<br />
                WAY TO BECOME <span className="text-[#E63946]">REAL.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#666053] leading-relaxed pt-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                We help businesses turn ideas into brands, products and digital systems that people actually use.
              </p>
            </div>

            {/* 4 EDITORIAL METRIC CARDS (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-3.5 pt-1">
              {CREDIBILITY_METRICS.map((metric, i) => (
                <div
                  key={i}
                  className="group relative p-3.5 sm:p-4 rounded-lg bg-[#EFEBE0]/90 border border-[#D5CFBF] shadow-xs hover:border-[#111111] transition-all duration-300 flex flex-col justify-between"
                >
                  <div
                    className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: metric.accent }}
                  />

                  <div className="font-pixel text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mb-1">
                    {metric.value}
                  </div>

                  <div>
                    <div className="font-pixel text-[10px] sm:text-xs font-bold text-[#2A261F] leading-tight uppercase">
                      {metric.label}
                    </div>
                    <div className="font-mono text-[9px] text-[#777061] mt-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {metric.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* EDITORIAL QUOTE & DETQEL STATEMENT */}
            <div className="p-4 rounded-lg bg-[#EAE5D8] border-l-4 border-[#E63946] border-y border-r border-[#D2CBB9] space-y-2">
              <div className="font-pixel text-xs sm:text-sm font-bold text-[#111111] uppercase tracking-wide">
                “ONE TEAM. FROM IDEA TO EXECUTION.”
              </div>
              <div className="font-mono text-[10px] sm:text-xs font-bold text-[#666053] flex items-center justify-between pt-1 border-t border-[#D5CFBF]">
                <span>DetQel — Design. Technology. Intelligence.</span>
                <Sparkles className="w-3.5 h-3.5 text-[#E63946]" />
              </div>
            </div>

            {/* Micro Interaction Hint & Branding Row */}
            <div className="flex items-center justify-between pt-1 border-t border-[#D8D2C4]/60">
              <div className="flex items-center gap-3 text-[#111111]">
                <div className="w-6 h-6 rounded-full bg-[#111111] flex items-center justify-center text-white font-pixel text-xs font-bold">
                  δ
                </div>
                <div>
                  <div className="font-pixel text-xs font-bold tracking-wider uppercase">DETQEL</div>
                  <div className="font-mono text-[10px] text-[#666053]">Designing Solutions. Delivering Impact.</div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#666053] uppercase tracking-wider">
                <MousePointer className="w-3.5 h-3.5 text-[#E63946] animate-bounce" />
                <span>HOVER A PIECE</span>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: HERO INTERACTIVE JIGSAW PUZZLE BOARD ───────── */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center">

            {/* ── DESKTOP VIEW: MASTERFUL SVG JIGSAW PUZZLE BOARD ──────────── */}
            <div className="hidden lg:block relative w-full aspect-[1180/750] drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]">

              <svg
                viewBox="0 0 1180 750"
                className="w-full h-full overflow-visible"
                style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.15))' }}
              >
                <defs>
                  <filter id="detach-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="24" stdDeviation="16" floodColor="#000000" floodOpacity="0.4" />
                  </filter>
                </defs>

                {SERVICE_PIECES.map((piece, idx) => {
                  const pathD = buildPiecePath(idx);
                  const isActive = activeIdx === idx;

                  return (
                    <g
                      key={piece.id}
                      ref={(el) => { pieceRefs.current[idx] = el; }}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => { setHoveredIdx(null); setTappedIdx(null); }}
                      onMouseMove={(e) => handleMouseMove(e, idx)}
                      onClick={() => handleTouchTap(idx)}
                      className="cursor-pointer transition-all duration-200"
                      style={{
                        zIndex: isActive ? 50 : 10,
                        filter: isActive ? 'url(#detach-shadow)' : 'none',
                      }}
                    >
                      {/* Bevel Shadow */}
                      <path
                        d={pathD}
                        fill={piece.shadowColor}
                        transform="translate(2, 4)"
                        opacity="0.6"
                      />

                      {/* Main Cardboard Surface */}
                      <path
                        d={pathD}
                        fill={piece.bgColor}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                      />

                      {/* Subtle Inner Bevel Stroke */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#000000"
                        strokeWidth="1"
                        strokeOpacity="0.15"
                      />

                      {/* EMBEDDED CONTENT (OVERSZIED BOLD TITLES + LINE BREAKS) */}
                      <foreignObject
                        x={getPieceContentBox(idx).x}
                        y={getPieceContentBox(idx).y}
                        width={getPieceContentBox(idx).w}
                        height={getPieceContentBox(idx).h}
                        className="pointer-events-none select-none overflow-hidden"
                      >
                        <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 text-[#111111] overflow-hidden">

                          {/* Top Badge & Indicator */}
                          <div className="flex items-center justify-between">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center font-pixel text-xs font-bold border border-black/20"
                              style={{ background: 'rgba(255,255,255,0.45)', color: piece.accentColor }}
                            >
                              {piece.number}
                            </div>

                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isActive ? 'bg-black text-white scale-110' : 'bg-black/10 text-black/60'
                              }`}
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          {/* OVERSZIED BOLD TITLE ONLY (NO SUBHEADING / DESCRIPTION) */}
                          <div className="my-auto py-1">
                            <h3
                              className={`font-pixel font-black uppercase leading-[0.92] tracking-[-0.03em] ${piece.titleFontSizeSvg}`}
                              style={{ color: piece.accentColor }}
                            >
                              {piece.titleLines.map((line, lIdx) => (
                                <React.Fragment key={lIdx}>
                                  {line}
                                  {lIdx < piece.titleLines.length - 1 && <br />}
                                </React.Fragment>
                              ))}
                            </h3>
                          </div>

                          {/* 3D Visual Graphic Artwork Mockup */}
                          <div className="relative w-full h-18 flex items-end justify-center">
                            <PieceArtwork visualType={piece.visualType} isActive={isActive} />
                          </div>

                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </svg>

            </div>

            {/* ── RESPONSIVE MOBILE / TABLET GRID (1-COL ON MOBILE, 2-COL ON TABLET) ── */}
            <div className="block lg:hidden w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {SERVICE_PIECES.map((piece, idx) => (
                <div
                  key={piece.id}
                  onClick={() => handleTouchTap(idx)}
                  className="group relative p-6 sm:p-7 rounded-2xl border-2 border-black/15 shadow-md flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  style={{ background: piece.bgColor }}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-pixel text-xs font-bold border border-black/20"
                      style={{ background: 'rgba(255,255,255,0.45)', color: piece.accentColor }}
                    >
                      {piece.number}
                    </div>

                    <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center text-black/70 group-hover:bg-black group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Oversized Responsive Title Only */}
                  <div className="my-auto py-2">
                    <h3
                      className="font-pixel text-3xl sm:text-4xl font-black uppercase leading-[0.92] tracking-[-0.03em]"
                      style={{ color: piece.accentColor }}
                    >
                      {piece.titleLines.map((line, lIdx) => (
                        <React.Fragment key={lIdx}>
                          {line}
                          {lIdx < piece.titleLines.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </h3>
                  </div>

                  {/* 3D Visual Artwork */}
                  <div className="relative w-full h-20 flex items-end justify-center mt-2">
                    <PieceArtwork visualType={piece.visualType} isActive={tappedIdx === idx} />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT POSITIONING BOXES IN VIEWBOX (1180 x 750)
// ─────────────────────────────────────────────────────────────────────────────

function getPieceContentBox(idx: number): { x: number; y: number; w: number; h: number } {
  switch (idx) {
    case 0: return { x: 35,  y: 35,  w: 345, h: 205 };
    case 1: return { x: 415, y: 35,  w: 345, h: 205 };
    case 2: return { x: 795, y: 35,  w: 345, h: 205 };
    case 3: return { x: 35,  y: 270, w: 330, h: 205 };
    case 4: return { x: 395, y: 270, w: 345, h: 205 };
    case 5: return { x: 765, y: 270, w: 380, h: 205 };
    case 6: return { x: 35,  y: 505, w: 330, h: 210 };
    case 7: return { x: 395, y: 505, w: 345, h: 210 };
    default: return { x: 0, y: 0, w: 200, h: 200 };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3D MOCKUP VISUAL GRAPHICS
// ─────────────────────────────────────────────────────────────────────────────

const PieceArtwork: React.FC<{ visualType: string; isActive: boolean }> = ({
  visualType,
  isActive,
}) => {
  switch (visualType) {
    case 'branding':
      return (
        <div className="relative w-full h-full flex items-end justify-center">
          <div className={`relative w-28 h-20 transition-transform duration-300 ${isActive ? 'scale-105 -translate-y-1' : ''}`}>
            <div className="absolute -left-2 bottom-1 w-10 h-14 bg-[#F5F5F0] border border-black/20 rounded-xs shadow-sm -rotate-12 flex flex-col p-1 gap-1">
              <div className="w-full h-3 bg-[#E6BA68] rounded-xs" />
              <div className="w-full h-3 bg-[#111111] rounded-xs" />
              <div className="w-full h-3 bg-[#E63946] rounded-xs" />
            </div>

            <div className="absolute right-2 bottom-0 w-16 h-20 bg-[#1A1A1A] border border-black/40 rounded-xs shadow-md p-2 flex flex-col justify-between transform rotate-6">
              <div className="flex justify-end"><Sparkles className="w-3 h-3 text-[#E6BA68]" /></div>
              <div className="text-center font-pixel text-[8px] text-white tracking-widest">DETQEL</div>
            </div>

            <div className="absolute right-0 bottom-3 w-1.5 h-16 bg-black rounded-full transform -rotate-45 shadow-sm" />
          </div>
        </div>
      );

    case 'graphic':
      return (
        <div className="relative w-full h-full flex items-end justify-center">
          <div className={`relative w-28 h-20 transition-transform duration-300 ${isActive ? 'scale-105 -translate-y-1' : ''}`}>
            <div className="absolute inset-0 m-auto w-24 h-18 bg-white border border-black/30 rounded-xs shadow-md p-2 flex flex-col justify-between transform -rotate-3">
              <div className="font-pixel text-[9px] font-bold text-[#111] leading-tight">
                Design<br />that<br />connects.
              </div>
              <div className="w-full h-6 bg-[#A5B58B]/30 rounded-xs flex items-center justify-center">
                <Palette className="w-3 h-3 text-[#2B401B]" />
              </div>
            </div>
            <div className="absolute -left-1 bottom-1 w-1.5 h-14 bg-[#2B401B] rounded-full transform rotate-30 shadow-xs" />
          </div>
        </div>
      );

    case 'web':
      return (
        <div className="relative w-full h-full flex items-end justify-center">
          <div className={`relative w-36 h-20 transition-transform duration-300 ${isActive ? 'scale-105 -translate-y-1' : ''}`}>
            <div className="absolute left-0 bottom-1 w-24 h-16 bg-[#1E1E1E] border border-black/40 rounded-t-sm p-1.5 shadow-md flex flex-col">
              <div className="w-full h-full bg-white rounded-xs p-1 flex flex-col gap-1 overflow-hidden">
                <div className="w-full h-2 bg-[#96B9D6] rounded-xs" />
                <div className="w-3/4 h-1.5 bg-gray-300 rounded-xs" />
                <div className="w-full flex-1 bg-gray-100 rounded-xs" />
              </div>
            </div>
            <div className="absolute left-[-2px] bottom-0 w-25 h-1.5 bg-[#444] rounded-b-sm" />

            <div className="absolute right-4 bottom-0 w-7 h-12 bg-[#111] border border-black/40 rounded-xs shadow-md p-0.5">
              <div className="w-full h-full bg-white rounded-xs p-0.5">
                <div className="w-full h-2 bg-[#96B9D6] rounded-xs mb-0.5" />
                <div className="w-full h-6 bg-gray-100 rounded-xs" />
              </div>
            </div>

            <div className="absolute -right-2 top-0 w-7 h-7 bg-[#1E1E1E] border border-black rounded-xs shadow-md flex items-center justify-center text-white font-mono text-[10px] font-bold">
              &lt;/&gt;
            </div>
          </div>
        </div>
      );

    case 'ai':
      return (
        <div className="relative w-full h-full flex items-end justify-center">
          <div className={`relative w-20 h-20 transition-transform duration-300 flex items-center justify-center ${isActive ? 'scale-110 rotate-6' : ''}`}>
            <div className="absolute inset-0 border-2 border-dashed border-[#3A2052]/60 rounded-sm" />
            <div className="w-14 h-14 bg-[#2A183C] border-2 border-[#B59EC9] rounded-xs shadow-lg flex flex-col items-center justify-center text-white">
              <Cpu className="w-6 h-6 text-[#B59EC9] animate-pulse" />
              <span className="font-pixel text-[9px] font-bold tracking-widest text-[#B59EC9]">AI</span>
            </div>
          </div>
        </div>
      );

    case 'automation':
      return (
        <div className="relative w-full h-full flex items-end justify-center">
          <div className={`relative w-28 h-20 transition-transform duration-300 ${isActive ? 'scale-105 -translate-y-1' : ''}`}>
            <div className="absolute left-2 top-2 w-7 h-7 bg-white border border-black/30 rounded-xs shadow-sm flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-[#E68F70]" />
            </div>
            <div className="absolute left-10 bottom-2 w-7 h-7 bg-white border border-black/30 rounded-xs shadow-sm flex items-center justify-center">
              <Settings className="w-3.5 h-3.5 text-[#5A1F0A]" />
            </div>
            <div className="absolute right-2 top-4 w-7 h-7 bg-white border border-black/30 rounded-xs shadow-sm flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <path d="M 20 20 L 48 50 L 88 30" fill="none" stroke="#5A1F0A" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>
      );

    case 'software':
      return (
        <div className="relative w-full h-full flex items-end justify-center">
          <div className={`relative w-32 h-20 transition-transform duration-300 ${isActive ? 'scale-105 -translate-y-1' : ''}`}>
            <div className="absolute left-0 bottom-1 w-26 h-17 bg-[#1A1A1A] border border-black/40 rounded-xs shadow-md p-1.5 flex flex-col">
              <div className="flex gap-1 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
              <div className="font-mono text-[7px] text-emerald-400 leading-none space-y-1 opacity-90">
                <div><span className="text-purple-400">const</span> app = express();</div>
                <div><span className="text-blue-400">await</span> buildPlatform();</div>
                <div><span className="text-yellow-400">return</span> deploy();</div>
              </div>
            </div>

            <div className="absolute right-0 top-1 w-7 h-7 bg-[#1E1E1E] border border-black rounded-xs shadow-md flex items-center justify-center text-white font-mono text-[10px] font-bold">
              &#123;&#125;
            </div>
          </div>
        </div>
      );

    case 'crm':
      return (
        <div className="relative w-full h-full flex items-end justify-center">
          <div className={`relative w-32 h-20 transition-transform duration-300 ${isActive ? 'scale-105 -translate-y-1' : ''}`}>
            <div className="absolute left-2 bottom-1 w-28 h-17 bg-white border border-black/30 rounded-xs shadow-md p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                <span className="font-mono text-[8px] font-bold text-gray-700">ANALYTICS CRM</span>
                <BarChart3 className="w-3 h-3 text-[#124239]" />
              </div>
              <div className="flex items-end gap-1.5 h-8 pt-1">
                <div className="flex-1 bg-[#89C2B6] h-[40%] rounded-xs" />
                <div className="flex-1 bg-[#124239] h-[85%] rounded-xs" />
                <div className="flex-1 bg-[#89C2B6] h-[60%] rounded-xs" />
                <div className="flex-1 bg-[#124239] h-[100%] rounded-xs" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'research':
      return (
        <div className="relative w-full h-full flex items-end justify-center">
          <div className={`relative w-36 h-20 transition-transform duration-300 ${isActive ? 'scale-105 -translate-y-1' : ''}`}>
            <div className="absolute left-4 bottom-1 flex flex-col gap-0.5">
              <div className="w-16 h-3 bg-[#113050] rounded-xs border border-black/30" />
              <div className="w-18 h-3.5 bg-[#81A6CB] rounded-xs border border-black/30" />
              <div className="w-20 h-4 bg-[#2A4B72] rounded-xs border border-black/30" />
            </div>

            <div className="absolute right-6 bottom-2 w-8 h-8 rounded-full border-2 border-black bg-white/40 backdrop-blur-xs flex items-center justify-center shadow-sm">
              <Search className="w-4 h-4 text-[#113050]" />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default PuzzleServicesSection;
