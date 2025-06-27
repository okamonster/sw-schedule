'use client';

import { TextInput } from '@mantine/core';
import type React from 'react';
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { useDebounce } from './hooks/useDebounce';

type Props = Omit<ComponentPropsWithoutRef<typeof TextInput>, 'value' | 'onChange'> & {
  value: string;
  delay: number;
  onChange: (value: string) => void; // デバウンス後に呼ばれる
};

export const DebouncedInput = ({ value, delay, onChange, ...props }: Props): React.ReactNode => {
  const [inputValue, setInputValue] = useState(String(value ?? ''));
  const debouncedValue = useDebounce(inputValue, delay);

  // デバウンス後にonChangeとdebounceActionを呼ぶ
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  // 外部からvalueが変わったら内部状態も同期
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <TextInput {...props} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
  );
};
