import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SelectedWork from './components/SelectedWork';
import ServicesSection from './components/ServicesSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import ProcessSection from './components/ProcessSection';
import AiTechSection from './components/AiTechSection';
import StatsSection from './components/StatsSection';
import JournalSection from './components/JournalSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Modals & Floating AI Trigger
import ProjectModal from './components/ProjectModal';
import ServiceDeliverablesModal from './components/ServiceDeliverablesModal';
import ArticleModal from './components/ArticleModal';
import AIStudioSuiteModal from './components/AIStudioSuiteModal';
import FloatingAITrigger from './components/FloatingAITrigger';

import { ProjectItem, ServiceItem, JournalArticle } from './types';

export default function App() {
  // Modal states
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedServiceForDeliverables, setSelectedServiceForDeliverables] = useState<ServiceItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [targetContactService, setTargetContactService] = useState<string | undefined>(undefined);

  // AI Studio Suite State
  const [aiSuiteOpen, setAiSuiteOpen] = useState(false);
  const [aiSuiteTab, setAiSuiteTab] = useState<'chat' | 'voice' | 'search' | 'estimate'>('chat');

  const handleOpenAI = (tab: 'chat' | 'voice' | 'search' | 'estimate' = 'chat') => {
    setAiSuiteTab(tab);
    setAiSuiteOpen(true);
  };

  const handleScrollToContact = (serviceName?: string) => {
    if (serviceName) {
      setTargetContactService(serviceName);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
      {/* Floating Liquid Glass Navigation */}
      <Navbar onOpenAI={handleOpenAI} />

      {/* Main Single-Page Sections */}
      <main>
        {/* Section 1: Hero */}
        <HeroSection onOpenAI={() => handleOpenAI('chat')} />

        {/* Section 2: Selected Work (Openable Project Modals) */}
        <SelectedWork
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Section 3: Studio Services (Openable Deliverables Spec Modals) */}
        <ServicesSection
          onSelectService={(service) => setSelectedServiceForDeliverables(service)}
        />

        {/* Section 4: Studio Capabilities (Design, Engineering, Growth) */}
        <CapabilitiesSection />

        {/* Section 5: Delivery Process Timeline */}
        <ProcessSection />

        {/* Section 6: AI-Native Workflow Matrix */}
        <AiTechSection onOpenAI={handleOpenAI} />

        {/* Section 7: Live Metrics & Benchmarks */}
        <StatsSection />

        {/* Section 8: Journal & Thinking Out Loud (Openable Article Modals) */}
        <JournalSection
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* Section 9: Frequently Asked Questions (SEO & Conversion) */}
        <FAQSection />

        {/* Section 10: Scope Estimator & Contact */}
        <ContactSection
          initialService={targetContactService}
          onOpenAI={handleOpenAI}
        />
      </main>

      {/* Studio Footer */}
      <Footer />

      {/* Persistent Floating AI Studio Trigger Button */}
      <FloatingAITrigger onOpenAI={handleOpenAI} />

      {/* Interactive AI Studio Intelligence Suite Modal */}
      <AIStudioSuiteModal
        isOpen={aiSuiteOpen}
        onClose={() => setAiSuiteOpen(false)}
        defaultTab={aiSuiteTab}
        onStartProject={(service) => handleScrollToContact(service)}
      />

      {/* Interactive Project & Article Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartProject={() => handleScrollToContact(selectedProject?.title)}
      />

      <ServiceDeliverablesModal
        service={selectedServiceForDeliverables}
        onClose={() => setSelectedServiceForDeliverables(null)}
        onStartProject={(serviceName) => handleScrollToContact(serviceName)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onStartProject={() => handleScrollToContact()}
      />
    </div>
  );
}
