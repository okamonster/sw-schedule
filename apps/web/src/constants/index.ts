export const SUPABASE_BUCKETS = {
	USERS: "users",
	ARTISTS: "artists",
} as const satisfies Record<string, string>;

export const SUPABASE_UPLOAD_PATHS = {
	USERS: "profileImages",
	ARTISTS: "artistImages",
} as const satisfies Record<string, string>;
