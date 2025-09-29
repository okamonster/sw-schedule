'use client';
import { Badge, Button } from '@mantine/core';
import type { Artist, Event } from '@repo/common';
import { useState } from 'react';
import { DebouncedInput } from '@/components/Inputs/DebouncedInput';
import { EventSelectButton } from '@/features/artist/components/EventSelectButton';
import { searchEvents } from '@/service/event';

type Props = {
  artist: Artist;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
};

export const ArtistEventInput = ({ artist, value, onChange, error }: Props) => {
  const [eventList, setEventList] = useState<Event[]>([]);
  const [search, setSearch] = useState('');
  const [selectedEventList, setSelectedEventList] = useState<Event[]>([]);

  const searchEvent = async () => {
    const events = await searchEvents(search, 'eventDate', 'desc', 10, 0);
    setEventList(events);
  };

  const isRegistered = (event: Event) => {
    return artist.events.some((e) => e.event.id === event.id);
  };

  const isSelected = (event: Event) => {
    return selectedEventList.some((e) => e.id === event.id);
  };

  const handleSelectEvent = (event: Event) => {
    if (isSelected(event)) {
      setSelectedEventList(selectedEventList.filter((e) => e.id !== event.id));
      onChange(value.filter((e) => e !== event.id));
    } else {
      setSelectedEventList([...selectedEventList, event]);
      onChange([...value, event.id]);
    }
  };

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2 p-2">
        <DebouncedInput value={search} delay={500} onChange={(value) => setSearch(value)} />
        <Button color="var(--color-button-primary)" onClick={searchEvent}>
          検索
        </Button>
      </div>
      <div className="grid gap-2">
        <p className="text-sm text-text-gray">選択中のイベント</p>
        <div className="flex gap-2 overflow-x-auto">
          {selectedEventList.map((event) => (
            <Badge
              key={event.id}
              color="var(--color-button-primary)"
              radius="lg"
              className="shrink-0"
            >
              {event.eventName}
            </Badge>
          ))}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="grid gap-2 max-h-[200px] overflow-y-auto w-full">
        {eventList.map((event) => (
          <EventSelectButton
            key={event.id}
            event={event}
            onClick={() => handleSelectEvent(event)}
            isRegistered={isRegistered(event)}
            isSelected={isSelected(event)}
          />
        ))}
      </div>
    </div>
  );
};
