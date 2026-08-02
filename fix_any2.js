import fs from 'fs';

let content = fs.readFileSync('src/components/TeamSection.tsx', 'utf8');

const interfaceDef = `
export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  img?: string;
  linkedin?: string;
  github?: string;
}
`;

content = content.replace('import teamData from "../data/team.json";', `import teamData from "../data/team.json";${interfaceDef}`);
content = content.replace('{ member: any, key?: any }', '{ member: TeamMember }');

fs.writeFileSync('src/components/TeamSection.tsx', content);

