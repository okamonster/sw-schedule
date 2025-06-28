'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { DebouncedInput } from '@/components/Inputs/DebouncedInput';
import { type SearchArtistSchemaType, searchArtistSchema } from '@/entities/artist';

export const ArtistSearchSection = () => {
  const { push } = useRouter();
  const { control, handleSubmit } = useForm<SearchArtistSchemaType>({
    mode: 'all',
    defaultValues: {
      query: '',
    },
    resolver: zodResolver(searchArtistSchema),
  });

  const onSubmit = (data: SearchArtistSchemaType) => {
    const params = new URLSearchParams({
      query: data.query,
    });
    push(`/artists?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
      <div className="flex gap-2 w-full">
        <Controller
          control={control}
          name="query"
          render={({ field }) => (
            <DebouncedInput
              placeholder="アーティストを検索"
              delay={200}
              radius="lg"
              className="flex-1"
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

        <Button
          type="submit"
          color="var(--color-button-primary)"
          radius="lg"
          leftSection={<FaSearch size={12} />}
        >
          検索
        </Button>
      </div>
    </form>
  );
};
