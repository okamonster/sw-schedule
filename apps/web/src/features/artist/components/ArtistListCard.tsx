'use client';

import { Button, Card, Image, Skeleton } from '@mantine/core';
import Link from 'next/link';
import { getGenreLabel, getRegionLabel } from '@/constants';
import type { Artist } from '@/entities/artist';
import { useFollow } from '@/features/artist/hooks/useFollow';

type Props = {
  artist: Artist;
  isFollowing: boolean;
};

export function ArtistListCard({ artist }: Props) {
  const { handleFollow, isFollowing } = useFollow(artist.id);

  return (
    <Link href={`/artists/${artist.id}`}>
      <Card shadow="md" radius="md" withBorder>
        {/* アーティスト画像 */}
        <Card.Section h={180} className="bg-theme flex items-center justify-center">
          {artist.artistImageUrl ? (
            <Image src={artist.artistImageUrl} alt={artist.artistName} h="100%" fit="contain" />
          ) : (
            <Skeleton height={180} />
          )}
        </Card.Section>

        {/* アーティスト情報 */}
        <div className="p-2 grid h-full">
          <h3 className="font-bold text-text-black text-sm">{artist.artistName}</h3>
          <p className="text-xs text-text-gray">
            {getGenreLabel(artist.genre)} • {getRegionLabel(artist.region)}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-gray">{artist.followers.length}人が推しに登録</p>
            <Button
              type="button"
              color="var(--color-button-primary)"
              onClick={async (e) => {
                e.preventDefault();
                await handleFollow();
              }}
              variant={isFollowing ? 'outline' : 'filled'}
              radius="lg"
            >
              {isFollowing ? '推しに登録済み' : '推しに追加'}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
