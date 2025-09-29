import type { Event } from '@repo/common';
import dayjs from '@/libs/dayjs';

type Props = {
  event: Event;
};

export const EventDateSection = ({ event }: Props): React.ReactNode => {
  return (
    <section className="grid gap-2">
      <p className="text-sm font-bold">開催日時</p>
      <div className="grid gap-1 px-2">
        <p className="text-sm text-text-gray">
          開催日:{dayjs(event.eventDate).tz().format('YYYY/MM/DD(ddd)')}
        </p>
        <p className="text-sm text-text-gray">
          入場時間:{dayjs(event.openDateTime).tz().format('HH:mm')}
        </p>

        <p className="text-sm text-text-gray">
          開催時間:{dayjs(event.startDateTime).tz().format('HH:mm')}
        </p>
      </div>
    </section>
  );
};
