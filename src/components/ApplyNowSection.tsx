import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

export function ApplyNowSection() {
  return (
    <section className="py-24 px-6 relative bg-[#050816] overflow-hidden" id="apply">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-full max-w-lg h-full bg-accent-blue/10 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter text-white mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto mb-12">
            Applications for the next cohort of Microsoft Student Ambassadors are opening soon. Join us and make an impact.
          </p>
          
          <div className="flex justify-center">
            <MagneticWrapper>
              <a 
                href="#apply" 
                style={{ color: "#000" }} className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10 text-lg group-hover:text-white transition-colors duration-300">Join Community</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:text-white transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-purple-400 to-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </MagneticWrapper>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
