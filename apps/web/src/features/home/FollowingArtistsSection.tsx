import type { Artist } from '@repo/common';
import { ArtistCard } from '@/features/top/components/ArtistCard';

type Props = {
  artists: Artist[];
};

export const FollowingArtistsSection = ({ artists }: Props): React.ReactNode => {
  return (
    <section className="grid gap-4">
      <p className="text-lg font-bold">あなたの推し</p>
      <div className="flex overflow-x-auto gap-2">
        {artists.length > 0 ? (
          artists.map((artist) => <ArtistCard key={artist.id} artist={artist} />)
        ) : (
          <p className="text-sm text-text-gray">推しを登録してください</p>
        )}
      </div>
    </section>
  );
};
