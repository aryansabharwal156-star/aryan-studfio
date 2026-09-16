import {
  ServiceItem,
  ProjectItem,
  CaseStudyData,
  ProcessStep,
  TechNode,
  PlaygroundItem,
  JournalArticle
} from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'websites',
    number: '01',
    title: 'Websites & Landing Pages',
    tagline: 'High-conversion, cinematic web platforms',
    description:
      'Marketing and business websites designed to make a strong first impression, communicate clearly, and turn visitors into qualified clients.',
    accent: 'Rust',
    accentColor: 'text-[#B3521F]',
    accentBg: 'bg-[#B3521F]',
    accentBorder: 'border-[#B3521F]',
    features: [
      'Custom bespoke design & art direction',
      'Mobile-first responsive architecture',
      'Ultra-fast performance & 95+ Lighthouse',
      'Conversion-focused copywriting & layouts',
      'SEO-ready semantic structure & schema'
    ],
    deliverables: [
      'Interactive Figma prototypes',
      'Full React/Next.js/Vite codebase',
      'CMS integration (Sanity/Payload/Contentful)',
      'Custom animations & micro-interactions',
      'Global CDN deployment & DNS setup'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Next.js', 'Figma']
  },
  {
    id: 'landing-pages',
    number: '02',
    title: 'Landing Page Development',
    tagline: 'High-converting launchpads tailored for scale & speed',
    description:
      'High-impact landing pages engineered for maximum conversion, product launches, lead generation, and brand storytelling.',
    accent: 'Teal',
    accentColor: 'text-[#2F6F5E]',
    accentBg: 'bg-[#2F6F5E]',
    accentBorder: 'border-[#2F6F5E]',
    features: [
      'High-converting above-the-fold narrative structure',
      'Persuasive value propositions & visual hierarchy',
      'Micro-interactions, smooth scroll & engaging motion',
      'Optimized CTA placement & frictionless lead capture',
      'Blazing fast performance (95+ Google PageSpeed score)'
    ],
    deliverables: [
      'Custom Responsive Landing Page (Figma to Code)',
      'A/B testing-ready modular layout sections',
      'CRM & lead-gen integrations (HubSpot, Mailchimp, Stripe)',
      'SEO metadata, open-graph & tracking pixel setup',
      'Instant hosting deployment on Vercel/Netlify'
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Figma']
  },
  {
    id: 'saas',
    number: '03',
    title: 'SaaS & Web Applications',
    tagline: 'Intuitive UX systems for modern software products',
    description:
      'Clean interfaces and user flows for software products, dashboards, AI tools, and web applications.',
    accent: 'Indigo',
    accentColor: 'text-[#3D5A95]',
    accentBg: 'bg-[#3D5A95]',
    accentBorder: 'border-[#3D5A95]',
    features: [
      'End-to-end UI/UX product architecture',
      'Analytical dashboards & rich data visualization',
      'Frictionless user onboarding & activation paths',
      'Complex multi-step workflow logic',
      'Scalable design systems & component libraries'
    ],
    deliverables: [
      'Comprehensive Figma design system (Tokens, variants)',
      'Clickable user test prototypes',
      'Production-ready React/TypeScript components',
      'Dark/Light theme architectures',
      'Developer handoff specs with interaction notes'
    ],
    techStack: ['Figma', 'React', 'Radix UI', 'Tailwind CSS', 'Recharts', 'TypeScript']
  },
  {
    id: 'ugc',
    number: '04',
    title: 'Motion Design & Commercial Ads',
    tagline: 'Thumb-stopping vertical creative that sells',
    description:
      'Short-form vertical advertising and motion design engineered around strong hooks, native-feeling storytelling, and rapid viewer engagement.',
    accent: 'Rose',
    accentColor: 'text-[#AD3A61]',
    accentBg: 'bg-[#AD3A61]',
    accentBorder: 'border-[#AD3A61]',
    features: [
      'High-retention 3-second hook development',
      'Conversion-backed direct response scriptwriting',
      'AI-assisted voiceover & visual generation',
      'Paced vertical editing with captions & dynamic SFX',
      'Native formats tailored for Instagram Reels, YouTube Shorts, & TikTok'
    ],
    deliverables: [
      'Multi-hook ad variants (A/B testing ready)',
      'Final 9:16 vertical 4K deliverables',
      'Script & storyboard decks',
      'Custom subtitle animations',
      'Raw footage & asset package'
    ],
    techStack: ['CapCut Pro', 'Premiere Pro', 'Midjourney', 'ElevenLabs', 'After Effects']
  }
];

