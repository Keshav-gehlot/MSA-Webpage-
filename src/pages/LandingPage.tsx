import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { WhyJoinSection } from '../components/WhyJoinSection';
import { JourneySection } from '../components/JourneySection';
import { ProjectsSection } from '../components/ProjectsSection';
import { EventsSection } from '../components/EventsSection';
import { TeamSection } from '../components/TeamSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { SponsorSection } from '../components/SponsorSection';
import { ApplyNowSection } from '../components/ApplyNowSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="bg-canvas min-h-screen text-text-main relative z-0">
      <Navbar />
      <main>
        <HeroSection />
        <WhyJoinSection />
        <JourneySection />
        <ProjectsSection />
        <EventsSection />
        <TeamSection />
        <TestimonialsSection />
        <SponsorSection />
        <ApplyNowSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
