import { motion } from "motion/react";
import { Github, Linkedin, Cloud, Database, Send, Shield, Code2, AppWindow, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MagneticWrapper } from "./MagneticWrapper";

export function SponsorSection() {
  const sponsors = [
    { name: "Microsoft", icon: AppWindow },
    { name: "GitHub", icon: Github },
    { name: "Azure", icon: Cloud },
    { name: "LinkedIn", icon: Linkedin },
    { name: "JetBrains", icon: Code2 },
    { name: "Postman", icon: Send },
    { name: "MongoDB", icon: Database },
    { name: "Cloudflare", icon: Shield },
  ];

  return (
    <section className="py-24 md:py-40 px-6 relative overflow-hidden bg-transparent" id="sponsors">
      
      {/* Soft radial glow behind the logo wall */}
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-blue/10 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="max-w-screen-xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Animated Line drawing down */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 60, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-px bg-gradient-to-b from-transparent to-accent-blue/50 mb-8"
        />

        <div className="text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-text-dim text-xs font-semibold tracking-[0.2em] uppercase mb-4 block"
          >
            Powered by Industry Leaders
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-6"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm md:text-base text-text-muted max-w-2xl mx-auto font-light leading-relaxed mb-8"
          >
            Empowering students through partnerships, mentorship, and innovation.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <MagneticWrapper>
              <Link to="/sponsors" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-white font-medium hover:bg-accent-blue/20 transition-all duration-300">
                Partner with us
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticWrapper>
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center items-center max-w-4xl mx-auto gap-8 md:gap-x-16 md:gap-y-12">
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 + (i * 0.05) }}
              className="flex items-center gap-2.5 opacity-40 hover:opacity-100 hover:-translate-y-1 flex-shrink-0 transition-all duration-500 cursor-pointer text-white"
            >
              <sponsor.icon size={26} strokeWidth={1.5} />
              <span className="font-display font-medium text-xl md:text-2xl tracking-tight">{sponsor.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Curved Horizon Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vw] sm:w-[150vw] h-[300px] pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scaleY: 0.8 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-[800px] absolute top-[150px] border-t border-accent-blue/30 rounded-[100%] shadow-[0_-40px_100px_rgba(109,93,251,0.2)] bg-gradient-to-b from-accent-purple/5 to-transparent"
        />
      </div>

    </section>
  );
}
