import { prismaClient } from '~/libs/prisma.js';

export const createArtistEventOperation = async (
  artistId: string,
  eventIds: string[]
): Promise<void> => {
  await prismaClient.artistEvent.createMany({
    data: eventIds.map((eventId) => ({ artistId, eventId })),
    skipDuplicates: true,
  });
};
