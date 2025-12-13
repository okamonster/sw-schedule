import type { Artist } from '@repo/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getArtistListByQuery } from '@/service/artist';

type UseArtistsReturn = {
  artists: Artist[];
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const useArtists = (
  query = '',
  sort = 'followers',
  order = 'desc',
  limit = 10
): UseArtistsReturn => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['artists', query, sort, order, limit],
      initialPageParam: 0,
      queryFn: ({ pageParam }) =>
        getArtistListByQuery(query, sort, order, limit, pageParam as number),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length < Number(limit) ? undefined : allPages.length * Number(limit),
    });

  const artists = data?.pages.flat() ?? [];

  return {
    artists,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
  };
};
