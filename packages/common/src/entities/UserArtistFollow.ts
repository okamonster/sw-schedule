import type { Artist } from './Artist';
import type { User } from './User';

export type UserArtistFollow = {
  id: string;
  userId: string;
  artistId: string;
  artist: Artist;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};
