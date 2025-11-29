'use client';
import { Button } from '@mantine/core';
import type { Event } from '@repo/common';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { ScheduleCard } from '@/features/home/ScheduleCard';

type Props = {
  events: Event[];
};

export const ScheduleList = ({ events }: Props): React.ReactNode => {
  const [showMore, setShowMore] = useState(false);
  const visibleEvents = showMore ? events : events.slice(0, 3);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="grid gap-2">
        {visibleEvents.map((event) => (
          <ScheduleCard key={event.id} event={event} />
        ))}
      </div>
      {
        <Button
          onClick={handleShowMore}
          variant="light"
          color="var(--color-button-primary)"
          radius="lg"
          className="shadow-lg"
          rightSection={
            showMore ? (
              <FaChevronUp className="text-text-primary" size={12} />
            ) : (
              <FaChevronDown className="text-text-primary" size={12} />
            )
          }
        >
          {showMore ? '閉じる' : 'もっとみる'}
        </Button>
      }
    </div>
  );
};
