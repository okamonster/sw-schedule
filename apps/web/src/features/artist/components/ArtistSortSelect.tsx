'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArtistFilterButton } from './ArtistFilterButton';

export const ArtistSortSelect = () => {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') ?? 'followers';
  const router = useRouter();

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', sort);
    router.push(`/artists?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      <ArtistFilterButton
        label="人気順"
        onClick={() => handleSort('followers')}
        isActive={sort === 'followers'}
      />
      <ArtistFilterButton
        label="新着順"
        onClick={() => handleSort('createdAt')}
        isActive={sort === 'createdAt'}
      />
    </div>
  );
};
