export const SUPABASE_BUCKETS = {
  USERS: 'users',
  ARTISTS: 'artists',
} as const satisfies Record<string, string>;

export const SUPABASE_UPLOAD_PATHS = {
  USERS: 'profileImages',
  ARTISTS: 'artistImages',
} as const satisfies Record<string, string>;

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

//アーティストジャンル
export const ARTIST_GENRES = [
  { value: 'idol', label: 'アイドル' },
  { value: 'rock', label: 'ロック' },
  { value: 'jpop', label: 'J-POP' },
  { value: 'kpop', label: 'K-POP' },
  { value: 'anime', label: 'アニメソング' },
  { value: 'game', label: 'ゲーム音楽' },
  { value: 'other', label: 'その他' },
] as const satisfies { value: string; label: string }[];

export type ArtistGenre = (typeof ARTIST_GENRES)[number]['value'];

export const getGenreLabel = (value: string) => {
  return ARTIST_GENRES.find((genre) => genre.value === value)?.label || value;
};
