import type { Artist } from './artist';
import type { Event } from './event';

export type ArtistEvent = {
  id: string;
  artistId: string;
  eventId: string;
  createdAt: Date;
  artist: Artist;
  event: Event;
};
