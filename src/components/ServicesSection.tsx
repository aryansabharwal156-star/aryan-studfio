import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { servicesData } from '../data/portfolioData';
import { ServiceItem } from '../types';
import { 
  ArrowUpRight, 
  Globe, 
  ShoppingBag, 
  LayoutDashboard, 
  Video,
  CheckCircle2
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll animations for highlighted cinematic video
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.0, 1.1]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.65]);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'websites':
        return <Globe className="w-5 h-5" />;
      case 'stores':
        return <ShoppingBag className="w-5 h-5" />;
      case 'saas':
        return <LayoutDashboard className="w-5 h-5" />;
      case 'ugc':
        return <Video className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="studio" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-16 relative bg-black overflow-hidden"
    >
      {/* Highlighted Ambient Video Container with Curved Corners & Scroll Motion */}
      <motion.div 
        style={{ opacity: containerOpacity }}
        className="absolute inset-3 sm:inset-6 lg:inset-8 pointer-events-none z-0 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-white/20 shadow-[0_0_90px_rgba(255,255,255,0.06),_0_0_100px_rgba(0,0,0,0.95)]"
      >
        <motion.video
          style={{ scale: videoScale, y: videoY }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-55 filter contrast-125 brightness-110 blur-[0.2px]"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4"
        />

        {/* Highlight Accent Glow & Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.85)_100%)] pointer-events-none" />
        
        {/* Luminous Inner Highlight Border */}
        <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] ring-1 ring-inset ring-white/20 pointer-events-none" />
      </motion.div>

      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-10" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <div className="text-xs font-body uppercase tracking-[0.2em] text-white/70 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>// What We Build</span>
          </div>

          <h2 className="font-heading italic text-5xl sm:text-6xl lg:text-[4.5rem] text-white tracking-[-2px] leading-[0.95]">
            Four crafts,{' '}
            <span className="text-white/80">
              one unified studio.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/80 mt-5 font-body font-light leading-relaxed max-w-2xl">
            We combine high-end art direction, engineering precision, product strategy, and cinematic motion so ambitious companies ship remarkable digital products.
          </p>
        </div>

        {/* 2x2 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {servicesData.map((service) => {
            const isHovered = hoveredService === service.id;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative p-8 rounded-[1.5rem] liquid-glass flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top Row: Number & Icon */}
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl liquid-glass flex items-center justify-center text-white transition-transform group-hover:scale-105">
                        {getServiceIcon(service.id)}
                      </div>
                      <span className="text-xs font-body uppercase tracking-wider text-white/60">
                        Craft // {service.number}
                      </span>
                    </div>

                    <span className="liquid-glass rounded-full px-3 py-1 text-xs text-white/80 font-body">
                      {service.accent}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-6">
                    <h3 className="font-heading italic text-3xl sm:text-4xl text-white tracking-[-1px] leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/70 font-body font-light mt-1.5 italic">
                      {service.tagline}
                    </p>
                    <p className="text-sm text-white/85 font-body font-light mt-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 space-y-2">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-white/80 font-body font-light"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-white/90" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(service)}
                    className="text-xs font-body text-white/80 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group-hover:text-white"
                  >
                    <span>View deliverables & tech</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <button
                    onClick={() => onSelectService(service)}
                    className="p-2 rounded-full liquid-glass hover:bg-white/10 text-white transition-all cursor-pointer"
                    aria-label={`Open ${service.title} details`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
