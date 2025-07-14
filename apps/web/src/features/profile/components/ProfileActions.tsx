'use client';

import { Button, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { FaEdit, FaSignOutAlt, FaUserTimes } from 'react-icons/fa';
import { WithdrawModal } from '@/features/auth/components/WithdrawForm';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const ProfileActions = () => {
  const { push } = useRouter();
  const { handleLogout, isLoading } = useAuth();
  const [isWithdrawModalOpen, { open: openWithdrawModal, close: closeWithdrawModal }] =
    useDisclosure(false);

  return (
    <>
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
            loading={isLoading}
          >
            ログアウト
          </Button>
        </div>
        <Divider />
        <div className="grid gap-2 px-4">
          <Button
            fullWidth
            variant="transparent"
            color="var(--color-text-black)"
            leftSection={<FaUserTimes size={20} />}
            size="md"
            justify="flex-start"
            onClick={openWithdrawModal}
          >
            退会する
          </Button>
        </div>
      </section>
      <WithdrawModal isModalOpen={isWithdrawModalOpen} handlers={{ onClose: closeWithdrawModal }} />
    </>
  );
};
