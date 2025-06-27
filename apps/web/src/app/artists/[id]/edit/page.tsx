import { EditArtistForm } from '@/features/artist/components/EditArtistForm';
import { getArtistById } from '@/service/artist';

type Props = {
  params: {
    id: string;
  };
};

export default async function EditArtistPage({ params }: Props) {
  const { id: artistId } = params;
  const artist = await getArtistById(artistId);

  return (
    artist && (
      <div className="px-4 py-6">
        {/* ページタイトル */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-black mb-2">アーティスト情報を編集</h1>
          <p className="text-sm text-text-gray">最新の情報へ更新しよう！</p>
        </div>

        {/* 作成フォーム */}
        <EditArtistForm artist={artist} />
      </div>
    )
  );
}
