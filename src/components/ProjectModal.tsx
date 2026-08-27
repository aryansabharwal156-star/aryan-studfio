import React from 'react';
import { ProjectItem } from '../types';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onStartProject: () => void;
}

export default function ProjectModal({ project, onClose, onStartProject }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-[1.75rem] liquid-glass-strong bg-black/90 p-6 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto relative text-white shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-project-modal-btn"
          aria-label="Close Project Modal"
          className="absolute top-6 right-6 p-2.5 rounded-full liquid-glass hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-body uppercase tracking-wider text-white/90">
            {project.category}
          </span>
          <span className="text-xs text-white/60 font-body">
            {project.year} • {project.client || 'Aryan Sabharwal Studio'}
          </span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-heading italic text-white leading-tight tracking-[-1px]">
            {project.title}
          </h2>
          <p className="text-base text-white/80 font-body font-light mt-3 leading-relaxed">
            {project.detailedDescription}
          </p>
        </div>

        {/* Stats Grid if available */}
        {project.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {project.stats.map((st, idx) => (
              <div key={idx} className="p-4 rounded-2xl liquid-glass text-left">
                <div className="font-heading italic text-2xl md:text-3xl text-white">
                  {st.value}
                </div>
                <div className="text-xs text-white/70 font-body mt-1 leading-tight">{st.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Deliverables Checklist */}
        <div className="space-y-3 pt-2">
          <div className="text-xs uppercase tracking-wider text-white/70 font-body font-medium">
            // Project Deliverables & Artifacts
          </div>
          <div className="space-y-2">
            {project.deliverables.map((deliv, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl liquid-glass flex items-center gap-3 text-sm text-white/90 font-body font-light"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
                <span>{deliv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2 pt-2">
          <div className="text-xs uppercase tracking-wider text-white/70 font-body font-medium">
            // Technologies Utilized
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="liquid-glass rounded-full px-3 py-1 text-xs text-white/90 font-body font-light"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="px-6 py-3 rounded-full bg-white hover:bg-white/90 text-black font-body text-sm font-medium flex items-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            <span>Request Similar System</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="text-sm font-body text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Close Overview &times;
          </button>
        </div>
      </div>
    </div>
  );
}
