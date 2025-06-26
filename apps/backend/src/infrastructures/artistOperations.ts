import type { Artist } from '@prisma/client';
import type { CreateArtistRequest } from '~/entities/artist.js';
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
