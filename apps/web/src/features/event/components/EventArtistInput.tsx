'use client';
import { Badge, Button } from '@mantine/core';
import { useState } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { DebouncedInput } from '@/components/Inputs/DebouncedInput';
import type { Artist } from '@/entities/artist';
import { ArtistSelectButton } from '@/features/event/components/ArtistSelectButton';
import { getArtistListByQuery } from '@/service/artist';

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
};

export const EventArtistInput = ({ value, onChange, error }: Props): React.ReactNode => {
  const [search, setSearch] = useState('');
  const [artistList, setArtistList] = useState<Artist[]>([]);
  const [selectedArtistList, setSelectedArtistList] = useState<Artist[]>([]);

  const searchArtist = async () => {
    const artistList = await getArtistListByQuery(search);
    setArtistList(artistList);
  };

  const handleSelectArtist = (artist: Artist) => {
    if (isSelected(artist)) {
      setSelectedArtistList(selectedArtistList.filter((a) => a.id !== artist.id));
      onChange(value.filter((a) => a !== artist.id));
      return;
    }
    setSelectedArtistList((prev) => [...prev, artist]);
    onChange([...value, artist.id]);
  };

  const isSelected = (artist: Artist) => {
    return selectedArtistList.some((a) => a.id === artist.id);
  };

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2 p-2">
        <DebouncedInput value={search} delay={500} onChange={(value) => setSearch(value)} />
        <Button color="var(--color-button-primary)" onClick={searchArtist}>
          検索
        </Button>
      </div>

      <div className="grid gap-2">
        <p className="text-sm font-bold">選択中の出演者</p>
        <div className="flex gap-2">
          {selectedArtistList.map((artist) => (
            <Badge
              color="var(--color-button-primary)"
              key={artist.id}
              rightSection={<FaDeleteLeft />}
              onClick={() => handleSelectArtist(artist)}
            >
              {artist.artistName}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-red-500">{error}</p>
      </div>

      <div className="grid max-h-[180px] overflow-y-auto">
        {artistList.map((artist) => (
          <ArtistSelectButton
            key={artist.id}
            artist={artist}
            isSelected={isSelected(artist)}
            handleSelect={handleSelectArtist}
          />
        ))}
      </div>
    </div>
  );
};
