'use client';

import { useCallback, useEffect, useRef } from 'react';

type UseInfiniteScrollProps = {
  onIntersect: () => void;
  rootMargin?: string;
  enabled?: boolean;
};

export const useInfiniteScroll = ({
  onIntersect,
  rootMargin = '0px',
  enabled = true,
}: UseInfiniteScrollProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [onIntersect, rootMargin, enabled]);

  return setRef;
};
