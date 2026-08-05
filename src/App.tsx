import { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GhibliHeroSection } from './components/GhibliHeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { RawArchiveSection } from './components/RawArchiveSection';
import { RobotTestimonialScene } from './components/RobotTestimonialScene';
import { PlaygroundSection } from './components/PlaygroundSection';
import { FooterSection } from './components/FooterSection';
import { ProjectModal } from './components/ProjectModal';
import { ProjectorStorySection } from './components/ProjectorStorySection';
import type { Project } from './types';

export function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-canvas text-ink dark:bg-canvas-dark dark:text-white transition-colors duration-300 relative selection:bg-accent-acid selection:text-ink">
      {/* Noise Grain Background Overlay */}
      <div className="noise-bg" />

      {/* Custom Cursor Follower */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content Layout */}
      <main>
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

        {/* Manifesto & Polaroid About Section */}
        <AboutSection />

        {/* Interactive Office Projector About Us Showcase */}
        <ProjectorStorySection />

        {/* Playground & Interactive Labs */}
        <PlaygroundSection />
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
