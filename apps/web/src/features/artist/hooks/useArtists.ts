import { useEffect, useState } from 'react';
import type { Artist } from '@/entities/artist';
import { getArtistListByQuery } from '@/service/artist';

export const useArtists = (
  query = '',
  sort = 'followers',
  order = 'desc',
  limit = 1
): {
  artists: Artist[];
  fetchArtists: () => Promise<void>;
  hasMore: boolean;
} => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // データ取得
  const fetchArtists = async () => {
    const data = await getArtistListByQuery(query, sort, order, limit, offset);

    setArtists((prev) => [...prev, ...data]);
    setHasMore(data.length === Number(limit));
    setOffset((prev) => prev + Number(limit));
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: フィルターが変更されたらリセット
  useEffect(() => {
    setArtists([]);
    setOffset(0);
    setHasMore(true);
  }, [query, sort, order, limit]);

  return { artists, fetchArtists, hasMore };
};
