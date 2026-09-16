import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Copy, 
  Check, 
  Mail, 
  Calendar, 
  ArrowUpRight, 
  DollarSign,
  Clock,
  MessageCircle,
  Sparkles
} from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  onOpenAI?: (tab?: 'chat' | 'voice' | 'search' | 'estimate') => void;
}

export default function ContactSection({ initialService, onOpenAI }: ContactSectionProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialService ? [initialService] : ['Websites']
  );
  const [selectedTimeline, setSelectedTimeline] = useState('Standard (3-4 Weeks)');
  const [selectedBudget, setSelectedBudget] = useState('$3,000 – $5,000');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.0, 1.1]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const availableServices = [
    'Websites',
    'Landing Pages',
    'SaaS Design',
    'UGC Ads',
    'AI-powered Experience'
  ];

  const timelines = [
    'Sprint (1-2 Weeks)',
    'Standard (3-4 Weeks)',
    'Enterprise (5+ Weeks)'
  ];

  const budgets = [
    '$1,500 – $3,000',
    '$3,000 – $5,000',
    '$5,000 – $10,000',
    '$10,000+'
  ];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('aryansabharwal156@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#888888', '#cccccc']
      });
    } catch {
      // safe fallback
    }

    setSubmitted(true);
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-16 relative bg-black overflow-hidden"
    >
      {/* Curved Edge Video Container covering full section with scroll motion */}
      <motion.div 
        style={{ opacity: containerOpacity }}
        className="absolute inset-3 sm:inset-6 lg:inset-8 pointer-events-none z-0 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-white/15 shadow-[0_0_90px_rgba(0,0,0,0.95)]"
      >
        <motion.video
          style={{ scale: videoScale, y: videoY, objectPosition: '70% center' }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-90 filter contrast-110 brightness-105"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
        />

        {/* Subtle Inner Highlight Ring */}
        <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] ring-1 ring-inset ring-white/15 pointer-events-none" />
      </motion.div>

      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-start">
          {/* Left Column: Direct Info & Editorial Contact */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-body uppercase tracking-[0.2em] text-white/70 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>// Start a Project</span>
              </div>

              <h2 className="font-heading italic text-5xl sm:text-6xl lg:text-[4.5rem] text-white tracking-[-2px] leading-[0.95]">
                Let&apos;s build something{' '}
                <span className="text-white/80">
                  remarkable.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-white/80 mt-5 font-body font-light leading-relaxed">
                Have a new brand to launch, a flagship web experience to design, or a complex software UI to rebuild? Tell us about your goals.
              </p>
            </div>

            {/* Direct Email & WhatsApp Card */}
            <div className="p-6 rounded-[1.25rem] liquid-glass space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-body uppercase tracking-wider text-white/60">
                  Direct Inquiries
                </span>
                <span className="text-xs text-white/60 font-body">
                  Avg. reply &lt; 12 hours
                </span>
              </div>

              {/* Email Box */}
              <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="w-4 h-4 text-white/70 shrink-0" />
                  <span className="text-sm font-body text-white truncate select-all">
                    aryansabharwal156@gmail.com
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg liquid-glass hover:bg-white/10 text-white/80 hover:text-white transition-colors shrink-0 cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {copiedEmail && (
                <div className="text-xs text-white/90 font-body">
                  ✓ Email copied to clipboard!
                </div>
              )}

              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/916396438091"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MessageCircle className="w-4 h-4 text-white/80 shrink-0" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0">
                    <span className="text-sm font-body font-medium text-white">
                      Chat on WhatsApp
                    </span>
                    <span className="text-xs text-white/60 font-mono">
                      +91 6396438091
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </a>
            </div>

            {/* Booking Callout */}
            <div className="p-6 rounded-[1.25rem] liquid-glass flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-heading italic text-2xl text-white">
                  30-Min Discovery Session
                </div>
                <div className="text-xs text-white/70 font-body font-light">
                  Free architectural scope & feasibility review.
                </div>
              </div>

              <a
                href="mailto:aryansabharwal156@gmail.com?subject=Project%20Discovery%20Call%20Request"
                className="px-4 py-2.5 rounded-full bg-white text-black text-xs font-body font-medium flex items-center gap-1.5 hover:bg-white/90 transition-all shrink-0 cursor-pointer"
              >
                <span>Book Call</span>
                <Calendar className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* AI Scope Accelerator Callout */}
            {onOpenAI && (
              <div className="p-5 rounded-[1.25rem] liquid-glass border border-white/15 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-white font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>Instant AI Project Scope</span>
                  </div>
                  <div className="text-[11px] text-white/70 font-body font-light">
                    Generate an instant architectural tech & pricing blueprint.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenAI('estimate')}
                  className="px-3.5 py-2 rounded-full liquid-glass hover:bg-white/10 text-white text-xs font-medium border border-white/20 transition-all shrink-0 cursor-pointer"
                >
                  Generate Scope
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Project Scope Configurator & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-[1.75rem] liquid-glass-strong">
              {submitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-white text-black mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>

                  <h3 className="font-heading italic text-4xl text-white">
                    Project Request Received
                  </h3>

                  <p className="text-sm sm:text-base text-white/80 font-body font-light max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out, {name}. We will review your project configuration and get back to you at {email} within 24 hours.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="mt-6 px-6 py-3 rounded-full liquid-glass text-xs font-body uppercase tracking-wider text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service selector */}
                  <div className="space-y-2.5">
                    <label className="text-xs uppercase tracking-wider text-white/70 font-body block">
                      1. Select Required Disciplines:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableServices.map((srv) => {
                        const isSelected = selectedServices.includes(srv);
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => toggleService(srv)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-body transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-white text-black font-medium shadow-md'
                                : 'liquid-glass text-white/80 hover:bg-white/[0.04]'
                            }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Timeline selector */}
                  <div className="space-y-2.5">
                    <label className="text-xs uppercase tracking-wider text-white/70 font-body block">
                      2. Preferred Timeline:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {timelines.map((tl) => (
                        <button
                          type="button"
                          key={tl}
                          onClick={() => setSelectedTimeline(tl)}
                          className={`p-3 rounded-xl text-xs font-body text-left transition-all cursor-pointer ${
                            selectedTimeline === tl
                              ? 'liquid-glass-strong bg-white/[0.08] text-white border-white/40'
                              : 'liquid-glass text-white/70 hover:bg-white/[0.02]'
                          }`}
                        >
                          <div className="font-medium text-white flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-white/70" />
                            <span>{tl.split(' ')[0]}</span>
                          </div>
                          <div className="text-[11px] text-white/60 mt-0.5">
                            {tl.split('(')[1]?.replace(')', '') || ''}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget selector */}
                  <div className="space-y-2.5">
                    <label className="text-xs uppercase tracking-wider text-white/70 font-body block">
                      3. Target Budget:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgets.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setSelectedBudget(b)}
                          className={`p-2.5 rounded-xl text-center text-xs font-body transition-all cursor-pointer ${
                            selectedBudget === b
                              ? 'bg-white text-black font-medium'
                              : 'liquid-glass text-white/70 hover:bg-white/[0.02]'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-body text-white/70 block mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Elena Rostova"
                          className="w-full px-4 py-3 rounded-xl liquid-glass text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/50"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-body text-white/70 block mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="elena@studio.com"
                          className="w-full px-4 py-3 rounded-xl liquid-glass text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-body text-white/70 block mb-1.5">
                        Brief Project Summary
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about the product, your goals, or timeline requirements..."
                        className="w-full px-4 py-3 rounded-xl liquid-glass text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/50 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-white hover:bg-white/90 text-black text-sm font-body font-medium flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer"
                  >
                    <span>Send Project Proposal</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <div className="text-center text-[11px] text-white/50 font-body">
                    We sign mutual NDAs upon request before scoping calls.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