export const selectedProjects: ProjectItem[] = [
  {
    id: 'lumina-commerce-engine',
    title: 'Lumina Boutique Commerce Engine',
    category: 'ONLINE STORES',
    tag: 'E-Commerce Platform',
    year: '2026',
    client: 'Direct-to-Consumer Brand',
    description:
      'A high-conversion headless e-commerce flagship with dynamic variant selectors, slide-out micro-cart, and sub-second checkout paths.',
    detailedDescription:
      'Engineered for premium lifestyle and design products, this storefront combines editorial aesthetics with high-velocity headless commerce. Features instant search with algorithmic recommendations, currency auto-detection, fluid mobile gestures, and frictionless one-tap payment integrations.',
    accent: 'Gold',
    accentColor: 'text-[#C9A227]',
    accentHex: '#C9A227',
    badge: 'Featured Store',
    highlightMetric: '4.8% Checkout Conversion',
    stats: [
      { label: 'Cart Conversion', value: '4.8%' },
      { label: 'Page Speed', value: '98/100' },
      { label: 'Average Order Value', value: '+32%' },
      { label: 'Year', value: '2026' }
    ],
    deliverables: [
      'Custom headless storefront with fluid animations',
      'Dynamic inventory & live variant configuration',
      'Frictionless slide-out micro-cart & checkout integration',
      'High-resolution optimized product gallery with zoom'
    ],
    tech: ['Next.js', 'Shopify Storefront API', 'Tailwind CSS', 'TypeScript', 'Stripe'],
    aspectRatio: 'wide',
    previewType: 'store'
  },
  {
    id: 'business-website-systems',
    title: 'Business Website Systems',
    category: 'DIGITAL STUDIO',
    tag: 'Web Platforms',
    year: '2026',
    client: 'Multi-Client Suite',
    description:
      'Premium websites designed for local and regional businesses that need a stronger online presence and a clear path from visitor to customer.',
    detailedDescription:
      'A bespoke ecosystem of modern digital flagships designed for professional practices, premium contractors, and boutique agencies. Built with custom interactive calculators, fluid mobile navigation, instant appointment scheduling, and localized SEO schemas.',
    accent: 'Rust',
    accentColor: 'text-[#B3521F]',
    accentHex: '#B3521F',
    highlightMetric: '3.4x Conversion Lift',
    stats: [
      { label: 'Average PageSpeed', value: '99/100' },
      { label: 'Lead Inquiries', value: '+240%' },
      { label: 'Deploy Time', value: '14 Days' }
    ],
    deliverables: [
      'Modular layout component system',
      'Live booking & inquiry integrations',
      'Custom typography pairings & photography art direction',
      'Full SEO semantic graph & rich snippets'
    ],
    tech: ['Vite', 'Tailwind CSS', 'TypeScript', 'Lucide React', 'Formspree'],
    aspectRatio: 'tall',
    previewType: 'store'
  },
  {
    id: 'ai-creative-experiences',
    title: 'AI Creative Experiences',
    category: 'AI + CREATIVE',
    tag: 'Generative Canvas',
    year: '2026',
    client: 'Studio R&D',
    description:
      'Experimental digital experiences combining generative AI, image generation, video generation, and modern web interfaces.',
    detailedDescription:
      'Exploring the frontier where human craft meets autonomous intelligence. This suite encompasses real-time canvas visualizers, prompt-driven UI mutating algorithms, AI soundscape synthesizers, and procedural WebGL particle surfaces created for interactive storytelling.',
    accent: 'Teal',
    accentColor: 'text-[#2F6F5E]',
    accentHex: '#2F6F5E',
    highlightMetric: 'Real-time Generative UI',
    stats: [
      { label: 'Latent Space Tools', value: '6 Models' },
      { label: 'FPS Rendering', value: '60 FPS' },
      { label: 'Pipeline', value: 'Autonomous' }
    ],
    deliverables: [
      'Interactive neural canvas sandbox',
      'Dynamic style transfer demo',
      'Audio-reactive shader surfaces',
      'AI prompt-to-wireframe generator'
    ],
    tech: ['Google GenAI SDK', 'Three.js / WebGL', 'Tailwind CSS', 'Canvas API'],
    aspectRatio: 'tall',
    previewType: 'ai'
  },
  {
    id: 'saas-interface-concepts',
    title: 'SaaS Interface Concepts',
    category: 'PRODUCT DESIGN',
    tag: 'Product Design',
    year: '2026',
    client: 'Venture Prototypes',
    description:
      'Product interface explorations focused on dashboards, workflows, AI tools, and user experiences.',
    detailedDescription:
      'High-density, distraction-free product interfaces designed for analytical power users. Features micro-modular data grids, keyboard command palettes (Cmd+K), responsive timeline charts, and intuitive natural language filter queries.',
    accent: 'Indigo',
    accentColor: 'text-[#3D5A95]',
    accentHex: '#3D5A95',
    highlightMetric: 'Zero Cognitive Friction',
    stats: [
      { label: 'Component Tokens', value: '140+' },
      { label: 'Accessibility', value: 'WCAG AAA' },
      { label: 'Time-to-Action', value: '-45%' }
    ],
    deliverables: [
      'Design Token architecture',
      'Interactive command palette system',
      'Adaptive metrics widgets',
      'Role-based workflow permission simulator'
    ],
    tech: ['React 19', 'Framer Motion', 'Radix UI primitives', 'Tailwind CSS'],
    aspectRatio: 'wide',
    previewType: 'saas'
  }
];

