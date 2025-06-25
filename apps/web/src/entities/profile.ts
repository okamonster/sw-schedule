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
  userName: z.string().min(1, '名前を入力してください'),
  userDescription: z.string().nullable(),
  mainActivityRegion: z.string().min(1, '活動地域を選択してください'),
});

export type ProfileFormType = z.infer<typeof profileFormSchema>;

// ステップ別バリデーション用のスキーマ
export const createStepSchema = (step: number) => {
  const baseSchema = z.object({
    userImageUrl: z.string().nullable(),
    userName: z.string(),
    userDescription: z.string().nullable(),
    mainActivityRegion: z.string(),
  });

  switch (step) {
    case 1:
      return baseSchema.refine(
        (data) => {
          return data.userName && data.userName.trim().length > 0;
        },
        {
          message: '名前を入力してください',
          path: ['userName'],
        }
      );
    case 2:
      return baseSchema.refine(
        (data) => {
          return data.mainActivityRegion && data.mainActivityRegion.trim().length > 0;
        },
        {
          message: '活動地域を選択してください',
          path: ['mainActivityRegion'],
        }
      );
    default:
      return profileFormSchema;
  }
};

// 日本の地方データ
export const JAPAN_REGIONS = [
  { value: 'hokkaido', label: '北海道' },
  { value: 'tohoku', label: '東北' },
  { value: 'kanto', label: '関東' },
  { value: 'chubu', label: '中部' },
  { value: 'kansai', label: '関西' },
  { value: 'chugoku', label: '中国' },
  { value: 'shikoku', label: '四国' },
  { value: 'kyushu', label: '九州・沖縄' },
] as const satisfies { value: string; label: string }[];

export type JapanRegion = (typeof JAPAN_REGIONS)[number]['value'];

export const getRegionLabel = (value: string) => {
  return JAPAN_REGIONS.find((region) => region.value === value)?.label || value;
};
