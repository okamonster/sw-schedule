import { useSession } from 'next-auth/react';

export const useBackendToken = (): string | null => {
  const session = useSession();

  if (!session.data?.backendToken) {
    return null;
  }

  return session.data.backendToken;
};
