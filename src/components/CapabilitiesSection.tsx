import React from 'react';
import FadingVideo from './FadingVideo';
import { ImageIcon, MovieIcon, LightbulbIcon } from './Icons';

export default function CapabilitiesSection() {
  const cards = [
    {
      title: 'Design',
      icon: <ImageIcon className="w-5 h-5 text-white" />,
      tags: ['Brand Systems', 'Art Direction', 'Visual Identity', 'Motion'],
      body: 'We shape identities and interfaces that feel unmistakably yours -- typographic systems, component libraries, and art-directed pages that scale without losing soul.',
    },
    {
      title: 'Engineering',
      icon: <MovieIcon className="w-5 h-5 text-white" />,
      tags: ['React', 'Next.js', 'Headless CMS', 'Edge-Ready'],
      body: 'Production-grade front-ends built on modern stacks. Performant, accessible, and instrumented -- with code your team will enjoy extending long after launch.',
    },
    {
      title: 'Growth',
      icon: <LightbulbIcon className="w-5 h-5 text-white" />,
      tags: ['SEO', 'Analytics', 'A/B Testing', 'Retention'],
      body: 'Launch is the starting line. We partner with your team on conversion, content, and iteration loops that turn a beautiful site into a compounding asset.',
    },
  ];

  return (
    <section id="about" className="relative min-h-screen overflow-hidden bg-black flex flex-col border-t border-white/10 scroll-mt-12">
      <div id="capabilities" className="absolute -top-16 opacity-0 pointer-events-none" />
      {/* Background Video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_093722_ccfc7ebf-182f-419f-8a62-2dc02db7dd9d.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Content Container */}
      <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-14 flex flex-col min-h-screen max-w-[1300px] mx-auto w-full">
        {/* Header */}
        <div className="mb-auto">
          <div className="text-xs uppercase tracking-[0.2em] font-body text-white/70 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>// About Aryvanta Studio</span>
          </div>
          <h2 className="font-heading italic text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-[-2px] sm:tracking-[-3px] text-white">
            About Aryvanta — <br className="hidden sm:block" />
            <span className="text-white/80 font-normal">Founded by Aryan Sabharwal</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-white/85 font-body font-light leading-relaxed max-w-3xl">
            Aryvanta is a modern digital technology and creative studio founded by Aryan Sabharwal. We specialize in AI automation, AI voice agents, websites, landing pages, SaaS tools, web applications, and commercial motion design. Operating from India, Aryvanta delivers high-performance digital systems for clients and brands globally.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col transition-transform hover:-translate-y-1 duration-300"
            >
              {/* Top Row: Icon + Right-aligned Tags */}
              <div className="flex items-start justify-between gap-3">
                <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center shrink-0">
                  {card.icon}
                </div>

                <div className="flex flex-wrap gap-1.5 justify-end">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom: Title + Description */}
              <div className="mt-8">
                <h3 className="font-heading italic text-3xl md:text-4xl tracking-[-1px] leading-none mb-3 text-white">
                  {card.title}
                </h3>
                <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
