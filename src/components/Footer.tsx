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
              Aryvanta
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/80 mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-white font-medium">AI • Web • SaaS • Creative Technology</span>
              <span className="text-white/40">&bull;</span>
              <span>Founded by Aryan Sabharwal</span>
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
              Operating from India &bull; Serving Clients Globally
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <div className="text-white uppercase tracking-wider font-medium text-xs">
              // Navigation
            </div>
            <div className="flex flex-col space-y-1.5 text-xs text-white/80">
              <a href="#work" className="hover:text-white transition-colors">Selected Work</a>
              <a href="#services" className="hover:text-white transition-colors">Services &amp; Studio</a>
              <a href="#ai-tech" className="hover:text-white transition-colors">AI Automation &amp; Voice</a>
              <a href="#about" className="hover:text-white transition-colors">About Aryvanta</a>
              <a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a>
              <a href="#contact" className="hover:text-white transition-colors">Start a Project</a>
            </div>
          </div>

          {/* Col 3: Direct */}
          <div className="space-y-2">
            <div className="text-white uppercase tracking-wider font-medium text-xs">
              // Connect &amp; Inquire
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
                <span>WhatsApp: +91 6396438091</span>
                <span className="text-[10px]">↗</span>
              </a>
              <a
                href="https://x.com/AryanSabha2qts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors"
              >
                <span>Twitter / X: @AryanSabha2qts</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>

          {/* Col 4: Ethos */}
          <div className="space-y-2">
            <div className="text-white uppercase tracking-wider font-medium text-xs">
              // Aryvanta Studio
            </div>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Modern digital technology and creative studio delivering AI automation, AI voice agents, websites, landing pages, SaaS tools, and commercial motion design.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            &copy; {new Date().getFullYear()} Aryvanta. Founded by Aryan Sabharwal. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>India &bull; Global Engagements</span>
            <span>&bull;</span>
            <a href="#contact" className="hover:text-white transition-colors">
              Available for New Projects
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
