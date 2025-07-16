'use client';

import { useEffect } from 'react';
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

  // フォロー機能
  const {
    followingStates,
    loadingStates,
    fetchFollowStates,
    handleFollow,
    canFollow,
    followLimit,
  } = useFollowList();

  // アーティストが更新されたらフォロー状態を取得
  useEffect(() => {
    if (artists.length > 0) {
      fetchFollowStates(artists);
    }
  }, [artists, fetchFollowStates]);

  return (
    <div className="grid gap-4">
      {followLimit && (
        <FollowLimitInfo
          currentCount={followLimit.currentCount}
          maxCount={followLimit.maxCount}
          canFollow={followLimit.canFollow}
        />
      )}
      {Array.from(new Map(artists.map((artist) => [artist.id, artist])).values()).map((artist) => (
        <ArtistListCard
          key={artist.id}
          artist={artist}
          isFollowing={followingStates[artist.id] || false}
          handleFollow={() => handleFollow(artist.id)}
          canFollow={canFollow}
          isLoading={loadingStates[artist.id] || false}
        />
      ))}
      {hasMore && <div ref={loaderRef} />}
    </div>
  );
};
