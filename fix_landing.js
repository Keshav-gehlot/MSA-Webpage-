import fs from 'fs';

let content = fs.readFileSync('src/pages/LandingPage.tsx', 'utf8');
content = content.replace(
  "const JourneySection = React.lazy(() => import('../components/JourneySection').then(m => ({ default: m.JourneySection })));",
  "const CommunityImpactSection = React.lazy(() => import('../components/CommunityImpactSection').then(m => ({ default: m.CommunityImpactSection })));\nconst LearningHub = React.lazy(() => import('../components/LearningHub').then(m => ({ default: m.LearningHub })));"
);

content = content.replace(
  "<CommunityImpactSection />",
  "<CommunityImpactSection />\n          <LearningHub />"
);

fs.writeFileSync('src/pages/LandingPage.tsx', content);
