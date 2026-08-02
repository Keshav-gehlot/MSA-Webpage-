import { useState, useEffect } from 'react';

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const hasVisited = localStorage.getItem('mlsa-visited');
      
      if (!hasVisited && !prefersReducedMotion) {
        setIsFirstVisit(true);
        localStorage.setItem('mlsa-visited', 'true');
      }
      setIsLoading(false);
    }
  }, []);

  return { isFirstVisit, isLoading };
}
