'use client';

import { Button, Image } from '@mantine/core';
import type { Artist } from '@repo/common';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';
import { DEFAULT_IMAGE_URL, getGenreLabel, getRegionLabel } from '@/constants';

type Props = {
  artist: Artist;
  isFollowing: boolean;
  handleFollow: () => void;
  canFollow?: boolean;
  isLoading?: boolean;
};

export function ArtistListCard({
  artist,
  isFollowing,
  handleFollow,
  canFollow = true,
  isLoading = false,
}: Props) {
  const imageUrl = artist.artistImageUrl ? artist.artistImageUrl : DEFAULT_IMAGE_URL;

  return (
    <Link href={`/artists/${artist.id}`} className="h-full">
      <div className="shrink-0 h-full bg-background-light/50 border border-white p-4 rounded-3xl shadow-lg shadow-pink-100 grid gap-2">
        <div className="bg-theme h-[180px] bg-cover bg-center rounded-3xl relative">
          <Image src={imageUrl} h="100%" alt={artist.artistName} fit="contain" />
          <div className="absolute top-2 right-2 bg-white/70 rounded-full p-2 flex items-center gap-2 border border-white">
            <FaHeart className="text-pink-500 w-4 h-4" />
            <p className="text-xs text-text-black font-bold">{artist.followers.length}人</p>
          </div>
          <div className="absolute bottom-2 left-2 bg-white/70 rounded-full p-2 flex items-center gap-2 border border-white">
            <p className="text-sm text-text-black font-bold">{artist.artistName}</p>
          </div>
        </div>
        <div className="grid gap-1">
          <p className="text-sm text-text-gray">
            {getGenreLabel(artist.genre)}・{getRegionLabel(artist.region)}
          </p>
          <Button
            type="button"
            color="var(--color-button-red)"
            radius="md"
            leftSection={<FiUserPlus className="text-white w-4 h-4" />}
            variant={isFollowing ? 'outline' : 'filled'}
            loading={isLoading}
            disabled={isLoading || (!canFollow && !isFollowing)}
            onClick={(e) => {
              e.preventDefault();
              handleFollow();
            }}
          >
            {isFollowing ? '推しに登録中' : '推しに登録'}
          </Button>
        </div>
      </div>
    </Link>
  );
}
