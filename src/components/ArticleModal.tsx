import React from 'react';
import { JournalArticle } from '../types';
import { X, Clock, ArrowUpRight } from 'lucide-react';

interface ArticleModalProps {
  article: JournalArticle | null;
  onClose: () => void;
  onStartProject: () => void;
}

export default function ArticleModal({ article, onClose, onStartProject }: ArticleModalProps) {
  if (!article) return null;

  return (
    <div
      id="article-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-[1.75rem] liquid-glass-strong bg-black/90 p-6 sm:p-10 md:p-12 space-y-8 max-h-[90vh] overflow-y-auto relative text-white shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-article-modal-btn"
          aria-label="Close Article Modal"
          className="absolute top-6 right-6 p-2.5 rounded-full liquid-glass hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-body">
            <span className="liquid-glass rounded-full px-3 py-1 uppercase tracking-wider text-white/90">
              {article.category}
            </span>
            <span className="text-white/60 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/60">{article.date}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-heading italic text-white leading-tight tracking-[-1px]">
            {article.title}
          </h2>

          <div className="text-xs text-white/60 font-body uppercase tracking-wider pt-1">
            // Written by Studio Practice
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-5 pt-4 border-t border-white/10 text-base sm:text-lg text-white/85 font-body font-light leading-relaxed">
          {article.content.map((p, idx) => (
            <p key={idx} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="p-6 rounded-2xl liquid-glass space-y-3">
          <div className="font-heading italic text-2xl md:text-3xl text-white">
            Want to discuss these ideas or collaborate?
          </div>
          <p className="text-sm text-white/80 font-body font-light">
            We partner directly with ambitious founders and creative leaders on bespoke web architectures, design systems, and compounding digital assets.
          </p>
          <button
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors cursor-pointer"
          >
            <span>Start a conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Footer */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-body text-white/60">
          <span>&copy; 2026 DIGITAL STUDIO CRAFT</span>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Close Article &times;
          </button>
        </div>
      </div>
    </div>
  );
}
