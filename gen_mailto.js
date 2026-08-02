const tiers = [
  { 
    tier: "Platinum", 
    price: "₹15,000+", 
    slotNote: "We know Platinum is a single-slot tier — happy to move quickly if there's a live opportunity." 
  },
  { 
    tier: "Gold", 
    price: "₹10,000", 
    slotNote: "Let us know current availability and turnaround for onboarding." 
  },
  { 
    tier: "Silver", 
    price: "₹5,000", 
    slotNote: "Let us know current availability and turnaround for onboarding." 
  },
  { 
    tier: "Bronze", 
    price: "Merch & Goodies", 
    slotNote: "Let us know current availability and turnaround for onboarding." 
  }
];

tiers.forEach(t => {
  const subject = `Sponsorship Request — ${t.tier} Tier`;
  const body = `Hi MSA SRM team,\n\n[Company Name] here — we're interested in the ${t.tier} sponsorship package (${t.price}).\n\nA bit about us: [one line on what you do / why you're reaching out]\n\n${t.slotNote}\n\nPoint of contact: [Your Name], [Role], [Phone/Email]\n\nLooking forward to hearing back.\n\nThanks,\n[Your Name]`;
  console.log(`--- ${t.tier} ---`);
  console.log(`mailto:mlsasrm14@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
});

const generalSubject = "Partner With Us";
const generalBody = `Hi MSA SRM team,\n\n[Company Name] here — we'd like to explore partnering with MSA SRM.\n\nA bit about us: [one line on what you do / why you're reaching out]\n\nNot sure yet which tier fits best — happy to talk through options.\n\nPoint of contact: [Your Name], [Role], [Phone/Email]\n\nLooking forward to hearing back.\n\nThanks,\n[Your Name]`;
console.log(`--- General ---`);
console.log(`mailto:mlsasrm14@gmail.com?subject=${encodeURIComponent(generalSubject)}&body=${encodeURIComponent(generalBody)}`);
