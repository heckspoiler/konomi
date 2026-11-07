'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Breakpoint, getBreakpoint } from '@helpers/breakpoints';

interface MobileContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export function MobileProvider({ children }: { children: React.ReactNode }) {
  // Server render assumes desktop; corrected right after mount.
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    // Only the category is stored, so resizing within a range doesn't re-render.
    const update = () => setBreakpoint(getBreakpoint(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const value = useMemo(
    () => ({
      isMobile: breakpoint === 'mobile',
      isTablet: breakpoint === 'tablet',
      isDesktop: breakpoint === 'desktop',
    }),
    [breakpoint],
  );

  return (
    <MobileContext.Provider value={value}>{children}</MobileContext.Provider>
  );
}

export function useMobile() {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error('useMobile must be used within a MobileProvider');
  }
  return context;
}
