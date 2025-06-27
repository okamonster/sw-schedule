import type { Artist } from './artist';
import type { User } from './user';

export type UserArtistFollow = {
  id: string;
  userId: string;
  artistId: string;
  artist: Artist;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};
