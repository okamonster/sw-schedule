import { z } from 'zod';

export const createArtistRequestSchema = z.object({
  artistName: z.string().min(1, 'アーティスト名を入力してください'),
  artistImageUrl: z.string().min(1, 'アーティスト画像を選択してください'),
  artistDescription: z.string().nullable(),
  genre: z.string().min(1, 'ジャンルを選択してください'),
  region: z.string().min(1, '活動地域を選択してください'),
  twitterId: z.string().nullable(),
  instagramId: z.string().nullable(),
  youtubeUrl: z.string().nullable(),
});

export type CreateArtistRequest = z.infer<typeof createArtistRequestSchema>;

export const updateArtistRequestSchema = z.object({
  artistName: z.string().min(1, 'アーティスト名を入力してください'),
  artistImageUrl: z.string().min(1, 'アーティスト画像を選択してください'),
  artistDescription: z.string().nullable(),
  genre: z.string().min(1, 'ジャンルを選択してください'),
  region: z.string().min(1, '活動地域を選択してください'),
});

export type UpdateArtistRequest = z.infer<typeof updateArtistRequestSchema>;

export const searchArtistRequestSchema = z.object({
  query: z.string(),
  sort: z.enum(['followers', 'createdAt']).default('followers'),
  order: z.enum(['asc', 'desc']).default('desc'),
  limit: z.string().default('10'),
  offset: z.string().default('0'),
});

export type SearchArtistRequest = z.infer<typeof searchArtistRequestSchema>;

export type UpdateArtistDto = UpdateArtistRequest & { ogpImageUrl: string };

export const getArtistsRequestSchema = z.object({
  artistIds: z.array(z.string()),
});
