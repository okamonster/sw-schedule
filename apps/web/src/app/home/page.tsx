import { Divider } from '@mantine/core';
import { auth } from '@/auth';
import { FollowingArtistsSection } from '@/features/home/FollowingArtistsSection';
import { EventCard } from '@/features/top/components/EventCard';
import { getFollowingArtists } from '@/service/artist';
import { getFollowingArtistsEvents } from '@/service/event';

export default async function HomePage() {
  const session = await auth();
  const backendToken = session?.backendToken;

  if (!backendToken || !session) {
    return;
  }

  const followingArtists = await getFollowingArtists(backendToken);

  const upcomingEvents = await getFollowingArtistsEvents(backendToken);

  return (
    <div className="grid gap-4 px-4 py-2">
      <section className="grid gap-2">
        <p className="text-lg font-bold">あなたの推しの出演イベント</p>
        <div className="flex overflow-x-auto gap-2">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
      <Divider />
      <FollowingArtistsSection artists={followingArtists} />
    </div>
  );
}
