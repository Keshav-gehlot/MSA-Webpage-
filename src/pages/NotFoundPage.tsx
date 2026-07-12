import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-canvas text-text-primary font-mono relative overflow-hidden flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center relative z-10 px-6 mt-16">
        <div className="max-w-xl w-full border border-white/10 bg-surface-1/50 backdrop-blur-sm p-12 text-center flex flex-col items-center">
          <Terminal className="w-12 h-12 text-accent-red mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-4 text-white">404</h1>
          <p className="text-text-muted mb-2 font-mono text-sm uppercase tracking-wider">Exception: Route Not Found</p>
          <p className="text-text-secondary mb-10 text-sm">
            The requested module could not be resolved. It may have been deprecated, moved, or deleted.
          </p>
          
          <Link 
            to="/" 
            className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide text-[#000000] transition-all bg-accent-green hover:bg-[#7dffb5] focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-base"
          >
            <span className="font-mono font-bold uppercase tracking-wider">Return to Base</span>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
