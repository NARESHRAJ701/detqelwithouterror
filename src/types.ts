export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface ProjectSection {
  _key: string;
  sectionTitle: string;
  description?: string;
  images?: SanityImage[];
}

export interface ProjectResult {
  _key: string;
  value: string;
  label: string;
}

export interface Project {
  _id?: string;
  title: string;
  slug?: {
    _type: 'slug';
    current: string;
  };
  category: string;
  shortDescription: string;
  description?: string;
  client?: string;
  industry?: string;
  year: number | string;
  duration?: string;
  services?: string[];
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  challenge?: string;
  solution?: string;
  sections?: ProjectSection[];
  results?: ProjectResult[];
  featured?: boolean;
  sortOrder?: number;
  
  // Compatibility fields
  id?: string;
  number?: string;
  subtitle?: string;
  image?: string;
  tags?: string[];
  accentColor?: string;
  bgAccent?: string;
  textAccent?: string;
  borderAccent?: string;
  badgeText?: string;
  role?: string;
  metrics?: string;
  mockupType?: 'custom-image' | 'analytics' | 'ai-studio' | '3d-canvas' | 'financial';
  liveUrl?: string;
  githubUrl?: string;
  fullDescription?: string;
  serviceTags?: string[];
  deliverables?: string[];
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
