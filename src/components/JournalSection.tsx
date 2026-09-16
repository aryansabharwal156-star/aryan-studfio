import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { journalArticles } from '../data/portfolioData';
import { JournalArticle } from '../types';
import { ArrowUpRight, Clock } from 'lucide-react';

interface JournalSectionProps {
  onSelectArticle: (article: JournalArticle) => void;
}

export default function JournalSection({ onSelectArticle }: JournalSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.0, 1.1]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  return (
    <section 
      ref={sectionRef}
      id="journal" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-16 relative bg-black overflow-hidden"
    >
      {/* Curved Edge Video Container covering full section with scroll motion */}
      <motion.div 
        style={{ opacity: containerOpacity }}
        className="absolute inset-3 sm:inset-6 lg:inset-8 pointer-events-none z-0 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-white/15 shadow-[0_0_90px_rgba(0,0,0,0.95)]"
      >
        <motion.video
          style={{ scale: videoScale, y: videoY }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-90 filter contrast-110 brightness-105"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260717_120352_eb988725-1351-43b3-8095-16e4a1005e3d.mp4"
        />

        {/* Subtle Inner Highlight Ring */}
        <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] ring-1 ring-inset ring-white/15 pointer-events-none" />
      </motion.div>

      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 max-w-2xl">
          <div className="text-xs font-body uppercase tracking-[0.2em] text-white/70 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>// Thinking Out Loud</span>
          </div>

          <h2 className="font-heading italic text-5xl sm:text-6xl lg:text-[4.5rem] text-white tracking-[-2px] leading-[0.95]">
            Ideas, experiments &{' '}
            <span className="text-white/80">
              perspectives.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/80 mt-4 font-body font-light leading-relaxed">
            Notes on craft, frontend engineering, intelligence workflows, and building compounding digital brands.
          </p>
        </div>

        {/* Article Cards List */}
        <div className="space-y-4">
          {journalArticles.map((article) => (
            <div
              key={article.id}
              id={`article-card-${article.id}`}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer p-8 rounded-[1.5rem] liquid-glass flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.03]"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-3 text-xs font-body">
                  <span className="liquid-glass rounded-full px-3 py-0.5 uppercase tracking-wider text-white/80">
                    {article.category}
                  </span>
                  <span className="text-white/60 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                  <span className="text-white/40 hidden sm:inline">•</span>
                  <span className="text-white/60 hidden sm:inline">{article.date}</span>
                </div>

                <h3 className="font-heading italic text-2xl sm:text-3xl text-white tracking-tight group-hover:text-white transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-white/75 font-body font-light line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                <span className="text-xs font-body text-white/70 group-hover:text-white transition-colors">
                  Read Essay
                </span>
                <div className="p-2 rounded-full liquid-glass text-white transition-transform group-hover:translate-x-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
