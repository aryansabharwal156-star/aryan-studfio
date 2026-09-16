import React, { useState } from 'react';
import { Sparkles, Bot, Mic, Globe, MessageSquare } from 'lucide-react';

interface FloatingAITriggerProps {
  onOpenAI: (tab?: 'chat' | 'voice' | 'search' | 'estimate') => void;
}

export default function FloatingAITrigger({ onOpenAI }: FloatingAITriggerProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 font-body">
      {/* Quick Launch Radial / Flyout on Hover */}
      {isHovered && (
        <div className="flex flex-col gap-2 p-2 rounded-2xl liquid-glass-strong border border-white/20 shadow-2xl mb-1 animate-fade-in backdrop-blur-2xl">
          <button
            onClick={() => onOpenAI('chat')}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl hover:bg-white/10 text-white/90 hover:text-white transition-all text-xs font-medium text-left cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-white" />
            <span>Gemini Studio Chat</span>
          </button>

          <button
            onClick={() => onOpenAI('voice')}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl hover:bg-white/10 text-white/90 hover:text-white transition-all text-xs font-medium text-left cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-white" />
            <span>Real-Time Voice Assistant</span>
          </button>

          <button
            onClick={() => onOpenAI('search')}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl hover:bg-white/10 text-white/90 hover:text-white transition-all text-xs font-medium text-left cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-white" />
            <span>Google Search Grounding</span>
          </button>

          <button
            onClick={() => onOpenAI('estimate')}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl hover:bg-white/10 text-white/90 hover:text-white transition-all text-xs font-medium text-left cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Instant Project AI Scope</span>
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        id="floating-ai-studio-btn"
        onClick={() => onOpenAI('chat')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full liquid-glass-strong hover:bg-white/15 text-white border border-white/25 shadow-2xl transition-all duration-300 hover:scale-[1.03] cursor-pointer"
        aria-label="Open Aryvanta AI Studio Assistant"
      >
        {/* Glow Ring */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-white/20 to-white/5 opacity-50 blur group-hover:opacity-100 transition-opacity" />

        <div className="relative flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-black" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-medium tracking-tight leading-none text-white">
              Studio AI Suite
            </span>
            <span className="text-[9px] text-white/60 tracking-wider uppercase leading-tight mt-0.5">
              Live Assistant & Voice
            </span>
          </div>
          <span className="w-2 h-2 rounded-full bg-white animate-ping ml-1" />
        </div>
      </button>
    </div>
  );
}
