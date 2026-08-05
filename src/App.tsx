import { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GhibliHeroSection } from './components/GhibliHeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { RawArchiveSection } from './components/RawArchiveSection';
import { RobotTestimonialScene } from './components/RobotTestimonialScene';
import { KnowledgeLibraryFAQ } from './components/KnowledgeLibraryFAQ';
import { PlaygroundSection } from './components/PlaygroundSection';
import { FooterSection } from './components/FooterSection';
import { ContactUsPage } from './components/ContactUsPage';
import { ProjectModal } from './components/ProjectModal';
import { ProjectorStorySection } from './components/ProjectorStorySection';
import type { Project } from './types';

export function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'contact'>('home');

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
      } else {
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

  const handleNavigate = (page: 'home' | 'contact', sectionId?: string) => {
    if (page === 'contact') {
      setCurrentPage('contact');
      window.location.hash = 'contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <>
            {/* Fullscreen Studio Ghibli Parallax Hero Section */}
            <GhibliHeroSection onSelectProject={(project) => setSelectedProject(project)} />

            {/* Hero Section */}
            <HeroSection />

            {/* Featured Projects Showcase */}
            <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

            {/* Behind The Scenes Raw Archive Showcase */}
            <RawArchiveSection onSelectProject={(project) => setSelectedProject(project)} />

            {/* Robot Vacuum Delivery Testimonial Scene */}
            <RobotTestimonialScene />

            {/* Knowledge Library FAQ Section */}
            <KnowledgeLibraryFAQ />

            {/* Manifesto & Polaroid About Section */}
            <AboutSection />

            {/* Interactive Office Projector About Us Showcase */}
            <ProjectorStorySection />

            {/* Playground & Interactive Labs */}
            <PlaygroundSection />
          </>
        ) : (
          /* DEDICATED SEPARATE CONTACT US PAGE */
          <ContactUsPage />
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
