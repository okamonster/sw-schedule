'use client';

import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const ProfileActions = () => {
  const { push } = useRouter();
  const { handleLogout } = useAuth();

  return (
    <section className="grid py-4 gap-2">
      <h2 className="text-xl font-bold text-text-black px-4">設定・管理</h2>
      <div className="grid gap-2 px-4">
        <Button
          variant="light"
          fullWidth
          justify="flex-start"
          leftSection={<FaEdit size={16} />}
          onClick={() => push('/setting/profile')}
          radius="lg"
          color="var(--color-text-primary)"
        >
          プロフィール編集
        </Button>

        <Button
          variant="light"
          fullWidth
          justify="flex-start"
          leftSection={<FaSignOutAlt size={16} />}
          onClick={handleLogout}
          radius="lg"
          color="var(--color-text-primary)"
        >
          ログアウト
        </Button>
      </div>
    </section>
  );
};
