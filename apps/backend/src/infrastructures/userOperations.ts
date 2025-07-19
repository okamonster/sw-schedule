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
      followingArtists: true,
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

export const updateUserByEmailOperation = async (
  email: string,
  data: Partial<User>
): Promise<User> => {
  const user = await prismaClient.user.update({
    where: { email },
    data: {
      ...data,
    },
  });
  return user;
};

export const deleteUserByTransactionOperation = async (userId: string): Promise<void> => {
  // トランザクションで削除処理を実行
  await prismaClient.$transaction(async (tx) => {
    // ユーザー情報を取得
    const user = await tx.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // DeletedUserテーブルにデータを移行
    await tx.deletedUser.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    // ユーザーの推し登録を削除
    await tx.userArtistFollow.deleteMany({
      where: {
        userId,
      },
    });

    // ユーザープロフィールを削除
    await tx.userProfile.deleteMany({
      where: {
        userId,
      },
    });

    // Userテーブルから削除
    await tx.user.delete({
      where: {
        id: userId,
      },
    });
  });
};
