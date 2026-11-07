/**
 * Breakpoints – keep in sync with the media queries in CSS
 * (see the design-system header in src/app/globals.css).
 *
 *   mobile   < 768px
 *   tablet   768px – 1079px
 *   desktop  ≥ 1080px
 */
export const BREAKPOINTS = {
  tablet: 768,
  desktop: 1080,
} as const;

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export const getBreakpoint = (width: number): Breakpoint => {
  if (width < BREAKPOINTS.tablet) return 'mobile';
  if (width < BREAKPOINTS.desktop) return 'tablet';
  return 'desktop';
};
