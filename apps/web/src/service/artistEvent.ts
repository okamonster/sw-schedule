export const createArtistEvent = async (
  artistId: string,
  eventIds: string[],
  backendToken: string
): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/${artistId}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${backendToken}`,
    },
    body: JSON.stringify({ eventIds }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create artist events: ${response.status}`);
  }

  return response.json();
};
