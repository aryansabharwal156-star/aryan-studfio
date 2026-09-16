export type ServiceId = 'websites' | 'landing-pages' | 'stores' | 'saas' | 'ugc';

export interface ServiceItem {
  id: ServiceId;
  number: string;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  features: string[];
  deliverables: string[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  year: string;
  client?: string;
  description: string;
  detailedDescription: string;
  accent: string;
  accentColor: string;
  accentHex: string;
  badge?: string;
  stats?: { label: string; value: string }[];
  deliverables: string[];
  tech: string[];
  aspectRatio?: 'wide' | 'tall' | 'square';
  highlightMetric?: string;
  liveUrl?: string;
  githubUrl?: string;
  previewType: 'research' | 'store' | 'saas' | 'ai' | 'ugc';
}

export interface CaseStudyData {
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  location: string;
  description: string;
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  keyOutcomes: string[];
  accentColor: string;
  sectorsResearched: {
    name: string;
    count: number;
    gap: string;
    solution: string;
  }[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  duration: string;
}

export interface TechNode {
  id: string;
  label: string;
  category: 'AI' | 'Design' | 'Dev' | 'Motion';
  description: string;
  tools: string[];
  accent: string;
}

export interface PlaygroundItem {
  id: string;
  title: string;
  category: string;
  type: 'AI Experiment' | 'UI Concept' | 'Web Animation' | 'Generative Visual' | '3D & Shaders' | 'UGC Concept';
  date: string;
  description: string;
  interactivePreview: string;
  accentColor: string;
  tech: string[];
}

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  accentColor: string;
}
