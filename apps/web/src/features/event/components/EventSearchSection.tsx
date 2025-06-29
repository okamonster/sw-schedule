'use client';
import { Button, Select } from '@mantine/core';
import { useState } from 'react';
import { DebouncedInput } from '@/components/Inputs/DebouncedInput';
import { AREAS } from '@/constants';

export const EventSearchSection = (): React.ReactNode => {
  const [keyword, setKeyword] = useState('');
  return (
    <section className="grid gap-2">
      <div className="flex gap-2">
        <DebouncedInput
          placeholder="イベントを検索"
          value={keyword}
          onChange={(e) => setKeyword(e)}
          delay={500}
          className="flex-1"
        />
        <Button color="var(--color-button-primary)" radius="lg">
          検索
        </Button>
      </div>

      <Select
        label="エリア"
        placeholder="エリアを選択"
        data={AREAS.map((area) => ({
          value: area.value,
          label: area.label,
        }))}
      />
    </section>
  );
};
