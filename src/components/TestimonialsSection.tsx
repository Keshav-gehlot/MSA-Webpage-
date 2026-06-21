import { motion } from "motion/react";

export function TestimonialsSection() {
  const voices = [
    {
      quote: "Being part of MSA completely transformed my university experience. The network, the events, and the mentorship helped me land my first role as a Cloud Engineer.",
      author: "Jessica T.",
      role: "Alumni / Software Engineer",
      company: "Microsoft"
    },
    {
      quote: "Organizing our campus hackathon gave me the leadership skills I couldn't learn in a classroom. The support from the global community is unmatched.",
      author: "Rahul S.",
      role: "Gold Ambassador",
      company: "SRM Institute"
    },
    {
      quote: "I came for the Azure credits, but stayed for the incredible community. I've collaborated with peers from three different continents on open-source projects.",
      author: "Elena M.",
      role: "Technical Lead",
      company: "Student Developer"
    }
  ];

  return (
    <section className="py-24 md:py-32 px-6 bg-transparent relative overflow-hidden" id="voices">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Community Voices</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
            Hear from our members
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {voices.map((voice, i) => (
            <motion.div
              key={voice.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-surface border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between"
            >
              <div className="mb-8">
                <svg className="w-8 h-8 text-white/10 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-white md:text-lg font-light leading-relaxed">
                  "{voice.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white font-medium text-sm">
                  {voice.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">{voice.author}</h4>
                  <p className="text-text-dim text-xs mt-0.5">{voice.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
