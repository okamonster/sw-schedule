import { useEffect, useState } from 'react';
import type { Event } from '@/entities/event';
import { searchEvents } from '@/service/event';

export const useEvents = (
  keyword = '',
  sort = 'eventDate',
  order = 'desc',
  limit = 10
): {
  events: Event[];
  fetchEvents: () => Promise<void>;
  hasMore: boolean;
} => {
  const [events, setEvents] = useState<Event[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // データ取得
  const fetchEvents = async () => {
    const data = await searchEvents(keyword, sort, order, limit, offset);

    setEvents((prev) => [...prev, ...data]);
    setHasMore(data.length === Number(limit));
    setOffset((prev) => prev + Number(limit));
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: フィルターが変更されたらリセット
  useEffect(() => {
    setEvents([]);
    setOffset(0);
    setHasMore(true);
  }, [keyword, sort, order, limit]);

  return { events, fetchEvents, hasMore };
};
