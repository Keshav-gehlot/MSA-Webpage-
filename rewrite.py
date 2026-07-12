import re

with open('src/pages/SponsorsAccessPage.tsx', 'r') as f:
    content = f.read()

# We will construct the new main content body and replace everything inside <main> ... </main>
# Oh wait, we already updated the Hero, so we can keep the Hero and just replace from {/* WHY */} downwards.

new_sections = """
        {/* ABOUT US */}
        <section id="about" data-close="[EOF section::01]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[01] about us</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Microsoft Student Ambassadors, SRM</h2></Reveal>
          <Reveal delay={2}><p className="sp-sec-p">Microsoft Student Ambassadors SRM is a decade-old technical powerhouse, proudly led under the Microsoft Student Ambassadors banner. We ignite the spark in zealous, forward-thinking students engineering the next generation of innovators at one of India's most reputed universities. Through relentless workshops, technical talks, industry webinars, and large-scale events, we cultivate an ecosystem where bold ideas flourish. Our community of builders, creators, and problem-solvers carries forward a legacy that defines excellence at SRMIST.</p></Reveal>
          <Reveal delay={3}>
            <div className="sp-hero-meta" style={{ marginTop: '30px' }}>
              <div><div className="sp-hm-label">Legacy and Experience</div><div className="sp-hm-val">10<span className="unit">+ Years</span></div></div>
              <div><div className="sp-hm-label">Events Conducted</div><div className="sp-hm-val">30<span className="unit">+</span></div></div>
              <div><div className="sp-hm-label">Campus Reach</div><div className="sp-hm-val">50000<span className="unit">+</span></div></div>
              <div><div className="sp-hm-label">Private Eng. Institute</div><div className="sp-hm-val">No. 1</div></div>
            </div>
          </Reveal>
        </section>

        {/* OUR INSTITUTION */}
        <section id="institution" data-close="[EOF section::02]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[02] our institution</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">About SRM Institute of Science and Technology</h2></Reveal>
          <Reveal delay={2}>
            <ul className="sp-sec-p list-disc ml-6 mt-4 flex flex-col gap-2">
              <li>SRMIST (formerly SRM University), one of India's most prestigious private institutions</li>
              <li>Located in Kattankulathur, Tamil Nadu — a hub of academic and technical excellence</li>
              <li>Ranked No. 1 in the Top 50 Private Engineering Institutes in India by leading education portals</li>
              <li>Diverse campus hosting Engineering, Humanities, Science, Arts, and Medical disciplines</li>
            </ul>
          </Reveal>
          <Reveal delay={3}>
            <div className="sp-hero-meta" style={{ marginTop: '30px' }}>
              <div><div className="sp-hm-label">Domestic Students</div><div className="sp-hm-val">38,000<span className="unit">+</span></div></div>
              <div><div className="sp-hm-label">International Students</div><div className="sp-hm-val">10,000<span className="unit">+</span></div></div>
              <div><div className="sp-hm-label">Top 50 Private Eng.</div><div className="sp-hm-val">#1</div></div>
              <div><div className="sp-hm-label">Schools</div><div className="sp-hm-val">5<span className="unit">+</span></div></div>
            </div>
          </Reveal>
        </section>

        {/* PAST EVENTS */}
        <section id="events" data-close="[EOF section::03]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[03] highlights</div></Reveal>
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

        {/* WHY SPONSOR */}
        <section id="why" data-close="[EOF section::04]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[04] why sponsor</div></Reveal>
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
        <section id="past-sponsors" data-close="[EOF section::05]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[05] trust & credibility</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Past Sponsors</h2></Reveal>
          <Reveal delay={2}>
            <div className="sp-sponsor-wall">
              <div className="sp-sponsor-chip"><img src="/sponsors/github.svg" alt="GitHub" /></div>
              <div className="sp-sponsor-chip"><img src="/sponsors/microsoft.svg" alt="Microsoft" /></div>
              <div className="sp-sponsor-chip"><img src="/sponsors/hackerearth.svg" alt="HackerEarth" /></div>
              <div className="sp-sponsor-chip"><img src="/sponsors/azure.svg" alt="Azure" /></div>
              <div className="sp-sponsor-chip">Zebronics</div>
              <div className="sp-sponsor-chip">Bitgrit</div>
              <div className="sp-sponsor-chip">Bewakoof</div>
              <div className="sp-sponsor-chip">The Souled Store</div>
              <div className="sp-sponsor-chip">Subway</div>
              <div className="sp-sponsor-chip">Monster Energy</div>
              <div className="sp-sponsor-chip">Roll Over Ice Creams</div>
              <div className="sp-sponsor-chip">Sunschool</div>
              <div className="sp-sponsor-chip">Forech</div>
              <div className="sp-sponsor-chip">Streams</div>
              <div className="sp-sponsor-chip">Rock N Roll Café</div>
              <div className="sp-sponsor-chip">.xyz</div>
              <div className="sp-sponsor-chip">CodeSizzler</div>
              <div className="sp-sponsor-chip">Altruisty</div>
              <div className="sp-sponsor-chip">Interview Cake</div>
            </div>
            <p className="sp-sec-p mt-8 text-sm italic">...and many more valued partners across technology, lifestyle, and education.</p>
          </Reveal>
        </section>

        {/* TIERS */}
        <section id="tiers" data-close="[EOF section::06]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[06] investment tiers</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Sponsorship Opportunities</h2></Reveal>
          
          <div className="mt-8 flex flex-col gap-4">
            <Reveal delay={2}>
              <TiltCard className="sp-tier-row sp-tier-platinum" data-open={openTiers['platinum']}>
                <div className="sp-tier-head" onClick={() => toggleTier('platinum')} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleTier('platinum')}>
                  <div className="sp-tier-flag sp-flag-platinum"></div>
                  <div className="sp-tier-index">Tier 1</div>
                  <div className="sp-tier-main">
                    <div className="sp-tier-title-block">
                      <span className="sp-tier-name sp-tn-platinum">PLATINUM ⭐</span>
                    </div>
                    <div className="sp-tier-oneliner hidden md:block">Top-tier exposure and workshop integration.</div>
                    <div className="sp-tier-toggle">＋</div>
                  </div>
                </div>
                <div className="sp-tier-body" style={{ maxHeight: openTiers['platinum'] ? '800px' : '0' }}>
                  <div className="sp-tier-body-inner">
                    <ul className="sp-perk-list">
                      <li>Dedicated Stage Time (Workshop)</li>
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
              </TiltCard>
            </Reveal>

            <Reveal delay={3}>
              <TiltCard className="sp-tier-row sp-tier-gold" data-open={openTiers['gold']}>
                <div className="sp-tier-head" onClick={() => toggleTier('gold')} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleTier('gold')}>
                  <div className="sp-tier-flag sp-flag-gold"></div>
                  <div className="sp-tier-index">Tier 2</div>
                  <div className="sp-tier-main">
                    <div className="sp-tier-title-block">
                      <span className="sp-tier-name sp-tn-gold">GOLD</span>
                    </div>
                    <div className="sp-tier-oneliner hidden md:block">High visibility and dedicated social reach.</div>
                    <div className="sp-tier-toggle">＋</div>
                  </div>
                </div>
                <div className="sp-tier-body" style={{ maxHeight: openTiers['gold'] ? '800px' : '0' }}>
                  <div className="sp-tier-body-inner">
                    <ul className="sp-perk-list">
                      <li>Dedicated Instagram/LinkedIn Post</li>
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
              </TiltCard>
            </Reveal>

            <Reveal delay={4}>
              <TiltCard className="sp-tier-row sp-tier-silver" data-open={openTiers['silver']}>
                <div className="sp-tier-head" onClick={() => toggleTier('silver')} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleTier('silver')}>
                  <div className="sp-tier-flag sp-flag-silver"></div>
                  <div className="sp-tier-index">Tier 3</div>
                  <div className="sp-tier-main">
                    <div className="sp-tier-title-block">
                      <span className="sp-tier-name sp-tn-silver">SILVER</span>
                    </div>
                    <div className="sp-tier-oneliner hidden md:block">Standard digital presence.</div>
                    <div className="sp-tier-toggle">＋</div>
                  </div>
                </div>
                <div className="sp-tier-body" style={{ maxHeight: openTiers['silver'] ? '800px' : '0' }}>
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
              </TiltCard>
            </Reveal>

            <Reveal delay={5}>
              <TiltCard className="sp-tier-row sp-tier-bronze" data-open={openTiers['bronze']}>
                <div className="sp-tier-head" onClick={() => toggleTier('bronze')} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleTier('bronze')}>
                  <div className="sp-tier-flag sp-flag-bronze"></div>
                  <div className="sp-tier-index">Tier 4</div>
                  <div className="sp-tier-main">
                    <div className="sp-tier-title-block">
                      <span className="sp-tier-name sp-tn-bronze">BRONZE</span>
                    </div>
                    <div className="sp-tier-oneliner hidden md:block">Merch & goodie sponsorships.</div>
                    <div className="sp-tier-toggle">＋</div>
                  </div>
                </div>
                <div className="sp-tier-body" style={{ maxHeight: openTiers['bronze'] ? '800px' : '0' }}>
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
              </TiltCard>
            </Reveal>
            <p className="sp-sec-p mt-4 text-sm italic">All tiers include offline merchandise distribution & mention on MSA SRM website.</p>
          </div>
        </section>

        {/* COMPARE */}
        <section id="compare" data-close="[EOF section::07]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[07] what you get</div></Reveal>
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
                  <tr><td className="feat">Offline Merchandise Distribution</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td></tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" data-close="[EOF section::08]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[08] faq</div></Reveal>
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
            <div className="flex flex-col gap-4 text-color-text-dim text-sm max-w-2xl mb-8 border border-white/10 bg-surface-1 p-6 rounded-2xl">
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
              <a href="mailto:mlsasrm14@gmail.com?subject=Partner%20With%20Us" className="bg-white text-black font-semibold py-3.5 px-6 rounded-2xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                Partner With Us →
              </a>
            </div>
          </Reveal>
        </div>
"""

start_idx = content.find('{/* WHY */}')
end_idx = content.find('<footer className="sp-footer">')

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_sections + '\n        ' + content[end_idx:]
    with open('src/pages/SponsorsAccessPage.tsx', 'w') as f:
        f.write(new_content)
    print("Replaced sections successfully")
else:
    print("Could not find boundaries")
