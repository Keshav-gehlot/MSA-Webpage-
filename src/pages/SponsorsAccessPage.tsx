import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import './sponsors.css';

import { TiltCard } from '../components/TiltCard';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Check, Minus } from 'lucide-react';

const events = [
  'auth::session established',
  'sponsor::tier=platinum verified',
  'net::handshake ok 24ms',
  'db::query resumebook.select 12rows',
  'event::hackmsa registration +1',
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
  const cols = Array.from({ length: 3 }).map((_, c) => {
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
          <div className="sp-kicker">
            <span className="blink">●</span> STATUS: OPEN FOR PARTNERSHIP — FY 26/27
          </div>
          <h1 className="sp-hero-title disp">
            We don't do<br/>
            <span className="strike">brand exposure.</span><br/>
            We do <span className="mark">recruiting pipelines.</span>
          </h1>

          <div className="sp-hero-meta">
            <div><div className="sp-hm-label">Active members</div><div className="sp-hm-val">500<span className="unit">+</span></div></div>
            <div><div className="sp-hm-label">Events / year</div><div className="sp-hm-val">12<span className="unit">+</span></div></div>
            <div><div className="sp-hm-label">Avg. workshop attendance</div><div className="sp-hm-val">80<span className="unit">/event</span></div></div>
            <div><div className="sp-hm-label">Ambassador network</div><div className="sp-hm-val">98<span className="unit">countries</span></div></div>
          </div>
        </div>

        {/* WHY */}
        <section id="why" data-close="[EOF section::01]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[01] rationale</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Your logo on a banner does nothing. This does.</h2></Reveal>
          <Reveal delay={2}><p className="sp-sec-p">Three reasons sponsors renew year over year — not because it looks good, but because it converts.</p></Reveal>

          <div className="sp-why-list">
            <Reveal delay={3}>
              <div className="sp-why-row">
                <span className="sp-why-idx">[01]</span>
                <span className="sp-why-name disp">Pre-filtered talent</span>
                <span className="sp-why-desc">Every attendee opted into a security/dev-focused community. No cold outreach — they already showed up.</span>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <div className="sp-why-row">
                <span className="sp-why-idx">[02]</span>
                <span className="sp-why-name disp">Pipeline, not impressions</span>
                <span className="sp-why-desc">Resume books, hackathon judging seats, and direct workshop hosting put your team in the room, not on a slide.</span>
              </div>
            </Reveal>
            <Reveal delay={5}>
              <div className="sp-why-row">
                <span className="sp-why-idx">[03]</span>
                <span className="sp-why-name disp">Measured, not assumed</span>
                <span className="sp-why-desc">Every activation ships with a post-event report: attendance, engagement, resume submissions. No vague "reach" metrics.</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TIERS */}
        <section id="tiers" data-close="[EOF section::02]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[02] access levels</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Four tiers. Click to expand scope.</h2></Reveal>
          <Reveal delay={2}><p className="sp-sec-p">Ordered by depth of access, not price bracket. Platinum owns the room; Bronze gets you on record.</p></Reveal>

          <div className="sp-tier-stack">

            {/* PLATINUM */}
            <Reveal delay={3}>
              <TiltCard maxRotation={4} className="sp-tier-row bg-surface-1 border border-white/5 rounded-3xl overflow-hidden relative sp-tier-platinum" data-open={openTiers['platinum']}>
                <div className="sp-tier-head" onClick={() => toggleTier('platinum')} role="button" tabIndex={0} onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTier('platinum'); } }}>
                  <div className="sp-tier-flag sp-flag-platinum"></div>
                  <div className="sp-tier-index">01 / 04</div>
                  <div className="sp-tier-main">
                    <div className="sp-tier-title-block">
                      <span className="sp-tier-name sp-tn-platinum disp">PLATINUM</span>
                      <span className="sp-tier-code">tier::title-sponsor</span>
                    </div>
                    <span className="sp-tier-oneliner">Title sponsor of the flagship hackathon. Full-stack access.</span>
                    <span className="sp-tier-toggle">+</span>
                  </div>
                </div>
                <div className="sp-tier-body" style={{ maxHeight: openTiers['platinum'] ? '800px' : '0' }}>
                  <div className="sp-tier-body-inner">
                    <ul className="sp-perk-list">
                      <li>Title sponsor credit — "HackMSA, presented by [you]"</li>
                      <li>Logo on homepage hero + every event asset for the year</li>
                      <li>Dedicated recruiting booth, all flagship events</li>
                      <li>Keynote or judging panel seat</li>
                      <li>First access to opt-in resume book (pre-public release)</li>
                      <li>4x social spotlight + newsletter feature</li>
                      <li>Priority renewal for following year</li>
                    </ul>
                    <div className="sp-tier-side">
                      <div>
                        <div className="sp-tier-scope-label">Commitment</div>
                        <div className="sp-tier-scope-val">Full year</div>
                      </div>
                      <div>
                        <div className="sp-tier-scope-label">Slots available</div>
                        <div className="sp-tier-scope-val">1</div>
                      </div>
                      <a href="#contact-cta" className="sp-tier-apply">request package</a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* GOLD */}
            <Reveal delay={4}>
              <TiltCard maxRotation={4} className="sp-tier-row bg-surface-1 border border-white/5 rounded-3xl overflow-hidden relative sp-tier-gold" data-open={openTiers['gold']}>
                <div className="sp-tier-head" onClick={() => toggleTier('gold')} role="button" tabIndex={0} onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTier('gold'); } }}>
                  <div className="sp-tier-flag sp-flag-gold"></div>
                  <div className="sp-tier-index">02 / 04</div>
                  <div className="sp-tier-main">
                    <div className="sp-tier-title-block">
                      <span className="sp-tier-name sp-tn-gold disp">GOLD</span>
                      <span className="sp-tier-code">tier::co-sponsor</span>
                    </div>
                    <span className="sp-tier-oneliner">Co-sponsor one major event, with a hosting slot of your own.</span>
                    <span className="sp-tier-toggle">+</span>
                  </div>
                </div>
                <div className="sp-tier-body" style={{ maxHeight: openTiers['gold'] ? '800px' : '0' }}>
                  <div className="sp-tier-body-inner">
                    <ul className="sp-perk-list">
                      <li>Co-sponsor credit on one flagship event of your choice</li>
                      <li>Logo on event page + on-site signage</li>
                      <li>Workshop or tech-talk hosting slot</li>
                      <li>Resume book access (post-event release)</li>
                      <li>2x social spotlight</li>
                      <li>Booth space at your chosen event</li>
                    </ul>
                    <div className="sp-tier-side">
                      <div>
                        <div className="sp-tier-scope-label">Commitment</div>
                        <div className="sp-tier-scope-val">Per-event</div>
                      </div>
                      <div>
                        <div className="sp-tier-scope-label">Slots available</div>
                        <div className="sp-tier-scope-val">3</div>
                      </div>
                      <a href="#contact-cta" className="sp-tier-apply">request package</a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* SILVER */}
            <Reveal delay={5}>
              <TiltCard maxRotation={4} className="sp-tier-row bg-surface-1 border border-white/5 rounded-3xl overflow-hidden relative sp-tier-silver" data-open={openTiers['silver']}>
                <div className="sp-tier-head" onClick={() => toggleTier('silver')} role="button" tabIndex={0} onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTier('silver'); } }}>
                  <div className="sp-tier-flag sp-flag-silver"></div>
                  <div className="sp-tier-index">03 / 04</div>
                  <div className="sp-tier-main">
                    <div className="sp-tier-title-block">
                      <span className="sp-tier-name sp-tn-silver disp">SILVER</span>
                      <span className="sp-tier-code">tier::community</span>
                    </div>
                    <span className="sp-tier-oneliner">Steady visibility across our regular workshop cadence.</span>
                    <span className="sp-tier-toggle">+</span>
                  </div>
                </div>
                <div className="sp-tier-body" style={{ maxHeight: openTiers['silver'] ? '800px' : '0' }}>
                  <div className="sp-tier-body-inner">
                    <ul className="sp-perk-list">
                      <li>Logo on sponsors page + select workshop decks</li>
                      <li>Sponsor mention at 2+ workshops</li>
                      <li>1x social spotlight</li>
                      <li>Swag / branded material distribution rights</li>
                      <li>Invite to sponsor appreciation mixer</li>
                    </ul>
                    <div className="sp-tier-side">
                      <div>
                        <div className="sp-tier-scope-label">Commitment</div>
                        <div className="sp-tier-scope-val">Semester</div>
                      </div>
                      <div>
                        <div className="sp-tier-scope-label">Slots available</div>
                        <div className="sp-tier-scope-val">6</div>
                      </div>
                      <a href="#contact-cta" className="sp-tier-apply">request package</a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* BRONZE */}
            <Reveal delay={6}>
              <TiltCard maxRotation={4} className="sp-tier-row bg-surface-1 border border-white/5 rounded-3xl overflow-hidden relative sp-tier-bronze" data-open={openTiers['bronze']}>
                <div className="sp-tier-head" onClick={() => toggleTier('bronze')} role="button" tabIndex={0} onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTier('bronze'); } }}>
                  <div className="sp-tier-flag sp-flag-bronze"></div>
                  <div className="sp-tier-index">04 / 04</div>
                  <div className="sp-tier-main">
                    <div className="sp-tier-title-block">
                      <span className="sp-tier-name sp-tn-bronze disp">BRONZE</span>
                      <span className="sp-tier-code">tier::entry</span>
                    </div>
                    <span className="sp-tier-oneliner">On the record. Low commitment, real presence.</span>
                    <span className="sp-tier-toggle">+</span>
                  </div>
                </div>
                <div className="sp-tier-body" style={{ maxHeight: openTiers['bronze'] ? '800px' : '0' }}>
                  <div className="sp-tier-body-inner">
                    <ul className="sp-perk-list">
                      <li>Logo on sponsors page</li>
                      <li>Mention in one newsletter edition</li>
                      <li>Thank-you shoutout at one event</li>
                      <li>Access to Discord partner channel</li>
                    </ul>
                    <div className="sp-tier-side">
                      <div>
                        <div className="sp-tier-scope-label">Commitment</div>
                        <div className="sp-tier-scope-val">One-off</div>
                      </div>
                      <div>
                        <div className="sp-tier-scope-label">Slots available</div>
                        <div className="sp-tier-scope-val">Open</div>
                      </div>
                      <a href="#contact-cta" className="sp-tier-apply">request package</a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

          </div>
        </section>

        {/* COMPARE */}
        <section id="compare" data-close="[EOF section::03]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[03] diff view</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Tier comparison, flattened.</h2></Reveal>
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
                  <tr><td className="feat">Logo on site sponsors page</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Logo on homepage hero</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Event hosting / speaking slot</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Recruiting booth</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Resume book access</td><td className="yes col-p-cell">First</td><td className="yes">Post-event</td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Social media features</td><td className="yes col-p-cell">4x</td><td className="yes">2x</td><td className="yes">1x</td><td className="no"><Minus size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Newsletter mention</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Discord partner channel</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td></tr>
                  <tr><td className="feat">Commitment length</td><td className="yes col-p-cell">Full year</td><td className="yes">Per-event</td><td className="yes">Semester</td><td className="yes">One-off</td></tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* PROCESS */}
        <section id="process" data-close="[EOF section::04]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[04] onboarding</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Three steps. No deck required.</h2></Reveal>

          <div className="sp-proc-list">
            <Reveal delay={2}>
              <div className="sp-proc-item">
                <span className="sp-proc-num disp">01</span>
                <div>
                  <div className="sp-proc-name disp">Send goals, not a budget</div>
                  <div className="sp-proc-desc">Tell us what you're optimizing for — hiring, brand, product feedback. We map it to a tier, not the other way around.</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="sp-proc-item">
                <span className="sp-proc-num disp">02</span>
                <div>
                  <div className="sp-proc-name disp">We scope it in writing</div>
                  <div className="sp-proc-desc">A one-page agreement: deliverables, dates, and what "done" looks like. No ambiguity, no scope creep.</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <div className="sp-proc-item">
                <span className="sp-proc-num disp">03</span>
                <div>
                  <div className="sp-proc-name disp">Activation + report</div>
                  <div className="sp-proc-desc">We execute, then send a close-out report — attendance, engagement, resume submissions where applicable.</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" data-close="[EOF section::05]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[05] faq</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Answers before you ask.</h2></Reveal>
          <Reveal delay={2}>
            <div className="mt-8 flex flex-col">
              <FAQItem 
                question="Can this be in-kind instead of cash?" 
                answer="Yes. Cloud credits, hardware, API access, or swag can substitute part or all of a tier's cost — common at Gold and above."
              />
              <FAQItem 
                question="What's actually in the resume book?" 
                answer="Opt-in profiles from event participants — role interest, skills, resume link — compiled after major events. Platinum sees it first; Gold gets it post-release."
              />
              <FAQItem 
                question="Can we sponsor a single event instead of the year?" 
                answer="That's exactly what Gold and Bronze are for. Platinum is the only tier tied to the full year by default."
              />
              <FAQItem 
                question="How fast can this go live?" 
                answer="Bronze and Silver: under a week. Gold and Platinum need lead time to align with a specific event on the calendar — earlier is better."
              />
            </div>
          </Reveal>
        </section>

        {/* FINAL */}
        <div className="sp-final" id="contact-cta">
          <Reveal delay={0}><h2 className="sp-final-h disp">Stop reading. Start a thread.</h2></Reveal>
          <Reveal delay={1}>
            <div className="sp-final-cmd">
              <span className="prompt">$</span> mailto msa@srmist.edu.in --subject "sponsorship inquiry"<span className="blink">_</span>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="flex flex-wrap gap-4 mt-6">
              <a href="mailto:msa@srmist.edu.in?subject=Sponsorship%20Inquiry" className="bg-white text-black font-semibold py-3.5 px-6 rounded-2xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                email the team →
              </a>
              <a href="/#contact" className="bg-surface-1 border border-white/10 text-white font-semibold py-3.5 px-6 rounded-2xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                general contact form
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
