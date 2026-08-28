import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { GhibliHeroSection } from './components/GhibliHeroSection';
import { WorldSection } from './components/WorldSection';
import { PuzzleServicesSection } from './components/PuzzleServicesSection';
import { ServicesHeroSection } from './components/services-hero/ServicesHeroSection';
import { RobotTestimonialScene } from './components/RobotTestimonialScene';
import { KnowledgeLibraryFAQ } from './components/KnowledgeLibraryFAQ';
import { ProjectorStorySection } from './components/ProjectorStorySection';
import { PlaygroundSection } from './components/PlaygroundSection';
import { CTASection } from './components/CTASection';
import { FooterSection } from './components/FooterSection';
import { ContactUsPage } from './components/ContactUsPage';
import { AboutUsPage } from './components/about/AboutUsPage';
import { PortfolioPage } from './components/portfolio/PortfolioPage';
import { ProjectDetailPage } from './components/portfolio/ProjectDetailPage';
import type { Project } from './types';

export function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<'home' | 'contact' | 'about' | 'portfolio' | 'services'>('home');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync active page state for Navbar styling and trigger scroll-to-top on route changes
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/contact')) {
      setCurrentPage('contact');
    } else if (path.startsWith('/about')) {
      setCurrentPage('about');
    } else if (path.startsWith('/portfolio') || path.startsWith('/work')) {
      setCurrentPage('portfolio');
    } else if (path.startsWith('/services')) {
      setCurrentPage('services');
    } else {
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  const handleNavigate = (page: 'home' | 'contact' | 'about' | 'portfolio' | 'services', sectionId?: string) => {
    if (page === 'contact') {
      navigate('/contact');
    } else if (page === 'about') {
      navigate('/about');
    } else if (page === 'portfolio') {
      navigate('/portfolio');
    } else if (page === 'services') {
      navigate('/services');
    } else {
      navigate('/');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  };

  const handleSelectProject = (project: Project) => {
    navigate(`/work/${project.id || project.slug?.current || 'island-world'}`);
  };

  return (
    <div className="min-h-screen bg-[#0B2638] text-white selection:bg-[#B7E532] selection:text-[#0A0D0F] transition-colors duration-300 relative">
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

      {/* Main Content Layout with Routes */}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              /* ONE CONTINUOUS LIVING WORLD ENVIRONMENT */
              <div className="relative w-full min-h-screen overflow-hidden">
                
                {/* Continuous High-Resolution Fantasy World Background Layer */}
                <div
                  className="fixed inset-0 z-0 bg-top bg-no-repeat pointer-events-none"
                  style={{
                    backgroundImage: 'url("/images/detqel_world_continuous.png")',
                    backgroundSize: '100% auto',
                    backgroundAttachment: 'fixed',
                  }}
                />

                {/* Soft Atmospheric Ambient Lighting & Readability Overlays */}
                <div className="fixed inset-0 z-0 bg-gradient-to-b from-sky-400/10 via-emerald-950/15 to-black/45 pointer-events-none" />

                {/* Living Website Content Flowing Down the Landscape */}
                <div className="relative z-10">
                  
                  {/* 1. HERO SECTION (High Sky & Floating Castle) */}
                  <GhibliHeroSection onSelectProject={handleSelectProject} />

                  {/* 2. WE BUILD WORLDS SECTION (Upper Valley & Waterfall) */}
                  <WorldSection onNavigateWork={() => handleNavigate('portfolio')} />

                  {/* 3. SERVICES & IMPACT CAPABILITIES (8-Piece Jigsaw Puzzle) */}
                  <PuzzleServicesSection />

                  {/* 4. TESTIMONIALS (Framed Glass Delivery Scene & Carousel) */}
                  <RobotTestimonialScene />

                  {/* 5. FREQUENTLY ASKED QUESTIONS (Desk Library & Hanging Tabs) */}
                  <KnowledgeLibraryFAQ />

                  {/* 6. OUR STORY (Workstation & Studio Film Projector) */}
                  <ProjectorStorySection />

                  {/* 7. INTERACTIVE TOYS (Text Scramble & Sticker Wall Canvas) */}
                  <PlaygroundSection />

                  {/* 8. CALL TO ACTION (Translucent Glass CTA Card) */}
                  <CTASection onNavigate={handleNavigate} />

                  {/* 9. CONTINUOUS DARK GLASS FOOTER */}
                  <FooterSection isTransparent={true} />

                </div>
              </div>
            }
          />

          <Route
            path="/services"
            element={
              <div className="pt-16 sm:pt-20">
                <ServicesHeroSection onNavigate={handleNavigate} />
              </div>
            }
          />

          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />

          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer Section (shown only on standalone subpages) */}
      {location.pathname !== '/' && <FooterSection isTransparent={false} />}
    </div>
  );
}

export default App;
