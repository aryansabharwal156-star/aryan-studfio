import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { processSteps } from '../data/portfolioData';
import { CheckCircle2, ChevronRight, Clock } from 'lucide-react';

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll motion mapping as specified in cinematic snippet
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Scale: 1.0 -> 1.08 -> 1.0, TranslateY: 0 -> -6vh
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.0, 1.08]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-16 relative bg-[#05050a] overflow-hidden"
    >
      {/* Curved Cinematic Nebula Background Video Container with Parallax Scroll Motion */}
      <motion.div 
        style={{ opacity: containerOpacity }}
        className="absolute inset-3 sm:inset-6 lg:inset-8 pointer-events-none z-0 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-white/15 shadow-[0_0_90px_rgba(26,10,46,0.5),_0_0_100px_rgba(0,0,0,0.95)]"
      >
        <motion.video
          style={{ scale: videoScale, y: videoY }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-90 filter contrast-110 brightness-105"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4"
        />

        {/* Subtle Inner Highlight Glow Ring */}
        <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] ring-1 ring-inset ring-white/15 pointer-events-none" />
      </motion.div>

      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 sm:mb-20 max-w-2xl">
          <div className="text-xs font-body uppercase tracking-[0.2em] text-white/70 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>// How We Work</span>
          </div>

          <h2 className="font-heading italic text-5xl sm:text-6xl lg:text-[4.5rem] text-white tracking-[-2px] leading-[0.95]">
            From concept to{' '}
            <span className="text-white/80">
              production launch.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/80 mt-4 font-body font-light leading-relaxed">
            A disciplined, 5-phase delivery framework that ensures precision, rapid turnaround, and uncompromising visual craft.
          </p>
        </div>

        {/* Interactive Vertical Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: Timeline Step List */}
          <div className="lg:col-span-6 space-y-4">
            {processSteps.map((step, index) => {
              const isSelected = activeStep === index;

              return (
                <div
                  key={step.number}
                  id={`process-step-item-${step.number}`}
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer p-6 rounded-[1.25rem] transition-all duration-300 ${
                    isSelected
                      ? 'liquid-glass-strong bg-white/[0.04] shadow-2xl'
                      : 'liquid-glass hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <span
                        className={`text-xs font-body font-semibold px-3 py-1 rounded-full transition-colors ${
                          isSelected
                            ? 'bg-white text-black'
                            : 'liquid-glass text-white/70'
                        }`}
                      >
                        {step.number}
                      </span>
                      <div>
                        <h3 className="font-heading italic text-2xl text-white tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-xs text-white/60 font-body mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isSelected ? 'rotate-90 text-white' : 'text-white/40'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Step Deep Dive */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="p-8 sm:p-10 rounded-[1.5rem] liquid-glass-strong">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-body font-semibold bg-white text-black px-3 py-1 rounded-full">
                    Phase {processSteps[activeStep].number}
                  </span>
                  <span className="text-xs text-white/70 font-body flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {processSteps[activeStep].duration}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-heading italic text-3xl sm:text-4xl text-white tracking-[-1px]">
                  {processSteps[activeStep].title}
                </h3>
                <div className="text-sm text-white/60 font-body italic mt-1">
                  {processSteps[activeStep].subtitle}
                </div>
                <p className="text-sm sm:text-base text-white/85 font-body font-light mt-4 leading-relaxed">
                  {processSteps[activeStep].description}
                </p>
              </div>

              {/* Action Deliverables */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <div className="text-xs uppercase tracking-wider text-white/60 font-body">
                  // Phase Deliverables
                </div>
                <div className="space-y-2.5">
                  {processSteps[activeStep].details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl liquid-glass flex items-center gap-3 text-sm text-white/90 font-body font-light"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
