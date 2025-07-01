'use client';

import { Button, Card, Image } from '@mantine/core';
import Link from 'next/link';
import { DEFAULT_IMAGE_URL, getGenreLabel, getRegionLabel } from '@/constants';
import type { Artist } from '@/entities/artist';
import { useFollow } from '@/features/artist/hooks/useFollow';

type Props = {
  artist: Artist;
};

export function ArtistListCard({ artist }: Props) {
  const { handleFollow, isFollowing } = useFollow(artist.id);

  const imageUrl = artist.artistImageUrl ? artist.artistImageUrl : DEFAULT_IMAGE_URL;

  return (
    <Link href={`/artists/${artist.id}`}>
      <Card shadow="md" radius="md" withBorder>
        {/* アーティスト画像 */}
        <Card.Section h={180} className="bg-theme flex items-center justify-center">
          <Image src={imageUrl} alt={artist.artistName} h="100%" fit="contain" />
        </Card.Section>

        {/* アーティスト情報 */}
        <div className="p-2 grid h-full">
          <h3 className="font-bold text-text-black text-sm">{artist.artistName}</h3>
          <p className="text-xs text-text-gray">
            {getGenreLabel(artist.genre)} • {getRegionLabel(artist.region)}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-gray">{artist.followers.length}人が推しに登録</p>
            {
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
            }
          </div>
        </div>
      </Card>
    </Link>
  );
}
