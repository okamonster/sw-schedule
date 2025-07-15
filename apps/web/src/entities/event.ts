import z from 'zod';
import type { ArtistEvent } from './artistEvent';

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

export const searchEventSchema = z.object({
  area: z.string(),
  keyword: z.string(),
});

export type SearchEventSchemaType = z.infer<typeof searchEventSchema>;

export const SearchEventRequestSchema = z.object({
  keyword: z.string().optional(),
  sort: z.enum(['eventDate', 'createdAt']),
});

export const FirstEditEventSchema = z
  .object({
    eventImageUrl: z.string(),
    eventName: z.string().min(1, 'イベント名を入力してください'),
    eventDescription: z.string(),
    eventDate: z.string().min(1, 'イベント日を入力してください'),
    openTime: z.string(),
    startTime: z.string(),
    ticketLink: z.string(),
    ticketReleaseDateTime: z.string().nullable(),
    ticketPrice: z.number().min(0, 'チケット価格を入力してください'),
    sameDayTicketPrice: z.number().min(0, '当日チケット価格を入力してください'),
    isNeedDrink: z.string(),
    drinkOption: z.string(),
  })
  .refine(
    (data) => {
      if (data.ticketLink) {
        return z.string().url().safeParse(data.ticketLink).success;
      }

      if (data.eventImageUrl) {
        return z.string().url().safeParse(data.eventImageUrl).success;
      }

      return true;
    },
    {
      message: 'チケットリンクを入力してください',
    }
  );

export type FirstEditEventSchemaType = z.infer<typeof FirstEditEventSchema>;

export const SecondEditEventSchema = z.object({
  eventLocationName: z.string(),
  eventLocationAddress: z.string(),
});

export type SecondEditEventSchemaType = z.infer<typeof SecondEditEventSchema>;

export const ThirdEditEventSchema = z.object({
  eventArtists: z.array(z.string()).min(1, '出演アーティストを選択してください'),
});

export type ThirdEditEventSchemaType = z.infer<typeof ThirdEditEventSchema>;

export const EditEventRequestSchema = z.object({
  eventName: z.string(),
  eventDescription: z.string().optional(),
  eventImageUrl: z.string().optional(),
  eventDate: z.string(),
  openDateTime: z.string(),
  startDateTime: z.string(),
  locatePrefecture: z.string(),
  eventLocationName: z.string().optional(),
  eventLocationAddress: z.string().optional(),
  ticketReleaseDateTime: z.string().optional(),
  ticketPrice: z.string(),
  sameDayTicketPrice: z.string(),
  ticketUrl: z.string().optional(),
  isNeedDrink: z.string(),
  drinkOption: z.string(),
  artists: z.array(z.string()),
});

export type EditEventRequestType = z.infer<typeof EditEventRequestSchema>;

export type GroupedEvents = {
  date: string;
  events: Event[];
};
