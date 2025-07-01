import { Avatar } from '@mantine/core';
import Link from 'next/link';
import type { Artist } from '@/entities/artist';

type Props = {
  artist: Artist;
};

export const EventArtistCard = ({ artist }: Props): React.ReactNode => {
  return (
    <Link href={`/artists/${artist.id}`}>
      <div className="flex gap-2 rounded-md p-2 border-1 border-border-gray">
        <Avatar src={artist.artistImageUrl} size="lg" />
        <div className="flex flex-1 justify-between">
          <p className="text-sm font-bold">{artist.artistName}</p>
        </div>
      </div>
    </Link>
  );
};
