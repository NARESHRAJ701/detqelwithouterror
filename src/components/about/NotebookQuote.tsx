import React from 'react';

export const NotebookQuote: React.FC = () => {
  return (
    <div className="bg-[#FAF8F3] text-ink p-3 rounded-xs border-2 border-ink shadow-brutalist max-w-[240px] relative font-handwriting">
      {/* Spiral Binder Rings on Left */}
      <div className="absolute top-2 bottom-2 left-1 flex flex-col justify-between pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-1 bg-gray-400 border border-black rounded-full shadow-xs" />
        ))}
      </div>

      <div className="pl-4 pr-1 text-xs sm:text-sm font-bold leading-snug">
        "We believe great work happens when creativity meets technology."
      </div>
      <div className="text-right font-mono text-[9px] font-bold text-ink/70 mt-1">
        — DetQel Team ☺
      </div>
    </div>
  );
};
