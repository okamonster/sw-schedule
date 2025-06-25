import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { LinkButton } from '@/components/Buttons/LinkButton';
import { Footer } from '@/components/Navigations/Footer';
import { TopHeader } from '@/components/Navigations/TopHeader';
import { ArtistCard } from '@/features/top/components/ArtistCard';
import { EventCard } from '@/features/top/components/EventCard';
import { UnloginHeroSection } from '@/features/top/components/UnloginHeroSection';

export default async function Home() {
  // モックデータ
  const todayEvents = [
    {
      id: '1',
      eventName: 'AKB48 握手会',
      artistName: 'AKB48',
      eventDate: new Date('2025-06-22T14:00:00'),
      location: '東京ドーム',
      imageUrl: '',
    },
    {
      id: '2',
      eventName: '乃木坂46 ライブ',
      artistName: '乃木坂46',
      eventDate: new Date('2025-06-22T19:00:00'),
      location: '横浜アリーナ',
      imageUrl: '',
    },
    {
      id: '3',
      eventName: '櫻坂46 サイン会',
      artistName: '櫻坂46',
      eventDate: new Date('2025-06-22T16:30:00'),
      location: '渋谷スクランブルスクエア',
      imageUrl: '',
    },
  ];

  const popularArtists = [
    {
      id: '1',
      name: 'AKB48',
      followers: 125000,
      imageUrl: '',
      isFollowing: true,
    },
    {
      id: '2',
      name: '乃木坂46',
      followers: 98000,
      imageUrl: '',
      isFollowing: false,
    },
    {
      id: '3',
      name: '櫻坂46',
      followers: 75000,
      imageUrl: '',
      isFollowing: true,
    },
    {
      id: '4',
      name: '日向坂46',
      followers: 68000,
      imageUrl: '',
      isFollowing: false,
    },
  ];

  const upcomingEvents = [
    {
      id: '1',
      eventName: 'AKB48 握手会',
      artistName: 'AKB48',
      eventDate: new Date('2025-06-22T14:00:00'),
      location: '東京ドーム',
      imageUrl: '',
    },
    {
      id: '2',
      eventName: '乃木坂46 ライブ',
      artistName: '乃木坂46',
      eventDate: new Date('2025-06-22T19:00:00'),
      location: '横浜アリーナ',
      imageUrl: '',
    },
    {
      id: '3',
      eventName: '櫻坂46 サイン会',
      artistName: '櫻坂46',
      eventDate: new Date('2025-06-22T16:30:00'),
      location: '渋谷スクランブルスクエア',
      imageUrl: '',
    },
  ];

  return (
    <div>
      <TopHeader />

      {/* ヒーローセクション */}
      <div className="w-full grid items-center">
        <UnloginHeroSection />
        <section className="grid py-4 text-center gap-2">
          <h2 className="text-xl font-bold text-text-black mt-8">出演情報見るならGEMBA!</h2>
          <p className="text-sm text-text-black">
            今月の推しのイベントっていつだっけ？
            <br />
            確認しずらい出演情報をGEMBAで簡単に確認！
          </p>
        </section>
        <section className="grid py-4 gap-2">
          <h2 className="text-xl font-bold text-text-black px-4">人気のアーティスト</h2>
          {/* はみ出したらスクロールできるようにする */}
          <div className="flex items-center gap-2 overflow-x-auto shrink-0 px-4">
            {popularArtists.map((artist) => (
              <ArtistCard
                key={artist.id}
                imageUrl={artist.imageUrl}
                artistName={artist.name}
                followersCount={artist.followers}
              />
            ))}
          </div>
          <div className="text-center">
            <LinkButton
              href="/artists"
              radius="lg"
              color="var(--color-text-primary)"
              variant="outline"
            >
              アーティストをもっと見る
            </LinkButton>
          </div>
        </section>
        <section className="grid py-4 gap-2">
          <h2 className="text-xl font-bold text-text-black px-4">今日のイベント</h2>
          <div className="flex items-center gap-2 overflow-x-auto shrink-0 px-4">
            {todayEvents.map((event) => (
              <EventCard
                key={event.id}
                imageUrl={event.imageUrl}
                eventName={event.eventName}
                location={event.location}
                eventDate={event.eventDate}
              />
            ))}
          </div>
          <div className="text-center">
            <LinkButton
              href="/events"
              radius="lg"
              color="var(--color-text-primary)"
              variant="outline"
            >
              イベントをもっと見る
            </LinkButton>
          </div>
        </section>
        <section className="grid py-4 gap-2">
          <div className="flex items-center gap-2 justify-between">
            <h2 className="text-xl font-bold text-text-black px-4">今月の注目イベント</h2>
            <LinkButton
              href="/events"
              radius="lg"
              color="var(--color-text-primary)"
              variant="transparent"
            >
              カレンダーで見る
            </LinkButton>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto shrink-0 px-4">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                imageUrl={event.imageUrl}
                eventName={event.eventName}
                location={event.location}
                eventDate={event.eventDate}
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
