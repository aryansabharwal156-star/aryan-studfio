/**
 * Aryvanta - Centralized Site & SEO Configuration
 * 
 * To update the domain when purchasing an official Aryvanta domain:
 * Change `siteUrl` below (e.g. to https://aryvanta.com).
 * Canonical links, OpenGraph, Twitter, and Schema JSON-LD will automatically sync.
 */

export const SITE_CONFIG = {
  brandName: 'Aryvanta',
  legalName: 'Aryvanta Studio',
  tagline: 'AI • Web • SaaS • Creative Technology',
  founder: 'Aryan Sabharwal',
  role: 'Founder & Creative Technologist',
  
  // Primary domain URL (currently deployed on Netlify)
  siteUrl: 'https://aryanstudionetlify.netlify.app',
  
  // Direct Contact Information
  telephone: '+916396438091',
  phoneFormatted: '+91 6396438091',
  email: 'aryansabharwal156@gmail.com',
  whatsAppNumber: '916396438091',
  whatsAppUrl: 'https://wa.me/916396438091',
  
  // Verified Social Profile
  twitterHandle: '@AryanSabha2qts',
  twitterUrl: 'https://x.com/AryanSabha2qts',
  
  // Geographical & Operational details (Authentic E-E-A-T signals)
  geo: {
    country: 'India',
    countryCode: 'IN',
    operatingBase: 'India',
    clientReach: 'Global / International (US, Europe, Asia, Worldwide)',
    timezone: 'Asia/Kolkata (IST)',
  },

  // SEO metadata
  seo: {
    title: 'Aryvanta | AI, Web, SaaS & Digital Solutions',
    metaDescription:
      'Aryvanta is a modern digital technology and creative studio founded by Aryan Sabharwal. We engineer AI automation, AI voice agents, websites, landing pages, SaaS tools, web applications, and commercial motion design for clients globally.',
    ogImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80',
    primaryH1: 'Building Smarter Digital Experiences With AI',
  },

  // Core Services
  services: [
    'AI Automation',
    'AI Voice Agents',
    'Website Development',
    'Landing Page Development',
    'SaaS Development',
    'Web Application Development',
    'AI Integrations',
    'Motion Design',
    'Commercial Ads',
    'Digital Experiences'
  ],

  // Structured FAQs for users & Google FAQPage schema
  faqs: [
    {
      question: 'What services does Aryvanta provide?',
      answer:
        'Aryvanta is a modern digital technology and creative studio specializing in AI automation, AI voice agents, custom website development, high-converting landing pages, SaaS tools, web applications, motion design, and commercial digital experiences.'
    },
    {
      question: 'Do you build AI automation systems?',
      answer:
        'Yes. Aryvanta designs bespoke AI automation workflows that eliminate repetitive operations, connect CRMs, streamline client communications, trigger webhooks, and orchestrate generative AI pipelines with human-in-the-loop validation.'
    },
    {
      question: 'Do you develop AI voice agents?',
      answer:
        'Yes. We build responsive, natural-sounding conversational AI voice agents capable of handling inbound inquiries, scheduling appointments, triaging customer support, and qualification calls with sub-second latency.'
    },
    {
      question: 'Can you build websites and landing pages?',
      answer:
        'Yes. We engineer high-performance, mobile-first websites and conversion-focused landing pages with custom art direction, typographic precision, cinematic motion, and 95+ Google PageSpeed scores.'
    },
    {
      question: 'Do you develop SaaS tools and web applications?',
      answer:
        'Yes. Aryvanta builds end-to-end software product interfaces, analytical dashboards, AI utilities, and interactive web applications utilizing React, TypeScript, Tailwind CSS, and scalable backend architectures.'
    },
    {
      question: 'Can you create commercial motion design and ads?',
      answer:
        'Yes. We craft thumb-stopping short-form vertical creative, 3D motion design, and digital commercial assets engineered around high-retention hooks and persuasive visual storytelling.'
    },
    {
      question: 'Do you work with international clients?',
      answer:
        'Yes. Aryvanta operates from India and collaborates seamlessly with startups, founders, and enterprises across the United States, Europe, Asia, and worldwide through asynchronous updates and structured sprints.'
    },
    {
      question: 'How can I start a project with Aryvanta?',
      answer:
        'You can start by submitting the project inquiry form in our Start a Project section, or connect directly via WhatsApp at +91 6396438091 for rapid kickoff and scope estimation.'
    }
  ]
};
