import type { User } from '@prisma/client';
import { z } from 'zod';

export const getUserByEmailAndPasswordRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type getUserByEmailAndPasswordRequest = z.infer<
  typeof getUserByEmailAndPasswordRequestSchema
>;

export const createUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type createUserRequest = z.infer<typeof createUserRequestSchema>;

export type ResponseUserDto = Omit<User, 'password'>;
