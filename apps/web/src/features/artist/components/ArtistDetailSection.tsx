'use client';

import { Badge, Button, Divider } from '@mantine/core';
import type React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { LinkButton } from '@/components/Buttons/LinkButton';
import { getGenreLabel, getRegionLabel } from '@/constants';
import type { Artist } from '@/entities/artist';
import type { User } from '@/entities/user';
import { useFollow } from '@/features/artist/hooks/useFollow';

type Props = {
  artist: Artist;
  user: User | null;
};

export const ArtistDetailSection = ({ artist, user }: Props): React.ReactNode => {
  const { handleFollow, isFollowing } = useFollow(artist.id);
  return (
    <div className="grid gap-4">
      <div className="flex gap-2">
        <Badge color="var(--color-button-primary)">{getGenreLabel(artist.genre)}</Badge>
        <Badge leftSection={<FaMapMarkerAlt />} color="var(--color-button-primary)">
          {getRegionLabel(artist.region)}
        </Badge>
      </div>
      <section className="flex items-center justify-between gap-2">
        <div className="grid gap-2">
          <p className="text-lg font-bold">{artist.artistName}</p>
          <p className="text-sm text-text-gray">{artist.followers.length}人が推しに登録中</p>
        </div>
        {user && (
          <Button
            color="var(--color-button-primary)"
            radius="lg"
            onClick={handleFollow}
            variant={isFollowing ? 'outline' : 'filled'}
          >
            {isFollowing ? '推しに登録中' : '推しに登録'}
          </Button>
        )}
      </section>
      <Divider />
      <div className="grid gap-2">
        <p className="text-sm font-bold">基本情報</p>
        <p className="text-sm text-text-gray overflow-hidden break-words whitespace-pre-wrap">
          {artist.artistDescription}
        </p>
      </div>
      {isFollowing && (
        <div className="grid gap-1">
          <LinkButton
            href={`/artists/${artist.id}/edit`}
            variant="outline"
            color="var(--color-button-primary)"
            radius="lg"
          >
            アーティスト情報を編集
          </LinkButton>
        </div>
      )}
    </div>
  );
};
