import type { UserArtistFollow } from '@/entities/userArtistFollow';

export const getUserArtistFollow = async (
  backendToken: string,
  artistId: string
): Promise<UserArtistFollow | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/${artistId}/follow`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${backendToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data) {
    return null;
  }

  return { ...data } as UserArtistFollow;
};

export const createUserArtistFollow = async (
  backendToken: string,
  artistId: string
): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/${artistId}/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${backendToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to create user artist follow');
  }
};

export const deleteUserArtistFollow = async (
  backendToken: string,
  artistId: string
): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/${artistId}/follow`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${backendToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete user artist follow');
  }
};
