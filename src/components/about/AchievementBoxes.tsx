import React from 'react';

export const AchievementBoxes: React.FC = () => {
  const items = [
    { name: 'CLIENT SUCCESS', leds: 2 },
    { name: 'IMPACT DRIVEN', leds: 2 },
    { name: 'FUTURE READY', leds: 2 }
  ];

  return (
    <div className="flex flex-col gap-1 w-44">
      {items.map((item) => (
        <div
          key={item.name}
          className="bg-[#181624] text-white border-2 border-ink px-3 py-1.5 rounded-xs shadow-brutalist-sm flex items-center justify-between font-pixel text-[10px] font-bold"
        >
          <span className="uppercase tracking-wider">{item.name}</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#88C000] animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#88C000]" />
          </div>
        </div>
      ))}
    </div>
  );
};
