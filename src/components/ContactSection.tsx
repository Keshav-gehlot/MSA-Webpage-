import { Github, Instagram, Linkedin, Send } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

export function ContactSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-surface-light/50 backdrop-blur-sm border-t border-white/5" id="contact">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left: Info & Socials */}
        <div>
          <span className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Contact</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-6">
            Ready to lead?
          </h2>
          <p className="text-sm md:text-base text-text-muted font-light mb-12 max-w-md leading-relaxed">
            Reach out to learn more about upcoming events, applying to the program, or partnering with our community.
          </p>

          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-3">Email Us</p>
              <a href="mailto:hello@msa.example.com" className="text-lg md:text-xl text-white hover:text-accent-blue transition-colors underline decoration-white/20 underline-offset-4 hover:decoration-accent-blue/40">
                hello@msa.example.com
              </a>
            </div>
            
            <div>
              <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-base border border-white/5 flex items-center justify-center text-text-muted hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-base border border-white/5 flex items-center justify-center text-text-muted hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-base border border-white/5 flex items-center justify-center text-text-muted hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-6 md:p-10 rounded-3xl bg-base border border-white/5 relative">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text-muted ml-1">First Name</label>
                <input 
                  type="text" 
                  className="bg-surface border border-white/5 rounded-2xl px-4 py-3 md:py-3.5 text-sm text-white focus:outline-none focus:border-accent-purple/50 transition-colors placeholder:text-white/20"
                  placeholder="John"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text-muted ml-1">Last Name</label>
                <input 
                  type="text" 
                  className="bg-surface border border-white/5 rounded-2xl px-4 py-3 md:py-3.5 text-sm text-white focus:outline-none focus:border-accent-purple/50 transition-colors placeholder:text-white/20"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-muted ml-1">Email</label>
              <input 
                type="email" 
                className="bg-surface border border-white/5 rounded-2xl px-4 py-3 md:py-3.5 text-sm text-white focus:outline-none focus:border-accent-purple/50 transition-colors placeholder:text-white/20"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-muted ml-1">Message</label>
              <textarea 
                rows={4}
                className="bg-surface border border-white/5 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent-purple/50 transition-colors resize-none placeholder:text-white/20"
                placeholder="How can we help you building the future?"
              />
            </div>

            <MagneticWrapper className="w-full mt-2">
              <button className="w-full bg-white text-black font-semibold py-3.5 md:py-4 rounded-2xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
                Send Message <Send size={16} />
              </button>
            </MagneticWrapper>
          </form>
        </div>

      </div>
    </section>
  );
}

