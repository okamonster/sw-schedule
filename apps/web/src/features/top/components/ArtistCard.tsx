'use client';
import { Card, Image } from '@mantine/core';
import type { Artist } from '@repo/common';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { DEFAULT_IMAGE_URL } from '@/constants';

type Props = {
  artist: Artist;
};

export const ArtistCard = ({ artist }: Props): React.ReactNode => {
  const imageUrl = artist.artistImageUrl ? artist.artistImageUrl : DEFAULT_IMAGE_URL;
  return (
    <Link href={`/artists/${artist.id}`} className="h-full">
      <div className="shrink-0 h-full bg-background-light/50 border border-white p-4 w-[300px] rounded-3xl shadow-lg shadow-pink-100">
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
      </div>
    </Link>
  );
};
