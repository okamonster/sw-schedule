import { ActionIcon, Button, Divider, Image } from '@mantine/core';
import { notFound } from 'next/navigation';
import { FaCalendarAlt, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { LinkButton } from '@/components/Buttons/LinkButton';
import { DEFAULT_IMAGE_URL } from '@/constants';
import { ArtistDetailSection } from '@/features/artist/components/ArtistDetailSection';
import { ArtistScheduleCalender } from '@/features/artist/components/ArtistScheduleCalender';
import { ArtistSnsSection } from '@/features/artist/components/ArtistSnsSection';
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

        <ArtistSnsSection artist={artist} />
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

          {user ? (
            <Button color="var(--color-button-primary)" radius="lg">
              出演情報を追加
            </Button>
          ) : (
            <LinkButton color="var(--color-button-primary)" radius="lg" href="/login">
              ログインして出演情報を追加
            </LinkButton>
          )}
        </section>
      </div>
    </div>
  );
}
