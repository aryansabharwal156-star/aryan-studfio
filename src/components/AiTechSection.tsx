import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { techNodes } from '../data/portfolioData';
import { TechNode } from '../types';
import { Bot, Code, Palette, Film, Zap, CheckCircle2, Sparkles, Mic, Globe, ArrowUpRight } from 'lucide-react';

interface AiTechSectionProps {
  onOpenAI?: (tab?: 'chat' | 'voice' | 'search' | 'estimate') => void;
}

export default function AiTechSection({ onOpenAI }: AiTechSectionProps) {
  const [selectedNode, setSelectedNode] = useState<TechNode>(techNodes[0]);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.0, 1.1]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const getNodeIcon = (category: string) => {
    switch (category) {
      case 'AI':
        return <Bot className="w-4 h-4" />;
      case 'Dev':
        return <Code className="w-4 h-4" />;
      case 'Design':
        return <Palette className="w-4 h-4" />;
      case 'Motion':
        return <Film className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="ai-tech" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-16 relative bg-black overflow-hidden"
    >
      {/* Curved Background Video Container with Full Coverage & Scroll Motion */}
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
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_115057_94c3699b-0fd1-4124-bcf3-3626bb8c1f77.mp4"
        />

        {/* Subtle Inner Highlight Ring */}
        <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] ring-1 ring-inset ring-white/15 pointer-events-none" />
      </motion.div>

      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <div className="text-xs font-body uppercase tracking-[0.2em] text-white/70 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>// AI Automation & Voice Agents</span>
          </div>

          <h2 className="font-heading italic text-5xl sm:text-6xl lg:text-[4.5rem] text-white tracking-[-2px] leading-[0.95]">
            AI Automation &amp;{' '}
            <span className="text-white/80">
              Conversational Voice Systems.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/80 mt-4 font-body font-light leading-relaxed">
            Aryvanta engineers production-grade AI automation pipelines, autonomous agent workflows, and low-latency voice agents &mdash; with human taste and reliability directing every outcome.
          </p>
        </div>

        {/* Interactive Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Node Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;

              return (
                <div
                  key={node.id}
                  id={`tech-node-${node.id}`}
                  onClick={() => setSelectedNode(node)}
                  className={`cursor-pointer p-5 rounded-[1.25rem] transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'liquid-glass-strong bg-white/[0.04] shadow-2xl'
                      : 'liquid-glass hover:bg-white/[0.02]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-xl liquid-glass text-white">
                        {getNodeIcon(node.category)}
                      </div>
                      <span className="text-[11px] font-body uppercase tracking-wider text-white/60">
                        {node.category}
                      </span>
                    </div>

                    <h3 className="font-heading italic text-2xl text-white tracking-tight">
                      {node.label}
                    </h3>
                    <p className="text-xs text-white/75 font-body font-light mt-1.5 line-clamp-2">
                      {node.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/10">
                    {node.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="liquid-glass rounded-full px-2.5 py-0.5 text-[10px] text-white/70 font-body"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Node Focus */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-8 rounded-[1.5rem] liquid-glass-strong h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-body font-medium bg-white text-black px-3 py-1 rounded-full">
                    {selectedNode.category} Pipeline
                  </span>
                  <span className="text-xs text-white/60 font-body">
                    Active Architecture
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="font-heading italic text-3xl sm:text-4xl text-white tracking-[-1px]">
                    {selectedNode.label}
                  </h3>
                  <p className="text-sm sm:text-base text-white/85 font-body font-light mt-3 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                <div className="mt-8 space-y-2.5">
                  <div className="text-xs uppercase tracking-wider text-white/60 font-body">
                    // Tool Stack & Integration
                  </div>
                  {selectedNode.tools.map((tool, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl liquid-glass flex items-center gap-3 text-sm text-white/90 font-body font-light"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/60 font-body">
                Integrated into every production engagement.
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive AI Playground Card */}
        {onOpenAI && (
          <div className="mt-12 p-6 sm:p-8 rounded-[1.5rem] liquid-glass-strong border border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 font-body">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>// Live Gemini 3 Engine Testbed</span>
              </div>
              <h3 className="font-heading italic text-2xl sm:text-3xl text-white tracking-tight">
                Experience Aryvanta's AI Studio Intelligence Live
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-body font-light">
                Engage in multi-turn chat, test real-time Google Search grounding, speak with the live voice concierge, or generate instant architectural scopes.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => onOpenAI('chat')}
                className="px-4 py-2.5 rounded-full bg-white text-black font-body font-medium text-xs hover:bg-white/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Chat Assistant</span>
              </button>

              <button
                onClick={() => onOpenAI('voice')}
                className="px-4 py-2.5 rounded-full liquid-glass hover:bg-white/10 text-white font-body font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-white/15"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice Studio</span>
              </button>

              <button
                onClick={() => onOpenAI('search')}
                className="px-4 py-2.5 rounded-full liquid-glass hover:bg-white/10 text-white font-body font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-white/15"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Search Grounding</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
