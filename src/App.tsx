import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { GhibliHeroSection } from './components/GhibliHeroSection';
import { TornPaperDivider } from './components/TornPaperDivider';
import { HeroSection } from './components/HeroSection';
import { PuzzleServicesSection } from './components/PuzzleServicesSection';
import { ServicesHeroSection } from './components/services-hero/ServicesHeroSection';
import { RobotTestimonialScene } from './components/RobotTestimonialScene';
import { KnowledgeLibraryFAQ } from './components/KnowledgeLibraryFAQ';
import { PlaygroundSection } from './components/PlaygroundSection';
import { FooterSection } from './components/FooterSection';
import { ContactUsPage } from './components/ContactUsPage';
import { AboutUsPage } from './components/about/AboutUsPage';
import { PortfolioPage } from './components/portfolio/PortfolioPage';
import { ProjectDetailPage } from './components/portfolio/ProjectDetailPage';
import { ProjectorStorySection } from './components/ProjectorStorySection';

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

  return (
    <div className="min-h-screen bg-canvas text-ink dark:bg-canvas-dark dark:text-white transition-colors duration-300 relative selection:bg-emerald-500 selection:text-white">
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
          <Route path="/" element={
            <div className="relative">
              {/* Fullscreen Studio Ghibli Parallax Hero Section */}
              <div className="sticky top-0 z-0 w-full h-screen overflow-hidden">
                <GhibliHeroSection />
              </div>

              {/* Content that scrolls ON TOP of the sticky hero section */}
              <div className="relative z-10">
                {/* Realistic Torn Paper Edge Transition */}
                <TornPaperDivider />

                <div className="bg-[#050608] dark:bg-canvas-dark shadow-2xl">
                  {/* Hero Section (WE BUILD WORLDS) */}
                  <HeroSection />
                </div>

                {/* Shared Background Wrapper starting from Section 3 */}
                <div 
                  className="relative w-full bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
                  style={{ backgroundImage: 'url("/images/fantasy_bg.jpg")' }}
                >
                  {/* Light/bright overlay to keep the background artwork vibrant */}
                  <div className="absolute inset-0 bg-white/20 dark:bg-black/25 z-0 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Interactive Puzzle Services Showcase */}
                    <PuzzleServicesSection />

                    {/* Robot Vacuum Delivery Testimonial Scene */}
                    <RobotTestimonialScene />

                    {/* Knowledge Library FAQ Section */}
                    <KnowledgeLibraryFAQ />

                    {/* Interactive Office Projector About Us Showcase */}
                    <ProjectorStorySection />

                    {/* Playground & Interactive Labs */}
                    <PlaygroundSection />

                    {/* Footer Section (integrated within homepage background environment) */}
                    <FooterSection isTransparent={true} />
                  </div>
                </div>
              </div>
            </div>
          } />

          <Route path="/services" element={
            <div className="pt-16 sm:pt-20">
              <ServicesHeroSection onNavigate={handleNavigate} />
            </div>
          } />

          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />

          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer Section (shown only on non-homepage pages) */}
      {location.pathname !== '/' && <FooterSection />}
    </div>
  );
}

export default App;
