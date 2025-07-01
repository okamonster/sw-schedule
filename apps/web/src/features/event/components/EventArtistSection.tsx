import type { Artist } from '@/entities/artist';
import { EventArtistCard } from '@/features/event/components/EventArtistCard';

type Props = {
  artists: Artist[];
};

export const EventArtistSection = ({ artists }: Props): React.ReactNode => {
  return (
    <section className="grid gap-2">
      <p className="text-sm font-bold">出演アーティスト</p>
      <div className="grid gap-2 max-h-[200px] overflow-y-auto">
        {artists.map((artist) => (
          <EventArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </section>
  );
};
