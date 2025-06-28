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

export const createFirstEditEventSchema = z.object({
  eventImageUrl: z.string().url('イベント画像を入力してください'),
  eventName: z.string().min(1, 'イベント名を入力してください'),
  eventDescription: z.string().nullable(),
  eventDate: z.string().min(1, 'イベント日を入力してください'),
  openTime: z.string().min(1, 'イベント開始時間を入力してください'),
  startTime: z.string().min(1, 'イベント開始時間を入力してください'),
  ticketLink: z.string().url('チケットリンクを入力してください'),
  ticketReleaseDateTime: z.string().nullable(),
  ticketPrice: z.number().min(0, 'チケット価格を入力してください'),
  sameDayTicketPrice: z.number().min(0, '当日チケット価格を入力してください'),
  isNeedDrink: z.boolean(),
});

export type CreateFirstEditEventSchemaType = z.infer<typeof createFirstEditEventSchema>;
