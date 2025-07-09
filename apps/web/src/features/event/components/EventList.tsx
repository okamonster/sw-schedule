'use client';

import { useSearchParams } from 'next/navigation';
import { EVENT_LIMIT, EVENT_SORT_ORDER } from '@/constants';
import { useInfiniteScroll } from '@/features/artist/hooks/useInfiniteScroll';
import { EventListCard } from '@/features/event/components/EventListCard';
import { useEvents } from '@/features/event/hooks/useEvent';

type EventListProps = {
  keyword?: string;
  sort?: string;
};

export const EventList = ({ keyword = '', sort = 'eventDate' }: EventListProps) => {
  const searchParams = useSearchParams();
  const area = searchParams.get('area');

  const { events, fetchEvents, hasMore } = useEvents(keyword, sort, EVENT_SORT_ORDER, EVENT_LIMIT);
  const loaderRef = useInfiniteScroll({
    onIntersect: fetchEvents,
    enabled: hasMore,
  });

  return (
    <div className="grid gap-2">
      {events
        .filter((event) => (area ? event.locatePrefecture === area : true))
        .map((event) => (
          <EventListCard key={event.id} event={event} />
        ))}
      {hasMore && <div ref={loaderRef} />}
    </div>
  );
};
