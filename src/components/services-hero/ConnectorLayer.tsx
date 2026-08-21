import React from 'react';
import { SERVICES_HERO_DATA } from './types';

interface ConnectorLayerProps {
  activeServiceId: string | null;
  cardAnchors: Record<string, { x: number; y: number }>;
  stoneAnchors: Record<string, { x: number; y: number }>;
  onSelectService?: (id: string) => void;
}

export const ConnectorLayer: React.FC<ConnectorLayerProps> = ({
  activeServiceId,
  cardAnchors,
  stoneAnchors
}) => {
  // Default fallback stone anchor coordinates (as percentages of container width and height)
  const defaultStoneAnchors: Record<string, { x: number; y: number }> = {
    'branding': { x: 42.5, y: 31.0 },
    'web-dev': { x: 46.2, y: 25.5 },
    'uiux': { x: 50.8, y: 24.5 },
    'seo-growth': { x: 55.4, y: 26.8 },
    'automation': { x: 58.2, y: 33.5 },
    'support-scale': { x: 50.0, y: 50.0 }
  };

  // Default fallback card anchor coordinates (percentages)
  const defaultCardAnchors: Record<string, { x: number; y: number }> = {
    'branding': { x: 37.0, y: 38.0 },
    'web-dev': { x: 37.0, y: 58.0 },
    'uiux': { x: 33.0, y: 77.0 },
    'seo-growth': { x: 67.0, y: 33.0 },
    'automation': { x: 67.0, y: 53.0 },
    'support-scale': { x: 67.0, y: 73.0 }
  };

  // Build stepped orthogonal circuit path between Card Anchor and Stone Anchor
  const generatePath = (
    cId: string,
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    side: 'left' | 'right'
  ) => {
    const x1 = p1.x;
    const y1 = p1.y;
    const x2 = p2.x;
    const y2 = p2.y;

    if (side === 'left') {
      const midX = x1 + (x2 - x1) * 0.45;
      return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
    } else {
      const midX = x1 - (x1 - x2) * 0.45;
      return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
    }
  };

  // Calculate mid-point for junction node
  const getMidPoint = (
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    side: 'left' | 'right'
  ) => {
    if (side === 'left') {
      const midX = p1.x + (p2.x - p1.x) * 0.45;
      return { x: midX, y: p1.y };
    } else {
      const midX = p1.x - (p1.x - p2.x) * 0.45;
      return { x: midX, y: p1.y };
    }
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Subtle glow filters for active connectors */}
        {SERVICES_HERO_DATA.map((s) => (
          <filter key={`glow-${s.id}`} id={`glow-${s.id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>

      {/* Render Connector Lines */}
      {SERVICES_HERO_DATA.map((service) => {
        const isActive = activeServiceId === service.id;
        const cardPos = cardAnchors[service.id] || defaultCardAnchors[service.id];
        const stonePos = stoneAnchors[service.id] || defaultStoneAnchors[service.id];
        const pathData = generatePath(service.id, cardPos, stonePos, service.cardSide);
        const midPt = getMidPoint(cardPos, stonePos, service.cardSide);

        return (
          <g key={`connector-${service.id}`} className="transition-all duration-300">
            {/* Background trace line — very thin dotted */}
            <path
              d={pathData}
              fill="none"
              stroke={service.color}
              strokeWidth={isActive ? '0.28' : '0.10'}
              strokeDasharray={isActive ? 'none' : '0.5 0.8'}
              strokeOpacity={isActive ? 0.90 : 0.30}
              filter={isActive ? `url(#glow-${service.id})` : undefined}
              className="transition-all duration-300"
            />

            {/* Active animated pulse stream */}
            {isActive && (
              <>
                <path
                  d={pathData}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="0.18"
                  strokeDasharray="1.2 3.0"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  style={{
                    animation: 'dashMove 1.8s linear infinite'
                  }}
                />

                {/* Pulsing ring at Stone Target */}
                <circle
                  cx={stonePos.x}
                  cy={stonePos.y}
                  r="0.7"
                  fill="none"
                  stroke={service.color}
                  strokeWidth="0.15"
                  className="animate-ping origin-center opacity-60"
                />
              </>
            )}

            {/* Origin Node Dot (At Card) — small circle */}
            <circle
              cx={cardPos.x}
              cy={cardPos.y}
              r={isActive ? '0.38' : '0.22'}
              fill={service.color}
              stroke="#FFFFFF"
              strokeWidth="0.08"
              className="transition-all duration-300"
            />

            {/* Mid Corner Junction Node — small square */}
            <rect
              x={midPt.x - 0.20}
              y={midPt.y - 0.20}
              width="0.40"
              height="0.40"
              fill={isActive ? service.color : '#9CA3AF'}
              opacity={isActive ? 0.9 : 0.45}
              className="transition-all duration-300"
            />

            {/* Second junction at vertical/horizontal turn */}
            <rect
              x={midPt.x - 0.18}
              y={stonePos.y - 0.18}
              width="0.36"
              height="0.36"
              fill={isActive ? service.color : '#9CA3AF'}
              opacity={isActive ? 0.8 : 0.35}
              className="transition-all duration-300"
            />

            {/* Target Stone Socket — circle with ring */}
            <circle
              cx={stonePos.x}
              cy={stonePos.y}
              r={isActive ? '0.50' : '0.28'}
              fill={isActive ? '#FFFFFF' : service.color}
              stroke={service.color}
              strokeWidth={isActive ? '0.15' : '0.08'}
              className="transition-all duration-300"
            />
          </g>
        );
      })}

      <style>{`
        @keyframes dashMove {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
};
