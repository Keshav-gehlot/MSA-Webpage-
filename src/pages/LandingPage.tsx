import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { SponsorSection } from '../components/SponsorSection';
import { WhyJoinSection } from '../components/WhyJoinSection';
import { ApplyNowSection } from '../components/ApplyNowSection';
import { JourneySection } from '../components/JourneySection';
import { TeamSection } from '../components/TeamSection';
import { EventsSection } from '../components/EventsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="bg-canvas min-h-screen text-text-main relative z-0">
      <Navbar />
      <main>
        <HeroSection />
        <SponsorSection />
        <WhyJoinSection />
        <JourneySection />
        <ProjectsSection />
        <EventsSection />
        <TeamSection />
        <TestimonialsSection />
        <ApplyNowSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
