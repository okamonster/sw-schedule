import type { Artist } from '@/entities/artist';
import { EventCard } from '@/features/artist/components/EventCard';
import dayjs from '@/libs/dayjs';

type Props = {
  artist: Artist;
};

export const NearestEventSection = ({ artist }: Props): React.ReactNode => {
  const today = dayjs();

  // イベントを日付順にソートし、現在の日付に最も近いイベントを取得
  const sortedEvents = artist.events
    .map((artistEvent) => artistEvent.event)
    .sort((a, b) => {
      const dateA = dayjs(a.eventDate);
      const dateB = dayjs(b.eventDate);
      return dateA.diff(dateB);
    });

  // 今から最も近いイベントを取得
  const nearestEvent =
    sortedEvents.find((event) => dayjs(event.eventDate).isSameOrAfter(today, 'day')) ||
    sortedEvents[sortedEvents.length - 1]; // 過去のイベントがない場合は最新の過去イベント

  return (
    <section className="grid gap-2 w-full">
      <p className="text-sm font-bold">直近のイベント</p>
      {nearestEvent ? (
        <div className="grid gap-2">
          <p className="text-sm text-text-gray">
            {dayjs(nearestEvent.eventDate).tz('Asia/Tokyo').format('YYYY/MM/DD(ddd)')}
          </p>
          <EventCard event={nearestEvent} />
        </div>
      ) : (
        <p className="text-sm text-text-gray">イベントがありません</p>
      )}
    </section>
  );
};
