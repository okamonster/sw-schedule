import { z } from 'zod';

export const createArtistRequestSchema = z.object({
  artistName: z.string().min(1, 'アーティスト名を入力してください'),
  artistImageUrl: z.string().nullable(),
  artistDescription: z.string().nullable(),
  genre: z.string().min(1, 'ジャンルを選択してください'),
  region: z.string().min(1, '活動地域を選択してください'),
  twitterId: z.string().nullable(),
  instagramId: z.string().nullable(),
  youtubeUrl: z.string().nullable(),
});

export type CreateArtistRequest = z.infer<typeof createArtistRequestSchema>;
