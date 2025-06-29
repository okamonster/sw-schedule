'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { DebouncedInput } from '@/components/Inputs/DebouncedInput';
import { AREAS } from '@/constants';
import { type SearchEventSchemaType, searchEventSchema } from '@/entities/event';

export const EventSearchSection = (): React.ReactNode => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const { control, handleSubmit } = useForm<SearchEventSchemaType>({
    mode: 'all',
    defaultValues: {
      area: '',
      keyword: '',
    },
    resolver: zodResolver(searchEventSchema),
  });

  const onSubmit = (data: SearchEventSchemaType) => {
    const params = new URLSearchParams(searchParams);
    params.set('keyword', data.keyword);
    params.set('area', data.area);
    push(`/events?${params.toString()}`);
  };

  return (
    <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="area"
        render={({ field }) => (
          <Select
            label="エリア"
            placeholder="エリアを選択"
            data={AREAS.map((area) => ({
              value: area.value,
              label: area.label,
            }))}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <div className="flex gap-2">
        <Controller
          control={control}
          name="keyword"
          render={({ field }) => (
            <DebouncedInput
              placeholder="イベントを検索"
              value={field.value}
              onChange={field.onChange}
              delay={500}
              className="flex-1"
            />
          )}
        />
        <Button color="var(--color-button-primary)" radius="lg" type="submit">
          検索
        </Button>
      </div>
    </form>
  );
};
