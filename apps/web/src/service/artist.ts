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

export const getArtistListByQuery = async (
  query = '',
  sort = 'followers',
  order = 'desc',
  limit = 10,
  offset = 0
) => {
  const searchQuery = new URLSearchParams({
    query,
    sort,
    order,
    limit: limit.toString(),
    offset: offset.toString(),
  }).toString();

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/search?${searchQuery}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  if (!result.ok) {
    return [];
  }

  const data = await result.json();

  return data as Artist[];
};

export const getArtistById = async (id: string): Promise<Artist | null> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!result.ok) {
    return null;
  }

  const data = await result.json();

  return {
    ...data,
  } as Artist;
};
