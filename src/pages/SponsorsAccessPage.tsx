import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import './sponsors.css';

import { Navbar } from '../components/Navbar';
import { Check, Minus } from 'lucide-react';

const events = [
  'auth::session established',
  'sponsor::tier=platinum verified',
  'net::handshake ok 24ms',
  'db::query resumebook.select 12rows',
  'event::resonate registration +1',
  'cache::miss key=sponsor:silver',
  'webhook::stripe payment.succeeded',
  'gc::cycle complete 3.2mb freed',
  'queue::mailer job dispatched',
  'auth::token refreshed',
  'cdn::asset served 200 og_image.png',
  'sponsor::gold slot 2/3 reserved',
  'analytics::pageview /sponsors',
  'db::index rebuilt sponsors_idx',
  'net::ping discord.gg 41ms',
  'event::workshop attendance=78',
  'cache::hit key=tier:platinum',
  'auth::scope check passed',
  'queue::report generation queued',
  'sponsor::bronze application received',
  'cdn::purge complete',
  'db::write sponsors.insert ok',
  'net::tls handshake v1.3',
  'webhook::calendly booking.created',
  'gc::heap 41% utilized',
];

const levels = [
  { tag: 'OK',   cls: 'lg-ok'   },
  { tag: 'INFO', cls: 'lg-dim'  },
  { tag: 'INFO', cls: 'lg-dim'  },
  { tag: 'WARN', cls: 'lg-warn' },
];

function pad(n: number) { return n.toString().padStart(2, '0'); }

function makeLine(key: number) {
  const t = new Date(Date.now() - Math.random() * 999999);
  const ts = `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`;
  const lvl = levels[Math.floor(Math.random() * levels.length)];
  const ev = events[Math.floor(Math.random() * events.length)];
  return (
    <span key={key}>
      {ts} <span className={lvl.cls}>{lvl.tag.padEnd(4)}</span> {ev}
    </span>
  );
}

const LINES_PER_COL = 26;

