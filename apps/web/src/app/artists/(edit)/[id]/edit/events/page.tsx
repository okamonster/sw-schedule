import { notFound } from 'next/navigation';
import { ArtistEventForm } from '@/features/artist/components/ArtistEventForm';
import { getArtistById } from '@/service/artist';
import { getCurrentUser } from '@/service/user';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditArtistPage({ params }: Props) {
  const { id: artistId } = await params;
  const artist = await getArtistById(artistId);

  const user = await getCurrentUser();

  if (!artist || !user) {
    return notFound();
  }

  return (
    <div className="px-4 py-6">
      {/* ページタイトル */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-black mb-2">出演情報を追加</h1>
      </div>
      <ArtistEventForm artist={artist} />
    </div>
  );
}
