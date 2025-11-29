import type { Artist } from '@repo/common';
import { AddFollowArtistAvator } from './AddFollowArtistAvator';
import { ArtistIcon } from './ArtistIcon';

type Props = {
  artists: Artist[];
};

export const FollowingArtistList = ({ artists }: Props): React.ReactNode => {
  return (
    <div className="grid gap-4">
      <p className="text-md font-bold">あなたの推し</p>
      <div className="flex overflow-x-auto gap-2">
        {artists.map((artist) => (
          <ArtistIcon key={artist.id} artist={artist} />
        ))}
        <AddFollowArtistAvator />
      </div>
    </div>
  );
};
