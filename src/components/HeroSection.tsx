import React from 'react';
import { motion } from 'framer-motion';
import FadingVideo from './FadingVideo';
import BlurText from './BlurText';
import { ArrowUpRight, Play, ClockIcon, GlobeIcon, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenAI?: () => void;
}

const motionProps = (delay: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut', delay },
});

export default function HeroSection({ onOpenAI }: HeroSectionProps) {
  const logos = ['Aeon', 'Vela', 'Apex', 'Orbit', 'Zeno'];

  return (
    <section className="relative h-screen overflow-hidden bg-black flex flex-col">
      {/* Background Video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0 pointer-events-none"
        style={{ width: '120%', height: '120%' }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col h-full items-center justify-center pt-24 px-4 text-center">
        {/* Badge */}
        <motion.div {...motionProps(0.4)}>
          <div className="liquid-glass rounded-full px-3.5 py-1.5 inline-flex items-center gap-2 text-xs text-white/90 font-body">
            <span className="bg-white text-black px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wider">
              ARYVANTA
            </span>
            <span className="text-white/80">AI • Web • SaaS • Creative Technology</span>
          </div>
        </motion.div>

        {/* Primary Homepage H1 */}
        <div className="mt-6 max-w-4xl">
          <BlurText
            as="h1"
            text="Building Smarter Digital Experiences With AI"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-heading italic text-white leading-[0.88] tracking-[-3px] sm:tracking-[-4px]"
          />
        </div>

        {/* Subtext with Founder & Geo context */}
        <motion.p
          {...motionProps(0.8)}
          className="mt-4 text-sm md:text-base text-white/90 max-w-2xl font-body font-light leading-relaxed"
        >
          Aryvanta is a modern digital technology and creative studio founded by Aryan Sabharwal. We engineer AI automation, AI voice agents, websites, landing pages, SaaS tools, web applications, and commercial motion design for clients globally from India.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...motionProps(1.1)}
          className="mt-6 flex items-center gap-3 sm:gap-4 flex-wrap justify-center"
        >
          <a
            href="#contact"
            className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-medium text-white font-body hover:bg-white/10 transition-all cursor-pointer shadow-lg"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href="https://wa.me/916396438091"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-medium text-white font-body hover:bg-white/15 transition-all cursor-pointer border border-white/20 shadow-md"
          >
            <span>WhatsApp Inquiry</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>

          {onOpenAI && (
            <button
              type="button"
              onClick={onOpenAI}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/80 font-body hover:text-white transition-colors cursor-pointer px-3 py-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>AI Assistant</span>
            </button>
          )}

          <button
            type="button"
            className="flex items-center gap-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Watch Showreel</span>
          </button>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          {...motionProps(1.3)}
          className="mt-8 flex gap-4 flex-wrap justify-center"
        >
          <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] text-left">
            <ClockIcon className="w-6 h-6 text-white" />
            <div className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4 text-white">
              6 Weeks
            </div>
            <div className="text-xs text-white/80 font-body mt-2 leading-snug">
              Average End-to-End Launch Time
            </div>
          </div>

          <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] text-left">
            <GlobeIcon className="w-6 h-6 text-white" />
            <div className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4 text-white">
              140+
            </div>
            <div className="text-xs text-white/80 font-body mt-2 leading-snug">
              Brands Shipped Across Four Continents
            </div>
          </div>
        </motion.div>

        {/* Bottom brand logos and attractive glowing accent divider */}
        <motion.div
          {...motionProps(1.4)}
          className="mt-auto flex flex-col items-center gap-6 pb-6 w-full max-w-4xl"
        >
          <div className="flex items-center justify-center gap-12 md:gap-16">
            {logos.map((logo) => (
              <span
                key={logo}
                className="font-heading italic text-2xl md:text-3xl tracking-tight text-white/80 hover:text-white transition-colors"
              >
                {logo}
              </span>
            ))}
          </div>

          {/* Attractive outer luminous border divider */}
          <div className="w-full relative flex items-center justify-center pt-2">
            {/* Outer subtle glow line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            {/* High-intensity center highlight */}
            <div className="absolute w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
            {/* Center diamond/crosshair ornament */}
            <div className="absolute w-1.5 h-1.5 rotate-45 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
