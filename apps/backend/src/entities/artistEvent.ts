import { z } from 'zod';

export const createArtistEventRequestSchema = z.object({
  eventIds: z.array(z.string()),
});

export type CreateArtistEventRequest = z.infer<typeof createArtistEventRequestSchema>;
