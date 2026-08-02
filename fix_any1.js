import fs from 'fs';

let content = fs.readFileSync('src/components/ProjectsSection.tsx', 'utf8');

// Define interface
const interfaceDef = `
export interface ProjectData {
  title: string;
  desc: string;
  bullets?: string[];
  tech: string;
  repo: string;
  archived?: boolean;
}
`;

content = content.replace('import { memo, useState, useEffect } from "react";', `import { memo, useState, useEffect } from "react";${interfaceDef}`);
content = content.replace('{ project: any, i: number }', '{ project: ProjectData, i: number }');

fs.writeFileSync('src/components/ProjectsSection.tsx', content);

