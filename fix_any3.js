import fs from 'fs';

let content = fs.readFileSync('src/components/WhyJoinSection.tsx', 'utf8');

const interfaces = `
import { MotionValue } from "motion/react";
import type { LucideIcon } from "lucide-react";

export interface StageData {
  id: string;
  title: string;
  icon: LucideIcon;
  statValue: number;
  statSuffix: string;
  statLabel: string;
  copy: string;
  color: string;
  rgb: string;
}

interface DesktopStageProps {
  stage: StageData;
  i: number;
  scrollYProgress: MotionValue<number>;
}

interface MobileStageProps {
  stage: StageData;
}

interface IconAnimatorProps {
  scrollYProgress: MotionValue<number> | null;
  start: number;
  Icon: LucideIcon;
  color: string;
}

interface StatCounterProps {
  scrollYProgress: MotionValue<number> | null;
  start: number;
  end: number;
  value: number;
  suffix: string;
  label: string;
  color: string;
  forceActive?: boolean;
}

interface BackgroundProps {
  washProgress: MotionValue<number>;
  stages: StageData[];
}

interface ProgressIndicatorProps {
  progress: MotionValue<number>;
}
`;

content = content.replace('import { useCountUp } from "../hooks/useCountUp";', `import { useCountUp } from "../hooks/useCountUp";${interfaces}`);

content = content.replace('function DesktopStageWrapper({ stage, i, scrollYProgress }: any)', 'function DesktopStageWrapper({ stage, i, scrollYProgress }: DesktopStageProps)');
content = content.replace('function MobileStage({ stage }: { stage: any, key?: any })', 'function MobileStage({ stage }: MobileStageProps)');
content = content.replace('function IconAnimator({ scrollYProgress, start, Icon, color }: any)', 'function IconAnimator({ scrollYProgress, start, Icon, color }: IconAnimatorProps)');
content = content.replace('function StatCounter({ scrollYProgress, start, end, value, suffix, label, color, forceActive = false }: any)', 'function StatCounter({ scrollYProgress, start, end, value, suffix, label, color, forceActive = false }: StatCounterProps)');
content = content.replace('function Background({ washProgress, stages }: any)', 'function Background({ washProgress, stages }: BackgroundProps)');
content = content.replace('function ProgressIndicator({ progress }: { progress: any })', 'function ProgressIndicator({ progress }: ProgressIndicatorProps)');

fs.writeFileSync('src/components/WhyJoinSection.tsx', content);

