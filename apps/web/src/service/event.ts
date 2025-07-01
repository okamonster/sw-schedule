import type { EditEventRequestType, Event } from '@/entities/event';

export const createEvent = async (dto: EditEventRequestType): Promise<Event> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ ...dto }),
  });

  const data = await result.json();

  if (!result.ok || !data) {
    throw new Error('Failed to create event');
  }

  return { ...data } as Event;
};

export const getEventById = async (id: string): Promise<Event> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  const data = await result.json();

  if (!result.ok || !data) {
    throw new Error('Failed to get event by id');
  }

  return { ...data } as Event;
};

export const searchEvents = async (
  keyword: string,
  sort: string,
  order: string,
  limit: number,
  offset: number
): Promise<Event[]> => {
  const searchQuery = new URLSearchParams({
    keyword,
    sort,
    order,
    limit: limit.toString(),
    offset: offset.toString(),
  }).toString();

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/search?${searchQuery}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  const data = await result.json();

  if (!result.ok || !data) {
    return [];
  }

  return data as Event[];
};

export const getFollowingArtistsEvents = async (backendToken: string): Promise<Event[]> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/following-artists-events`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${backendToken}`,
    },
    method: 'GET',
  });

  const data = await result.json();

  if (!result.ok || !data) {
    throw new Error('Failed to get following artists events');
  }

  return data as Event[];
};
