import { useEffect, useState } from 'react';

export const useDebounce = (
  value: string | number | readonly string[] | undefined,
  delay: number
): string => {
  const [debouncedValue, setDebouncedValue] = useState(String(value ?? ''));
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(String(value ?? ''));
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
