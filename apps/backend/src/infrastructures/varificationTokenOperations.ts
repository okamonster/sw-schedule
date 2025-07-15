import { v4 as uuidv4 } from 'uuid';
import { prismaClient } from '~/libs/prisma.js';

export const createVarificationTokenOperation = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  // upsertを使用して既存のトークンを更新または新規作成
  await prismaClient.verificationToken.upsert({
    where: { email },
    update: { token, expiresAt },
    create: { email, token, expiresAt },
  });

  return token;
};

export const getVarificationTokenOperation = async (email: string) => {
  const verificationToken = await prismaClient.verificationToken.findUnique({
    where: { email },
  });

  return verificationToken;
};

export const verifyTokenOperation = async (email: string, token: string) => {
  const verificationToken = await prismaClient.verificationToken.findFirst({
    where: {
      email,
      token,
    },
  });

  if (!verificationToken) {
    throw new Error('Invalid token');
  }

  return verificationToken;
};
