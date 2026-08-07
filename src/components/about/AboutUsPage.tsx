import React, { useState } from 'react';
import { AboutSidebar } from './AboutSidebar';
import { PaperFolder } from './PaperFolder';
import { PolaroidCard } from './PolaroidCard';
import { WhatWeDo } from './WhatWeDo';
import { GoalBoard } from './GoalBoard';
import { RobotMascot } from './RobotMascot';
import { JourneyNotebook } from './JourneyNotebook';
import { CoreValues } from './CoreValues';
import { CRTMonitor } from './CRTMonitor';
import { PassionMeter } from './PassionMeter';
import { NotebookQuote } from './NotebookQuote';
import { CoffeeWidget } from './CoffeeWidget';
import { DigitalClock } from './DigitalClock';
import { AchievementBoxes } from './AchievementBoxes';

export const AboutUsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="min-h-screen bg-graph-paper text-ink dark:text-white pt-24 pb-16 px-4 sm:px-8 font-sans select-none relative overflow-hidden transition-colors duration-300">
      
      {/* Dark Walnut Wood Desk Surround Styling & Ambient Glow */}
      <div className="max-w-[1520px] mx-auto relative z-10">
        
        {/* DESK SURFACE FRAME CONTAINER */}
        <div className="p-4 sm:p-6 bg-[#EFECE6] dark:bg-[#1A1824] border-4 border-ink rounded-lg shadow-brutalist space-y-8 relative overflow-hidden">
          
          {/* SECTION 1: TOP WORKSTATION GRID (SIDEBAR, PAPER FOLDER & TOP-RIGHT CARDS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Sidebar: Metallic Filing Cabinet (Col 3) */}
            <div className="lg:col-span-3">
              <AboutSidebar
                activeSection={activeSection}
                onSelectSection={(idx) => setActiveSection(idx)}
              />
            </div>

            {/* Center Main Content: Layered Manila Paper Folder (Col 5) */}
            <div className="lg:col-span-5">
              <PaperFolder activeSection={activeSection} />
            </div>

            {/* Right Side: Polaroid, What We Do, Goal Board & Robot Mascot (Col 4) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Row 1: Polaroid & What We Do */}
              <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-4">
                <PolaroidCard />
                <WhatWeDo />
              </div>

              {/* Row 2: Hanging Goal Chalkboard Board & Robot Mascot */}
              <div className="flex items-end justify-between gap-4 pt-2">
                <GoalBoard />
                <RobotMascot activeSection={activeSection} />
              </div>

            </div>

          </div>

          {/* SECTION 2: MIDDLE ROW (JOURNEY TIMELINE NOTEBOOK & CORE VALUES PANEL) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <JourneyNotebook />
            </div>
            <div className="lg:col-span-5">
              <CoreValues />
            </div>
          </div>

          {/* SECTION 3: BOTTOM DESK WIDGETS ROW */}
          <div className="pt-4 border-t-2 border-ink/20 flex flex-wrap items-end justify-between gap-4">
            
            {/* CRT Monitor */}
            <CRTMonitor />

            {/* Passion Meter */}
            <PassionMeter />

            {/* Notebook Quote */}
            <NotebookQuote />

            {/* Coffee Cup */}
            <CoffeeWidget />

            {/* Digital Clock */}
            <DigitalClock />

            {/* Achievement Boxes */}
            <AchievementBoxes />

          </div>

        </div>

      </div>
    </div>
  );
};

export default AboutUsPage;
