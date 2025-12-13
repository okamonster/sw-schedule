import type { Event } from '@repo/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import { searchEvents } from '@/service/event';

export const useEvents = (
  keyword = '',
  sort = 'eventDate',
  order = 'desc',
  limit = 10
): {
  events: Event[];
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
} => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['events', keyword, sort, order, limit],
      initialPageParam: 0,
      queryFn: ({ pageParam }) => searchEvents(keyword, sort, order, limit, pageParam as number),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length < Number(limit) ? undefined : allPages.length * Number(limit),
    });

  const events = data?.pages.flat() ?? [];

  return {
    events,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
  };
};
