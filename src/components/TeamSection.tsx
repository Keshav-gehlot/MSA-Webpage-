import { motion } from "motion/react";
import { MagneticWrapper } from "./MagneticWrapper";

export function TeamSection() {
  return (
    <section className="py-[120px] px-6 bg-transparent" id="team">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Leadership</span>
        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-6">
          Meet the Team
        </h2>
        <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Our team bios are coming soon. We are always looking for passionate students to help drive innovation and build the local tech ecosystem.
        </p>
        <div className="flex justify-center">
          <MagneticWrapper>
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm">
              Reach out to join
            </a>
          </MagneticWrapper>
        </div>
      </div>
    </section>
  );
}



