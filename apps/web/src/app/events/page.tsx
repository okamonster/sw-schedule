import { LinkButton } from '@/components/Buttons/LinkButton';
import { EventList } from '@/features/event/components/EventList';
import { EventSearchSection } from '@/features/event/components/EventSearchSection';
import { EventSortSelect } from '@/features/event/components/EventSortSelect';
import { getCurrentUser } from '@/service/user';

type Props = {
  searchParams: Promise<{
    keyword: string;
    sort: string;
  }>;
};

export default async function EventsPage({ searchParams }: Props) {
  const { keyword, sort } = await searchParams;

  const currentUser = await getCurrentUser();
  return (
    <div className="px-4 py-6 grid gap-4">
      {/* ページタイトル */}
      <h2 className="text-xl font-bold text-text-black">あなたの推しに会いに行こう</h2>

      {/* 検索・フィルター */}
      <EventSearchSection />
      <EventSortSelect />
      {/* イベント追加バナー */}
      <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg">
        <div className="grid gap-2">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-text-black mb-2">
              探しているイベントがない時は...？
            </h2>
          </div>
          {currentUser ? (
            <LinkButton
              href="/events/new"
              color="var(--color-button-primary)"
              radius="lg"
              w="fit-content"
            >
              イベントを作成
            </LinkButton>
          ) : (
            <LinkButton
              href="/login"
              color="var(--color-button-primary)"
              radius="lg"
              w="fit-content"
            >
              ログイン
            </LinkButton>
          )}
        </div>
      </div>

      {/* イベント一覧 */}
      <EventList keyword={keyword} sort={sort} />
    </div>
  );
}
