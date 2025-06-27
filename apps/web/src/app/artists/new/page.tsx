import { EditArtistForm } from '@/features/artist/components/EditArtistForm';

export default function CreateArtistPage() {
  return (
    <div className="px-4 py-6">
      {/* ページタイトル */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-black mb-2">新しいアーティストを追加</h1>
        <p className="text-sm text-text-gray">あなたの推しをみんなと共有しよう！</p>
      </div>

      {/* 作成フォーム */}
      <EditArtistForm />
    </div>
  );
}
