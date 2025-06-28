import { z } from 'zod';

export const SearchEventRequestSchema = z.object({
  keyword: z.string().optional(),
  sort: z.enum(['eventDate', 'createdAt']).default('eventDate'),
  order: z.enum(['asc', 'desc']).default('desc'),
  limit: z.string().default('10'),
  offset: z.string().default('0'),
});

export type SearchEventRequest = z.infer<typeof SearchEventRequestSchema>;