export const caseStudyDetail: CaseStudyData = {
  title: 'Kairana Digital Opportunity Report',
  subtitle: 'Unlocking regional enterprise potential through cinematic digital transformation',
  category: 'RESEARCH + STRATEGY + WEB EXPERIENCE',
  year: '2026',
  client: 'Regional Commercial Research Initiative',
  location: 'Kairana & Shamli District, UP',
  description:
    'A research and web-design project combining local business discovery, prospecting, visual storytelling, and a cinematic digital presentation.',
  metrics: [
    { label: 'Businesses Audited', value: '15+' },
    { label: 'Cinematic Showcase', value: '1 Custom' },
    { label: 'Tailored UI Concepts', value: '100%' },
    { label: 'Research Year', value: '2026' }
  ],
  problem:
    'Dozens of high-turnover regional enterprises boasting multi-decade legacies—such as agro-equipment producers, generational clothiers, timber processors, and medical centers—were operating with zero or outdated web touchpoints, losing high-margin regional and national inquiries to digital-first competitors.',
  solution:
    'Conducted on-the-ground digital audit metrics, mapped structural discovery gaps, and engineered a high-impact interactive digital prospectus that presents bespoke web architectural mockups to enterprise founders with compelling unit economics.',
  keyOutcomes: [
    'Catalogued 18 high-reputation businesses across 4 vital commercial zones.',
    'Formulated high-conversion digital architectures showcasing products with editorial elegance.',
    'Built an interactive spatial radar highlighting the digital opportunity quotient for each sector.'
  ],
  accentColor: '#C9A227',
  sectorsResearched: [
    {
      name: 'Agri-Tech & Tractor Equipment',
      count: 5,
      gap: 'Zero product spec sheets or direct WhatsApp catalogue links',
      solution: 'Interactive 3D spec viewer & instant quote calculator'
    },
    {
      name: 'Heritage Textiles & Wholesale Apparel',
      count: 4,
      gap: 'No digital bulk order inventory portal for out-of-state buyers',
      solution: 'B2B Wholesale portal with tiered minimum order quantities'
    },
    {
      name: 'Healthcare & Specialized Diagnostics',
      count: 4,
      gap: 'Fragmented manual paper reports and phone-only appointment queues',
      solution: 'Automated test booking & digital report dispatch platform'
    },
    {
      name: 'Timber & Industrial Fabrication',
      count: 3,
      gap: 'Inability to display portfolio of completed infrastructure contracts',
      solution: 'Cinematic case study showcase with high-res project galleries'
    }
  ]
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Deep dive into truth & opportunity',
    description:
      'Understand the business, audience, goals, competition, and what success actually looks like.',
    details: [
      'Founder discovery session & value-proposition audit',
      'Target audience profiling & friction point mapping',
      'Competitive landscape & keyword positioning analysis',
      'Scope roadmap & quantitative milestone definition'
    ],
    duration: 'Week 1'
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'Visual identity & bespoke interface craft',
    description:
      'Develop a visual direction and interface specifically for the project instead of adapting a generic template.',
    details: [
      'Art direction moodboards & typography curation',
      'High-fidelity wireframes & visual architecture',
      'Interactive design prototypes in Figma',
      'Design tokens (color, spacing, elevation, type scales)'
    ],
    duration: 'Week 2'
  },
  {
    number: '03',
    title: 'Build',
    subtitle: 'Engineering with modern performance standards',
    description:
      'Turn the approved direction into a responsive, performant digital experience.',
    details: [
      'Clean component architecture in React & TypeScript',
      'Tailwind CSS styling with custom micro-animations',
      'API, database, or CMS integration',
      'Optimized asset loading & responsive breakpoints'
    ],
    duration: 'Weeks 3-4'
  },
  {
    number: '04',
    title: 'Refine',
    subtitle: 'Obsessive polish & device QA',
    description:
      'Test interactions, responsive behavior, performance, content, and visual details.',
    details: [
      'Cross-browser & cross-device sanity testing (iOS, Android, macOS, Windows)',
      'Lighthouse 95+ performance optimization & asset compression',
      'WCAG AA accessibility & keyboard navigation checks',
      'Micro-copy tuning & form validation resilience'
    ],
    duration: 'Week 5'
  },
  {
    number: '05',
    title: 'Launch',
    subtitle: 'Flawless deployment & knowledge transfer',
    description:
      'Ship the project, test it on real devices, and provide everything needed to keep it running.',
    details: [
      'Production DNS routing & SSL certification',
      'Analytics, Google Search Console, and pixel setup',
      'Client video walkthrough & documentation handover',
      '30 days post-launch hypercare & performance monitoring'
    ],
    duration: 'Launch Day'
  }
];

