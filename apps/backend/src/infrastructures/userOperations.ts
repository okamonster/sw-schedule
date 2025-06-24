import type { User } from '@prisma/client';
import { prismaClient } from '~/libs/prisma.js';
import { comparePassword, hashPassword } from '~/utils/password.js';

export const createUserOperation = async (email: string, password: string): Promise<User> => {
  const hashedPassword = await hashPassword(password);
  const user = await prismaClient.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return user;
};

export const createGoogleUserOperation = async (email: string): Promise<User> => {
  const user = await prismaClient.user.create({
    data: {
      email,
      password: '',
    },
  });
  return user;
};

export const getUserByEmailOperation = async (email: string): Promise<User | null> => {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

export const getUserByIdOperation = async (id: string): Promise<User | null> => {
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

export const getUserByEmailAndPasswordOperation = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.password) {
    return null;
  }

  const isPasswordMatch = await comparePassword(password, user.password);

  if (!isPasswordMatch) {
    return null;
  }

  return user;
};
