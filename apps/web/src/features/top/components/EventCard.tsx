'use client';
import { Card, Image, Skeleton } from '@mantine/core';
import dayjs from 'dayjs';
import Link from 'next/link';
import { DEFAULT_IMAGE_URL } from '@/constants';
import type { Event } from '@/entities/event';

type Props = {
  event: Event;
};

export const EventCard = ({ event }: Props): React.ReactNode => {
  const imageUrl = event.eventImageUrl ? event.eventImageUrl : DEFAULT_IMAGE_URL;
  return (
    <Link href={`/events/${event.id}`}>
      <Card shadow="sm" padding="lg" radius="md" withBorder w={280} className="shrink-0">
        <Card.Section className="bg-theme h-[250px] bg-cover bg-center bg-opacity-10">
          <Image src={imageUrl} h="100%" alt={event.eventName} fit="contain" />
        </Card.Section>

        <p className="text-md font-bold">{event.eventName}</p>

        <p className="text-sm text-text-gray">
          開催日:{dayjs(event.eventDate).format('YYYY/MM/DD')}
        </p>
        <p className="text-sm text-text-gray">会場:{event.eventLocationName}</p>
      </Card>
    </Link>
  );
};
