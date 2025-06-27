import type { Artist, User } from '@prisma/client';
import z from 'zod';

export type UserArtistFollow = {
  id: string;
  userId: string;
  artistId: string;
  createdAt: Date;
  user: User;
  artist: Artist;
};

export const createUserArtistFollowRequestSchema = z.object({
  userId: z.string(),
  artistId: z.string(),
});

export type CreateUserArtistFollowRequestType = z.infer<typeof createUserArtistFollowRequestSchema>;
