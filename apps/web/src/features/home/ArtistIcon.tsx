'use client';
import { Avatar } from '@mantine/core';
import type { Artist } from '@repo/common';
import Link from 'next/link';

type Props = {
  artist: Artist;
};

export const ArtistIcon = ({ artist }: Props): React.ReactNode => {
  return (
    <Link
      href={`/artists/${artist.id}`}
      className="grid gap-2 justify-items-center text-center w-[100px]"
    >
      <Avatar
        src={artist.artistImageUrl}
        size="lg"
        className="border border-2 border-border-gray shadow-inner"
      />
      <p className="text-xs overflow-hidden font-bold text-ellipsis whitespace-nowrap w-full">
        {artist.artistName}
      </p>
    </Link>
  );
};
