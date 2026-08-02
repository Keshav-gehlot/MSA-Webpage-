import { HelmetProvider } from 'react-helmet-async';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface AppProvidersProps {
  children: ReactNode;
}

import type { FallbackProps } from "react-error-boundary";
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="p-8 text-center bg-canvas min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl text-red-500 font-bold mb-4">Something went wrong</h2>
      <pre className="text-red-400 bg-black/50 p-4 rounded mb-4 overflow-auto max-w-full">
        {error instanceof Error ? error.message : String(error)}
      </pre>
      <button 
        onClick={resetErrorBoundary}
        className="px-6 py-2 bg-accent-blue text-black rounded font-medium hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
      >
        Try again
      </button>
    </div>
  );
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        {children}
      </HelmetProvider>
    </ErrorBoundary>
  );
}
