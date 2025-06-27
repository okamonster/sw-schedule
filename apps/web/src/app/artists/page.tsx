import { LinkButton } from '@/components/Buttons/LinkButton';
import { ArtistList } from '@/features/artist/components/ArtistList';
import { ArtistSearchSection } from '@/features/artist/components/ArtistSearchSection';
import { ArtistSortSelect } from '@/features/artist/components/ArtistSortSelect';

type Props = {
  searchParams: Promise<{
    query: string;
    sort: string;
  }>;
};

export default async function ArtistsPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="px-4 py-6 grid gap-4">
      {/* ページタイトル */}
      <h2 className="text-xl font-bold text-text-black">あなたの推しを探してみよう</h2>

      {/* 検索・フィルター */}
      <ArtistSearchSection />
      <ArtistSortSelect />

      {/* アーティスト追加バナー */}
      <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg">
        <div className="grid gap-2">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-text-black mb-2">
              あなたの推しがいない時は...？ ✨
            </h2>
            <p className="text-sm text-text-gray">アーティストを追加しよう！</p>
          </div>
          <LinkButton
            href="/artists/new"
            color="var(--color-button-primary)"
            radius="lg"
            w="fit-content"
          >
            アーティストを追加
          </LinkButton>
        </div>
      </div>

      {/* アーティスト一覧 */}
      <ArtistList query={params.query} sort={params.sort} />
    </div>
  );
}
