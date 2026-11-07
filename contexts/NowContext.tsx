'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const NowContext = createContext<number | null>(null);

const ONE_MINUTE = 60 * 1000;

/**
 * Provides "now" for date-dependent UI (upcoming vs. past events).
 *
 * Pages are statically prerendered, so the server's clock is the build time.
 * We hydrate with that exact timestamp (no mismatch) and switch to the real
 * clock after mount, then tick every minute so events roll over on their own.
 */
export function NowProvider({
  renderedAt,
  children,
}: {
  renderedAt: number;
  children: React.ReactNode;
}) {
  const [now, setNow] = useState(renderedAt);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), ONE_MINUTE);
    return () => clearInterval(id);
  }, []);

  return <NowContext.Provider value={now}>{children}</NowContext.Provider>;
}

export function useNow() {
  const now = useContext(NowContext);
  if (now === null) {
    throw new Error('useNow must be used within a NowProvider');
  }
  return now;
}
