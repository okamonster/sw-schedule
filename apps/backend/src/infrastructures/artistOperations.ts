import type { Artist, Prisma } from '@prisma/client';
import type {
  CreateArtistRequest,
  SearchArtistRequest,
  UpdateArtistDto,
} from '~/entities/artist.js';
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

export const getArtistsByIdsOperation = async (ids: string[]): Promise<Artist[]> => {
  const artists = await prismaClient.artist.findMany({
    where: { id: { in: ids } },
    include: {
      followers: true,
    },
  });

  return artists;
};

export const updateArtistOperation = async (id: string, dto: UpdateArtistDto): Promise<Artist> => {
  const artist = await prismaClient.artist.update({
    where: { id },
    data: dto,
  });
  return artist;
};

export const updateArtistOgpOperation = async (
  id: string,
  ogpImageUrl: string
): Promise<Artist> => {
  const artist = await prismaClient.artist.update({
    where: { id },
    data: { ogpImageUrl },
  });
  return artist;
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

export const getArtistByIdOperation = async (id: string): Promise<Artist | null> => {
  const artist = await prismaClient.artist.findUnique({
    where: { id },
    include: {
      followers: true,
      events: {
        include: {
          event: true,
        },
      },
    },
  });

  if (!artist) {
    return null;
  }

  return artist;
};
