import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowUpRight, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-16 relative bg-[#030308] border-t border-white/10 overflow-hidden scroll-mt-12"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-950/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 max-w-2xl">
          <div className="text-xs font-body uppercase tracking-[0.2em] text-white/70 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>// Clarity & Process</span>
          </div>

          <h2 className="font-heading italic text-5xl sm:text-6xl lg:text-[4.5rem] text-white tracking-[-2px] leading-[0.95]">
            Frequently Asked{' '}
            <span className="text-white/80">Questions.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 mt-4 font-body font-light leading-relaxed">
            Everything you need to know about partnering with Aryvanta — our disciplines, engagement models, and delivery timelines.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {SITE_CONFIG.faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="liquid-glass rounded-[1.25rem] border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <h3 className="font-heading italic text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                    {faq.question}
                  </h3>
                  <div
                    className={`w-9 h-9 rounded-full liquid-glass flex items-center justify-center shrink-0 text-white transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-white/15' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-white/80 font-body font-light leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Direct Inquiry Prompt */}
        <div className="mt-12 p-6 sm:p-8 rounded-[1.5rem] liquid-glass border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-white font-medium font-body text-base flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-white/70" />
              <span>Have a specific project in mind?</span>
            </div>
            <p className="text-xs sm:text-sm text-white/70 font-body font-light">
              Connect directly with Aryan Sabharwal on WhatsApp for rapid scope evaluation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/916396438091"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white text-black font-body font-medium text-xs sm:text-sm hover:bg-white/90 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Inquiry</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
