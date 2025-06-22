'use client';
import { Card, Image, Skeleton } from '@mantine/core';

type Props = {
  imageUrl: string;
  artistName: string;
  followersCount: number;
};

export const ArtistCard = ({ imageUrl, artistName, followersCount }: Props): React.ReactNode => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w={280} className="shrink-0">
      <Card.Section className="bg-theme h-[160px] bg-cover bg-center bg-opacity-10">
        {imageUrl ? (
          <Image src={imageUrl} h="100%" alt={artistName} fit="contain" />
        ) : (
          <Skeleton height="100%" />
        )}
      </Card.Section>

      <p className="text-md font-bold">{artistName}</p>

      <p className="text-sm text-text-gray">フォロワー: {followersCount.toLocaleString()}人</p>
    </Card>
  );
};