export const techNodes: TechNode[] = [
  {
    id: 'ai',
    label: 'AI & LLM Orchestration',
    category: 'AI',
    description: 'Autonomous research agents, prompt engineering, and Gemini/Claude integration.',
    tools: ['Google GenAI SDK', 'LangChain', 'Prompt Chaining', 'RAG Pipelines'],
    accent: '#B3521F'
  },
  {
    id: 'webdev',
    label: 'Web Development',
    category: 'Dev',
    description: 'Blazing fast, type-safe frontend architectures using modern web standards.',
    tools: ['React 19', 'TypeScript', 'Vite', 'Next.js', 'Tailwind CSS'],
    accent: '#2F6F5E'
  },
  {
    id: 'gen-design',
    label: 'Generative Design',
    category: 'Design',
    description: 'Algorithmic layout generation, procedural color palettes, and adaptive UI.',
    tools: ['Figma Tokens', 'CSS Variables', 'Procedural Canvas', 'Midjourney v6'],
    accent: '#3D5A95'
  },
  {
    id: 'img-gen',
    label: 'Image Generation',
    category: 'AI',
    description: 'Custom bespoke brand imagery, photorealistic product assets, and concept art.',
    tools: ['Midjourney', 'Stable Diffusion', 'FLUX.1', 'Photoshop AI'],
    accent: '#AD3A61'
  },
  {
    id: 'video-gen',
    label: 'Video Generation',
    category: 'Motion',
    description: 'Short-form UGC, cinematic B-roll, and AI-accelerated motion assets.',
    tools: ['Runway Gen-3', 'Luma Dream Machine', 'ElevenLabs', 'CapCut Pro'],
    accent: '#C9A227'
  },
  {
    id: 'automation',
    label: 'Automation',
    category: 'Dev',
    description: 'Streamlining lead capture, CRM syncing, webhook triggers, and notifications.',
    tools: ['Make / Zapier', 'Express.js', 'Serverless Functions', 'Stripe Webhooks'],
    accent: '#B3521F'
  },
  {
    id: 'ui-ux',
    label: 'UI/UX Craft',
    category: 'Design',
    description: 'Editorial layouts, mathematical typography scales, and seamless user journeys.',
    tools: ['Figma', 'Design Systems', 'Micro-interactions', 'WCAG AA Standards'],
    accent: '#2F6F5E'
  },
  {
    id: 'creative-coding',
    label: 'Creative Coding',
    category: 'Motion',
    description: 'Physics interactions, smooth scroll rigs, particle fields, and shader magic.',
    tools: ['GSAP ScrollTrigger', 'Framer Motion', 'Canvas 2D/WebGL', 'hls.js'],
    accent: '#3D5A95'
  }
];

