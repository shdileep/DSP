import { useState, useEffect } from 'react';

export type LayoutType = 'original' | 'dashboard' | 'executive' | 'research' | 'product';

// Initialize from localStorage or default to 'original'
const getInitialLayout = (): LayoutType => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('activeLayout') as LayoutType;
    if (saved && ['original', 'dashboard', 'executive', 'research', 'product'].includes(saved)) {
      return saved;
    }
  }
  return 'original';
};

let currentLayout: LayoutType = getInitialLayout();
const listeners = new Set<(layout: LayoutType) => void>();

export const layoutStore = {
  getLayout() {
    return currentLayout;
  },
  setLayout(layout: LayoutType) {
    if (currentLayout !== layout) {
      currentLayout = layout;
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeLayout', layout);
      }
      listeners.forEach(listener => listener(currentLayout));
    }
  },
  subscribe(listener: (layout: LayoutType) => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};

export function useLayout() {
  const [layout, setLayoutState] = useState<LayoutType>(currentLayout);

  useEffect(() => {
    // Sync initial state just in case
    setLayoutState(currentLayout);
    return layoutStore.subscribe(newLayout => {
      setLayoutState(newLayout);
    });
  }, []);

  return [layout, layoutStore.setLayout] as const;
}
