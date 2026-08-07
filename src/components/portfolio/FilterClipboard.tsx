import React from 'react';
import { sound } from '../../utils/sound';

interface FilterClipboardProps {
  selectedCat: string;
  onSelectCategory: (cat: string) => void;
}

export const FilterClipboard: React.FC<FilterClipboardProps> = ({ selectedCat, onSelectCategory }) => {
  const categories = [
    'All Projects',
    'Branding',
    'Websites',
    'AI Solutions',
    'Mobile Apps',
    'Motion',
    'Packaging',
    'Automation'
  ];

  return (
    <div className="w-44 sm:w-48 bg-[#673F1E] border-4 border-[#3D210B] p-2.5 rounded-sm shadow-brutalist relative select-none">
      
      {/* Top Metallic Clip */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-gradient-to-b from-gray-300 to-gray-500 border-2 border-black rounded-t-xs flex items-center justify-center">
        <div className="w-8 h-1 bg-black/50 rounded-full" />
      </div>

      {/* Paper Surface */}
      <div className="bg-[#FAF8F3] text-ink p-3 rounded-xs border-2 border-ink shadow-inner font-sans">
        <div className="border-b border-ink/20 pb-1 mb-2">
          <h4 className="font-pixel text-xs font-black uppercase text-ink tracking-wider">
            FILTER BY
          </h4>
        </div>

        <div className="space-y-1.5 text-xs font-medium">
          {categories.map((cat) => {
            const isChecked = selectedCat === cat || (selectedCat === '' && cat === 'All Projects');
            return (
              <label
                key={cat}
                onClick={() => {
                  sound.playClick();
                  onSelectCategory(cat === 'All Projects' ? '' : cat);
                }}
                className="flex items-center gap-2 cursor-pointer hover:text-[#88C000] transition-colors"
              >
                <div className={`w-3.5 h-3.5 border-2 border-ink rounded-[2px] flex items-center justify-center text-[10px] font-bold ${
                  isChecked ? 'bg-[#88C000] text-ink' : 'bg-white'
                }`}>
                  {isChecked ? '✓' : ''}
                </div>
                <span className="font-pixel text-[10px] uppercase font-bold">{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );
};
