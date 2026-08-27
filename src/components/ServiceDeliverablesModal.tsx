import React from 'react';
import { ServiceItem } from '../types';
import { X, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ServiceDeliverablesModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onStartProject: (serviceName: string) => void;
}

export default function ServiceDeliverablesModal({
  service,
  onClose,
  onStartProject
}: ServiceDeliverablesModalProps) {
  if (!service) return null;

  return (
    <div
      id="service-modal-backdrop"
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
          id="close-service-modal-btn"
          aria-label="Close Service Modal"
          className="absolute top-6 right-6 p-2.5 rounded-full liquid-glass hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Tag */}
        <div className="flex items-center gap-3">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-body uppercase tracking-wider text-white/90">
            Craft Specification // {service.number}
          </span>
          <span className="text-xs text-white/60 font-body">
            {service.accent}
          </span>
        </div>

        <div>
          <h2 className="text-4xl sm:text-5xl font-heading italic text-white leading-tight tracking-[-1px]">
            {service.title} Deliverables
          </h2>
          <p className="text-base text-white/80 font-body font-light mt-2 leading-relaxed">
            {service.tagline} &mdash; {service.description}
          </p>
        </div>

        {/* Deliverables List */}
        <div className="space-y-3 pt-2">
          <div className="text-xs uppercase tracking-wider text-white/70 font-body font-medium">
            // What You Receive Upon Handover
          </div>
          <div className="space-y-2.5">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl liquid-glass flex items-center gap-3 text-sm text-white/90 font-body font-light"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2 pt-2">
          <div className="text-xs uppercase tracking-wider text-white/70 font-body font-medium">
            // Production Tool Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="liquid-glass rounded-full px-3 py-1 text-xs text-white/90 font-body font-light"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              onStartProject(service.title);
            }}
            className="px-6 py-3 rounded-full bg-white hover:bg-white/90 text-black font-body text-sm font-medium flex items-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            <span>Commission {service.title}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="text-sm font-body text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Close Spec &times;
          </button>
        </div>
      </div>
    </div>
  );
}
