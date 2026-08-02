import fs from 'fs';

let content = fs.readFileSync('src/components/WhyJoinSection.tsx', 'utf8');
content = content.replace(
  'const pathLength = useTransform(scrollYProgress, [start, start + 0.15], [0, 1]);',
  'const dummyMotionValue = useMotionValue(0);\n  const pathLength = useTransform(scrollYProgress || dummyMotionValue, [start, start + 0.15], [0, 1]);'
);

fs.writeFileSync('src/components/WhyJoinSection.tsx', content);
