'use client';
import { Card, Image } from '@mantine/core';
import type { Event } from '@repo/common';
import Link from 'next/link';
import { DEFAULT_IMAGE_URL } from '@/constants';
import dayjs from '@/libs/dayjs';

type Props = {
  event: Event;
};

export const EventCard = ({ event }: Props): React.ReactNode => {
  const imageUrl = event.eventImageUrl ? event.eventImageUrl : DEFAULT_IMAGE_URL;
  return (
    <Link href={`/events/${event.id}`} className="h-full">
      <Card shadow="sm" padding="lg" radius="md" withBorder w={280} className="shrink-0 h-full">
        <Card.Section className="bg-theme h-[250px] bg-cover bg-center bg-opacity-10">
          <Image src={imageUrl} h="100%" alt={event.eventName} fit="contain" />
        </Card.Section>

        <p className="text-md font-bold">{event.eventName}</p>

        <p className="text-sm text-text-gray">
          開催日:{dayjs(event.eventDate).tz().format('YYYY/MM/DD')}
        </p>
        <p className="text-sm text-text-gray">会場:{event.eventLocationName}</p>
      </Card>
    </Link>
  );
};