export const playgroundItems: PlaygroundItem[] = [
  {
    id: 'pg-1',
    title: 'Neural Chromatic Shader',
    category: 'Creative Tech',
    type: '3D & Shaders',
    date: 'Feb 2026',
    description: 'Audio-reactive liquid gradient field with real-time mouse dispersion physics.',
    interactivePreview: 'canvas-gradient',
    accentColor: '#B3521F',
    tech: ['WebGL', 'GLSL', 'Math.sin', 'Mouse Vector']
  },
  {
    id: 'pg-2',
    title: 'Kinetic Type Orchestrator',
    category: 'Typography',
    type: 'Web Animation',
    date: 'Jan 2026',
    description: 'Variable font weight distributor responding dynamically to scroll velocity.',
    interactivePreview: 'kinetic-type',
    accentColor: '#2F6F5E',
    tech: ['GSAP', 'Variable Font Axes', 'ScrollTrigger']
  },
  {
    id: 'pg-3',
    title: 'Autonomous Persona Synthesizer',
    category: 'Artificial Intelligence',
    type: 'AI Experiment',
    date: 'Feb 2026',
    description: 'Multi-agent simulation generating contextual brand voice guidelines on the fly.',
    interactivePreview: 'ai-persona',
    accentColor: '#3D5A95',
    tech: ['Gemini API', 'Structured JSON', 'Vector Cache']
  },
  {
    id: 'pg-4',
    title: 'Glass Matrix Dock UI',
    category: 'Interaction Design',
    type: 'UI Concept',
    date: 'Dec 2025',
    description: 'Ultra-fluid macOS-inspired spring dock with mathematical refractive blur.',
    interactivePreview: 'glass-dock',
    accentColor: '#AD3A61',
    tech: ['Framer Motion', 'Backdrop Filter', 'Spring Physics']
  },
  {
    id: 'pg-5',
    title: 'Dynamic Hook Retention Engine',
    category: 'Content Science',
    type: 'UGC Concept',
    date: 'Jan 2026',
    description: 'Visualizing drop-off rates across 15 different 3-second opening hook formats.',
    interactivePreview: 'ugc-retention',
    accentColor: '#C9A227',
    tech: ['Recharts', 'A/B Testing Matrix', 'Frame Extraction']
  },
  {
    id: 'pg-6',
    title: 'Procedural Void Grid',
    category: 'Generative Design',
    type: 'Generative Visual',
    date: 'Feb 2026',
    description: 'Interactive cellular automaton creating infinite typographic lattice labyrinths.',
    interactivePreview: 'procedural-grid',
    accentColor: '#B3521F',
    tech: ['Canvas API', 'Perlin Noise', 'Bitmasking']
  }
];

