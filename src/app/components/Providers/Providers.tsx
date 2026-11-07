'use client';

import { MobileProvider } from '@contexts/MobileContext';
import { NowProvider } from '@contexts/NowContext';

export function Providers({
  children,
  renderedAt,
}: {
  children: React.ReactNode;
  renderedAt: number;
}) {
  return (
    <NowProvider renderedAt={renderedAt}>
      <MobileProvider>{children}</MobileProvider>
    </NowProvider>
  );
}
