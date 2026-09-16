import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { selectedProjects } from '../data/portfolioData';
import { ProjectItem } from '../types';
import CinematicVideoPlayer from './CinematicVideoPlayer';
import { 
  ArrowUpRight, 
  Compass,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  LayoutDashboard,
  Cpu
} from 'lucide-react';

interface SelectedWorkProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function SelectedWork({ onSelectProject }: SelectedWorkProps) {
  const [filter, setFilter] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll animations for the video container & background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.0, 1.12]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const categories = ['all', 'websites', 'stores', 'product design', 'ai + creative'];

  const filteredProjects = selectedProjects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'websites' && (p.category.includes('WEBSITE') || p.category.includes('STUDIO'))) return true;
    if (filter === 'stores' && (p.category.includes('STORE') || p.category.includes('COMMERCE'))) return true;
    if (filter === 'product design' && p.category.includes('PRODUCT')) return true;
    if (filter === 'ai + creative' && p.category.includes('AI')) return true;
    return true;
  });

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-16 relative bg-black overflow-hidden"
    >
      {/* Curved Background Ambient Video Container with Scroll Parallax & Multi-Video Reel */}
      <motion.div 
        style={{ opacity: containerOpacity }}
        className="absolute inset-3 sm:inset-6 lg:inset-8 pointer-events-none z-0 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.9)]"
      >
        <CinematicVideoPlayer scale={videoScale} y={videoY} />
      </motion.div>

      {/* Luminous Top Outer Border Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6"
        >
          <div className="max-w-2xl">
            <div className="text-xs font-body uppercase tracking-[0.2em] text-white/70 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>// Selected Work</span>
            </div>

            <h2 className="font-heading italic text-5xl sm:text-6xl lg:text-[4.5rem] text-white tracking-[-2px] leading-[0.95]">
              Selected Work &amp;{' '}
              <span className="text-white/80">
                Flagship Deployments.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-white/80 mt-4 font-body font-light leading-relaxed">
              A curated selection of client commissions spanning digital flagship websites, high-conversion stores, SaaS applications, and AI creative engines.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-full liquid-glass self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-body capitalize transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-white text-black font-medium shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const isWide = index % 3 === 0 || index === 3;
            const colSpan = isWide ? 'md:col-span-7' : 'md:col-span-5';

            return (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                onClick={() => onSelectProject(project)}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: (index % 3) * 0.12, ease: 'easeOut' }}
                className={`${colSpan} group cursor-pointer rounded-[1.5rem] liquid-glass flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 hover:border-white/25`}
              >
                {/* Visual Card Header / Interactive Preview Simulation */}
                <div className="relative h-64 sm:h-72 p-6 bg-gradient-to-b from-white/[0.04] to-transparent border-b border-white/10 overflow-hidden flex items-center justify-center">
                  {/* Visual Blueprint/Preview Container */}
                  <div className="w-full max-w-sm rounded-2xl liquid-glass-strong p-4 shadow-2xl relative z-10 space-y-3 transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="flex items-center justify-between text-xs text-white/80 font-body">
                      <span className="flex items-center gap-1.5 font-medium">
                        {project.previewType === 'research' && <Compass className="w-3.5 h-3.5" />}
                        {project.previewType === 'store' && <ShoppingBag className="w-3.5 h-3.5" />}
                        {project.previewType === 'saas' && <LayoutDashboard className="w-3.5 h-3.5" />}
                        {project.previewType === 'ai' && <Cpu className="w-3.5 h-3.5" />}
                        <span>{project.category}</span>
                      </span>
                      <span className="text-[11px] text-white/60">
                        {project.year}
                      </span>
                    </div>

                    <div className="h-16 sm:h-20 rounded-xl bg-white/[0.03] border border-white/10 p-3 flex flex-col justify-center">
                      <div className="text-xs text-white/60 font-body uppercase tracking-wider">
                        Highlight Metric
                      </div>
                      <div className="font-heading italic text-xl sm:text-2xl text-white mt-0.5">
                        {project.highlightMetric || project.stats?.[0]?.value || 'Production Ready'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-white/60 font-body">
                      <span>Click to view full case study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Project Metadata & Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-body uppercase tracking-wider text-white/60">
                        {project.tag}
                      </span>
                      <span className="liquid-glass rounded-full px-2.5 py-0.5 text-[11px] text-white/80 font-body">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="font-heading italic text-3xl sm:text-4xl text-white tracking-[-1px] leading-tight group-hover:text-white transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-white/80 font-body font-light mt-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack & Action */}
                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="liquid-glass rounded-full px-2.5 py-0.5 text-[11px] text-white/70 font-body"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-xs font-body text-white/80 group-hover:text-white transition-colors">
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
