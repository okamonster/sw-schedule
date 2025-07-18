import { z } from 'zod';

export const SearchEventRequestSchema = z.object({
  keyword: z.string().optional(),
  sort: z.enum(['eventDate', 'createdAt', 'thisMonth']).default('eventDate'),
  order: z.enum(['asc', 'desc']).default('desc'),
  limit: z.string().default('10'),
  offset: z.string().default('0'),
});

export type SearchEventRequest = z.infer<typeof SearchEventRequestSchema>;

export const editEventRequestSchema = z.object({
  eventName: z.string(),
  eventDescription: z.string(),
  eventImageUrl: z.string(),
  eventDate: z.string(),
  openDateTime: z.string(),
  startDateTime: z.string(),
  locatePrefecture: z.string(),
  eventLocationName: z.string(),
  eventLocationAddress: z.string(),
  ticketReleaseDateTime: z.string().optional(),
  ticketPrice: z.string(),
  sameDayTicketPrice: z.string(),
  ticketUrl: z.string(),
  isNeedDrink: z.string().transform((val) => val === 'true'),
  drinkOption: z.string(),
  artists: z.array(z.string()),
});

export type EditEventRequestType = z.infer<typeof editEventRequestSchema>;

export type EditEventRequestDto = EditEventRequestType & { ogpImageUrl: string };
