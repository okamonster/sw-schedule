import type { CreateUserProfileRequest } from '~/entities/profile.js';
import { prismaClient } from '~/libs/prisma.js';

export const createProfileOperation = async (
  userId: string,
  profile: CreateUserProfileRequest
): Promise<void> => {
  await prismaClient.userProfile.create({
    data: {
      userId,
      ...profile,
    },
  });
};
