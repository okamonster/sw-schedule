'use client';
import { Card, Image } from '@mantine/core';
import Link from 'next/link';
import { DEFAULT_IMAGE_URL } from '@/constants';
import type { Artist } from '@/entities/artist';

type Props = {
  artist: Artist;
};

export const ArtistCard = ({ artist }: Props): React.ReactNode => {
  const imageUrl = artist.artistImageUrl ? artist.artistImageUrl : DEFAULT_IMAGE_URL;
  return (
    <Link href={`/artists/${artist.id}`}>
      <Card shadow="sm" padding="lg" radius="md" withBorder w={280} className="shrink-0">
        <Card.Section className="bg-theme h-[160px] bg-cover bg-center bg-opacity-10">
          <Image src={imageUrl} h="100%" alt={artist.artistName} fit="contain" />
        </Card.Section>

        <p className="text-md font-bold">{artist.artistName}</p>

        <p className="text-sm text-text-gray">{artist.followers.length}人が推しに登録中</p>
      </Card>
    </Link>
  );
};
