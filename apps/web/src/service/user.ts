import { auth } from '@/auth';
import type { User } from '@/entities/user';

export const getCurrentUser = async (): Promise<User | null> => {
  const session = await auth();

  if (!session?.backendToken) {
    return null;
  }

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.backendToken}`,
    },
  });

  const data = await result.json();

  if (!result.ok || !data) {
    return null;
  }

  return {
    ...data,
  } as User;
};
