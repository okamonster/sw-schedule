import { Avatar } from '@mantine/core';
import type { Artist } from '@repo/common';
import { FaCheck } from 'react-icons/fa';
import { DEFAULT_IMAGE_URL } from '@/constants';

type Props = {
  artist: Artist;
  handleSelect: (artist: Artist) => void;
  isSelected: boolean;
};

export const ArtistSelectButton = ({
  artist,
  handleSelect,
  isSelected,
}: Props): React.ReactNode => {
  const imageUrl = artist.artistImageUrl ? artist.artistImageUrl : DEFAULT_IMAGE_URL;
  return (
    <button
      className={`flex gap-2 rounded-md p-2 ${
        isSelected ? 'border-2 border-border-selected-light' : 'border-1 border-border-gray'
      }`}
      type="button"
      onClick={() => handleSelect(artist)}
    >
      <Avatar src={imageUrl} size="lg" />
      <div className="flex flex-1 justify-between">
        <p className="text-sm font-bold">{artist.artistName}</p>
      </div>
      {isSelected && (
        <div className="flex items-center justify-center">
          <FaCheck className="text-border-selected-light" />
        </div>
      )}
    </button>
  );
};
