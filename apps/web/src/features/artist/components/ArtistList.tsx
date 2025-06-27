'use client';

import { ARTIST_LIMIT, ARTIST_SORT_ORDER } from '@/constants';
import { useArtists } from '@/features/artist/hooks/useArtists';
import { useInfiniteScroll } from '@/features/artist/hooks/useInfiniteScroll';
import { ArtistListCard } from './ArtistListCard';

type Props = {
  query?: string;
  sort?: string;
};

export const ArtistList = ({ query = '', sort = 'followers' }: Props) => {
  // 無限スクロール

  const { artists, fetchArtists, hasMore } = useArtists(
    query,
    sort,
    ARTIST_SORT_ORDER,
    ARTIST_LIMIT
  );

  const loaderRef = useInfiniteScroll({
    onIntersect: fetchArtists,
    enabled: hasMore,
  });
  return (
    <div className="grid gap-4">
      {artists.map((artist) => (
        <ArtistListCard key={artist.id} artist={artist} isFollowing={false} />
      ))}
      {hasMore && <div ref={loaderRef} />}
    </div>
  );
};
