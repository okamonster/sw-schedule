import z from 'zod';

export type Profile = {
  id: string;
  userId: string;
  userName: string;
  userImageUrl: string;
  userDescription: string;
  mainActivityRegion: string; // 主な活動地域
  createdAt: Date;
  updatedAt: Date;
};

// 統一されたプロフィールフォーム型
export const profileFormSchema = z.object({
  userImageUrl: z.string().nullable(),
  userName: z.string().min(1, '名前を入力してください').max(20, '20文字以内で入力してください'),
  userDescription: z.string().max(100, '100文字以内で入力してください').nullable(),
  mainActivityRegion: z.string().min(1, '活動地域を選択してください'),
});

export type ProfileFormType = z.infer<typeof profileFormSchema>;

export const firstProfileEditFormSchema = z.object({
  userImageUrl: z.string().nullable(),
  userName: z.string().min(1, '名前を入力してください').max(20, '20文字以内で入力してください'),
  userDescription: z.string().max(100, '100文字以内で入力してください').nullable(),
});

export type FirstProfileEditFormType = z.infer<typeof firstProfileEditFormSchema>;

export const secondProfileEditFormSchema = z.object({
  mainActivityRegion: z.string().min(1, '活動地域を選択してください'),
});

export type SecondProfileEditFormType = z.infer<typeof secondProfileEditFormSchema>;
