import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { sound } from '../utils/sound';
import { triggerCursor } from './CustomCursor';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE DATA
// ─────────────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: '01',
    label: 'BRANDING & IDENTITY',
    title: 'Branding\n& Identity',
    description:
      'We create memorable brands and visual systems that connect, communicate and stand apart.',
    capabilities: [
      'Brand Strategy',
      'Logo Systems',
      'Visual Identity',
      'Brand Guidelines',
      'Creative Direction',
    ],
    deliverables:
      'Identity systems · Logo design · Typography · Color systems · Brand assets',
    phrase: 'We Make You Unforgettable.',
  },
  {
    id: '02',
    label: 'UI/UX DESIGN',
    title: 'UI/UX\nDesign',
    description:
      'We design intuitive digital experiences that feel clear, useful and effortless across every screen.',
    capabilities: [
      'UX Strategy',
      'User Flows',
      'Wireframes',
      'UI Systems',
      'Prototyping',
      'Design Systems',
    ],
    deliverables:
      'Wireframes · UI kit · Figma files · Prototypes · Design tokens',
    phrase: 'Design That Actually Works.',
  },
  {
    id: '03',
    label: 'WEB DEVELOPMENT',
    title: 'Web\nDevelopment',
    description:
      'We engineer fast, responsive and scalable websites and web applications built around real business goals.',
    capabilities: [
      'Websites',
      'Web Apps',
      'Frontend',
      'Backend',
      'CMS Integration',
      'Performance Optimization',
    ],
    deliverables:
      'Website · Web app · API · CMS integration · Performance audit',
    phrase: 'Fast. Reliable. Scalable.',
  },
  {
    id: '04',
    label: 'AI & AUTOMATION',
    title: 'AI &\nAutomation',
    description:
      'We turn repetitive processes into intelligent workflows using AI agents, automation and connected systems.',
    capabilities: [
      'AI Agents',
      'Chatbots',
      'Workflow Automation',
      'AI Integrations',
      'Business Automation',
    ],
    deliverables:
      'Automation system · AI agent · Workflow map · Integration setup',
    phrase: 'Work Smarter. Not Harder.',
  },
  {
    id: '05',
    label: 'SAAS DEVELOPMENT',
    title: 'SaaS\nDevelopment',
    description:
      'We build scalable SaaS products that turn complex ideas into simple, useful and reliable digital platforms.',
    capabilities: [
      'Product Architecture',
      'MVP Development',
      'Dashboards',
      'APIs',
      'Subscription Systems',
      'Cloud Deployment',
    ],
    deliverables:
      'SaaS product · API · Dashboard · Documentation · Deployment',
    phrase: 'Ship. Grow. Repeat.',
  },
  {
    id: '06',
    label: 'CRM & ERP',
    title: 'CRM & ERP\nSolutions',
    description:
      'We build custom business systems that connect operations, data, teams and customers in one streamlined workflow.',
    capabilities: [
      'CRM',
      'ERP',
      'Admin Panels',
      'Inventory',
      'Customer Management',
      'Reporting',
    ],
    deliverables:
      'CRM system · ERP setup · Reports · Admin panel · Documentation',
    phrase: 'Systems That Scale With You.',
  },
  {
    id: '07',
    label: 'MOTION & 3D',
    title: 'Motion\n& 3D',
    description:
      'We create motion, 3D visuals and interactive experiences that make digital products impossible to ignore.',
    capabilities: [
      'Motion Graphics',
      '3D Visuals',
      'Product Animation',
      'Interactive Experiences',
      'Visual Effects',
    ],
    deliverables:
      '3D assets · Motion package · Animation files · Interactive demo',
    phrase: 'Move. Impress. Repeat.',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const LIME = '#C8FF2F';
const PAPER = '#f4f0e6';
const DARK = '#0E0E11';
const SCROLL_PX = 1300; // scroll pixels per service segment
const N = SERVICES.length; // 7

// Inline SVG data URI for paper grain texture
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23g)' opacity='0.055'/%3E%3C/svg%3E\")";

