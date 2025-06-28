import type { Event } from '@prisma/client';
import type { SearchEventRequest } from '~/entities/event.js';
import { prismaClient } from '~/libs/prisma.js';

export const getEventsBySearchQueryOperation = async (
  request: SearchEventRequest
): Promise<Event[]> => {
  const events = await prismaClient.event.findMany({
    where: {
      OR: [
        { eventName: { contains: request.keyword, mode: 'insensitive' } },
        { eventDescription: { contains: request.keyword, mode: 'insensitive' } },
        { eventLocationName: { contains: request.keyword, mode: 'insensitive' } },
        { eventLocationAddress: { contains: request.keyword, mode: 'insensitive' } },
        { locatePrefecture: { contains: request.keyword, mode: 'insensitive' } },
        {
          artists: {
            some: {
              artist: {
                artistName: { contains: request.keyword, mode: 'insensitive' },
              },
            },
          },
        },
      ],
    },
    orderBy: {
      [request.sort]: request.order,
    },
    skip: Number.parseInt(request.offset),
    take: Number.parseInt(request.limit),
  });

  if (!events) {
    return [];
  }

  return events;
};
