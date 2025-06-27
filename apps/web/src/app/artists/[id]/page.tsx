import { ActionIcon, Button, Divider, Image } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { notFound } from 'next/navigation';
import { FaCalendarAlt, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ArtistDetailSection } from '@/features/artist/components/ArtistDetailSection';
import { ArtistCard } from '@/features/top/components/ArtistCard';
import { getArtistById } from '@/service/artist';
import { getCurrentUser } from '@/service/user';

type Props = {
  params: {
    id: string;
  };
};

export default async function ArtistDetailPage({ params }: Props) {
  const { id: artistId } = await params;
  const artist = await getArtistById(artistId);

  const user = await getCurrentUser();

  if (!artist) {
    return notFound();
  }

  return (
    <div className="grid gap-2">
      <div className="bg-theme h-[200px] w-full">
        <Image src={artist.artistImageUrl} alt={artist.artistName} h="100%" fit="contain" />
      </div>

      <div className="grid gap-2 px-4 pb-4">
        <ArtistDetailSection artist={artist} user={user} />

        <section className="grid gap-2">
          <p className="text-sm font-bold">シェア</p>
          <div className="flex gap-2">
            <ActionIcon color="var(--color-text-black)" variant="light" radius="lg" size="lg">
              <FaXTwitter size={20} />
            </ActionIcon>
            <ActionIcon color="var(--color-text-black)" variant="light" radius="lg" size="lg">
              <FaInstagram size={20} />
            </ActionIcon>
          </div>
        </section>
        <Divider />

        <section className="grid gap-2">
          <p className="text-sm font-bold">直近のイベント</p>
        </section>
        <Divider />
        <section className="grid gap-2">
          <div className="flex justify-between">
            <p className="text-sm font-bold ">出演予定</p>
            <Button
              color="var(--color-button-primary)"
              variant="outline"
              leftSection={<FaCalendarAlt />}
              radius="lg"
              size="xs"
            >
              カレンダーに同期
            </Button>
          </div>
          <div className="flex justify-center">
            <Calendar size="lg" monthLabelFormat={'MM月'} />
          </div>
          <div className="grid overflow-y-auto" />
          <Button color="var(--color-button-primary)" radius="lg">
            出演情報を追加
          </Button>
        </section>
        <Divider />
        <section className="grid gap-2">
          <p className="text-sm font-bold">おすすめのアーティスト</p>

          <div className="flex gap-2 overflow-x-auto">
            <ArtistCard artist={artist} />
          </div>
        </section>
      </div>
    </div>
  );
}
