export const SUPABASE_BUCKETS = {
  IMAGES: 'images',
} as const satisfies Record<string, string>;

export const SUPABASE_UPLOAD_PATHS = {
  USERS: 'profileImages',
  ARTISTS: 'artistImages',
  EVENTS: 'eventImages',
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

export const ARTIST_SORT_ORDER = 'desc';
export const ARTIST_LIMIT = 10;
export const EVENT_SORT_ORDER = 'desc';
export const EVENT_LIMIT = 10;

export const AREAS = [
  { value: '', label: 'すべて' },
  { value: 'hokkaido', label: '北海道' },
  { value: 'aomori', label: '青森県' },
  { value: 'iwate', label: '岩手県' },
  { value: 'miyagi', label: '宮城県' },
  { value: 'akita', label: '秋田県' },
  { value: 'yamagata', label: '山形県' },
  { value: 'fukushima', label: '福島県' },
  { value: 'ibaraki', label: '茨城県' },
  { value: 'tochigi', label: '栃木県' },
  { value: 'gunma', label: '群馬県' },
  { value: 'saitama', label: '埼玉県' },
  { value: 'chiba', label: '千葉県' },
  { value: 'tokyo', label: '東京都' },
  { value: 'kanagawa', label: '神奈川県' },
  { value: 'niigata', label: '新潟県' },
  { value: 'toyama', label: '富山県' },
  { value: 'ishikawa', label: '石川県' },
  { value: 'fukui', label: '福井県' },
  { value: 'yamanashi', label: '山梨県' },
  { value: 'nagano', label: '長野県' },
  { value: 'gifu', label: '岐阜県' },
  { value: 'shizuoka', label: '静岡県' },
  { value: 'aichi', label: '愛知県' },
  { value: 'mie', label: '三重県' },
  { value: 'shiga', label: '滋賀県' },
  { value: 'kyoto', label: '京都府' },
  { value: 'osaka', label: '大阪府' },
  { value: 'hyogo', label: '兵庫県' },
  { value: 'nara', label: '奈良県' },
  { value: 'wakayama', label: '和歌山県' },
  { value: 'tottori', label: '鳥取県' },
  { value: 'shimane', label: '島根県' },
  { value: 'okayama', label: '岡山県' },
  { value: 'hiroshima', label: '広島県' },
  { value: 'yamaguchi', label: '山口県' },
  { value: 'tokushima', label: '徳島県' },
  { value: 'kagawa', label: '香川県' },
  { value: 'ehime', label: '愛媛県' },
  { value: 'kochi', label: '高知県' },
  { value: 'fukuoka', label: '福岡県' },
  { value: 'saga', label: '佐賀県' },
  { value: 'nagasaki', label: '長崎県' },
  { value: 'kumamoto', label: '熊本県' },
  { value: 'oita', label: '大分県' },
  { value: 'miyazaki', label: '宮崎県' },
  { value: 'kagoshima', label: '鹿児島県' },
  { value: 'okinawa', label: '沖縄県' },
] as const satisfies { value: string; label: string }[];

export type Area = (typeof AREAS)[number]['value'];

export const getAreaLabel = (value: string) => {
  return AREAS.find((area) => area.value === value)?.label || value;
};

export const DEFAULT_IMAGE_URL = '/images/placeholder.png';

export const MAX_FOLLOWING_ARTISTS_FREE_PLAN = 3;

export const SNS_LINKS = {
  X: 'https://x.com',
  INSTAGRAM: 'https://www.instagram.com',
} as const satisfies Record<string, string>;

export const OGP_IMAGE_URL =
  'https://otnrfqogjtpfuaxlvrmp.supabase.co/storage/v1/object/public/images/public/main-ogp.png' as const satisfies string;

export const PLAN_TYPES = {
  FREE: 'free',
  LIGHT: 'light',
  STANDARD: 'standard',
  PREMIUM: 'premium',
} as const satisfies {
  FREE: string;
  LIGHT: string;
  STANDARD: string;
  PREMIUM: string;
};
