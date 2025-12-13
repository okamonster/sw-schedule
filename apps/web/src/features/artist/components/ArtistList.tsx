'use client';

import { ARTIST_LIMIT, ARTIST_SORT_ORDER } from '@/constants';
import { useArtists } from '@/features/artist/hooks/useArtists';
import { useFollowList } from '@/features/artist/hooks/useFollowList';
import { useInfiniteScroll } from '@/features/artist/hooks/useInfiniteScroll';
import { ArtistListCard } from './ArtistListCard';
import { FollowLimitInfo } from './FollowLimitInfo';

type Props = {
  query?: string;
  sort?: string;
};

export const ArtistList = ({ query = '', sort = 'followers' }: Props) => {
  // 無限スクロール
  const { artists, fetchNextPage, hasNextPage } = useArtists(
    query,
    sort,
    ARTIST_SORT_ORDER,
    ARTIST_LIMIT
  );

  const loaderRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  // フォロー機能
  const { followingStates, loadingStates, handleFollow, canFollow, followLimit } =
    useFollowList(artists);

  return (
    <div className="grid gap-4">
      {followLimit && (
        <FollowLimitInfo
          currentCount={followLimit.currentCount}
          maxCount={followLimit.maxCount}
          canFollow={followLimit.canFollow}
        />
      )}
      {artists.map((artist) => (
        <ArtistListCard
          key={artist.id}
          artist={artist}
          isFollowing={followingStates[artist.id] || false}
          handleFollow={() => handleFollow(artist.id)}
          canFollow={canFollow}
          isLoading={loadingStates[artist.id] || false}
        />
      ))}
      {hasNextPage && <div ref={loaderRef} />}
    </div>
  );
};
