import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { servicesData } from '../data/portfolioData';
import { ServiceItem } from '../types';
import saasNatureImage from '../assets/images/saas_nature_resilience_1787826307138.jpg';
import { 
  ArrowUpRight, 
  Globe, 
  ShoppingBag, 
  LayoutDashboard, 
  Video,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Layers,
  Code2,
  Calendar,
  Eye
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
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'websites':
        return <Globe className="w-5 h-5" />;
      case 'landing-pages':
      case 'stores':
        return <Layers className="w-5 h-5" />;
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
      id="services" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-16 relative bg-black overflow-hidden scroll-mt-12"
    >
      <div id="studio" className="absolute -top-16 opacity-0 pointer-events-none" />
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
          className="w-full h-full object-cover opacity-90 filter contrast-110 brightness-105"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4"
        />
        
        {/* Luminous Inner Highlight Border */}
        <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] ring-1 ring-inset ring-white/15 pointer-events-none" />
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

                  {/* Interactive Openable Website Design Showcase for Viewers */}
                  {service.id === 'websites' && (
                    <div className="mt-6 rounded-xl overflow-hidden border border-white/20 bg-black/80 p-3.5 space-y-3 transition-all duration-300 group-hover:border-white/40 group-hover:bg-black/90 shadow-2xl">
                      {/* Browser Header Bar */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                          <span className="ml-2 font-mono text-[10px] text-white/60 truncate max-w-[140px] sm:max-w-[200px]">
                            extraordinary-licorice-453602.netlify.app
                          </span>
                        </div>
                        <a
                          href="https://extraordinary-licorice-453602.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-body tracking-wider uppercase px-2.5 py-1 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Open Live Site</span>
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      </div>

                      {/* Clickable Openable Website Card with Image */}
                      <a
                        href="https://extraordinary-licorice-453602.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/site block relative rounded-lg overflow-hidden border border-white/15 bg-[#0a0a0f] transition-all hover:border-white/40 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Live Website Preview Thumbnail / Header Visual */}
                        <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-[#0d0d14]">
                          <img
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
                            alt="Live Website Portfolio Preview"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top opacity-85 transition-transform duration-500 group-hover/site:scale-105 group-hover/site:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                          
                          {/* Live Overlay Badge */}
                          <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                            <span>Live Production</span>
                          </div>

                          {/* Overlay Title on Image */}
                          <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                            <div>
                              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                                Live Studio Flagship
                              </div>
                              <div className="font-heading italic text-base sm:text-lg text-white mt-0.5 font-medium leading-tight">
                                Extraordinary Licorice Design
                              </div>
                            </div>
                            <span className="p-1.5 rounded-full bg-white text-black shadow-lg transition-transform group-hover/site:translate-x-0.5 group-hover/site:-translate-y-0.5">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>

                        {/* Bottom Info Row */}
                        <div className="p-3 bg-black/70 flex items-center justify-between text-xs text-white/80 border-t border-white/10">
                          <span className="text-[11px] text-white/70 font-mono flex items-center gap-1">
                            <span>Visit:</span>
                            <span className="text-white underline underline-offset-2">extraordinary-licorice-453602.netlify.app</span>
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider font-semibold">
                            Click to Launch ↗
                          </span>
                        </div>
                      </a>
                    </div>
                  )}

                  {/* Visual SaaS Design Showcase with Image and Viewer Link */}
                  {service.id === 'saas' && (
                    <div className="mt-6 rounded-xl overflow-hidden border border-white/20 bg-black/80 p-3.5 space-y-3 transition-all duration-300 group-hover:border-purple-500/40 group-hover:bg-black/90 shadow-2xl">
                      {/* Browser Header Bar */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                          <span className="ml-2 font-mono text-[10px] text-white/60 truncate max-w-[140px] sm:max-w-[200px]">
                            voluble-tartufo-63c2d4.netlify.app
                          </span>
                        </div>
                        <a
                          href="https://voluble-tartufo-63c2d4.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-body tracking-wider uppercase px-2.5 py-1 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>Watch Our Design</span>
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      </div>

                      {/* Clickable SaaS Design Showcase Card with Image */}
                      <a
                        href="https://voluble-tartufo-63c2d4.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/saas block relative rounded-lg overflow-hidden border border-white/15 bg-[#090814] transition-all hover:border-purple-500/50 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Nature Resilience SaaS Design Visual */}
                        <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-[#0a0818]">
                          <img
                            src={saasNatureImage}
                            alt="Nature Resilience SaaS Platform Design Preview"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center opacity-90 transition-transform duration-500 group-hover/saas:scale-105 group-hover/saas:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
                          
                          {/* Top Floating Capsule Navigation Mockup */}
                          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white/90 flex items-center gap-2.5 shadow-lg max-w-[90%] truncate">
                            <span className="font-bold text-purple-300">✕</span>
                            <span className="hover:text-white transition-colors">Home</span>
                            <span className="text-white/40">·</span>
                            <span className="hover:text-white transition-colors">Projects</span>
                            <span className="text-white/40">·</span>
                            <span className="hover:text-white transition-colors">Pricing</span>
                            <span className="text-white/40">·</span>
                            <span className="hover:text-white transition-colors">About</span>
                            <span className="px-2 py-0.5 rounded-full bg-white text-black font-semibold text-[8px]">Assistant 👤</span>
                          </div>

                          {/* Center Hero Typography */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-4">
                            <div className="text-[9px] font-mono text-white/80 flex items-center gap-1 mb-1">
                              <span className="text-purple-300">⊙</span>
                              <span>Get Nature on your <strong className="text-white font-semibold">Balance Sheet</strong></span>
                            </div>
                            <h4 className="text-sm sm:text-base md:text-lg font-heading italic font-bold text-white leading-tight drop-shadow-md max-w-sm">
                              Measure Nature, Invest in Resilience, Grow Your Business
                            </h4>
                            <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-black font-medium text-[9px] shadow-lg">
                              <Calendar className="w-2.5 h-2.5" />
                              <span>Book a Call ↗</span>
                            </div>
                          </div>

                          {/* Live Overlay Badge */}
                          <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md border border-purple-500/30 text-[9px] font-mono text-purple-300 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-purple-400" />
                            <span>Viewer Preference</span>
                          </div>
                        </div>

                        {/* Bottom Link for Viewers */}
                        <div className="p-3 bg-black/80 flex items-center justify-between text-xs text-white/90 border-t border-white/10">
                          <span className="text-[11px] text-white/70 font-mono flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-purple-400" />
                            <span className="text-purple-300 font-medium">Watch our SaaS Design:</span>
                            <span className="text-white underline underline-offset-2 truncate max-w-[130px] sm:max-w-none">
                              voluble-tartufo-63c2d4.netlify.app
                            </span>
                          </span>
                          <span className="text-[10px] text-purple-300 font-mono uppercase tracking-wider font-semibold hover:text-white transition-colors flex items-center gap-1">
                            <span>Explore Live</span>
                            <span>↗</span>
                          </span>
                        </div>
                      </a>
                    </div>
                  )}
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
