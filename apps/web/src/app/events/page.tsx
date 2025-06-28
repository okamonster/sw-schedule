import { LinkButton } from '@/components/Buttons/LinkButton';
import type { Event } from '@/entities/event';
import { EventList } from '@/features/event/components/EventList';
import { EventSearchSection } from '@/features/event/components/EventSearchSection';
import { EventSortSelect } from '@/features/event/components/EventSortSelect';

type Props = {
  searchParams: Promise<{
    query: string;
    sort: string;
  }>;
};

const mockEvents: Event[] = [
  {
    id: '1',
    eventName: 'イベント1',
    eventDate: new Date(),
    eventDescription: 'イベント1の説明',
    eventImageUrl: 'https://via.placeholder.com/150',
    openDateTime: new Date(),
    startDateTime: new Date(),
    eventLocationName: 'イベント1の場所',
    eventLocationAddress: 'イベント1の住所',
    ticketReleaseDateTime: new Date(),
    ticketPrice: 1000,
    sameDayTicketPrice: 1000,
    ticketUrl: 'https://example.com',
    isNeedDrink: false,
    updatedAt: new Date().toISOString(),
    artists: [],
    locatePrefecture: '',
  },
  {
    id: '2',
    eventName: 'イベント2',
    eventDate: new Date(),
    eventDescription: 'イベント2の説明',
    eventImageUrl: 'https://via.placeholder.com/150',
    openDateTime: new Date(),
    startDateTime: new Date(),
    eventLocationName: 'イベント2の場所',
    eventLocationAddress: 'イベント2の住所',
    ticketReleaseDateTime: new Date(),
    ticketPrice: 1000,
    sameDayTicketPrice: 1000,
    ticketUrl: 'https://example.com',
    isNeedDrink: false,
    updatedAt: new Date().toISOString(),
    artists: [],
    locatePrefecture: '',
  },
  {
    id: '3',
    eventName: 'イベント3',
    eventDate: new Date(),
    eventDescription: 'イベント3の説明',
    eventImageUrl: 'https://via.placeholder.com/150',
    openDateTime: new Date(),
    startDateTime: new Date(),
    eventLocationName: 'イベント3の場所',
    eventLocationAddress: 'イベント3の住所',
    ticketReleaseDateTime: new Date(),
    ticketPrice: 1000,
    sameDayTicketPrice: 1000,
    ticketUrl: 'https://example.com',
    isNeedDrink: false,
    updatedAt: new Date().toISOString(),
    artists: [],
    locatePrefecture: '',
  },
];

export default async function EventsPage({ searchParams }: Props) {
  return (
    <div className="px-4 py-6 grid gap-4">
      {/* ページタイトル */}
      <h2 className="text-xl font-bold text-text-black">あなたの推しに会いに行こう</h2>

      {/* 検索・フィルター */}
      <EventSearchSection />
      <EventSortSelect />
      {/* アーティスト追加バナー */}
      <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg">
        <div className="grid gap-2">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-text-black mb-2">
              探しているイベントがない時は...？
            </h2>
          </div>
          <LinkButton
            href="/artists/new"
            color="var(--color-button-primary)"
            radius="lg"
            w="fit-content"
          >
            イベントを作成
          </LinkButton>
        </div>
      </div>

      {/* イベント一覧 */}
      <EventList events={mockEvents} />
    </div>
  );
}
