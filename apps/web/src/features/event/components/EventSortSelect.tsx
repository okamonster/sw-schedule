'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterButton } from '@/components/Buttons/FilterButton';

export const EventSortSelect = (): React.ReactNode => {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') ?? 'eventDate';
  const { push } = useRouter();

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', sort);
    push(`/events?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      <FilterButton
        label="開催日順"
        isActive={sort === 'eventDate'}
        onClick={() => handleSort('eventDate')}
      />
      <FilterButton
        label="新着順"
        isActive={sort === 'createdAt'}
        onClick={() => handleSort('createdAt')}
      />
    </div>
  );
};
