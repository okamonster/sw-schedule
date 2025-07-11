'use client';
import { Button } from '@mantine/core';
import { FaCalendarAlt } from 'react-icons/fa';
import { LinkButton } from '@/components/Buttons/LinkButton';
import type { Artist } from '@/entities/artist';
import type { User } from '@/entities/user';
import { ArtistScheduleCalender } from '@/features/artist/components/ArtistScheduleCalender';
import { useGoogleCalendarSync } from '@/features/artist/hooks/useGoogleCalendarSync';

type Props = {
  user: User | null;
  artist: Artist;
};

export const ArtistScheduleSection = ({ user, artist }: Props): React.ReactNode => {
  const { syncArtistEventsToGoogleCalendar, isLoading } = useGoogleCalendarSync(artist);
  return (
    <section className="grid gap-2">
      <div className="flex justify-between">
        <p className="text-sm font-bold ">出演予定</p>
        <Button
          color="var(--color-button-primary)"
          variant="outline"
          leftSection={<FaCalendarAlt />}
          radius="lg"
          size="xs"
          onClick={() => {
            syncArtistEventsToGoogleCalendar();
          }}
          disabled={isLoading}
          loading={isLoading}
        >
          カレンダーに同期
        </Button>
      </div>
      <ArtistScheduleCalender artist={artist} />

      {user ? (
        <Button color="var(--color-button-primary)" radius="lg">
          出演情報を追加
        </Button>
      ) : (
        <LinkButton color="var(--color-button-primary)" radius="lg" href="/login">
          ログインして出演情報を追加
        </LinkButton>
      )}
    </section>
  );
};
