import type { Artist, CreateArtistSchemaType, UpdateArtistSchemaType } from '@/entities/artist';

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

  const data = await result.json();

  if (!result.ok || !data) {
    throw new Error('Failed to create artist');
  }

  return {
    ...data,
  } as Artist;
};

export const updateArtist = async (
  id: string,
  dto: UpdateArtistSchemaType,
  backendToken: string
): Promise<Artist> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${backendToken}`,
    },
    body: JSON.stringify({ ...dto }),
  });

  const data = await result.json();

  if (!result.ok || !data) {
    throw new Error('Failed to update artist');
  }

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
  const data = await result.json();

  if (!result.ok || !data) {
    return null;
  }

  return {
    ...data,
  } as Artist;
};

export const getFollowingArtists = async (backendToken: string): Promise<Artist[]> => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/following-artists`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${backendToken}`,
      },
      method: 'GET',
    });

    const data = await result.json();

    if (!result.ok || !data) {
      throw new Error(`Failed to get following artists: ${result.status}`);
    }

    return data as Artist[];
  } catch (error) {
    console.error('getFollowingArtists exception:', error);
    throw error;
  }
};
