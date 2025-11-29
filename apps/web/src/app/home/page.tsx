import type { Event } from '@repo/common';
import { auth } from '@/auth';
import { EmptyReccentEventCard } from '@/features/home/EmptyReccentEventCard';
import { FollowingArtistList } from '@/features/home/FollowingArtistList';
import { ReccentEventCard } from '@/features/home/ReccentEventCard';
import { ScheduleList } from '@/features/home/ScheduleList';
import { getFollowingArtists } from '@/service/artist';
import { getFollowingArtistsEvents } from '@/service/event';

export default async function HomePage() {
  const session = await auth();
  const backendToken = session?.backendToken;

  if (!backendToken || !session) {
    return;
  }

  const followingArtists = await getFollowingArtists(backendToken);

  const upcomingEvents: Event[] = [];

  return (
    <div className="grid gap-4 px-4 py-2">
      <FollowingArtistList artists={followingArtists} />
      <section className="grid gap-2">
        <p className="text-md font-bold">直近の推しの出演イベント</p>
        <div className="grid gap-2 items-center justify-center">
          {upcomingEvents[0] ? (
            <ReccentEventCard event={upcomingEvents[0]} />
          ) : (
            <EmptyReccentEventCard />
          )}
        </div>
      </section>
      <section className="grid gap-2">
        <p className="text-md font-bold">あなたの推しの出演イベント</p>
        <div className="grid gap-2 items-center justify-center">
          <ScheduleList events={upcomingEvents} />
        </div>
      </section>
    </div>
  );
}
