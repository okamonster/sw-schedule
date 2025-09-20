import type { ArtistEvent } from './ArtistEvent';
import type { UserArtistFollow } from './UserArtistFollow';

export type Artist = {
  id: string;
  artistName: string;
  artistImageUrl: string;
  artistDescription: string;
  createdAt: Date;
  updatedAt: Date;
  genre: string;
  ogpImageUrl: string;
  region: string;
  twitterId: string;
  tiktokId: string;
  instagramId: string;
  youtubeUrl: string;
  followers: UserArtistFollow[];
  events: ArtistEvent[];
};
