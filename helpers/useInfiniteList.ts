'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type Options = {
  /** Items rendered initially and added per batch. */
  batchSize?: number;
  /** Start loading the next batch this far before the end of the list. */
  rootMargin?: string;
  /**
   * When set, `saveState()` remembers how far the list was expanded and the
   * scroll position, and the next mount restores both (e.g. after "back").
   */
  storageKey?: string;
  /** Changing this resets the list to the first batch (filters, search…). */
  resetKey?: string;
};

type SavedState = { count: number; scrollY: number; savedAt: number };

/** Saved positions older than this are ignored. */
const RESTORE_WINDOW_MS = 30 * 60 * 1000;

/**
 * The site uses `scroll-behavior: smooth`. While a restore is pending, the
 * browser's own back-navigation scroll and ours must be instant, otherwise
 * they animate against each other.
 */
const setInstantScroll = (instant: boolean) => {
  document.documentElement.style.scrollBehavior = instant ? 'auto' : '';
};

const readState = (key: string): SavedState | null => {
  try {
    const raw = sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
    const state = raw ? (JSON.parse(raw) as SavedState) : null;
    return state && Date.now() - state.savedAt < RESTORE_WINDOW_MS
      ? state
      : null;
  } catch {
    return null;
  }
};

/**
 * Renders a long list in batches and loads the next batch automatically when
 * the sentinel element scrolls into view.
 */
export function useInfiniteList<T>(
  items: T[],
  {
    batchSize = 20,
    rootMargin = '600px',
    storageKey,
    resetKey = '',
  }: Options = {},
) {
  const [count, setCount] = useState(batchSize);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef<number | null>(null);
  const hasMore = count < items.length;

  // Restore after "back": expand the list first, then scroll once rendered.
  // A layout effect, so the expanded list renders before the first paint.
  useLayoutEffect(() => {
    if (!storageKey) return;
    const saved = readState(storageKey);
    if (!saved) {
      setInstantScroll(false);
      return;
    }
    setCount(saved.count);
    pendingScroll.current = saved.scrollY;
  }, [storageKey]);

  // Runs before paint so the restored position shows without a visible jump.
  useLayoutEffect(() => {
    if (pendingScroll.current === null) return;
    window.scrollTo(0, pendingScroll.current);
    pendingScroll.current = null;
    // Re-enable smooth scrolling once the browser has settled. Not cancelled
    // on re-render: the next batch often loads right after restoring.
    requestAnimationFrame(() => setInstantScroll(false));
  }, [count]);

  // New filters/search start from the top of the list again.
  const isFirstReset = useRef(true);
  useEffect(() => {
    if (isFirstReset.current) {
      isFirstReset.current = false;
      return;
    }
    setCount(batchSize);
  }, [resetKey, batchSize]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCount((current) => current + batchSize);
        }
      },
      { rootMargin },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, batchSize, rootMargin, count]);

  const saveState = useCallback(() => {
    if (!storageKey) return;
    try {
      const state: SavedState = {
        count,
        scrollY: window.scrollY,
        savedAt: Date.now(),
      };
      sessionStorage.setItem(storageKey, JSON.stringify(state));
      setInstantScroll(true);
    } catch {
      // Storage unavailable (private mode etc.) – restoring is optional.
    }
  }, [storageKey, count]);

  return {
    visibleItems: items.slice(0, count),
    hasMore,
    sentinelRef,
    saveState,
  };
}
