import type { Artist } from './Artist';
import type { Event } from './Event';

export type ArtistEvent = {
  id: string;
  artistId: string;
  eventId: string;
  createdAt: Date;
  artist: Artist;
  event: Event;
};
