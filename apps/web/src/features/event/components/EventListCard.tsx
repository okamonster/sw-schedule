'use client';
import { Badge, Image } from '@mantine/core';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { getAreaLabel } from '@/constants';
import type { Event } from '@/entities/event';
import dayjs from '@/libs/dayjs';

type Props = {
  event: Event;
};

export const EventListCard = ({ event }: Props): React.ReactNode => {
  const diffDays = dayjs(event.eventDate).diff(dayjs(), 'day');

  return (
    <div className="flex rounded-md border border-border-gray">
      <div className="w-[100px] h-[100px] bg-theme">
        <Image src={event.eventImageUrl} alt="イベント画像" w={100} h={100} fit="cover" />
      </div>
      <div className="flex flex-1 p-2 justify-between">
        <div className="grid gap-1">
          <p className="text-md font-bold">{event.eventName}</p>
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
        <Badge
          radius="lg"
          color={diffDays > 0 ? 'var(--color-button-primary)' : 'var(--color-background-red)'}
        >
          {diffDays > 0 && `あと${diffDays}日`}
          {diffDays === 0 && '本日'}
          {diffDays < 0 && '開催済み'}
        </Badge>
      </div>
    </div>
  );
};
