import React from 'react';

export const CRTMonitor: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Heavy Grey Plastic CRT Monitor Chassis */}
      <div className="w-44 h-32 bg-[#252332] border-4 border-ink p-2 rounded-lg shadow-brutalist relative flex flex-col items-center justify-between">
        
        {/* CRT Bezel Brand Stamp */}
        <div className="w-full flex justify-between px-1 mb-1">
          <span className="font-pixel text-[6px] text-gray-400 font-bold uppercase">DETQEL CRT-80</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#88C000] animate-pulse" />
        </div>

        {/* Phosphor Green Screen Display */}
        <div className="w-full flex-1 bg-[#09150B] border-2 border-ink rounded-xs p-2 relative overflow-hidden flex flex-col justify-between text-emerald-400 font-mono text-[9px] shadow-inner">
          {/* Scanline Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent bg-[length:100%_4px] pointer-events-none z-10" />

          <div className="space-y-1 z-20">
            <div className="text-[8px] opacity-70">SYS.INIT.V2</div>
            <div className="font-bold text-[#88C000]">
              LOADING ABOUT US...
            </div>
            <div className="text-emerald-400 font-bold">
              100% COMPLETE <span className="animate-ping">✓</span>
            </div>
          </div>

          <div className="flex justify-between items-center z-20 text-[7px] text-emerald-600 font-bold">
            <span>OK.SYS</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>

        {/* Monitor Base Grill */}
        <div className="w-full flex items-center justify-between mt-1 px-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="w-1 h-1 rounded-full bg-gray-600" />
          </div>
          <div className="w-10 h-1 bg-black/40 rounded-full" />
        </div>
      </div>

      {/* Monitor Stand Base */}
      <div className="w-24 h-2 bg-gradient-to-b from-gray-700 to-gray-900 border-2 border-ink rounded-xs" />
    </div>
  );
};
