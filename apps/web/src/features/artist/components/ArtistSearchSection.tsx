'use client';
import { useState } from 'react';
import { ArtistFilterButton } from './ArtistFilterButton';
import { ArtistSearchInput } from './ArtistSearchInput';

export function ArtistSearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (filterType: string) => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
  };

  return (
    <div className="grid gap-2">
      <ArtistSearchInput
        placeholder="アーティストを検索"
        value={searchQuery}
        onChange={setSearchQuery}
      />
      <div className="flex gap-2 overflow-x-auto">
        <ArtistFilterButton
          label="ジャンル"
          isActive={activeFilter === 'genre'}
          onClick={() => handleFilterClick('genre')}
        />
        <ArtistFilterButton
          label="地域"
          isActive={activeFilter === 'region'}
          onClick={() => handleFilterClick('region')}
        />
        <ArtistFilterButton
          label="人気順"
          isActive={activeFilter === 'popular'}
          onClick={() => handleFilterClick('popular')}
        />
        <ArtistFilterButton
          label="新着順"
          isActive={activeFilter === 'latest'}
          onClick={() => handleFilterClick('latest')}
        />
      </div>
    </div>
  );
}
