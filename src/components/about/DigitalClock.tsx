import React, { useState, useEffect } from 'react';

export const DigitalClock: React.FC = () => {
  const [timeStr, setTimeStr] = useState('10:22');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, '0');
      h = h % 12 || 12;
      const hStr = String(h).padStart(2, '0');
      setTimeStr(`${hStr}:${m}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#181624] text-[#88C000] border-3 border-ink p-2.5 rounded-xs shadow-brutalist flex flex-col items-center justify-center min-w-[130px]">
      <div className="font-mono text-2xl font-black tracking-wider flex items-center gap-0.5">
        <span>{timeStr}</span>
      </div>
      <div className="font-pixel text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
        FOCUS MODE
      </div>
    </div>
  );
};
