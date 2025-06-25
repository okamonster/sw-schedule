import { z } from 'zod';

export type UserProfile = {
  id: string;
  userId: string;
  userName: string;
  userImageUrl: string;
  userDescription: string;
  mainActivityRegion: string;
  createdAt: Date;
  updatedAt: Date;
};

// プロフィール作成用のスキーマ
export const createUserProfileRequestSchema = z.object({
  userName: z.string().min(1, '名前を入力してください'),
  userDescription: z.string().nullable(),
  userImageUrl: z.string().nullable(),
  mainActivityRegion: z.string().min(1, '活動地域を選択してください'),
});

export type CreateUserProfileRequest = z.infer<typeof createUserProfileRequestSchema>;

// プロフィール更新用のスキーマ
export const updateUserProfileRequestSchema = z.object({
  userName: z.string().min(1, '名前を入力してください').optional(),
  userDescription: z.string().nullable().optional(),
  userImageUrl: z.string().nullable().optional(),
  mainActivityRegion: z.string().min(1, '活動地域を選択してください').optional(),
});

export type UpdateUserProfileRequest = z.infer<typeof updateUserProfileRequestSchema>;
