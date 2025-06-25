import type { CreateUserProfileRequest, UpdateUserProfileRequest } from '~/entities/profile.js';
import { prismaClient } from '~/libs/prisma.js';

export const createUserProfileOperation = async (
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

export const updateUserProfileOperation = async (
  userId: string,
  profile: UpdateUserProfileRequest
): Promise<void> => {
  await prismaClient.userProfile.update({
    where: { userId },
    data: { ...profile },
  });
};
