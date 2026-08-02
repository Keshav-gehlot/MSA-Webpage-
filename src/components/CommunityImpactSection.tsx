import { motion } from 'motion/react';
import { Users, Award, BookOpen, Presentation, Github } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../lib/utils';

export function CommunityImpactSection() {
  const isReducedMotion = useReducedMotion();

  const metrics = [
    { icon: Users, value: "1,200+", label: "Active Members", desc: "Students engaged in our community" },
    { icon: Award, value: "450+", label: "MS Learn Badges", desc: "Earned by our members this year" },
    { icon: Presentation, value: "48", label: "Workshops Hosted", desc: "Covering AI, Cloud, and Web" },
    { icon: Github, value: "15+", label: "Open Source Projects", desc: "Collaborative campus initiatives" },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-surface-1/50 -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-6">
            Community Impact
          </h2>
          <p className="text-lg text-text-dim max-w-2xl mx-auto font-light leading-relaxed">
            We believe in learning together and building in the open. Our chapter empowers students with Microsoft technologies and real-world skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: isReducedMotion ? 0 : 0.5, delay: isReducedMotion ? 0 : i * 0.1 }}
              className="bg-surface-2 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 relative group"
            >
              <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-accent-blue relative z-10 group-hover:scale-110 transition-transform duration-500">
                <metric.icon size={24} strokeWidth={1.5} />
              </div>
              <div className="relative z-10">
                <div className="text-4xl font-display font-medium text-white mb-2">{metric.value}</div>
                <div className="text-lg font-medium text-white mb-1">{metric.label}</div>
                <div className="text-sm text-text-muted">{metric.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <a href="https://learn.microsoft.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all group">
              <BookOpen size={18} className="text-accent-blue group-hover:text-white transition-colors" />
              <span>Explore Microsoft Learn</span>
            </a>
        </div>
      </div>
    </section>
  );
}
