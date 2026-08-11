import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TornPaperDividerProps {}

export const TornPaperDivider: React.FC<TornPaperDividerProps> = () => {
  const { scrollY } = useScroll();

  // Parallax subtle movement on scroll
  const paperY = useTransform(scrollY, [0, 600], [0, 18]);

  // Generate realistic hand-torn paper edge vectors
  const { darkFillPath, paperFiberPath, shadowPath, highlightPath } = useMemo(() => {
    const width = 1440;
    const baseHeight = 45; // Height offset for tear contour
    const pointsCount = 200; // High resolution points for authentic paper fibers
    const step = width / pointsCount;

    const topTearPoints: [number, number][] = [];
    const bottomFiberPoints: [number, number][] = [];
    const shadowPoints: [number, number][] = [];

    for (let i = 0; i <= pointsCount; i++) {
      const x = Number((i * step).toFixed(2));

      // Organic macro wave (asymmetric natural curve)
      const macroWave =
        Math.sin(x * 0.0035) * 22 +
        Math.cos(x * 0.0085) * 14 +
        Math.sin(x * 0.0018) * 16;

      // Micro paper fiber jitter (irregular micro rips)
      const microJitter =
        Math.sin(x * 0.24) * 3.2 +
        Math.cos(x * 0.58) * 2.4 +
        Math.sin(x * 1.1) * 1.5;

      // Occasional sharp paper tear notch
      const notch = (i % 13 === 0) ? (i % 2 === 0 ? 5 : -4) : 0;

      const yTop = Number((baseHeight + macroWave + microJitter + notch).toFixed(2));
      topTearPoints.push([x, yTop]);

      // Paper fiber thickness variation (exposed white deckle paper pulp)
      const fiberThickness = 3.5 + Math.sin(x * 0.35) * 2.2 + (i % 5 === 0 ? 1.5 : 0);
      const yBottom = Number((yTop + fiberThickness).toFixed(2));
      bottomFiberPoints.push([x, yBottom]);

      // Shadow contour (offset downwards)
      const yShadow = Number((yBottom + 8 + Math.sin(x * 0.12) * 3).toFixed(2));
      shadowPoints.push([x, yShadow]);
    }

    // 1. Dark Fill Path (fills from tear line down to SVG bottom y=160 with #050608)
    let darkD = `M 0 160 L 1440 160 L 1440 ${topTearPoints[topTearPoints.length - 1][1]} `;
    for (let i = topTearPoints.length - 1; i >= 0; i--) {
      darkD += `L ${topTearPoints[i][0]} ${topTearPoints[i][1]} `;
    }
    darkD += 'Z';

    // 2. White Paper Deckle Strip Path (Torn paper fiber body between top tear & bottom fiber line)
    let fiberD = `M 0 ${topTearPoints[0][1]} `;
    for (let i = 0; i <= topTearPoints.length - 1; i++) {
      fiberD += `L ${topTearPoints[i][0]} ${topTearPoints[i][1]} `;
    }
    for (let i = bottomFiberPoints.length - 1; i >= 0; i--) {
      fiberD += `L ${bottomFiberPoints[i][0]} ${bottomFiberPoints[i][1]} `;
    }
    fiberD += 'Z';

    // 3. Drop Shadow Path
    let shadowD = `M 0 ${bottomFiberPoints[0][1]} `;
    for (let i = 0; i <= bottomFiberPoints.length - 1; i++) {
      shadowD += `L ${bottomFiberPoints[i][0]} ${bottomFiberPoints[i][1]} `;
    }
    for (let i = shadowPoints.length - 1; i >= 0; i--) {
      shadowD += `L ${shadowPoints[i][0]} ${shadowPoints[i][1]} `;
    }
    shadowD += 'Z';

    // 4. Highlight Line (Top rim of torn paper)
    let highlightD = `M 0 ${topTearPoints[0][1]} `;
    for (let i = 1; i <= topTearPoints.length - 1; i++) {
      highlightD += `L ${topTearPoints[i][0]} ${topTearPoints[i][1]} `;
    }

    return {
      darkFillPath: darkD,
      paperFiberPath: fiberD,
      shadowPath: shadowD,
      highlightPath: highlightD
    };
  }, []);


  return (
    <div className="relative w-full z-20 pointer-events-none select-none -mt-16 sm:-mt-24 md:-mt-28 lg:-mt-32">
      {/* Animated Torn Paper Vector Container */}
      <motion.div
        style={{ y: paperY }}
        className="relative w-full overflow-visible leading-none"
      >
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="w-full h-[70px] sm:h-[100px] md:h-[130px] lg:h-[160px] block overflow-visible"
        >
          <defs>
            {/* Soft Shadow Filter for Realistic Paper Cast Shadow */}
            <filter id="paper-drop-shadow" x="-5%" y="-20%" width="110%" height="180%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
              <feOffset dx="0" dy="8" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.75" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Subtle Paper Grain Filter */}
            <filter id="deckle-grain" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.95   0 0 0 0 0.93   0 0 0 0 0.88  0 0 0 0.15 0" />
              <feComposite operator="in" in2="SourceGraphic" />
            </filter>
          </defs>

          {/* 1. LAYER 1: Deep Soft Drop Shadow onto Dark Hero Section */}
          <path
            d={shadowPath}
            fill="#000000"
            opacity="0.8"
            filter="url(#paper-drop-shadow)"
          />

          {/* 2. LAYER 2: Main Dark Section Fill (#050608) extending downwards */}
          <path
            d={darkFillPath}
            fill="#050608"
          />

          {/* 3. LAYER 3: White / Cream Exposed Torn Paper Fiber Strip (Deckle Edge) */}
          <path
            d={paperFiberPath}
            fill="#FFFFFF"
            filter="url(#deckle-grain)"
          />

          {/* 4. LAYER 4: Secondary Fiber Highlight Lines */}
          <path
            d={highlightPath}
            fill="none"
            stroke="#F5F0E6"
            strokeWidth="1.5"
            strokeDasharray="4 2 8 3"
            opacity="0.9"
          />

          <path
            d={highlightPath}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.75"
            opacity="0.6"
          />
        </svg>
      </motion.div>

    </div>
  );
};

export default TornPaperDivider;
