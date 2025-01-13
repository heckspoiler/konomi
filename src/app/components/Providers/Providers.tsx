'use client';

import { MobileProvider } from '../../../../contexts/MobileContext';
import { ActiveSectionProvider } from '../../../../contexts/ActiveSectionContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <MobileProvider>{children}</MobileProvider>;
}
