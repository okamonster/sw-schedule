'use client';

import { ActionIcon } from '@mantine/core';
import Link from 'next/link';
import { FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { SNS_LINKS } from '@/constants';
import type { Artist } from '@/entities/artist';

type Props = {
  artist: Artist;
};

export const ArtistSnsSection = ({ artist }: Props): React.ReactNode => {
  return (
    <section className="grid gap-2 w-full">
      <p className="text-sm font-bold">SNS</p>
      <div className="flex gap-2 overflow-x-auto">
        {artist.twitterId && (
          <ActionIcon
            href={`${SNS_LINKS.X}/${artist.twitterId}`}
            color="var(--color-text-white)"
            variant="light"
            radius="lg"
            size="lg"
            bg="var(--color-background-black)"
            component={Link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter size={20} />
          </ActionIcon>
        )}
        {artist.instagramId && (
          <ActionIcon
            href={`${SNS_LINKS.INSTAGRAM}/${artist.instagramId}`}
            color="var(--color-text-white)"
            variant="light"
            radius="lg"
            size="lg"
            bg="var(--color-background-primary)"
            component={Link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={20} />
          </ActionIcon>
        )}
        {artist.youtubeUrl && (
          <ActionIcon
            href={artist.youtubeUrl}
            color="var(--color-text-white)"
            variant="light"
            radius="lg"
            size="lg"
            component={Link}
            bg="var(--color-background-red)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube size={20} />
          </ActionIcon>
        )}
      </div>
    </section>
  );
};
