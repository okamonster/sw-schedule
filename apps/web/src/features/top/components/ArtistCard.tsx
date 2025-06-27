'use client';
import { Card, Image, Skeleton } from '@mantine/core';
import Link from 'next/link';
import type { Artist } from '@/entities/artist';

type Props = {
  artist: Artist;
};

export const ArtistCard = ({ artist }: Props): React.ReactNode => {
  return (
    <Link href={`/artists/${artist.id}`}>
      <Card shadow="sm" padding="lg" radius="md" withBorder w={280} className="shrink-0">
        <Card.Section className="bg-theme h-[160px] bg-cover bg-center bg-opacity-10">
          {artist.artistImageUrl ? (
            <Image src={artist.artistImageUrl} h="100%" alt={artist.artistName} fit="contain" />
          ) : (
            <Skeleton height="100%" />
          )}
        </Card.Section>

        <p className="text-md font-bold">{artist.artistName}</p>

        <p className="text-sm text-text-gray">フォロワー: {100}人</p>
      </Card>
    </Link>
  );
};
