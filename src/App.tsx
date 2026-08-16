import { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { GhibliHeroSection } from './components/GhibliHeroSection';
import { TornPaperDivider } from './components/TornPaperDivider';
<<<<<<< HEAD

=======
>>>>>>> 17837ed8f4a56b3599d5f51f57d9c3e0bb48eb8c
import { HeroSection } from './components/HeroSection';
import { PuzzleServicesSection } from './components/PuzzleServicesSection';

import { RobotTestimonialScene } from './components/RobotTestimonialScene';
import { KnowledgeLibraryFAQ } from './components/KnowledgeLibraryFAQ';
import { PlaygroundSection } from './components/PlaygroundSection';
import { FooterSection } from './components/FooterSection';
import { ContactUsPage } from './components/ContactUsPage';
import { AboutUsPage } from './components/about/AboutUsPage';
import { PortfolioPage } from './components/portfolio/PortfolioPage';
import { ProjectModal } from './components/ProjectModal';
import { ProjectorStorySection } from './components/ProjectorStorySection';
import type { Project } from './types';

export function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'contact' | 'about' | 'portfolio'>('home');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync route with URL hash / window location
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#contact') {
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#about' || hash === '#about-page') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#portfolio' || hash === '#work') {
        setCurrentPage('portfolio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#services') {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else if (hash === '' || hash === '#home') {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleNavigate = (page: 'home' | 'contact' | 'about' | 'portfolio' | 'services', sectionId?: string) => {
    if (page === 'contact') {
      setCurrentPage('contact');
      window.location.hash = 'contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'about') {
      setCurrentPage('about');
      window.location.hash = 'about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'portfolio') {
      setCurrentPage('portfolio');
      window.location.hash = 'portfolio';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'services') {
      // Services is now a section on the home page — scroll to it
      setCurrentPage('home');
      window.location.hash = 'services';
      setTimeout(() => {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      setCurrentPage('home');
      window.location.hash = sectionId || '';
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink dark:bg-canvas-dark dark:text-white transition-colors duration-300 relative selection:bg-accent-acid selection:text-ink">
      {/* Noise Grain Background Overlay */}
      <div className="noise-bg" />

      {/* Custom Cursor Follower */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activePage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Layout */}
      <main>
        {currentPage === 'home' ? (
          <div className="relative">
            {/* Fullscreen Studio Ghibli Parallax Hero Section */}
            <div className="sticky top-0 z-0 w-full h-screen overflow-hidden">
              <GhibliHeroSection onSelectProject={(project) => setSelectedProject(project)} />
            </div>

            {/* Content that scrolls ON TOP of the sticky hero section */}
            <div className="relative z-10">
              {/* Realistic Torn Paper Edge Transition */}
              <TornPaperDivider />

              <div className="bg-[#050608] dark:bg-canvas-dark shadow-2xl">
                {/* Hero Section (WE BUILD WORLDS) */}
                <HeroSection />

                {/* Interactive Puzzle Services Showcase */}
                <PuzzleServicesSection />

                {/* Robot Vacuum Delivery Testimonial Scene */}
                <RobotTestimonialScene />

                {/* Knowledge Library FAQ Section */}
                <KnowledgeLibraryFAQ />

<<<<<<< HEAD
=======
                {/* Interactive Office Projector About Us Showcase */}
                <ProjectorStorySection />
>>>>>>> 17837ed8f4a56b3599d5f51f57d9c3e0bb48eb8c

                {/* Playground & Interactive Labs */}
                <PlaygroundSection />
              </div>
            </div>
          </div>
        ) : currentPage === 'contact' ? (
          /* DEDICATED SEPARATE CONTACT US PAGE */
          <ContactUsPage />
        ) : currentPage === 'about' ? (
          /* DEDICATED SEPARATE ABOUT US PAGE */
          <AboutUsPage />
        ) : (
          /* DEDICATED SEPARATE PORTFOLIO CREATIVE PLAYGROUND PAGE */
          <PortfolioPage onSelectProject={(project) => setSelectedProject(project)} />
        )}
      </main>

      {/* Footer Section */}
      <FooterSection />

      {/* Project Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
