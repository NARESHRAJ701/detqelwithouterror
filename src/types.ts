export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  year: string;
  category: string;
  serviceTags: string[];
  deliverables: string[];
  image: string;
  tags: string[];
  accentColor: string;
  bgAccent: string;
  textAccent: string;
  borderAccent: string;
  badgeText: string;
  description: string;
  fullDescription: string;
  client: string;
  role: string;
  metrics: string;
  mockupType: 'custom-image' | 'analytics' | 'ai-studio' | '3d-canvas' | 'financial';
  liveUrl: string;
  githubUrl: string;
}

export interface StickyNoteData {
  id: string;
  text: string;
  author?: string;
  color: 'yellow' | 'pink' | 'mint' | 'lavender' | 'orange';
  rotation: number;
  x: number;
  y: number;
  tapeRotation: number;
}

export interface PolaroidData {
  id: string;
  title: string;
  date: string;
  caption: string;
  rotation: number;
  imageBg: string;
  tags: string[];
}
