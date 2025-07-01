import { ActionIcon, Button, Divider, Image } from '@mantine/core';
import { notFound } from 'next/navigation';
import { FaCalendarAlt, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { DEFAULT_IMAGE_URL } from '@/constants';
import { ArtistDetailSection } from '@/features/artist/components/ArtistDetailSection';
import { ArtistScheduleCalender } from '@/features/artist/components/ArtistScheduleCalender';
import { NearestEventSection } from '@/features/artist/components/NearestEventSection';
import { getArtistById } from '@/service/artist';
import { getCurrentUser } from '@/service/user';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArtistDetailPage({ params }: Props) {
  const { id: artistId } = await params;
  const artist = await getArtistById(artistId);

  const user = await getCurrentUser();

  if (!artist) {
    return notFound();
  }

  const imageUrl = artist.artistImageUrl ? artist.artistImageUrl : DEFAULT_IMAGE_URL;

  return (
    <div className="grid gap-2">
      <div className="bg-theme h-[200px] w-full">
        <Image src={imageUrl} alt={artist.artistName} h="100%" fit="contain" />
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
        <NearestEventSection artist={artist} />
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
          <ArtistScheduleCalender artist={artist} />

          <Button color="var(--color-button-primary)" radius="lg">
            出演情報を追加
          </Button>
        </section>
      </div>
    </div>
  );
}
