'use client';
import { Image, Overlay } from '@mantine/core';
import type { Event } from '@repo/common';
import Link from 'next/link';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { DEFAULT_IMAGE_URL } from '@/constants';
import dayjs from '@/libs/dayjs';

type Props = {
  event: Event;
};

export const ReccentEventCard = ({ event }: Props): React.ReactNode => {
  const imageUrl = event.eventImageUrl ? event.eventImageUrl : DEFAULT_IMAGE_URL;

  const today = dayjs().startOf('day');
  const eventDay = dayjs(event.eventDate).startOf('day');
  const diffDays = eventDay.diff(today, 'day');

  return (
    <Link href={`/events/${event.id}`} className="shrink-0 relative w-[300px] h-[230px]">
      <Image
        src={imageUrl}
        alt={event.eventName}
        fit="cover"
        radius="lg"
        className="absolute top-0 left-0 w-full h-full shadow-lg"
      />
      {/* Overlay */}
      <Overlay
        gradient="linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8))"
        radius="lg"
        className="absolute top-0 left-0 w-full h-full"
        zIndex={0}
      />
      <div className="absolute top-2 left-2 z-10 rounded-full p-2 bg-background-red/70 border-1 border-pink-500">
        <p className="text-xs text-text-white font-bold">
          あと{diffDays > 0 ? `あと${diffDays}日` : '本日'}
        </p>
      </div>
      <div className="absolute bottom-2 left-2 z-10 grid gap-2">
        <p className="text-md text-text-white font-bold overflow-hidden text-ellipsis whitespace-wrap p-2">
          {event.eventName}
        </p>
        <div className="flex items-center gap-2">
          <FaCalendar color="var(--color-text-primary)" />
          <p className="text-xs text-text-white font-bold">
            {dayjs(event.eventDate).format('YYYY/MM/DD')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt color="var(--color-text-primary)" />
          <p className="text-xs text-text-white font-bold">{event.eventLocationName}</p>
        </div>
      </div>
    </Link>
  );
};
