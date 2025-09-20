import type { ArtistEvent } from './ArtistEvent';

export type Event = {
  id: string;
  eventName: string;
  eventDescription: string;
  eventImageUrl: string;
  eventDate: Date;
  ogpImageUrl: string;
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
  drinkOption: string;
  updatedAt: string;
  artists: ArtistEvent[];
};
