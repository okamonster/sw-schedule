import { Avatar } from '@mantine/core';
import type { Artist } from '@repo/common';
import Link from 'next/link';
import { DEFAULT_IMAGE_URL } from '@/constants';

type Props = {
  artist: Artist;
};

export const EventArtistCard = ({ artist }: Props): React.ReactNode => {
  const imageUrl = artist.artistImageUrl ? artist.artistImageUrl : DEFAULT_IMAGE_URL;
  return (
    <Link href={`/artists/${artist.id}`}>
      <div className="flex gap-2 rounded-md p-2 border border-border-gray">
        <Avatar src={imageUrl} size="lg" />
        <div className="flex flex-1 justify-between">
          <p className="text-sm font-bold">{artist.artistName}</p>
        </div>
      </div>
    </Link>
  );
};
