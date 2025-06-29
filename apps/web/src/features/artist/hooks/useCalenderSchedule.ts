import { useEffect, useRef, useState } from 'react';
import type { Artist } from '@/entities/artist';
import type { GroupedEvents } from '@/entities/event';
import dayjs from '@/libs/dayjs';

export const useCalenderSchedule = (
  artist: Artist
): {
  setSelectDate: (date: Date) => void;
  groupedEvents: GroupedEvents[];
  eventsContainerRef: React.RefObject<HTMLDivElement | null>;
} => {
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const eventsContainerRef = useRef<HTMLDivElement>(null);

  const events = artist.events
    .map((artistEvent) => {
      return artistEvent.event;
    })
    .sort((a, b) => {
      return dayjs(a.eventDate).diff(dayjs(b.eventDate));
    });

  // 今日以降のイベントのみをフィルタリング
  const today = dayjs();
  const futureEvents = events.filter(
    (event) =>
      dayjs(event.eventDate).isSame(today, 'day') || dayjs(event.eventDate).isAfter(today, 'day')
  );

  // イベントを日付でグループ化
  const groupedEvents: GroupedEvents[] = futureEvents.reduce((groups, event) => {
    const dateKey = dayjs(event.eventDate).format('YYYY-MM-DD');
    const existingGroup = groups.find((group) => group.date === dateKey);

    if (existingGroup) {
      existingGroup.events.push(event);
    } else {
      groups.push({
        date: dateKey,
        events: [event],
      });
    }

    return groups;
  }, [] as GroupedEvents[]);

  // 選択された日付のイベントグループを取得
  const selectedDateKey = dayjs(selectDate).format('YYYY-MM-DD');
  const selectedGroupIndex = groupedEvents.findIndex((group) => group.date === selectedDateKey);

  // 選択された日付が変更された時にスクロール
  useEffect(() => {
    if (selectedGroupIndex >= 0 && eventsContainerRef.current) {
      const container = eventsContainerRef.current;
      const groupElements = container.querySelectorAll('[data-date-group]');

      if (groupElements[selectedGroupIndex]) {
        const targetElement = groupElements[selectedGroupIndex] as HTMLElement;

        const scrollTop = targetElement.offsetTop - container.offsetTop - 20; // 20pxの余白

        container.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedGroupIndex]);

  return {
    setSelectDate,
    groupedEvents,
    eventsContainerRef,
  };
};
