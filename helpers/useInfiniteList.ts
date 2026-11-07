'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

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
  useEffect(() => {
    if (!storageKey) return;
    const saved = readState(storageKey);
    if (!saved) return;
    setCount(saved.count);
    pendingScroll.current = saved.scrollY;
  }, [storageKey]);

  useEffect(() => {
    if (pendingScroll.current === null) return;
    window.scrollTo({ top: pendingScroll.current, behavior: 'instant' });
    pendingScroll.current = null;
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
