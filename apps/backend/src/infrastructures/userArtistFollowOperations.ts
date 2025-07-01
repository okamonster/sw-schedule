import type { Artist, Event, Prisma, UserArtistFollow } from '@prisma/client';
import { prismaClient } from '~/libs/prisma.js';

export const getUserArtistFollowByUserAndArtistIdOperation = async (
  userId: string,
  artistId: string
): Promise<UserArtistFollow | null> => {
  const userArtistFollow = await prismaClient.userArtistFollow.findUnique({
    where: { userId_artistId: { userId, artistId } },
  });

  if (!userArtistFollow) {
    return null;
  }

  return userArtistFollow;
};

export const getUserArtistFollowsByUserIdOperation = async (
  userId: string
): Promise<UserArtistFollow[]> => {
  const followingArtists = await prismaClient.userArtistFollow.findMany({
    where: { userId },
  });

  return followingArtists;
};

export const createUserArtistFollowOperation = async (
  userId: string,
  artistId: string
): Promise<UserArtistFollow> => {
  const userArtistFollow = await prismaClient.userArtistFollow.create({
    data: { userId, artistId },
  });

  if (!userArtistFollow) {
    throw new Error('Failed to create user artist follow');
  }

  return userArtistFollow;
};

export const deleteUserArtistFollowOperation = async (
  userId: string,
  artistId: string
): Promise<void> => {
  await prismaClient.userArtistFollow.delete({
    where: {
      userId_artistId: {
        userId,
        artistId,
      },
    },
  });
};
