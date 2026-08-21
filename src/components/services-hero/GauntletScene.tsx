import React, { useRef, useEffect } from 'react';
import { SERVICES_HERO_DATA } from './types';
import { sound } from '../../utils/sound';

interface GauntletSceneProps {
  activeServiceId: string | null;
  onSelectService: (id: string) => void;
  onStonesProjected?: (positions: Record<string, { x: number; y: number }>) => void;
}

export const GauntletScene: React.FC<GauntletSceneProps> = ({
  activeServiceId,
  onSelectService,
  onStonesProjected
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Approximate relative positions for the 6 stones on the illustration (as % of image width/height)
  // Mapping:
  // - Purple (Top Left) -> Branding (01)
  // - Blue (Top Mid-Left) -> Web (02)
  // - Green (Top Mid-Right) -> UIUX (03)
  // - Red (Top Right) -> Automation (05)
  // - Orange (Thumb, Mid-Left) -> SEO (04)
  // - Cyan (Center Palm) -> Support (06)
  const stonePositions: Record<string, { x: number; y: number; size: number }> = {
    'branding': { x: 27, y: 21, size: 10 },
    'web-dev': { x: 44.5, y: 19, size: 10 },
    'uiux': { x: 60.5, y: 20, size: 10 },
    'seo-growth': { x: 20, y: 41, size: 9 },
    'automation': { x: 74, y: 25, size: 10 },
    'support-scale': { x: 50.5, y: 47, size: 16 },
  };

  // Re-calculate projection coordinates whenever window resizes or component mounts
  useEffect(() => {
    if (!onStonesProjected) return;

    const updateProjections = () => {
      if (!containerRef.current) return;
      const sceneRect = containerRef.current.closest('.services-hero-container')?.getBoundingClientRect();
      const imgRect = containerRef.current.getBoundingClientRect();
      if (!sceneRect) return;

      const projected: Record<string, { x: number; y: number }> = {};
      SERVICES_HERO_DATA.forEach((s) => {
        const pos = stonePositions[s.id];
        if (pos) {
          // Calculate exact pixel position relative to viewport
          const pixelX = imgRect.left + (imgRect.width * (pos.x / 100));
          const pixelY = imgRect.top + (imgRect.height * (pos.y / 100));

          // Convert to percentage relative to the parent `.services-hero-container`
          const percentX = ((pixelX - sceneRect.left) / sceneRect.width) * 100;
          const percentY = ((pixelY - sceneRect.top) / sceneRect.height) * 100;

          projected[s.id] = { x: percentX, y: percentY };
        }
      });

      // Special projection for core/center if needed
      const centerPixelX = imgRect.left + (imgRect.width * 0.505);
      const centerPixelY = imgRect.top + (imgRect.height * 0.47);
      projected['core'] = {
        x: ((centerPixelX - sceneRect.left) / sceneRect.width) * 100,
        y: ((centerPixelY - sceneRect.top) / sceneRect.height) * 100
      };

      onStonesProjected(projected);
    };

    // Run immediately and on resize
    updateProjections();
    window.addEventListener('resize', updateProjections);
    // Add a slight delay to ensure image loads and layout settles
    const timeout = setTimeout(updateProjections, 100);

    return () => {
      window.removeEventListener('resize', updateProjections);
      clearTimeout(timeout);
    };
  }, [onStonesProjected]);

  return (
    <div className="w-full h-full relative flex items-center justify-center p-4">
      {/* Container that perfectly shrink-wraps the image maintaining aspect ratio */}
      <div 
        ref={containerRef}
        className="relative h-full max-w-full inline-block"
      >
        <img
          src="/images/gauntlet_illustration.png"
          alt="Detqel Power Gauntlet"
          className="h-full w-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
          onLoad={() => window.dispatchEvent(new Event('resize'))}
        />

        {/* Interactive Stone Overlays */}
        {SERVICES_HERO_DATA.map((service) => {
          const pos = stonePositions[service.id];
          const isActive = activeServiceId === service.id;
          
          if (!pos) return null;

          return (
            <div
              key={service.id}
              onClick={(e) => {
                e.stopPropagation();
                sound.playRepulsorSound();
                onSelectService(service.id);
              }}
              onMouseEnter={() => {
                sound.playHover();
                document.body.style.cursor = 'pointer';
              }}
              onMouseLeave={() => {
                document.body.style.cursor = 'default';
              }}
              className={`absolute rounded-full cursor-pointer transition-all duration-300 z-10`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${pos.size}%`,
                height: `${pos.size}%`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: isActive ? 'transparent' : 'rgba(0,0,0,0.01)',
                boxShadow: isActive ? `0 0 45px 15px ${service.color}40, inset 0 0 25px 5px ${service.color}30` : 'none',
                filter: isActive ? 'brightness(1.2)' : 'none',
              }}
            >
              {/* Inner intense glow core when active */}
              <div 
                className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none`}
                style={{
                  opacity: isActive ? 1 : 0,
                  boxShadow: `0 0 20px ${service.color}, inset 0 0 10px ${service.color}`,
                  background: `radial-gradient(circle, ${service.glowColor}40 0%, transparent 60%)`
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
