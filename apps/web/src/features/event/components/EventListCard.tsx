'use client';
import { Badge, Image } from '@mantine/core';
import Link from 'next/link';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { DEFAULT_IMAGE_URL, getAreaLabel } from '@/constants';
import type { Event } from '@/entities/event';
import dayjs from '@/libs/dayjs';

type Props = {
  event: Event;
};

export const EventListCard = ({ event }: Props): React.ReactNode => {
  const today = dayjs().startOf('day');
  const eventDay = dayjs(event.eventDate).startOf('day');
  const diffDays = eventDay.diff(today, 'day');

  const imageUrl = event.eventImageUrl ? event.eventImageUrl : DEFAULT_IMAGE_URL;

  return (
    <Link href={`/events/${event.id}`}>
      <div className="flex rounded-md border border-border-gray">
        <div className="w-[100px] h-full bg-theme">
          <Image src={imageUrl} alt="イベント画像" w={100} h="100%" fit="contain" />
        </div>
        <div className="flex flex-1 p-2 justify-between w-full">
          <div className="grid gap-1 w-full">
            <div className="flex justify-between">
              <p className="text-md font-bold">{event.eventName}</p>
              <Badge
                radius="lg"
                color={diffDays > 0 ? 'var(--color-button-primary)' : 'var(--color-background-red)'}
                className="shrink-0"
              >
                {diffDays > 0 && `あと${diffDays}日`}
                {diffDays === 0 && '本日'}
                {diffDays < 0 && '開催済み'}
              </Badge>
            </div>
            <p className="text-sm text-text-gray">
              開催:{dayjs(event.eventDate).format('YYYY/MM/DD(ddd)')}
            </p>
            <div className="flex gap-1">
              <Badge
                color="var(--color-button-primary)"
                radius="lg"
                leftSection={<FaMapMarkerAlt />}
                className="shrink-0"
              >
                {getAreaLabel(event.locatePrefecture)}
              </Badge>
              <p className="text-sm text-text-gray text-nowrap">
                {event.eventLocationName.substring(0, 10)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
