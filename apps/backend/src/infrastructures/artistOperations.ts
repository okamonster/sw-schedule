import type { Artist, Prisma } from '@prisma/client';
import type { CreateArtistRequest, SearchArtistRequest } from '~/entities/artist.js';
import { prismaClient } from '~/libs/prisma.js';

export const createArtistOperation = async (dto: CreateArtistRequest): Promise<Artist> => {
  const artist = await prismaClient.artist.create({
    data: {
      ...dto,
    },
  });
  return artist;
};

export const getArtistsOperation = async (): Promise<Artist[]> => {
  const artists = await prismaClient.artist.findMany();
  return artists;
};

export const searchArtistsOperation = async (query: SearchArtistRequest): Promise<Artist[]> => {
  const sortMap = {
    followers: {
      followers: {
        _count: query.order,
      },
    },
    createdAt: {
      createdAt: query.order,
    },
  } as const satisfies Record<string, Prisma.ArtistOrderByWithRelationInput>;

  const artists = await prismaClient.artist.findMany({
    where: {
      OR: [
        { artistName: { contains: query.query, mode: 'insensitive' } },
        { artistDescription: { contains: query.query, mode: 'insensitive' } },
        { genre: { contains: query.query, mode: 'insensitive' } },
        { region: { contains: query.query, mode: 'insensitive' } },
      ],
    },
    orderBy: sortMap[query.sort],
    include: {
      followers: true,
    },
    take: Number(query.limit),
    skip: Number(query.offset),
  });

  return artists;
};