// Jagged tear clip-path for the top of each floating sheet
// Simulates irregular paper fiber after tearing
const TEAR_CLIP = `polygon(
  0% 100%, 1.4% 48%, 2.8% 88%, 4.2% 22%, 5.6% 72%, 7% 8%,
  8.4% 60%, 9.8% 30%, 11.2% 80%, 12.6% 14%, 14% 68%, 15.4% 40%,
  16.8% 90%, 18.2% 20%, 19.6% 74%, 21% 6%, 22.4% 62%, 23.8% 34%,
  25.2% 84%, 26.6% 16%, 28% 70%, 29.4% 38%, 30.8% 88%, 32.2% 22%,
  33.6% 76%, 35% 10%, 36.4% 64%, 37.8% 32%, 39.2% 82%, 40.6% 18%,
  42% 72%, 43.4% 42%, 44.8% 86%, 46.2% 20%, 47.6% 74%, 49% 8%,
  50.4% 60%, 51.8% 36%, 53.2% 84%, 54.6% 16%, 56% 68%, 57.4% 40%,
  58.8% 90%, 60.2% 24%, 61.6% 76%, 63% 12%, 64.4% 66%, 65.8% 34%,
  67.2% 80%, 68.6% 18%, 70% 72%, 71.4% 44%, 72.8% 88%, 74.2% 22%,
  75.6% 78%, 77% 10%, 78.4% 62%, 79.8% 30%, 81.2% 82%, 82.6% 16%,
  84% 70%, 85.4% 38%, 86.8% 86%, 88.2% 20%, 89.6% 74%, 91% 8%,
  92.4% 60%, 93.8% 32%, 95.2% 80%, 96.6% 18%, 98% 66%, 99.4% 40%,
  100% 80%, 100% 100%
)`;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  onNavigate?: (
    page: 'home' | 'contact' | 'about' | 'portfolio' | 'services'
  ) => void;
}

