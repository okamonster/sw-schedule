import z from 'zod';
import type { ArtistEvent } from './artistEvent';

export type Event = {
  id: string;
  eventName: string;
  eventDescription: string;
  eventImageUrl: string;
  eventDate: Date;
  openDateTime: Date;
  startDateTime: Date;
  locatePrefecture: string;
  eventLocationName: string;
  eventLocationAddress: string;
  ticketReleaseDateTime: Date;
  ticketPrice: number;
  sameDayTicketPrice: number;
  ticketUrl: string;
  isNeedDrink: boolean;
  updatedAt: string;
  artists: ArtistEvent[];
};

export const SearchEventRequestSchema = z.object({
  keyword: z.string().optional(),
  sort: z.enum(['eventDate', 'createdAt']),
});
