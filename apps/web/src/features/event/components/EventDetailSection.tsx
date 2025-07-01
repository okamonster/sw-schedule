'use client';

import { Badge, Divider } from '@mantine/core';
import type { User } from 'next-auth';
import type React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { LinkButton } from '@/components/Buttons/LinkButton';
import { getAreaLabel } from '@/constants';
import type { Event } from '@/entities/event';

type Props = {
  event: Event;
  currentUser: User | null;
};

export const EventDetailSection = ({ event, currentUser }: Props): React.ReactNode => {
  return (
    <section className="grid gap-2">
      <div className="flex gap-2">
        <Badge leftSection={<FaMapMarkerAlt />} color="var(--color-button-primary)">
          {getAreaLabel(event.locatePrefecture)}
        </Badge>
      </div>
      <section className="flex items-center justify-between gap-2">
        <p className="text-lg font-bold">{event.eventName}</p>
      </section>
      <Divider />

      <div className="grid gap-2">
        <p className="text-sm font-bold">基本情報</p>
        <p className="text-sm text-text-gray overflow-hidden break-words whitespace-pre-wrap">
          {event.eventDescription}
        </p>
      </div>

      <div className="grid gap-1">
        {currentUser && (
          <LinkButton
            href={`/events/${event.id}/edit`}
            variant="outline"
            color="var(--color-button-primary)"
            radius="lg"
          >
            イベント情報を編集
          </LinkButton>
        )}
      </div>
    </section>
  );
};
