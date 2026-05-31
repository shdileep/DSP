import { useState, useEffect } from 'react';

// Read initial state from localStorage or default to false
const getInitialMode = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('advancedMode');
    return saved === 'true';
  }
  return false;
};

let advancedMode = getInitialMode();
const listeners = new Set<(mode: boolean) => void>();

export const portfolioTransformer = {
  isAdvanced() {
    return advancedMode;
  },
  setAdvanced(mode: boolean) {
    if (advancedMode !== mode) {
      advancedMode = mode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('advancedMode', String(mode));
      }
      listeners.forEach(listener => listener(advancedMode));
    }
  },
  toggle() {
    this.setAdvanced(!advancedMode);
  },
  subscribe(listener: (mode: boolean) => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};

export function usePortfolioTransformer() {
  const [isAdvanced, setIsAdvanced] = useState(advancedMode);

  useEffect(() => {
    setIsAdvanced(advancedMode);
    return portfolioTransformer.subscribe(newMode => {
      setIsAdvanced(newMode);
    });
  }, []);

  return [isAdvanced, portfolioTransformer.toggle.bind(portfolioTransformer)] as const;
}
