import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Code2, Award, Briefcase, Calendar, Clock, Globe } from 'lucide-react';
import { client, urlFor } from '../../lib/sanity';
import { sound } from '../../utils/sound';
import { triggerCursor } from '../CustomCursor';
import { MockupCanvas } from '../MockupCanvas';
import type { Project } from '../../types';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<{ title: string; slug: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    // Fetch the current project and its sibling for "Next Project" links
    const query = `{
      "current": *[_type == "project" && slug.current == $slug][0],
      "all": *[_type == "project"] | order(sortOrder asc, _createdAt desc) {
        title,
        "slug": slug.current
      }
    }`;

    client
      .fetch(query, { slug })
      .then((res) => {
        if (!res.current) {
          setError('PROJECT NOT FOUND.');
          setLoading(false);
          return;
        }

        // Map sanity project to include compatibility properties
        const proj = res.current;
        const mappedProject: Project = {
          ...proj,
          id: proj.slug?.current || proj._id,
          number: '01', // computed dynamically below or fallback
          image: proj.coverImage ? urlFor(proj.coverImage).width(1200).url() : '/projects/placeholder.png',
          tags: proj.services || [],
          bgAccent: proj.bgAccent || 'bg-accent-acid',
          badgeText: proj.badgeText || 'AWWWARDS SITE OF THE DAY',
          accentColor: proj.accentColor || '#7939a1',
          mockupType: proj.mockupType || 'custom-image',
          liveUrl: proj.liveUrl || '',
          githubUrl: proj.githubUrl || '',
          role: proj.role || 'Lead Creative Developer & Brand Strategist',
          metrics: proj.results && proj.results.length > 0 ? `${proj.results[0].value} • ${proj.results[0].label}` : '',
          subtitle: proj.shortDescription || '',
          deliverables: proj.services || [],
          serviceTags: proj.services || [],
        };

        // Determine next project in order
        const allProjects = res.all || [];
        const currentIndex = allProjects.findIndex((p: any) => p.slug === slug);
        let nextProj = null;
        if (currentIndex !== -1 && allProjects.length > 1) {
          const nextIndex = (currentIndex + 1) % allProjects.length;
          nextProj = allProjects[nextIndex];
        }

        // Formulate computed display number based on sortOrder index
        if (currentIndex !== -1) {
          mappedProject.number = String(currentIndex + 1).padStart(2, '0');
        }

        setProject(mappedProject);
        setNextProject(nextProj ? { title: nextProj.title, slug: nextProj.slug } : null);
        setLoading(false);

        // Update SEO Tags dynamically
        document.title = `${mappedProject.title} — Detqel`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', mappedProject.shortDescription);
        }
      })
      .catch((err) => {
        console.error('Error fetching project detail:', err);
        setError('SANITY REQUEST FAILURE. PLEASE TRY AGAIN LATER.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas dark:bg-canvas-dark flex items-center justify-center pt-24 pb-12">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-ink dark:border-white border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-pixel text-xs text-ink/60 dark:text-white/60 tracking-wider">RETRIEVING CASE DATA...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-canvas dark:bg-canvas-dark flex items-center justify-center pt-24 pb-12 px-6">
        <div className="max-w-md text-center space-y-6 bg-white dark:bg-canvas-dark-paper border-2 border-ink p-8 shadow-brutalist rounded-xs">
          <h2 className="font-pixel text-2xl font-black text-accent-coral">{error || 'PROJECT NOT FOUND.'}</h2>
          <p className="font-sans text-sm text-ink/70 dark:text-gray-300">
            The project you're looking for doesn't exist or may have been unpublished.
          </p>
          <Link
            to="/portfolio"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 bg-ink text-white dark:bg-white dark:text-ink px-6 py-3 font-pixel text-xs font-bold border-2 border-ink hover:bg-accent-coral dark:hover:bg-accent-coral dark:hover:text-white transition-all shadow-brutalist-sm"
          >
            BACK TO PORTFOLIO <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F3] dark:bg-canvas-dark text-ink dark:text-white pt-24 pb-20 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-12">
        
        {/* HEADER: Back Button */}
        <div>
          <Link
            to="/portfolio"
            onClick={() => sound.playClick()}
            onMouseEnter={() => triggerCursor('BACK', 'hover')}
            onMouseLeave={() => triggerCursor('', 'default')}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-gray-400 hover:text-ink dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> ← BACK TO PORTFOLIO
          </Link>
        </div>

        {/* HERO SECTION */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 font-pixel font-bold text-ink bg-white border-2 border-ink shadow-brutalist-sm`}>
              PROJECT #{project.number}
            </span>
            <span className="font-mono text-xs font-bold text-ink/60 dark:text-gray-400 uppercase tracking-wider">// {project.category}</span>
          </div>

          <div className="space-y-4">
            {project.badgeText && (
              <div className="inline-flex items-center gap-2 font-mono text-xs bg-ink text-white dark:bg-accent-acid dark:text-ink px-3 py-1 font-bold shadow-xs">
                <Award className="w-4 h-4" /> {project.badgeText}
              </div>
            )}
            <h1 className="font-pixel text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight leading-none text-ink dark:text-white">
              {project.title}
            </h1>
            <p className="font-sans text-xl sm:text-2xl text-ink/80 dark:text-gray-300 font-medium max-w-3xl leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Interactive Hero Canvas */}
          <div className="w-full aspect-[16/9] min-h-[350px] border-4 border-ink rounded-xs overflow-hidden shadow-brutalist bg-white dark:bg-canvas-dark-paper">
            <MockupCanvas
              type={project.mockupType || 'custom-image'}
              accentColor={project.accentColor || '#7939a1'}
              imageSrc={project.image}
              title={project.title}
            />
          </div>
        </div>

        {/* METADATA GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-white dark:bg-canvas-dark-paper border-2 border-ink shadow-brutalist font-mono text-xs">
          <div>
            <span className="text-ink/50 dark:text-gray-400 font-bold block flex items-center gap-1.5 uppercase"><Briefcase className="w-3.5 h-3.5" /> CLIENT</span>
            <p className="font-bold text-sm mt-1">{project.client || 'Internal Project'}</p>
          </div>
          <div>
            <span className="text-ink/50 dark:text-gray-400 font-bold block flex items-center gap-1.5 uppercase"><Globe className="w-3.5 h-3.5" /> INDUSTRY</span>
            <p className="font-bold text-sm mt-1">{project.industry || 'Technology'}</p>
          </div>
          <div>
            <span className="text-ink/50 dark:text-gray-400 font-bold block flex items-center gap-1.5 uppercase"><Calendar className="w-3.5 h-3.5" /> YEAR</span>
            <p className="font-bold text-sm mt-1">{project.year || '2026'}</p>
          </div>
          <div>
            <span className="text-ink/50 dark:text-gray-400 font-bold block flex items-center gap-1.5 uppercase"><Clock className="w-3.5 h-3.5" /> DURATION</span>
            <p className="font-bold text-sm mt-1">{project.duration || 'Ongoing'}</p>
          </div>
        </div>

        {/* SERVICES / TAGS */}
        {project.services && project.services.length > 0 && (
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-ink/50 dark:text-gray-400 block uppercase">
              STUDIO SERVICES DELIVERED
            </span>
            <div className="flex flex-wrap gap-2">
              {project.services.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs font-bold px-3 py-1.5 bg-white dark:bg-canvas-dark-paper border-2 border-ink rounded-xs shadow-brutalist-sm text-ink dark:text-white"
                >
                  ⚡ {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* OVERVIEW: CHALLENGE & SOLUTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-4">
          {project.challenge && (
            <div className="space-y-4 bg-white dark:bg-canvas-dark-paper border-2 border-ink p-6 sm:p-8 shadow-brutalist rounded-xs">
              <h3 className="font-pixel text-xl uppercase font-black text-accent-coral flex items-center gap-2">
                [THE CHALLENGE]
              </h3>
              <p className="font-sans text-base sm:text-lg text-ink/80 dark:text-gray-200 leading-relaxed">
                {project.challenge}
              </p>
            </div>
          )}
          {project.solution && (
            <div className="space-y-4 bg-white dark:bg-canvas-dark-paper border-2 border-ink p-6 sm:p-8 shadow-brutalist rounded-xs">
              <h3 className="font-pixel text-xl uppercase font-black text-accent-acid flex items-center gap-2">
                [OUR SOLUTION]
              </h3>
              <p className="font-sans text-base sm:text-lg text-ink/80 dark:text-gray-200 leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}
        </div>

        {/* DYNAMIC CASE STUDY SECTIONS */}
        {project.sections && project.sections.length > 0 && (
          <div className="space-y-16 pt-8">
            {project.sections.map((section, idx) => (
              <div key={section._key || idx} className="space-y-6 border-t-2 border-ink/15 pt-12 first:border-t-0 first:pt-0">
                <div className="space-y-2 max-w-3xl">
                  <h3 className="font-pixel text-2xl sm:text-3xl font-black uppercase text-ink dark:text-white">
                    {section.sectionTitle}
                  </h3>
                  {section.description && (
                    <p className="font-sans text-base sm:text-lg text-ink/70 dark:text-gray-300 leading-relaxed font-medium">
                      {section.description}
                    </p>
                  )}
                </div>

                {/* Section Image Layout */}
                {section.images && section.images.length > 0 && (
                  <div className={`grid gap-6 ${section.images.length === 1 ? 'grid-cols-1' : section.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                    {section.images.map((img, imgIdx) => (
                      <div key={imgIdx} className="border-2 border-ink rounded-xs overflow-hidden shadow-brutalist bg-white dark:bg-canvas-dark-paper">
                        <img
                          src={urlFor(img).width(800).url()}
                          alt={`${section.sectionTitle} - image ${imgIdx + 1}`}
                          className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* RESULTS / METRICS */}
        {project.results && project.results.length > 0 && (
          <div className="bg-[#121118] text-white p-8 sm:p-10 border-4 border-ink shadow-brutalist rounded-xs space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <h3 className="font-pixel text-xl uppercase font-black text-[#E0FF00] tracking-wider relative z-10">
              KEY METRICS & OUTCOMES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {project.results.map((metric, metricIdx) => (
                <div key={metric._key || metricIdx} className="space-y-2 border-l-2 border-[#E0FF00]/30 pl-4">
                  <div className="font-pixel text-4xl sm:text-5xl font-black text-[#E0FF00]">
                    {metric.value}
                  </div>
                  <div className="font-mono text-xs text-gray-300 font-bold uppercase tracking-wide leading-snug">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BUTTONS: SOURCE CODE & DEMO PREVIEW */}
        <div className="flex flex-wrap items-center gap-4 pt-6 border-t-2 border-ink/20">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playSuccess()}
              onMouseEnter={() => triggerCursor('LAUNCH', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="inline-flex items-center gap-2 bg-ink text-white dark:bg-accent-acid dark:text-ink px-6 py-3 font-pixel text-xs sm:text-sm font-black border-2 border-ink shadow-brutalist hover:bg-accent-coral hover:text-white transition-all cursor-pointer"
            >
              LIVE DEMO PREVIEW <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              onMouseEnter={() => triggerCursor('GITHUB', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="inline-flex items-center gap-2 bg-white dark:bg-canvas-dark-paper text-ink dark:text-white px-6 py-3 font-mono text-xs font-bold border-2 border-ink shadow-brutalist hover:bg-sticky-yellow hover:text-ink transition-all cursor-pointer"
            >
              SOURCE CODE <Code2 className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* FOOTER: Next Project Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t-2 border-ink pt-8 mt-12">
          <Link
            to="/portfolio"
            onClick={() => sound.playClick()}
            onMouseEnter={() => triggerCursor('BACK', 'hover')}
            onMouseLeave={() => triggerCursor('', 'default')}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-gray-400 hover:text-ink dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> ← BACK TO PORTFOLIO
          </Link>

          {nextProject && (
            <Link
              to={`/work/${nextProject.slug}`}
              onClick={() => sound.playClick()}
              onMouseEnter={() => triggerCursor('NEXT', 'hover')}
              onMouseLeave={() => triggerCursor('', 'default')}
              className="inline-flex items-center gap-2 bg-white dark:bg-canvas-dark-paper border-2 border-ink text-ink dark:text-white px-6 py-3 rounded-xs font-pixel text-xs font-black shadow-brutalist hover:bg-accent-acid hover:text-ink transition-all"
            >
              NEXT PROJECT: {nextProject.title.toUpperCase()} <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};
