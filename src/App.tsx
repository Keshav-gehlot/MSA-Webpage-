/** * @license * SPDX-License-Identifier: Apache-2.0 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import Lenis from 'lenis';
import { LandingPage } from './pages/LandingPage';
import { ScrollProgress } from './components/ScrollProgress';

// Lazy load heavy routes
const SponsorsAccessPage = React.lazy(() => import('./pages/SponsorsAccessPage').then(module => ({ default: module.SponsorsAccessPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-canvas flex items-center justify-center text-accent-green font-mono text-sm">
    <span className="animate-pulse">Loading modules...</span>
  </div>
);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollProgress />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sponsors" element={<SponsorsAccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
