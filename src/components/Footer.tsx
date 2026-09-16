import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setLocalTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-6 lg:px-16 bg-black border-t border-white/10 text-white/70 text-xs font-body">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Top Row: Big Brand Display & Back To Top */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="font-heading italic text-4xl sm:text-6xl text-white leading-none tracking-[-1px]">
              Aryan Sabharwal
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/60 mt-3">
              Independent Digital Studio &mdash; Crafted for Longevity
            </div>
          </div>

          <button
            onClick={scrollToTop}
            id="footer-back-to-top-btn"
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass hover:bg-white/10 text-white transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Middle Grid: Nav, Time, Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1: Timezone */}
          <div className="space-y-2">
            <div className="text-white uppercase tracking-wider font-medium text-xs">
              // Studio Time (IST)
            </div>
            <div className="text-lg text-white font-mono-code">
              {localTime || '10:45:00 AM'}
            </div>
            <div className="text-white/60 text-xs">
              Based in India &bull; Global Client Engagements
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <div className="text-white uppercase tracking-wider font-medium text-xs">
              // Navigation
            </div>
            <div className="flex flex-col space-y-1.5 text-xs text-white/80">
              <a href="#work" className="hover:text-white transition-colors">Selected Work</a>
              <a href="#studio" className="hover:text-white transition-colors">Studio & Services</a>
              <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
              <a href="#process" className="hover:text-white transition-colors">Delivery Process</a>
              <a href="#journal" className="hover:text-white transition-colors">Journal & Essays</a>
              <a href="#contact" className="hover:text-white transition-colors">Start a Project</a>
            </div>
          </div>

          {/* Col 3: Direct */}
          <div className="space-y-2">
            <div className="text-white uppercase tracking-wider font-medium text-xs">
              // Direct Inquiries
            </div>
            <div className="flex flex-col space-y-2 text-xs text-white/80">
              <a href="mailto:aryansabharwal156@gmail.com" className="hover:text-white transition-colors select-all block">
                aryansabharwal156@gmail.com
              </a>
              <a
                href="https://wa.me/916396438091"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white hover:text-white/80 transition-colors font-medium"
              >
                <span>WhatsApp Inquiries</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>

          {/* Col 4: Ethos */}
          <div className="space-y-2">
            <div className="text-white uppercase tracking-wider font-medium text-xs">
              // Studio Practice
            </div>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Every system is engineered from scratch with obsessive typographic hierarchy, sub-millisecond responsiveness, and production-grade accessibility.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            &copy; {new Date().getFullYear()} Aryan Sabharwal. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Built with React + Vite + Tailwind</span>
            <span>&bull;</span>
            <a href="#contact" className="hover:text-white transition-colors">
              Available for Q3 2026
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
