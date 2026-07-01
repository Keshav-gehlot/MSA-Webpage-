import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { SponsorSection } from '../components/SponsorSection';
import { WhyJoinSection } from '../components/WhyJoinSection';
import { JourneySection } from '../components/JourneySection';
import { LearningHub } from '../components/LearningHub';
import { ImpactSection } from '../components/ImpactSection';
import { TeamSection } from '../components/TeamSection';
import { EventsSection } from '../components/EventsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { BackgroundEffects } from '../components/BackgroundEffects';

export function LandingPage() {
  return (
    <div className="bg-base min-h-screen text-text-main relative z-0">
      <BackgroundEffects />
      <Navbar />
      <main>
        <HeroSection />
        <SponsorSection />
        <WhyJoinSection />
        <JourneySection />
        <LearningHub />
        <ImpactSection />
        <EventsSection />
        <TeamSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
