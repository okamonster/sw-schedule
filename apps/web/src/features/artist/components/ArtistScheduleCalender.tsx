'use client';
import { Calendar } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import type { Artist } from '@/entities/artist';
import { EventCard } from '@/features/artist/components/EventCard';
import { useCalenderSchedule } from '@/features/artist/hooks/useCalenderSchedule';
import dayjs from '@/libs/dayjs';

type Props = {
  artist: Artist;
};

export const ArtistScheduleCalender = ({ artist }: Props): React.ReactNode => {
  const { setSelectDate, groupedEvents, eventsContainerRef } = useCalenderSchedule(artist);

  const isEventDay = (date: Date) => {
    return artist.events.some((artistEvent) =>
      dayjs(artistEvent.event.eventDate).isSame(dayjs(date), 'day')
    );
  };

  const eventDay = (date: Date) => {
    return artist.events.find((artistEvent) =>
      dayjs(artistEvent.event.eventDate).isSame(dayjs(date), 'day')
    );
  };

  const isSmallScreen = useMediaQuery('(max-width: 400px)');

  return (
    <section className="grid gap-2 w-full">
      <div className="grid justify-center">
        <Calendar
          size={isSmallScreen ? 'md' : 'lg'}
          monthLabelFormat={'MM月'}
          static
          renderDay={(date) => {
            return (
              <button
                type="button"
                className="w-full h-full"
                onClick={() => setSelectDate(new Date(date))}
              >
                <div>{dayjs(date).date()}</div>
                {isEventDay(new Date(date)) && (
                  <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap bg-background-red text-text-white">
                    {eventDay(new Date(date))?.event.eventName}
                  </p>
                )}
              </button>
            );
          }}
        />
      </div>
      <div className="grid gap-2">
        <p className="text-sm text-text-black font-bold">今後の出演情報</p>
        <div ref={eventsContainerRef} className="grid gap-2 max-h-[250px] overflow-y-auto w-full">
          {groupedEvents.length > 0 ? (
            groupedEvents.map((group) => (
              <div key={group.date} className="grid gap-2" data-date-group={group.date}>
                <p className="text-sm text-text-gray">
                  {dayjs(group.date).tz().format('YYYY/MM/DD(ddd)')}
                </p>
                {group.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ))
          ) : (
            <p className="text-sm text-text-gray">今後の出演予定はありません</p>
          )}
        </div>
      </div>
    </section>
  );
};
