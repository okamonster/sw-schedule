import z from "zod";
import type { ArtistEvent } from "./artistEvent";
import type { UserArtistFollow } from "./userArtistFollow";

export type Artist = {
	id: string;
	artistName: string;
	artistImageUrl: string;
	artistDescription: string;
	createdAt: Date;
	updatedAt: Date;
	genre: string;
	region: string;
	twitterId: string;
	instagramId: string;
	youtubeUrl: string;
	followers: UserArtistFollow[];
	events: ArtistEvent[];
};

export const createArtistSchema = z.object({
	artistName: z.string().min(1, "アーティスト名を入力してください"),
	artistImageUrl: z.string().nullable(),
	artistDescription: z.string().nullable(),
	genre: z.string().min(1, "ジャンルを選択してください"),
	region: z.string().min(1, "活動地域を選択してください"),
	twitterId: z.string().nullable(),
	instagramId: z.string().nullable(),
	youtubeUrl: z.string().nullable(),
});

export type CreateArtistSchemaType = z.infer<typeof createArtistSchema>;

export const updateArtistSchema = z.object({
	artistName: z.string().min(1, "アーティスト名を入力してください"),
	artistImageUrl: z.string().nullable(),
	artistDescription: z.string().nullable(),
	genre: z.string().min(1, "ジャンルを選択してください"),
	region: z.string().min(1, "活動地域を選択してください"),
});

export type UpdateArtistSchemaType = z.infer<typeof updateArtistSchema>;

export const searchArtistSchema = z.object({
	query: z.string(),
});

export type SearchArtistSchemaType = z.infer<typeof searchArtistSchema>;
