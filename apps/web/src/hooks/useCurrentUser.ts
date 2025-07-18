import { useEffect, useMemo, useState } from 'react';
import { type Plan, plans } from '@/entities/plan';
import type { User } from '@/entities/user';
import { getCurrentUserByBackendToken } from '@/service/user';
import { useBackendToken } from './useBackendToken';

export const useCurrentUser = (): {
  user: User | null;
  currentPlan: Plan;
  refetchCurrentUser: () => Promise<void>;
} => {
  const [user, setUser] = useState<User | null>(null);
  const backendToken = useBackendToken();

  useEffect(() => {
    const fetchUser = async () => {
      if (!backendToken) {
        return;
      }
      const user = await getCurrentUserByBackendToken(backendToken);
      setUser(user);
    };
    fetchUser();
  }, [backendToken]);

  const refetchCurrentUser = async () => {
    if (!backendToken) {
      return;
    }
    const user = await getCurrentUserByBackendToken(backendToken);
    setUser(user);
  };

  const currentPlan = useMemo(() => {
    const currentPlan = plans.find((plan) => plan.planType === user?.planType);
    if (!currentPlan) {
      return plans[0];
    }
    return currentPlan;
  }, [user]);

  return { user, currentPlan, refetchCurrentUser };
};
