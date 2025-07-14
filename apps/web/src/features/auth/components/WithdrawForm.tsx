import { Button, Modal } from '@mantine/core';
import { useAuth } from '@/features/auth/hooks/useAuth';

type Props = {
  isModalOpen: boolean;
  handlers: {
    onClose: () => void;
  };
};

export const WithdrawModal = ({ isModalOpen, handlers }: Props) => {
  const { handleWithdraw, isLoading } = useAuth();
  return (
    <Modal opened={isModalOpen} onClose={handlers.onClose} centered size="md">
      <div className="grid gap-2">
        <p className="text-xl font-bold text-text-black text-center">退会する</p>
        <p className="text-sm text-text-black text-center">
          退会すると、あなたのアカウントとデータが完全に削除されます。この操作は取り消すことができません。
        </p>
        <div className="flex gap-6 justify-center ">
          <Button color="var(--color-text-black)" variant="transparent" onClick={handlers.onClose}>
            キャンセル
          </Button>
          <Button
            color="var(--color-background-red)"
            variant="filled"
            onClick={async () => await handleWithdraw()}
            loading={isLoading}
          >
            退会する
          </Button>
        </div>
      </div>
    </Modal>
  );
};
