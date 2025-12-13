'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/libs/tanstackQuery';

export const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
