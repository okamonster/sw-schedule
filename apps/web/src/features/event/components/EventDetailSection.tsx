'use client';

import { Badge, Button, Divider } from '@mantine/core';
import type { User } from 'next-auth';
import type React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaLink, FaXTwitter } from 'react-icons/fa6';
import { LinkButton } from '@/components/Buttons/LinkButton';
import { getAreaLabel } from '@/constants';
import type { Event } from '@/entities/event';
import { useSnsShare } from '@/hooks/useSnsShare';

type Props = {
  event: Event;
  currentUser: User | null;
};

export const EventDetailSection = ({ event, currentUser }: Props): React.ReactNode => {
  const { shareX, copyUrl } = useSnsShare();
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
      <section className="flex gap-2">
        <Button
          color="var(--color-text-black)"
          radius="md"
          variant="outline"
          leftSection={<FaXTwitter />}
          onClick={() =>
            shareX(`【${event.eventName}】\nイベント詳細はこちらから！`, window.location.href, [
              'Gemba',
              '推し活するならGemba',
            ])
          }
        >
          シェア
        </Button>
        <Button
          color="var(--color-text-black)"
          radius="md"
          variant="outline"
          leftSection={<FaLink />}
          onClick={copyUrl}
        >
          URLをコピー
        </Button>
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
