import type { Profile } from './Profile';
import type { UserArtistFollow } from './UserArtistFollow';

export type User = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profile: Profile;
  followingArtists: UserArtistFollow[];
};
