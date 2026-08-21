export interface ServiceItemData {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
  glowColor: string;
  dimColor: string;
  badgeBg: string;
  frequency: number; // For audio synthesis
  iconType: 'branding' | 'web' | 'uiux' | 'seo' | 'automation' | 'support';
  tags: string[];
  capabilities: string[];
  deliverables: string[];
  quickBullets: string[]; // Short inline expansion bullets
  cardSide: 'left' | 'right';
  cardIndex: number; // 0, 1, 2 for top, mid, bot
  stone3DPos: [number, number, number]; // [x, y, z] in Three.js world coordinates
  stoneRotation?: [number, number, number];
  stoneSize?: number;
}

export const SERVICES_HERO_DATA: ServiceItemData[] = [
  {
    id: 'branding',
    number: '01',
    title: 'BRANDING & IDENTITY',
    shortDesc: 'Unique identities that make your brand unforgettable.',
    fullDesc: 'We craft comprehensive visual systems, memorable brand marks, typography guidelines, and digital brand identities that command authority and emotional resonance.',
    color: '#A855F7',
    glowColor: '#D8B4FE',
    dimColor: '#581C87',
    badgeBg: '#F3E8FF',
    frequency: 523.25, // C5
    iconType: 'branding',
    tags: ['Identity Systems', 'Logo Design', 'Brand Architecture', 'Typography', 'Visual Strategy'],
    capabilities: [
      'Visual Brand Guidelines',
      'Custom Logo & Wordmark Systems',
      'Color Harmonies & Typography Hierarchies',
      'Packaging & Print Collateral',
      'Digital Brand Assets'
    ],
    deliverables: [
      'Complete Brand Book (PDF & Figma)',
      'Vector Mark Kit (SVG, EPS, PNG)',
      'Typography Licensing & Pairing Guide',
      'Social & Marketing Identity Pack'
    ],
    quickBullets: ['Brand strategy', 'Logo design', 'Visual identity', 'Brand guidelines', 'Digital assets'],
    cardSide: 'left',
    cardIndex: 0,
    stone3DPos: [-0.88, 0.74, 0.40],
    stoneSize: 0.22
  },
  {
    id: 'web-dev',
    number: '02',
    title: 'WEB DEVELOPMENT',
    shortDesc: 'Fast, responsive & scalable websites that convert.',
    fullDesc: 'We engineer high-performance web applications, interactive 3D WebGL experiences, and robust frontend/backend architectures built to handle immense scale.',
    color: '#3B82F6',
    glowColor: '#93C5FD',
    dimColor: '#1E3A8A',
    badgeBg: '#EFF6FF',
    frequency: 587.33, // D5
    iconType: 'web',
    tags: ['React & Next.js', 'Three.js / WebGL', 'Headless CMS', 'API Architecture', 'Speed 99+'],
    capabilities: [
      'Production-Grade React / Next.js Web Apps',
      'Immersive WebGL & 3D Interactive Canvas',
      'Micro-Animations & Smooth GSAP / Framer Motion',
      'Fullstack Database & Cloud Integrations',
      'Core Web Vitals 99+ Speed Optimization'
    ],
    deliverables: [
      'Clean Modular TypeScript Codebase',
      'Vercel / AWS Cloud Deployment',
      'Headless CMS Admin Dashboard',
      'Automated CI/CD Pipeline & QA Suite'
    ],
    quickBullets: ['React & Next.js', 'WebGL / Three.js', 'Headless CMS', 'Cloud deployment', 'Speed optimization'],
    cardSide: 'left',
    cardIndex: 1,
    stone3DPos: [-0.44, 1.12, 0.38],
    stoneSize: 0.22
  },
  {
    id: 'uiux',
    number: '03',
    title: 'UI / UX DESIGN',
    shortDesc: 'Beautiful interfaces that users love to interact with.',
    fullDesc: 'We design intuitive, tactile, and captivating digital interfaces that blend human psychology, Swiss brutalist aesthetics, and seamless usability.',
    color: '#10B981',
    glowColor: '#6EE7B7',
    dimColor: '#064E3B',
    badgeBg: '#ECFDF5',
    frequency: 659.25, // E5
    iconType: 'uiux',
    tags: ['Design Systems', 'Figma Tokens', 'Micro-Interactions', 'UX Research', 'Conversion Design'],
    capabilities: [
      'User Journey Mapping & Wireframing',
      'Interactive Figma Prototypes & Motion Specs',
      'Scalable Design Tokens & Component Libraries',
      'Mobile-First Responsive Layouts',
      'Tactile Micro-Interactions & Haptic UX'
    ],
    deliverables: [
      'Figma Master File with Design Tokens',
      'Interactive High-Fidelity Prototype',
      'Developer Handoff Specs & Assets',
      'UX Usability Audit & Heatmap Insights'
    ],
    quickBullets: ['Interface design', 'Figma prototypes', 'Design systems', 'User research', 'Micro-interactions'],
    cardSide: 'left',
    cardIndex: 2,
    stone3DPos: [0.08, 1.14, 0.40],
    stoneSize: 0.22
  },
  {
    id: 'seo-growth',
    number: '04',
    title: 'SEO & GROWTH',
    shortDesc: 'Data-driven strategies to rank higher & grow faster.',
    fullDesc: 'We execute technical SEO audits, content architecture engineering, programmatic keyword domination, and conversion funnels that generate measurable organic revenue.',
    color: '#F59E0B',
    glowColor: '#FDE68A',
    dimColor: '#78350F',
    badgeBg: '#FFFBEB',
    frequency: 783.99, // G5
    iconType: 'seo',
    tags: ['Technical SEO', 'Content Clusters', 'Growth Funnels', 'Analytics', 'Conversion Rate'],
    capabilities: [
      'Full Technical SEO & Schema Architecture',
      'Programmatic Content Engine & Clusters',
      'Competitor Keyword Domination Strategies',
      'Analytics, Tag Manager & Event Tracking',
      'A/B Testing & Funnel Conversion Boost'
    ],
    deliverables: [
      'Comprehensive SEO Audit Report',
      'Keyword Strategy & Content Roadmap',
      'Live Performance & Ranking Dashboard',
      'Conversion Rate Optimization Plan'
    ],
    quickBullets: ['Technical SEO', 'Content strategy', 'Keyword research', 'Analytics setup', 'Conversion optimization'],
    cardSide: 'right',
    cardIndex: 0,
    stone3DPos: [0.58, 1.10, 0.38],
    stoneSize: 0.22
  },
  {
    id: 'automation',
    number: '05',
    title: 'AUTOMATION',
    shortDesc: 'Smart workflows that save time & boost productivity.',
    fullDesc: 'We connect tools, databases, and AI autonomous agents to eliminate repetitive busywork, automate lead pipelines, and unlock 10x team efficiency.',
    color: '#EF4444',
    glowColor: '#FCA5A5',
    dimColor: '#7F1D1D',
    badgeBg: '#FEF2F2',
    frequency: 880.0, // A5
    iconType: 'automation',
    tags: ['Workflow Automation', 'n8n Integrations', 'AI Agents', 'CRM Pipelines', 'Webhook Architecture'],
    capabilities: [
      'Multi-Platform Workflow Automation (n8n, Zapier)',
      'Custom LLM & AI Autonomous Agents',
      'CRM & ERP Real-time Data Synchronization',
      'Instant Lead Notification & Follow-up Bots',
      'Document Parsing & Automated Invoicing'
    ],
    deliverables: [
      'Self-Hosted n8n / Cloud Workflow Blueprints',
      'API Webhook Connectors & Failover Logic',
      'AI Agent Prompts & Context Memory Stores',
      'Operational Runbooks & Automation Guide'
    ],
    quickBullets: ['Workflow automation', 'n8n integrations', 'AI automation', 'CRM automation', 'Lead follow-ups'],
    cardSide: 'right',
    cardIndex: 1,
    stone3DPos: [0.96, 0.96, 0.36],
    stoneSize: 0.22
  },
  {
    id: 'support-scale',
    number: '06',
    title: 'SUPPORT & SCALE',
    shortDesc: 'Ongoing support to keep your business running smoothly.',
    fullDesc: 'We provide 24/7 dedicated engineering maintenance, proactive security hardening, cloud infrastructure auto-scaling, and rapid feature iteration sprints.',
    color: '#06B6D4',
    glowColor: '#A5F3FC',
    dimColor: '#164E63',
    badgeBg: '#ECFEFF',
    frequency: 987.77, // B5
    iconType: 'support',
    tags: ['24/7 Monitoring', 'Cloud Scaling', 'SLA Guarantees', 'Security Hardening', 'Rapid Sprints'],
    capabilities: [
      'Proactive Uptime & Health Monitoring',
      'Zero-Downtime Patching & Security Audits',
      'Cloud Architecture Auto-Scaling (AWS / GCP)',
      'Continuous Feature Sprints & Enhancements',
      'Priority Dedicated Slack / Teams Channel'
    ],
    deliverables: [
      'Guaranteed SLA Response Commitment',
      'Monthly Engineering & Health Reports',
      'Automated Disaster Recovery & Backups',
      'Dedicated Senior Lead Engineer Access'
    ],
    quickBullets: ['24/7 monitoring', 'Cloud scaling', 'Security hardening', 'Feature sprints', 'Dedicated engineer'],
    cardSide: 'right',
    cardIndex: 2,
    stone3DPos: [0.0, -0.12, 0.52],
    stoneSize: 0.22
  }
];
