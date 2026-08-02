import fs from 'fs';

let content = fs.readFileSync('src/providers/AppProviders.tsx', 'utf8');

content = content.replace('function ErrorFallback({ error, resetErrorBoundary }: any) {', `import type { FallbackProps } from "react-error-boundary";
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {`);

fs.writeFileSync('src/providers/AppProviders.tsx', content);
