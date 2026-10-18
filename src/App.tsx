import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MicroAppPlayground } from './components/MicroAppPlayground';
import { AppScoper } from './components/AppScoper';
import { CapabilitiesGrid } from './components/CapabilitiesGrid';
import { ProofMetrics } from './components/ProofMetrics';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { LeadCapture } from './components/LeadCapture';
import { Footer } from './components/Footer';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState('Hobbyist');

  const handleOpenWaitlist = (plan = 'Hobbyist') => {
    setSelectedPlanForModal(plan);
    setModalOpen(true);
  };

  const handleScrollToScoper = () => {
    const el = document.getElementById('scoper');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Bar navigation */}
      <Navbar onOpenWaitlist={() => handleOpenWaitlist('Hobbyist')} />

      {/* Main content flow */}
      <main className="flex-1">
        <Hero
          onOpenWaitlist={() => handleOpenWaitlist('Hobbyist')}
          onScrollToScoper={handleScrollToScoper}
        />

        <CapabilitiesGrid />

        <MicroAppPlayground />

        <AppScoper onStartBuilding={() => handleOpenWaitlist('Independent Builder')} />

        <ProofMetrics />

        <PricingSection onSelectPlan={(plan) => handleOpenWaitlist(plan)} />

        <FaqSection />

        <LeadCapture initialPlan="Hobbyist" isModal={false} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal Lead Capture Popup when triggered by CTAs */}
      <LeadCapture
        isModal={true}
        isOpen={modalOpen}
        initialPlan={selectedPlanForModal}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
