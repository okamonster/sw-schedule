import { v4 as uuidv4 } from 'uuid';
import { prismaClient } from '~/libs/prisma.js';
export const createVarificationTokenOperation = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
  await prismaClient.verificationToken.create({
    data: { email, token, expiresAt },
  });

  return token;
};

export const updateVarificationTokenOperation = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
  await prismaClient.verificationToken.update({
    where: { email },
    data: { token, expiresAt },
  });

  return token;
};

export const varifyTokenOperation = async (email: string, token: string) => {
  const verificationToken = await prismaClient.verificationToken.findUnique({
    where: { email, token },
  });

  if (!verificationToken) {
    throw new Error('Invalid token');
  }

  return verificationToken;
};
