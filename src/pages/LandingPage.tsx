import React, { Suspense } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';

// Sections below the fold
const WhyJoinSection = React.lazy(() => import('../components/WhyJoinSection').then(m => ({ default: m.WhyJoinSection })));
const SponsorMarquee = React.lazy(() => import('../components/SponsorMarquee').then(m => ({ default: m.SponsorMarquee })));
const CommunityImpactSection = React.lazy(() => import('../components/CommunityImpactSection').then(m => ({ default: m.CommunityImpactSection })));
const LearningHub = React.lazy(() => import('../components/LearningHub').then(m => ({ default: m.LearningHub })));
const ProjectsSection = React.lazy(() => import('../components/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const EventsSection = React.lazy(() => import('../components/EventsSection').then(m => ({ default: m.EventsSection })));
const TeamSection = React.lazy(() => import('../components/TeamSection').then(m => ({ default: m.TeamSection })));
const TestimonialsSection = React.lazy(() => import('../components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const SponsorSection = React.lazy(() => import('../components/SponsorSection').then(m => ({ default: m.SponsorSection })));
const ApplyNowSection = React.lazy(() => import('../components/ApplyNowSection').then(m => ({ default: m.ApplyNowSection })));
const ContactSection = React.lazy(() => import('../components/ContactSection').then(m => ({ default: m.ContactSection })));
const Footer = React.lazy(() => import('../components/Footer').then(m => ({ default: m.Footer })));

// Loading placeholder for lazy sections
const SectionLoader = () => <div className="py-24 text-center text-text-dim">Loading section...</div>;

export function LandingPage() {
  return (
    <div className="bg-canvas min-h-screen text-text-main relative z-0">
      <Navbar />
      <main>
        {/* Above the fold (eagerly loaded) */}
        <HeroSection />
        
        {/* Below the fold (lazy loaded) */}
        <Suspense fallback={<SectionLoader />}>
          <WhyJoinSection />
          <SponsorMarquee />
          <CommunityImpactSection />
          <LearningHub />
          <ProjectsSection />
          <EventsSection />
          <TeamSection />
          <TestimonialsSection />
          <SponsorSection />
          <ApplyNowSection />
          <ContactSection />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
