import type { Event } from '@prisma/client';
import type {
  EditEventRequestDto,
  EditEventRequestType,
  SearchEventRequest,
} from '~/entities/event.js';
import { prismaClient } from '~/libs/prisma.js';

export const createEventOperation = async (
  request: EditEventRequestType
): Promise<Event | null> => {
  const event = await prismaClient.event.create({
    data: {
      eventName: request.eventName,
      eventDescription: request.eventDescription,
      eventImageUrl: request.eventImageUrl,
      eventDate: new Date(request.eventDate),
      openDateTime: new Date(request.openDateTime),
      startDateTime: new Date(request.startDateTime),
      locatePrefecture: request.locatePrefecture,
      eventLocationName: request.eventLocationName,
      eventLocationAddress: request.eventLocationAddress,
      ticketReleaseDateTime: request.ticketReleaseDateTime
        ? new Date(request.ticketReleaseDateTime)
        : null,
      ticketPrice: Number.parseInt(request.ticketPrice),
      sameDayTicketPrice: Number.parseInt(request.sameDayTicketPrice),
      ticketUrl: request.ticketUrl,
      isNeedDrink: request.isNeedDrink,
      artists: {
        create: request.artists.map((artistId) => ({
          artist: {
            connect: { id: artistId },
          },
        })),
      },
    },
  });

  if (!event) {
    return null;
  }

  return event;
};

export const updateEventOperation = async (
  id: string,
  request: EditEventRequestDto
): Promise<Event | null> => {
  const event = await prismaClient.event.update({
    where: { id },
    data: {
      eventName: request.eventName,
      eventDescription: request.eventDescription,
      eventImageUrl: request.eventImageUrl,
      eventDate: new Date(request.eventDate),
      ogpImageUrl: request.ogpImageUrl,
      openDateTime: new Date(request.openDateTime),
      startDateTime: new Date(request.startDateTime),
      locatePrefecture: request.locatePrefecture,
      eventLocationName: request.eventLocationName,
      eventLocationAddress: request.eventLocationAddress,
      ticketReleaseDateTime: request.ticketReleaseDateTime
        ? new Date(request.ticketReleaseDateTime)
        : null,
      ticketPrice: Number.parseInt(request.ticketPrice),
      sameDayTicketPrice: Number.parseInt(request.sameDayTicketPrice),
      ticketUrl: request.ticketUrl,
      isNeedDrink: request.isNeedDrink,
      artists: {
        deleteMany: {},
        create: request.artists.map((artistId) => ({
          artist: {
            connect: { id: artistId },
          },
        })),
      },
    },
  });

  if (!event) {
    return null;
  }

  return event;
};

export const updateEventOgpImageUrlOperation = async (
  id: string,
  ogpImageUrl: string
): Promise<Event | null> => {
  const event = await prismaClient.event.update({
    where: { id },
    data: { ogpImageUrl },
  });
  return event;
};

export const getEventByIdOperation = async (id: string): Promise<Event | null> => {
  const event = await prismaClient.event.findUnique({
    where: { id },
    include: {
      artists: {
        include: {
          artist: true,
        },
      },
    },
  });

  return event;
};

export const getEventsByArtistIdsOperation = async (artistIds: string[]): Promise<Event[]> => {
  const events = await prismaClient.event.findMany({
    where: {
      artists: { some: { artistId: { in: artistIds } } },
      eventDate: {
        gte: new Date(),
      },
    },
  });
  return events;
};

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
