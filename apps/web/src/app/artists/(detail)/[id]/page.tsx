import { Divider, Image } from '@mantine/core';
import { notFound } from 'next/navigation';
import { DEFAULT_IMAGE_URL } from '@/constants';
import { ArtistDetailSection } from '@/features/artist/components/ArtistDetailSection';
import { ArtistScheduleSection } from '@/features/artist/components/ArtistScheduleSection';
import { ArtistSnsSection } from '@/features/artist/components/ArtistSnsSection';
import { NearestEventSection } from '@/features/artist/components/NearestEventSection';
import { getArtistById } from '@/service/artist';
import { getCurrentUser } from '@/service/user';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { id: artistId } = await params;
  const artist = await getArtistById(artistId);
  if (!artist) {
    return notFound();
  }

  return {
    title: artist.artistName,
    description: artist.artistDescription,
    openGraph: {
      title: artist.artistName,
      description: artist.artistDescription,
      images: [artist.ogpImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: artist.artistName,
      description: artist.artistDescription,
      images: [artist.ogpImageUrl],
    },
  };
}

export default async function ArtistDetailPage({ params }: Props) {
  const { id: artistId } = await params;
  const artist = await getArtistById(artistId);
  if (!artist) {
    return notFound();
  }

  const user = await getCurrentUser();

  const imageUrl = artist.artistImageUrl ? artist.artistImageUrl : DEFAULT_IMAGE_URL;

  return (
    <div className="grid gap-2">
      <div className="bg-theme h-[200px] w-full">
        <Image src={imageUrl} alt={artist.artistName} h="100%" fit="contain" />
      </div>

      <div className="grid gap-2 px-4 pb-4">
        <ArtistDetailSection artist={artist} user={user} />

        <ArtistSnsSection artist={artist} />
        <Divider />
        <NearestEventSection artist={artist} />
        <Divider />
        <ArtistScheduleSection user={user} artist={artist} />
      </div>
    </div>
  );
}
