import type { Artist, CreateArtistSchemaType } from '@/entities/artist';

export const createArtist = async (
  dto: CreateArtistSchemaType,
  backendToken: string
): Promise<Artist> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${backendToken}`,
    },
    body: JSON.stringify({ ...dto }),
  });

  if (!result.ok) {
    throw new Error('Failed to create artist');
  }

  const data = await result.json();

  return {
    ...data,
  } as Artist;
};

export const getArtistList = async (): Promise<Artist[]> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!result.ok) {
    throw new Error('Failed to get artist list');
  }

  const data = await result.json();

  return data as Artist[];
};
