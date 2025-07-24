import { LinkButton } from '@/components/Buttons/LinkButton';
import { Footer } from '@/components/Navigations/Footer';
import { TopHeader } from '@/components/Navigations/TopHeader';
import { ArtistCard } from '@/features/top/components/ArtistCard';
import { EventCard } from '@/features/top/components/EventCard';
import { UnloginHeroSection } from '@/features/top/components/UnloginHeroSection';
import dayjs from '@/libs/dayjs';
import { getArtistListByQuery } from '@/service/artist';
import { searchEvents } from '@/service/event';

export default async function Home() {
  const popularArtists = await getArtistListByQuery('', 'followers', 'desc', 10, 0);

  const events = await searchEvents('', 'eventDate', 'desc', 10, 0);

  const todayEvents = events.filter((event) => {
    return dayjs(event.eventDate).tz().isSame(dayjs(), 'day');
  });

  const upcomingEvents = events.filter((event) => {
    return dayjs(event.eventDate).tz().isSame(dayjs(), 'month');
  });

  return (
    <div className="pt-14">
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
              <ArtistCard key={artist.id} artist={artist} />
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
              <EventCard key={event.id} event={event} />
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
          </div>

          <div className="flex items-center gap-2 overflow-x-auto shrink-0 px-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
