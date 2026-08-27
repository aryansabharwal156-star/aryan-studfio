import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAI?: (tab?: 'chat' | 'voice' | 'search' | 'estimate') => void;
}

export default function Navbar({ onOpenAI }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Studio', href: '#studio' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Process', href: '#process' },
    { label: 'AI Tech', href: '#ai-tech' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 pointer-events-none">
        {/* Left logo: liquid-glass circle with italic 'a' */}
        <a
          href="#"
          className="liquid-glass h-12 w-12 rounded-full flex items-center justify-center pointer-events-auto transition-transform hover:scale-105"
          aria-label="Home"
        >
          <span className="font-heading italic text-2xl text-white select-none">a</span>
        </a>

        {/* Center Nav Pill for Desktop */}
        <div className="hidden lg:flex items-center liquid-glass-strong rounded-full px-2 py-1.5 gap-1 pointer-events-auto shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-white/80 font-body hover:text-white transition-colors rounded-full hover:bg-white/[0.04]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-white text-black rounded-full px-4 py-1.5 text-xs font-medium font-body flex items-center gap-1.5 hover:bg-white/90 transition-all ml-1 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right Action: Mobile Toggle + Desktop Spacer/CTA */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {onOpenAI && (
            <button
              onClick={() => onOpenAI('chat')}
              className="liquid-glass-strong hover:bg-white/10 text-white rounded-full px-3.5 py-2 text-xs font-medium font-body flex items-center gap-2 border border-white/20 transition-all cursor-pointer shadow-lg"
              title="Launch Gemini AI Studio Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">AI Studio Suite</span>
            </button>
          )}

          <a
            href="#contact"
            className="hidden sm:flex lg:hidden bg-white text-black rounded-full px-4 py-2 text-xs font-medium font-body items-center gap-1.5 hover:bg-white/90 transition-all"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden liquid-glass h-12 w-12 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl flex flex-col justify-center px-8 space-y-6 animate-in fade-in duration-200 lg:hidden"
        >
          <div className="text-xs uppercase tracking-widest text-white/50 font-body">
            // Navigation
          </div>
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading italic text-4xl text-white hover:text-white/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            {onOpenAI && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(false);
                  onOpenAI('chat');
                }}
                className="w-full py-3.5 rounded-full liquid-glass-strong border border-white/20 text-white text-center font-medium font-body flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Launch AI Studio Suite</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 rounded-full bg-white text-black text-center font-medium font-body flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
