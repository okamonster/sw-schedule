import {
  FaArrowRight,
  FaBell,
  FaCalendar,
  FaHeart,
  FaMapPin,
  FaMusic,
  FaSearch,
  FaStar,
  FaUserCheck,
} from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { LinkButton } from '@/components/Buttons/LinkButton';
import { Footer } from '@/components/Navigations/Footer';
import { TopHeader } from '@/components/Navigations/TopHeader';
import { ArtistCard } from '@/features/top/components/ArtistCard';
import { FeaturesCard } from '@/features/top/components/FeaturesCard';
import { PRBadge } from '@/features/top/components/PRBadge';
import { PRButtomCard } from '@/features/top/components/PRButtomCard';
import { StepCard } from '@/features/top/components/StepCard';
import { getArtistListByQuery } from '@/service/artist';
import { getUpComingEventList } from '@/service/event';

export const FEATURES = [
  {
    title: '出演情報を一括管理',
    description:
      '複数のアイドルのスケジュールをカレンダー形式でまとめて確認。もうダブルブッキングの心配はありません。',
    icon: FaCalendar,
  },
  {
    title: '推しだけを追う',
    description: 'お気に入りのグループをフォローして、あなただけの推しリストを作成できます。',
    icon: FaHeart,
  },
  {
    title: 'チケット情報も簡単チェック',
    description:
      '絶対に行きたいライブのチケット情報を簡単に確認できます。チケットリンクの管理も必要ありません。',
    icon: FaBell,
  },
  {
    title: '現場へのアクセス',
    description: 'ライブハウスの場所やアクセス情報も連携。当日の移動もスムーズに',
    icon: FaMapPin,
  },
];

export const STEPS = [
  {
    step: '01',
    title: 'アカウント作成',
    description: 'SNS連携で30秒で登録完了。無料で始められます。',
    icon: FaUserCheck,
  },
  {
    step: '02',
    title: '推しをフォロー',
    description: '気になるアイドルやアーティストを検索してフォローしましょう。',
    icon: FaSearch,
  },
  {
    step: '03',
    title: '推しの出演情報を確認',
    description: '推しの出演情報やチケット情報を簡単に確認できます。',
    icon: FaStar,
  },
];

export default async function Home() {
  const popularArtists = await getArtistListByQuery('', 'followers', 'desc', 10, 0);

  return (
    <div className="grid gap-16 pt-14 w-full font-mplus">
      {/* Navbar */}
      <TopHeader />

      {/* Hero Section */}
      <div className="relative py-10 px-4 overflow-hidden">
        {/* Background Gradient Meshes */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-rose-200/40 to-orange-100/40 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none mix-blend-multiply" />

        <div className="relative z-10">
          <div className="grid gap-16 items-center">
            <div className="text-left grid gap-8">
              <PRBadge />
              <h1 className="text-5xl font-black leading-[1.1] text-pink-950 drop-shadow-sm font-extrabold">
                推し活ライフ、
                <br />
                <span className="text-pink-500">アップデート</span>
              </h1>

              <p className="text-xl font-bold text-pink-900/60 leading-relaxed max-w-lg">
                大好きなアーティストの出演情報も、チケット情報も、仲間とのシェアも。
                GEMBA!は、あなたの「推し活」を全力でサポートするアプリです。
              </p>

              <div className="grid gap-4">
                <LinkButton
                  href="/login"
                  variant="filled"
                  radius="lg"
                  h={55}
                  rightSection={<FaArrowRight />}
                  color="#EC407A"
                  className="shadow-lg shadow-pink-50"
                >
                  今すぐ参加する
                </LinkButton>
                <LinkButton
                  variant="white"
                  radius="lg"
                  h={55}
                  color="#EC407A"
                  leftSection={<FaSearch />}
                  className="shadow-lg shadow-pink-50"
                  href="/artists"
                >
                  推しを探す
                </LinkButton>
              </div>
            </div>

            <section className="grid gap-2">
              <p className="text-lg font-bold">人気のアーティスト</p>
              <div className="flex overflow-x-auto gap-2 shrink-0">
                {popularArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="px-4">
        <div className="grid gap-16">
          <div className="grid gap-4">
            <h2 className="text-pink-500 font-bold flex items-center justify-center gap-2">
              <IoSparkles size={16} />
              便利な機能
            </h2>
            <h3 className="text-3xl font-black text-pink-950 text-center">
              <span className="bg-gradient-to-r from-pink-100 to-rose-100 px-4 py-1 rounded-2xl">
                推し活
              </span>
              がもっと便利に
            </h3>
            <p className="text-lg font-bold text-pink-900/50">
              あなたと推しの距離を縮める、とっておきの機能。
            </p>
          </div>

          <div className="grid gap-8">
            {FEATURES.slice(0, 3).map((feature) => (
              <FeaturesCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={<feature.icon className="w-8 h-8" />}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="grid px-4 py-16 gap-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-block bg-white border border-pink-100 px-6 py-2 rounded-full font-black shadow-sm">
            <p className="text-pink-600">簡単3ステップ</p>
          </div>
          <h3 className="text-3xl font-bold text-pink-950">はじめるのはとっても簡単</h3>
        </div>

        <div className="grid gap-8">
          {STEPS.map((step) => (
            <StepCard
              key={step.title}
              step={step.step}
              title={step.title}
              description={step.description}
              icon={<step.icon size={90} strokeWidth={1.5} className="text-pink-100" />}
            />
          ))}
        </div>
      </section>
      <section className="px-4 pb-16">
        <PRButtomCard />
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
