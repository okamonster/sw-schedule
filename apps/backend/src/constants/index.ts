export const RATE_LIMIT_KEY = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  GOOGLE: 'google',
};

export const RATE_LIMIT_LIMIT = {
  LOGIN: 5,
  SIGNUP: 3,
  GOOGLE: 5,
};

export const RATE_LIMIT_WINDOW_MS = {
  LOGIN: 60000,
};

export const LOGO_IMAGE_PATH =
  'https://otnrfqogjtpfuaxlvrmp.supabase.co/storage/v1/object/public/images/public/logo.webp' as const satisfies string;

export const OGP_IMAGE_URL =
  'https://otnrfqogjtpfuaxlvrmp.supabase.co/storage/v1/object/public/images/public/main-ogp.png' as const satisfies string;