export const journalArticles: JournalArticle[] = [
  {
    id: 'art-1',
    title: 'Building websites with AI without losing the human touch',
    slug: 'websites-with-ai-human-touch',
    date: 'Feb 18, 2026',
    readTime: '4 min read',
    category: 'AI & Web Design',
    accentColor: '#B3521F',
    excerpt:
      'AI tools can generate code and copy in seconds, but taste, restraint, and intentionality remain uniquely human superpowers.',
    content: [
      'The biggest trap in modern web development is treating AI as an author rather than an amplifier. When you let an LLM dictate the whole design, you end up with the same bland, over-saturated gradient templates that litter the web today.',
      'True craftsmanship in 2026 comes from using AI to eradicate repetitive scaffolding—generating boilerplate schemas, translating complex data formats, testing responsive edge cases—while keeping the visual hierarchy, typographic pairing, and pacing strictly guided by human aesthetic judgment.',
      'Restraint is the new luxury. In an internet overflowing with synthetic noise, the most magnetic digital brands are those that present quiet confidence, deliberate typography, and tactile micro-interactions.'
    ]
  },
  {
    id: 'art-2',
    title: 'Why local businesses need cinematic web presence in 2026',
    slug: 'local-businesses-cinematic-web',
    date: 'Jan 29, 2026',
    readTime: '5 min read',
    category: 'Strategy & Prospecting',
    accentColor: '#C9A227',
    excerpt:
      'A multi-generational business with decades of goodwill deserves a digital flagship that reflects that authority—not a dusty, outdated template.',
    content: [
      'During my research across regional manufacturing and retail hubs like Kairana and Shamli, I found businesses doing significant multi-crore turnover whose only web footprint was an unclaimed Google Maps listing with a broken telephone number.',
      'When an out-of-state contractor or institutional buyer searches for partners, that missing digital footprint is an instant trust leak. A cinematic, editorial web presence immediately bridges that credibility gap.',
      'A custom website for a local business is not just a brochure; it is an automated trust machine that filters high-intent inquiries and protects decades of hard-earned reputation.'
    ]
  },
  {
    id: 'art-3',
    title: 'Designing SaaS tools for the autonomous AI era',
    slug: 'designing-saas-autonomous-era',
    date: 'Jan 12, 2026',
    readTime: '6 min read',
    category: 'Product Design',
    accentColor: '#3D5A95',
    excerpt:
      'As software transitions from point-and-click buttons to intent-driven agentic loops, interface design must shift toward reviewable transparency.',
    content: [
      'Traditional SaaS interfaces were designed around manual data entry: rows of form fields, nested menus, and endless configuration modals. In the agentic era, the user defines the goal, and the system executes.',
      'This fundamentally changes the role of UI. Product designers must now create "diff viewers", confidence indicators, and human-in-the-loop validation checkpoints rather than repetitive entry forms.',
      'The best AI SaaS tools will not look like chat boxes; they will look like high-density operational command centers where users inspect, refine, and approve autonomous workflows.'
    ]
  },
  {
    id: 'art-4',
    title: 'The anatomy of high-converting UGC hooks',
    slug: 'anatomy-of-high-converting-ugc-hooks',
    date: 'Dec 22, 2025',
    readTime: '3 min read',
    category: 'Creative Marketing',
    accentColor: '#AD3A61',
    excerpt:
      'Analyzing why the first 3 seconds dictate 90% of ad ROI—and the 4 psychological triggers that stop the scroll.',
    content: [
      'In short-form vertical video, if you do not earn the viewer’s curiosity before the 3-second mark, the algorithm drops your retention curve off a cliff.',
      'The four most reliable hook archetypes are: The Pattern Interrupt (unexpected physical motion), The Direct Accusation ("Stop doing X this way"), The Unfair Advantage ("The tool agencies don\'t want you to know"), and The Before/After Contrast.',
      'Combine a sharp hook with native sound design, subtitle pacing synchronized to breath cadence, and clear visual payoff to achieve true direct-response scale.'
    ]
  }
];
