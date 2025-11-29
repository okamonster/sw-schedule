import type { Event } from '@repo/common';
import dayjs from 'dayjs';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

type Props = {
  event: Event;
};

export const ScheduleCard = ({ event }: Props): React.ReactNode => {
  return (
    <Link
      href={`/events/${event.id}`}
      className="flex items-center justify-between gap-2 w-full p-2 rounded-md bg-background-light/30 border-1 border-border-white shadow-lg"
    >
      <div className="flex items-center gap-2">
        <div className="grid shrink-0 p-1 items-center justify-center text-center w-[55px] h-[55px] bg-background-primary rounded-lg shadow-inner shadow-pink-500 border-2 border-border-gray">
          <p className="text-xs text-text-black">
            {dayjs(event.eventDate).month() + 1}月<br />
            <span className="text-xl font-bold">{dayjs(event.eventDate).date()}</span>
          </p>
        </div>
        <div className="grid gap-2">
          <p className="text-sm text-text-black font-bold overflow-hidden text-ellipsis whitespace-nowrap">
            {event.eventName}
          </p>
          <p className="text-xs text-text-gray overflow-hidden text-ellipsis whitespace-nowrap">
            {event.eventLocationName}
          </p>
        </div>
      </div>
      <FaChevronRight className="text-text-gray" size={12} />
    </Link>
  );
};
