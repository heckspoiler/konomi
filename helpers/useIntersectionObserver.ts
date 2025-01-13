'use client';

import { useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  sectionId: string;
  onIntersect?: (sectionId: string, isIntersecting: boolean) => void;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersectionObserver({
  sectionId,
  onIntersect,
  rootMargin = '-50% 0px -50% 0px',
  threshold = 0,
}: UseIntersectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (onIntersect) {
            onIntersect(sectionId, entry.isIntersecting);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [sectionId, onIntersect, rootMargin, threshold]);

  return ref;
}