function HeroLogs() {
  const cols = useMemo(() => {
    return Array.from({ length: 3 }).map((_, c) => {
      const goingUp = c % 2 === 0;
      const duration = (34 + c * 7 + Math.random() * 6) * 1.4; // Slower scroll speed
      const startPct = Math.random() * -50;
      
      const lines = Array.from({ length: LINES_PER_COL * 2 }).map((_, i) => makeLine(i));
      
      return (
        <motion.div 
          key={c}
          className="sp-log-col opacity-20" // Dimmed further
          animate={{
            y: goingUp ? [`${startPct}%`, `${startPct - 50}%`] : [`${startPct - 50}%`, `${startPct}%`]
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: duration
          }}
          style={{ y: `${startPct}%` }}
        >
          {lines}
        </motion.div>
      );
    });
  }, []);

  return (
    <div className="sp-hero-logs" aria-hidden="true">
      {cols}
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.62, ease: [0.215, 0.61, 0.355, 1], delay: delay * 0.09 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="sp-faq-item">
      <div 
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        className={`cursor-pointer list-none flex justify-between items-center font-display font-bold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background p-2 rounded-md -mx-2 ${open ? 'text-[var(--color-accent-blue)]' : ''}`}
      >
        {question}
        <span className={`text-[var(--color-accent-blue)] text-[18px] inline-block transition-transform duration-300 ml-4 shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0, y: open ? 0 : -6 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="overflow-hidden"
      >
        <p ref={contentRef} className="mt-[14px] text-[var(--color-text-dim)] text-[12.5px] leading-[1.7] max-w-[620px] pb-2">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}


export function SponsorsAccessPage() {
  const [openTiers, setOpenTiers] = useState<Record<string, boolean>>({ 'platinum': true });

  const toggleTier = (tier: string) => {
    setOpenTiers(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => next[k] = false);
      next[tier] = !prev[tier];
      return next;
    });
  };

  return (
    <div className="sponsors-page min-h-screen bg-canvas flex flex-col">
      {/* NAVBAR */}
      <Navbar />
      
      {/* BREADCRUMB (CLI Flavor) */}
      <div className="pt-24 pb-4 px-6 md:px-12 flex items-center gap-3 border-b border-white/5 bg-canvas z-40 relative">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></span>
        </div>
        <span className="font-mono text-[13px] text-text-dim tracking-wide">
          msa@srmist:<span className="text-accent-blue">~/sponsors</span>$
        </span>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto md:px-6">
        {/* HERO */}
        <div className="sp-hero">
          <HeroLogs />
          <div className="sp-hero-grid-bg"></div>
          
          <div className="mb-10 flex justify-center z-10 relative">
            <svg viewBox="0 0 240 92" className="h-[48px] w-auto">
              <defs>
                <linearGradient id="logo-border-sponsors" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D9FF" />
                  <stop offset="50%" stopColor="#6D5DFB" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
              <rect x="1" y="1" width="238" height="90" rx="16" fill="#000" stroke="url(#logo-border-sponsors)" strokeWidth="2.5"/>
              <text x="20" y="32" fill="#FFF" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="17" letterSpacing="-0.01em">Microsoft</text>
              <text x="20" y="54" fill="#FFF" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="17" letterSpacing="-0.01em">Student Ambassadors</text>
              <text x="20" y="78" fill="#FFF" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="18" letterSpacing="0.05em">SRM</text>
              <rect x="74" y="64" width="146" height="5" rx="2.5" fill="#00D9FF"/>
              <rect x="74" y="73" width="146" height="5" rx="2.5" fill="#A855F7"/>
            </svg>
          </div>

          <div className="sp-kicker">
            <span className="blink">●</span> 10 YEARS OF MICROSOFT STUDENT AMBASSADORS
          </div>
          <h1 className="sp-hero-title disp">
            Be a <span className="mark">Force for Good.</span>
          </h1>
          <p className="sp-sec-p mt-4 text-xl">
            SRM Sponsorship Opportunities
          </p>

          <div className="sp-hero-meta">
            <div><div className="sp-hm-label">Location</div><div className="sp-hm-val">SRMIST<span className="unit">chapter</span></div></div>
          </div>
        </div>

        
        {/* WHY SPONSOR */}
        <section id="why" data-close="[EOF section::01]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[01] why sponsor</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Advertising & Your Reach</h2></Reveal>
          <Reveal delay={2}><p className="sp-sec-p">Join us and put your brand in front of the sharpest student minds in India. Sponsoring an MSA SRM event is not just advertising — it's a strategic investment into tomorrow's workforce.</p></Reveal>
          <div className="sp-why-list">
            <Reveal delay={3}><div className="sp-why-row"><span className="sp-why-idx">[1]</span><span className="sp-why-name disp">50,000+ Campus Exposure</span><span className="sp-why-desc">Direct access to students across Engineering, Science, Arts, and more at SRMIST.</span></div></Reveal>
            <Reveal delay={4}><div className="sp-why-row"><span className="sp-why-idx">[2]</span><span className="sp-why-name disp">Multi-Platform Social Reach</span><span className="sp-why-desc">Dedicated campaigns across Instagram, LinkedIn, and Twitter driving brand awareness.</span></div></Reveal>
            <Reveal delay={5}><div className="sp-why-row"><span className="sp-why-idx">[3]</span><span className="sp-why-name disp">Targeted Student Audience</span><span className="sp-why-desc">Reach the next generation of decision-makers and early adopters directly.</span></div></Reveal>
            <Reveal delay={6}><div className="sp-why-row"><span className="sp-why-idx">[4]</span><span className="sp-why-name disp">Brand Prestige on Certificates</span><span className="sp-why-desc">Your logo featured on participation and winner certificates across the event.</span></div></Reveal>
          </div>
        </section>

                {/* PAST SPONSORS */}
        <section id="past-sponsors" data-close="[EOF section::02]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[02] trust & credibility</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Past Sponsors</h2></Reveal>
          <Reveal delay={2}>
            <div className="sp-sponsor-wall text-center">
              <p className="text-xl text-text-dim">Proudly partnered with over 15+ industry leaders across technology, lifestyle, and education.</p>
            </div>
          </Reveal>
        </section>
{/* TIERS */}
        <section id="tiers" data-close="[EOF section::03]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[03] investment tiers</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Sponsorship Opportunities</h2></Reveal>
          
          <div className="mt-8 flex flex-col gap-4">
            <Reveal delay={2}>
              <div className="sp-tier-row sp-tier-platinum" data-open={openTiers['platinum']}>
                <div className="sp-tier-head" onClick={() => toggleTier('platinum')} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleTier('platinum')}>
                  <div className="sp-tier-flag sp-flag-platinum"></div>
                  <div className="sp-tier-index">Tier 1</div>
                  <div className="sp-tier-main">
                    <div className="sp-tier-info">
                      <div className="sp-tier-title-block">
                        <span className="sp-tier-name sp-tn-platinum">PLATINUM</span>
                      </div>
                      <div className="sp-tier-oneliner">Top-tier exposure and workshop integration.</div>
                    </div>
                    <div className="sp-tier-toggle">＋</div>
                  </div>
                </div>
                <div className="sp-tier-body">
                  <div className="sp-tier-body-inner-wrapper">
                    <div className="sp-tier-body-inner">
                    <ul className="sp-perk-list">
                      <li>Dedicated Stage Time (Workshop)</li>
                      <li>Access to Event Resume Book</li>
                      <li>Logo on Workshop Certificates</li>
                      <li>Dedicated Instagram/LinkedIn Post</li>
                      <li>Dedicated Instagram Story</li>
                      <li>Compiled Instagram Post / Reel</li>
                      <li>Mention on MLSA SRM Website</li>
                      <li>Offline Merchandise Distribution</li>
                    </ul>
                    <div className="sp-tier-side">
                      <div>
                        <div className="sp-tier-scope-label">Investment</div>
                        <div className="sp-tier-scope-val">₹15,000+</div>
                      </div>
                      <a href="#contact-cta" className="sp-tier-apply">request package</a>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={3}>
              <div className="sp-tier-row sp-tier-gold" data-open={openTiers['gold']}>
                <div className="sp-tier-head" onClick={() => toggleTier('gold')} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleTier('gold')}>
                  <div className="sp-tier-flag sp-flag-gold"></div>
                  <div className="sp-tier-index">Tier 2</div>
                  <div className="sp-tier-main">
                    <div className="sp-tier-info">
                      <div className="sp-tier-title-block">
                        <span className="sp-tier-name sp-tn-gold">GOLD</span>
                      </div>
                      <div className="sp-tier-oneliner">High visibility and dedicated social reach.</div>
                    </div>
                    <div className="sp-tier-toggle">＋</div>
                  </div>
                </div>
                <div className="sp-tier-body">
                  <div className="sp-tier-body-inner-wrapper">
                    <div className="sp-tier-body-inner">
                    <ul className="sp-perk-list">
                      <li>Dedicated Instagram/LinkedIn Post</li>
                      <li>Access to Event Resume Book</li>
                      <li>Dedicated Instagram Story</li>
                      <li>Compiled Instagram Post / Reel</li>
                      <li>Mention on MLSA SRM Website</li>
                      <li>Offline Merchandise Distribution</li>
                    </ul>
                    <div className="sp-tier-side">
                      <div>
                        <div className="sp-tier-scope-label">Investment</div>
                        <div className="sp-tier-scope-val">₹10,000</div>
                      </div>
                      <a href="#contact-cta" className="sp-tier-apply">request package</a>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={4}>
              <div className="sp-tier-row sp-tier-silver" data-open={openTiers['silver']}>
                <div className="sp-tier-head" onClick={() => toggleTier('silver')} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleTier('silver')}>
                  <div className="sp-tier-flag sp-flag-silver"></div>
                  <div className="sp-tier-index">Tier 3</div>
                  <div className="sp-tier-main">
                    <div className="sp-tier-info">
                      <div className="sp-tier-title-block">
                        <span className="sp-tier-name sp-tn-silver">SILVER</span>
                      </div>
                      <div className="sp-tier-oneliner">Standard digital presence.</div>
                    </div>
                    <div className="sp-tier-toggle">＋</div>
                  </div>
                </div>
                <div className="sp-tier-body">
                  <div className="sp-tier-body-inner-wrapper">
                    <div className="sp-tier-body-inner">
                    <ul className="sp-perk-list">
                      <li>Dedicated Instagram Story</li>
                      <li>Compiled Instagram Post / Reel</li>
                      <li>Mention on MLSA SRM Website</li>
                      <li>Offline Merchandise Distribution</li>
                    </ul>
                    <div className="sp-tier-side">
                      <div>
                        <div className="sp-tier-scope-label">Investment</div>
                        <div className="sp-tier-scope-val">₹5,000</div>
                      </div>
                      <a href="#contact-cta" className="sp-tier-apply">request package</a>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={5}>
              <div className="sp-tier-row sp-tier-bronze" data-open={openTiers['bronze']}>
                <div className="sp-tier-head" onClick={() => toggleTier('bronze')} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleTier('bronze')}>
                  <div className="sp-tier-flag sp-flag-bronze"></div>
                  <div className="sp-tier-index">Tier 4</div>
                  <div className="sp-tier-main">
                    <div className="sp-tier-info">
                      <div className="sp-tier-title-block">
                        <span className="sp-tier-name sp-tn-bronze">BRONZE</span>
                      </div>
                      <div className="sp-tier-oneliner">Merch & goodie sponsorships.</div>
                    </div>
                    <div className="sp-tier-toggle">＋</div>
                  </div>
                </div>
                <div className="sp-tier-body">
                  <div className="sp-tier-body-inner-wrapper">
                    <div className="sp-tier-body-inner">
                    <ul className="sp-perk-list">
                      <li>Dedicated Instagram Story</li>
                      <li>Compiled Instagram Post / Reel</li>
                      <li>Mention on MLSA SRM Website</li>
                      <li>Offline Merchandise Distribution</li>
                    </ul>
                    <div className="sp-tier-side">
                      <div>
                        <div className="sp-tier-scope-label">Investment</div>
                        <div className="sp-tier-scope-val">Merch & Goodies</div>
                      </div>
                      <a href="#contact-cta" className="sp-tier-apply">request package</a>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <p className="sp-sec-p mt-4 text-sm italic">All tiers include offline merchandise distribution & mention on MSA SRM website.</p>
          </div>
        </section>

        {/* COMPARE */}
        <section id="compare" data-close="[EOF section::04]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[04] what you get</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Benefits at a Glance</h2></Reveal>
          <Reveal delay={2}>
            <div className="sp-table-scroll">
              <table className="sp-compare-table">
                <thead>
                  <tr>
                    <th>Deliverable</th>
                    <th className="col-p">Platinum</th>
                    <th className="col-g">Gold</th>
                    <th className="col-s">Silver</th>
                    <th className="col-b">Bronze</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="feat">Dedicated Stage Time (Workshop)</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Logo on Workshop Certificates</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Dedicated Instagram/LinkedIn Post</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Dedicated Instagram Story</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Compiled Instagram Post / Reel</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Mention on MLSA SRM Website</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Resume Book Access</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Offline Merchandise Distribution</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td></tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

                {/* ABOUT MSA + SRM */}
        <section id="about" data-close="[EOF section::05]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[05] about msa srm</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Microsoft Student Ambassadors, SRM</h2></Reveal>
          <Reveal delay={2}><p className="sp-sec-p">Microsoft Student Ambassadors SRM is a decade-old technical powerhouse at SRM Institute of Science and Technology (SRMIST). We ignite the spark in zealous, forward-thinking students engineering the next generation of innovators at one of India's most reputed universities. Through relentless workshops, technical talks, industry webinars, and large-scale events, we cultivate an ecosystem where bold ideas flourish.</p></Reveal>
          <Reveal delay={3}>
            <div className="sp-hero-meta" style={{ marginTop: '30px' }}>
              <div><div className="sp-hm-label">Legacy & Experience</div><div className="sp-hm-val">10<span className="unit">+ Years</span></div></div>
              <div><div className="sp-hm-label">Events Conducted</div><div className="sp-hm-val">30<span className="unit">+</span></div></div>
              <div><div className="sp-hm-label">Campus Reach</div><div className="sp-hm-val">50,000<span className="unit">+</span></div></div>
              <div><div className="sp-hm-label">Private Eng. Institute</div><div className="sp-hm-val">No. 1</div></div>
            </div>
          </Reveal>
        </section>
{/* PAST EVENTS */}
        <section id="events" data-close="[EOF section::06]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[06] highlights</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Past Events</h2></Reveal>
          <div className="sp-why-list">
            <Reveal delay={2}><div className="sp-why-row"><span className="sp-why-idx">—</span><span className="sp-why-name disp">Resonate 2.0</span><span className="sp-why-desc">Flagship annual hackathon</span></div></Reveal>
            <Reveal delay={3}><div className="sp-why-row"><span className="sp-why-idx">—</span><span className="sp-why-name disp">FUSE</span><span className="sp-why-desc">Figma User Experience Summit</span></div></Reveal>
            <Reveal delay={4}><div className="sp-why-row"><span className="sp-why-idx">—</span><span className="sp-why-name disp">MLSA Think Tank</span><span className="sp-why-desc">AI & ML ideation conclave</span></div></Reveal>
            <Reveal delay={5}><div className="sp-why-row"><span className="sp-why-idx">—</span><span className="sp-why-name disp">DevOps with Microsoft MVP</span><span className="sp-why-desc">Expert-led DevOps deep dive</span></div></Reveal>
            <Reveal delay={6}><div className="sp-why-row"><span className="sp-why-idx">—</span><span className="sp-why-name disp">Blockchain & Decentralised AI</span><span className="sp-why-desc">With Bitgrit</span></div></Reveal>
            <Reveal delay={7}><div className="sp-why-row"><span className="sp-why-idx">—</span><span className="sp-why-name disp">Ethical Hacking & App Security</span><span className="sp-why-desc">With Shrey Gupta</span></div></Reveal>
            <Reveal delay={8}><div className="sp-why-row"><span className="sp-why-idx">—</span><span className="sp-why-name disp">Personal Branding & Resume Building</span><span className="sp-why-desc">With Miri Rodriguez</span></div></Reveal>
            <Reveal delay={9}><div className="sp-why-row"><span className="sp-why-idx">—</span><span className="sp-why-name disp">MarketIN</span><span className="sp-why-desc">Marketing masterclass with Anita Tejwani</span></div></Reveal>
            <Reveal delay={10}><div className="sp-why-row"><span className="sp-why-idx">—</span><span className="sp-why-name disp">What The Web</span><span className="sp-why-desc">Web dev session with Akilesh Balachandder</span></div></Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" data-close="[EOF section::07]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[07] faq</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Answers before you ask.</h2></Reveal>
          <Reveal delay={2}>
            <div className="mt-8 flex flex-col">
              <FAQItem 
                question="Can this be in-kind instead of cash?" 
                answer="Yes. Cloud credits, hardware, API access, or swag can substitute part or all of a tier's cost — common at Gold and above."
              />
              <FAQItem 
                question="What's actually in the resume book?" 
                answer="Opt-in profiles from event participants — role interest, skills, resume link — compiled after major events."
              />
              <FAQItem 
                question="Can we sponsor a single event instead of the year?" 
                answer="That's exactly what Gold and Bronze are for. Platinum is the only tier tied to the full year by default."
              />
              <FAQItem 
                question="How fast can this go live?" 
                answer="Bronze and Silver applications are typically processed quickly. Gold and Platinum need lead time to align with a specific event on the calendar — earlier is better."
              />
            </div>
          </Reveal>
        </section>

        {/* FINAL */}
        <div className="sp-final" id="contact-cta">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[EOF] let's build together</div></Reveal>
          <Reveal delay={1}><h2 className="sp-final-h disp">Reach Out To Us</h2></Reveal>
          <Reveal delay={2}>
            <p className="sp-sec-p text-lg mb-6 max-w-2xl">
              We'd love to have you as part of our journey. Reach out today and let's create something extraordinary together for the next generation of innovators.
            </p>
          </Reveal>
          
          <Reveal delay={3}>
            <div className="flex flex-col gap-4 text-text-dim text-sm max-w-2xl mb-8 border border-white/10 bg-surface-1 p-6 rounded-2xl">
              <div><strong>Address:</strong> SRM Institute of Science and Technology, Kattankulathur, Tamil Nadu, India</div>
              <div>
                <strong>Contacts:</strong><br/>
                Yashasvi: <a href="tel:+919929170166" className="text-accent-blue hover:underline">+91 99291 70166</a><br/>
                Aniruddha: <a href="tel:+917980378474" className="text-accent-blue hover:underline">+91 79803 78474</a>
              </div>
              <div><strong>Website:</strong> <a href="https://mlsasrm.in" target="_blank" rel="noreferrer" className="text-accent-blue hover:underline">mlsasrm.in</a></div>
              <div><strong>Socials:</strong> <a href="https://instagram.com/mlsa.srm" target="_blank" rel="noreferrer" className="text-accent-blue hover:underline">@mlsa.srm (Insta)</a>, <a href="https://linkedin.com/company/mlsa-srm" target="_blank" rel="noreferrer" className="text-accent-blue hover:underline">@mlsa-srm (LinkedIn)</a></div>
            </div>
          </Reveal>
          
          <Reveal delay={4}>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:mlsasrm14@gmail.com?subject=Partner%20With%20Us" style={{ color: "#000" }} className="bg-white text-black font-semibold  py-3.5 px-6 rounded-2xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                Partner With Us →
              </a>
            </div>
          </Reveal>
        </div>

        <footer className="sp-footer">
          <span>MSA — Microsoft Student Ambassadors // SRMIST</span>
          <span>sponsors.msa · fy26-27 · last updated 2026-07</span>
        </footer>

      </main>
    </div>
  );
}
