import {
  MAX_FOLLOWING_ARTISTS_FREE_PLAN,
  MAX_FOLLOWING_ARTISTS_STANDARD_PLAN,
  type UserPlanType,
} from '@/constants';

export type Plan = {
  planType: UserPlanType;
  planName: string;
  planPrice: number;
  planDescription: string[];
  isRecomend: boolean;
  maxFollowingArtists: number;
};

export const plans = [
  {
    planType: 'free',
    planName: 'フリープラン',
    planPrice: 0,
    planDescription: ['推し登録できるアーティスト：3組まで'],
    isRecomend: false,
    maxFollowingArtists: MAX_FOLLOWING_ARTISTS_FREE_PLAN,
  },
  /*
  {
    planType: 'light',
    planName: 'ライトプラン',
    planPrice: 300,
    planDescription: ['広告表示なし', '推しへの登録:5組まで'],
    isRecomend: false,
    maxFollowingArtists: MAX_FOLLOWING_ARTISTS_LIGHT_PLAN,
  },*/
  {
    planType: 'standard',
    planName: 'スタンダードプラン',
    planPrice: 500,
    planDescription: ['推し登録できるアーティスト：10組まで'],
    isRecomend: true,
    maxFollowingArtists: MAX_FOLLOWING_ARTISTS_STANDARD_PLAN,
  },
  /*{
    planType: 'premium',
    planName: 'プレミアムプラン',
    planPrice: 700,
    planDescription: ['推し登録できるアーティスト：20組まで'],
    isRecomend: false,
    maxFollowingArtists: MAX_FOLLOWING_ARTISTS_PREMIUM_PLAN,
  },*/
] as const satisfies Plan[];