export const PaperTearServicesSection: React.FC<Props> = ({ onNavigate }) => {
  // ── Refs ──────────────────────────────────────────────────────────────────
  const wrapperRef = useRef<HTMLDivElement>(null);   // outer tall div (scroll space)
  const pinnedRef  = useRef<HTMLDivElement>(null);   // GSAP-pinned 100vh container
  const paperRef   = useRef<HTMLDivElement>(null);   // main static paper sheet
  const tabRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const sheetRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  // ── GSAP Setup ────────────────────────────────────────────────────────────
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    let rafId: number;

    rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const wrapper = wrapperRef.current;
        const pinned  = pinnedRef.current;
        const paper   = paperRef.current;
        if (!wrapper || !pinned || !paper) return;

        const VW = window.innerWidth;
        const VH = window.innerHeight;

        // Target dimensions for the expanded sheet (large service card)
        const SH_W = Math.min(700, VW * 0.85);
        const SH_H = Math.min(560, VH * 0.82);

        // Center position of the expanded sheet within the pinned container
        const CL = (VW - SH_W) / 2; // left
        const CT = (VH - SH_H) / 2; // top

        // ── Pre-position each floating sheet at its corresponding tab ────────
        sheetRefs.current.forEach((sheet, i) => {
          const tab = tabRefs.current[i];
          if (!sheet || !tab) return;

          const tabRect    = tab.getBoundingClientRect();
          const pinnedRect = pinned.getBoundingClientRect();

          // Position of tab within pinned container
          const tL = tabRect.left - pinnedRect.left;
          const tT = tabRect.top  - pinnedRect.top;
          const tW = tabRect.width;
          const tH = tabRect.height;

          // Sheet initial left/top: center of sheet aligns with center of tab
          const initL = tL + tW / 2 - SH_W / 2;
          const initT = tT + tH / 2 - SH_H / 2;

          // Scale to make the sheet visually match the tab footprint
          const sx = tW / SH_W;
          const sy = tH / SH_H;

          // Translation delta from initL/initT to center
          const dx = CL - initL;
          const dy = CT - initT;

          gsap.set(sheet, {
            position: 'absolute',
            left:   initL,
            top:    initT,
            width:  SH_W,
            height: SH_H,
            scaleX: sx,
            scaleY: sy,
            transformOrigin: 'center center',
            opacity: 0,
            x: 0,
            y: 0,
            rotate: 0,
            zIndex: 60 + i,
          });

          // Store delta for GPU-only animation (x/y, no left/top changes)
          (sheet as unknown as HTMLElement & { _dx: number; _dy: number })._dx = dx;
          (sheet as unknown as HTMLElement & { _dx: number; _dy: number })._dy = dy;

          // Hide full-content initially; keep strip-label visible
          const fc = sheet.querySelector<HTMLElement>('.pt-fc');
          const sc = sheet.querySelector<HTMLElement>('.pt-sc');
          if (fc) gsap.set(fc, { opacity: 0 });
          if (sc) gsap.set(sc, { opacity: 1 });
        });

        // ── Master scrub timeline ────────────────────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: `+=${N * SCROLL_PX + 1200}`,
            scrub: 2,
            pin: pinned,
            anticipatePin: 1,
            onUpdate(self) {
              const idx = Math.min(
                Math.floor(self.progress * N),
                N - 1
              );
              if (progressRef.current) {
                progressRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}`;
              }
            },
          },
        });

        // ── Per-service animation segments ───────────────────────────────────
        SERVICES.forEach((_, i) => {
          const sheet = sheetRefs.current[i];
          const tab   = tabRefs.current[i];
          if (!sheet || !tab) return;

          type ExtSheet = HTMLElement & { _dx: number; _dy: number };
          const dx = (sheet as unknown as ExtSheet)._dx;
          const dy = (sheet as unknown as ExtSheet)._dy;
          const T  = i; // timeline position (1 unit per service)

          // ─ Phase 1: Sheet appears at tab position (opacity 0→1) ──────────
          tl.to(sheet, { opacity: 1, duration: 0.10, ease: 'none' }, T);

          // ─ Phase 2: Slight peel / lift before tear ───────────────────────
          tl.to(sheet, {
            y: -18,
            rotate: -2.5,
            duration: 0.10,
            ease: 'none',
          }, T + 0.06);

          // ─ Phase 3: Tear → fly to center → scale up ─────────────────────
          // GPU-only: x, y, scaleX, scaleY (no layout reflow)
          tl.to(sheet, {
            x: dx,
            y: dy,
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
            duration: 0.38,
            ease: 'power3.inOut',
          }, T + 0.16);

          // Tab dims as strip is torn
          tl.to(tab, { opacity: 0.12, duration: 0.14, ease: 'none' }, T + 0.18);

          // Subtle paper tilt on main sheet during tear
          tl.to(paper, { rotate: 0.6, scale: 0.985, duration: 0.20, ease: 'none' }, T + 0.16);
          tl.to(paper, { rotate: 0, scale: 1, duration: 0.10, ease: 'none' }, T + 0.44);

          // ─ Phase 4: Strip label fades, full content reveals ──────────────
          const sc  = sheet.querySelector<HTMLElement>('.pt-sc');
          const fc  = sheet.querySelector<HTMLElement>('.pt-fc');

          if (sc) {
            tl.to(sc, { opacity: 0, duration: 0.10 }, T + 0.40);
          }
          if (fc) {
            tl.to(fc, { opacity: 1, duration: 0.16 }, T + 0.46);

            // Stagger reveal of content items
            const items = fc.querySelectorAll<HTMLElement>('.pt-ri');
            if (items.length) {
              tl.fromTo(
                items,
                { y: 18, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.018, duration: 0.20, ease: 'power2.out' },
                T + 0.50
              );
            }
          }

          // ─ Phase 5: Hold — service card rests, user reads ────────────────
          //   (T + 0.68 → T + 0.83  — no animation)

          // ─ Phase 6: Exit — paper slides out ─────────────────────────────
          tl.to(sheet, {
            y: dy - 110,
            opacity: 0,
            rotate: 1.8,
            duration: 0.17,
            ease: 'power2.in',
          }, T + 0.83);

          // Restore tab opacity as strip returns
          tl.to(tab, { opacity: 1, duration: 0.10 }, T + 0.88);
        });

        // ── Scroll hint fades out after first segment ────────────────────────
        if (hintRef.current) {
          tl.to(hintRef.current, { opacity: 0, duration: 0.14 }, 0.28);
        }

        // ── CTA appears after all service segments ───────────────────────────
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { opacity: 0, y: 36 });
          tl.to(ctaRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.32,
            ease: 'power2.out',
          }, N + 0.18);
        }
      }, wrapperRef);
    });

    // Handle window resize: kill and recreate ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx?.revert();
      ctx = null;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // Re-init (simplified: just refresh positions)
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nav = (page: 'home' | 'contact' | 'about' | 'portfolio' | 'services') => {
    sound.playClick();
    onNavigate?.(page);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Outer tall wrapper provides scroll distance ──────────────────── */}
      <div
        ref={wrapperRef}
        style={{ height: `${N * SCROLL_PX + 2200}px` }}
        className="relative"
      >
        {/* ── Pinned 100vh container (GSAP pins this) ──────────────────── */}
        <div
          ref={pinnedRef}
          className="relative"
          style={{
            height: '100vh',
            background: DARK,
            overflow: 'hidden',
          }}
        >
          {/* ── Subtle engineering grid ───────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(200,255,47,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200,255,47,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />

          {/* ── Radial vignette for depth ──────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)',
            }}
          />

          {/* ── DETQEL minimal logo + back nav ─────────────────────────── */}
          <div className="absolute top-5 left-6 z-[200] flex items-center gap-2.5">
            <button
              onClick={() => nav('home')}
              onMouseEnter={() => triggerCursor('HOME', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
            >
              <div
                className="w-8 h-8 flex items-center justify-center font-pixel text-sm font-bold text-black group-hover:scale-110 transition-transform"
                style={{
                  background: LIME,
                  border: '2px solid rgba(255,255,255,0.15)',
                }}
              >
                D
              </div>
              <span className="font-pixel text-[11px] text-white/50 group-hover:text-white/80 transition-colors hidden sm:inline tracking-widest">
                DETQEL
              </span>
            </button>
          </div>

          {/* ── Progress indicator ─────────────────────────────────────── */}
          <div
            ref={progressRef}
            className="absolute top-6 right-6 z-[200] font-mono text-[11px] tracking-[0.35em] text-white/35"
          >
            01 / 07
          </div>

          {/* ── MAIN PAPER SHEET ───────────────────────────────────────── */}
          <div
            ref={paperRef}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(720px, 90vw)',
              background: PAPER,
              backgroundImage: GRAIN,
              backgroundRepeat: 'repeat',
              borderRadius: '2px',
              boxShadow:
                '0 40px 100px rgba(0,0,0,0.52), 0 8px 24px rgba(0,0,0,0.28), 0 2px 6px rgba(0,0,0,0.2)',
              willChange: 'transform',
            }}
          >
            {/* Tape strip at top */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-0.7deg)',
                width: '96px',
                height: '28px',
                background:
                  'linear-gradient(180deg, rgba(218,212,190,0.88) 0%, rgba(200,194,172,0.72) 100%)',
                borderRadius: '1px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            />

            {/* Paper header region */}
            <div
              className="relative z-10 px-8 pt-9 pb-5"
              style={{ borderBottom: 'none' }}
            >
              <p
                className="font-mono uppercase mb-3.5"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.35em',
                  color: 'rgba(0,0,0,0.32)',
                }}
              >
                DETQEL STUDIO · ALL SERVICES
              </p>

              <h2
                className="font-pixel font-bold leading-[1.0] text-black/92"
                style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)' }}
              >
                OUR
              </h2>
              <h2
                className="font-pixel font-bold leading-[1.0]"
                style={{
                  fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
                  color: LIME,
                  textShadow: '1px 1px 0 rgba(0,0,0,0.12)',
                }}
              >
                SERVICES.
              </h2>

              <p
                className="font-sans mt-3.5 uppercase text-black/50"
                style={{ fontSize: '13px', letterSpacing: '0.22em' }}
              >
                Take What You Need.
              </p>
            </div>

            {/* Perforation line with scissors */}
            <div className="relative flex items-center px-6 py-0 mb-0">
              {/* Scissors SVG */}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                className="flex-shrink-0 mr-2"
                style={{ color: 'rgba(0,0,0,0.28)' }}
              >
                <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M20 4L8.5 15.5M14.5 14.5L20 20M8.5 8.5L12.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <div
                style={{
                  flex: 1,
                  borderTop: '1.5px dashed rgba(0,0,0,0.16)',
                  marginTop: '1px',
                }}
              />
            </div>

            {/* ── SERVICE TABS (the tear-off strips) ─────────────────── */}
            <div className="flex" style={{ minHeight: '210px' }}>
              {SERVICES.map((svc, i) => (
                <div
                  key={svc.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  className="flex-1 relative flex flex-col items-center pt-3 pb-5"
                  style={{
                    borderLeft:
                      i > 0 ? '1px dashed rgba(0,0,0,0.11)' : 'none',
                  }}
                >
                  {/* Vertical rotated text label */}
                  <div
                    className="flex flex-col items-center justify-between h-full gap-3"
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                    }}
                  >
                    <span
                      className="font-pixel font-bold"
                      style={{ fontSize: '9px', color: LIME }}
                    >
                      {svc.id}
                    </span>
                    <span
                      className="font-mono uppercase text-black/60"
                      style={{ fontSize: '7.5px', letterSpacing: '0.06em' }}
                    >
                      {svc.label}
                    </span>
                  </div>

                  {/* Rounded bottom indicator */}
                  <div
                    className="absolute bottom-0 left-1.5 right-1.5"
                    style={{
                      height: '5px',
                      borderTop: '1px solid rgba(0,0,0,0.07)',
                      borderRadius: '0 0 3px 3px',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── FLOATING SERVICE SHEETS (one per service) ──────────── */}
          {SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              ref={(el) => {
                sheetRefs.current[i] = el;
              }}
              style={{
                position: 'absolute',
                background: PAPER,
                backgroundImage: GRAIN,
                backgroundRepeat: 'repeat',
                borderRadius: '2px',
                boxShadow:
                  '0 60px 140px rgba(0,0,0,0.55), 0 20px 48px rgba(0,0,0,0.32), 0 4px 12px rgba(0,0,0,0.22)',
                overflow: 'hidden',
                willChange: 'transform, opacity',
              }}
            >
              {/* Additional paper grain overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: GRAIN,
                  backgroundRepeat: 'repeat',
                  opacity: 0.45,
                  mixBlendMode: 'multiply',
                  zIndex: 1,
                }}
              />

              {/* ── Jagged tear edge at top ────────────────────────── */}
              <div
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                  top: 0,
                  height: '22px',
                  background: PAPER,
                  clipPath: TEAR_CLIP,
                  zIndex: 8,
                }}
              />
              {/* Shadow below tear */}
              <div
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                  top: '10px',
                  height: '18px',
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.10), transparent)',
                  zIndex: 7,
                }}
              />

              {/* ── Strip label (visible at small scale / during tear) ─ */}
              <div
                className="pt-sc absolute inset-0 flex flex-col items-center justify-end pb-6"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  zIndex: 12,
                }}
              >
                <span
                  className="font-pixel font-bold text-black/14"
                  style={{ fontSize: '30px', letterSpacing: '-0.02em' }}
                >
                  {svc.id}
                </span>
                <span
                  className="font-mono uppercase text-black/48 mt-3"
                  style={{ fontSize: '8px', letterSpacing: '0.08em' }}
                >
                  {svc.label}
                </span>
              </div>

              {/* ── Full service content (revealed after expansion) ──── */}
              <div
                className="pt-fc absolute inset-0 flex flex-col justify-between p-9 pt-11"
                style={{ zIndex: 12 }}
              >
                {/* Top: number + studio tag + title + description */}
                <div>
                  <div className="pt-ri flex items-start justify-between mb-5">
                    <span
                      className="font-pixel font-bold leading-none"
                      style={{
                        fontSize: 'clamp(3.6rem, 7vw, 5.4rem)',
                        color: LIME,
                        WebkitTextStroke: '1px rgba(0,0,0,0.08)',
                      }}
                    >
                      {svc.id}
                    </span>
                    <div className="text-right pt-1">
                      <p
                        className="font-mono uppercase text-black/28"
                        style={{ fontSize: '9px', letterSpacing: '0.28em' }}
                      >
                        DETQEL STUDIO
                      </p>
                      <p
                        className="font-mono uppercase text-black/22"
                        style={{ fontSize: '8px', letterSpacing: '0.22em' }}
                      >
                        SERVICE BRIEF
                      </p>
                    </div>
                  </div>

                  <h3
                    className="pt-ri font-pixel font-bold text-black/90 leading-tight mb-5"
                    style={{
                      fontSize: 'clamp(1.55rem, 3.2vw, 2.3rem)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {svc.title}
                  </h3>

                  <p
                    className="pt-ri font-sans text-black/62 leading-relaxed"
                    style={{ fontSize: '14px', maxWidth: '340px' }}
                  >
                    {svc.description}
                  </p>
                </div>

                {/* Divider */}
                <div
                  className="pt-ri"
                  style={{
                    borderTop: '1px solid rgba(0,0,0,0.09)',
                    margin: '20px 0',
                  }}
                />

                {/* Bottom: capabilities + deliverables */}
                <div className="grid grid-cols-2 gap-5">
                  {/* Left: capabilities */}
                  <div>
                    <p
                      className="pt-ri font-mono uppercase text-black/32 mb-3"
                      style={{ fontSize: '9px', letterSpacing: '0.3em' }}
                    >
                      WHAT WE DO
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {svc.capabilities.map((cap, j) => (
                        <div
                          key={j}
                          className="pt-ri flex items-center gap-2"
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: LIME,
                              flexShrink: 0,
                              border: '1px solid rgba(0,0,0,0.15)',
                            }}
                          />
                          <span
                            className="font-sans font-medium text-black/75"
                            style={{ fontSize: '13px' }}
                          >
                            {cap}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: deliverables + phrase */}
                  <div>
                    <p
                      className="pt-ri font-mono uppercase text-black/32 mb-3"
                      style={{ fontSize: '9px', letterSpacing: '0.3em' }}
                    >
                      DELIVERABLES
                    </p>
                    <p
                      className="pt-ri font-sans text-black/60 leading-relaxed"
                      style={{ fontSize: '12.5px' }}
                    >
                      {svc.deliverables}
                    </p>
                    <div
                      className="pt-ri mt-6 pt-4"
                      style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
                    >
                      <span
                        className="font-pixel font-bold uppercase"
                        style={{
                          fontSize: '10.5px',
                          color: LIME,
                          letterSpacing: '0.08em',
                        }}
                      >
                        {svc.phrase}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* ── Scroll hint ────────────────────────────────────────────── */}
          <div
            ref={hintRef}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-[200] pointer-events-none select-none"
          >
            <span
              className="font-mono uppercase text-white/35"
              style={{ fontSize: '10px', letterSpacing: '0.32em' }}
            >
              SCROLL TO TEAR
            </span>
            <div
              style={{
                width: '22px',
                height: '36px',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '11px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: '6px 0',
              }}
            >
              <div
                className="scroll-dot"
                style={{
                  width: '4px',
                  height: '8px',
                  borderRadius: '2px',
                  background: 'rgba(255,255,255,0.38)',
                }}
              />
            </div>
          </div>

          {/* ── CTA Banner (appears after all services) ───────────────── */}
          <div
            ref={ctaRef}
            className="absolute inset-0 flex flex-col items-center justify-center z-[150] pointer-events-none select-none"
            style={{ opacity: 0 }}
          >
            {/* Paper texture card behind CTA */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,255,47,0.03) 0%, transparent 70%)',
              }}
            />

            <p
              className="font-mono uppercase text-white/30 mb-5 relative"
              style={{ fontSize: '10px', letterSpacing: '0.35em' }}
            >
              ALL 07 SERVICES · DETQEL STUDIO
            </p>

            <h2
              className="font-pixel font-bold text-center text-white leading-tight mb-4 relative"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.4rem)' }}
            >
              READY TO BUILD
              <br />
              <span style={{ color: LIME }}>
                SOMETHING THAT
                <br />
                MATTERS?
              </span>
            </h2>

            <p
              className="font-sans text-white/52 text-center leading-relaxed mb-10 relative"
              style={{ fontSize: '15px', maxWidth: '400px' }}
            >
              Share your vision. We'll build something that genuinely stands out.
            </p>

            <div
              className="flex flex-wrap gap-4 justify-center relative pointer-events-auto"
            >
              <button
                onClick={() => nav('contact')}
                onMouseEnter={() => triggerCursor('TALK', 'hover')}
                onMouseLeave={() => triggerCursor('', 'default')}
                className="flex items-center gap-2.5 font-pixel text-[13px] font-bold text-black transition-all hover:brightness-95 active:scale-[0.98]"
                style={{
                  background: LIME,
                  border: `2px solid ${LIME}`,
                  padding: '14px 28px',
                }}
              >
                LET'S TALK <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => nav('contact')}
                onMouseEnter={() => triggerCursor('SCHEDULE', 'hover')}
                onMouseLeave={() => triggerCursor('', 'default')}
                className="flex items-center gap-2.5 font-mono text-[13px] text-white/65 hover:text-white transition-all active:scale-[0.98]"
                style={{
                  border: '2px solid rgba(255,255,255,0.18)',
                  padding: '14px 28px',
                }}
              >
                SCHEDULE A CALL <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Inline styles for scroll dot animation ───────────────────────── */}
      <style>{`
        @keyframes pt-scroll-dot {
          0%, 100% { transform: translateY(0px); opacity: 0.32; }
          55%       { transform: translateY(14px); opacity: 0.88; }
        }
        .scroll-dot {
          animation: pt-scroll-dot 1.7s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default PaperTearServicesSection;
