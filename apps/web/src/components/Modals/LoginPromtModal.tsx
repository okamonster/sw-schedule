'use client';
import { Modal } from '@mantine/core';
import { FaCalendar, FaCheck, FaHeart } from 'react-icons/fa';
import { LinkButton } from '../Buttons/LinkButton';

type Props = {
  isModalOpen: boolean;
  handlers: {
    onClose: () => void;
  };
};

export const LoginPromptModal = ({ isModalOpen, handlers }: Props) => {
  return (
    <Modal
      opened={isModalOpen}
      onClose={handlers.onClose}
      centered
      radius="lg"
      lockScroll
      styles={{
        content: {
          background: 'rgb(255, 255, 255, 0.8)',
          border: 'solid 3px var(--color-border-gray)',
        },

        header: {
          background: 'rgb(255, 255, 255, 0)',
        },
      }}
    >
      <div className="grid gap-2">
        <p className="text-xl font-bold text-text-black text-center">
          まだアカウントをお持ちでないですか？
        </p>
        <p className="text-sm text-text-black text-center">アカウントを作成するともっと便利に！</p>
        <div className="grid gap-2 bg-background-light/50 p-4 rounded-lg border border-border-gray">
          <div className="flex items-center gap-2">
            <div className="bg-background-light p-2 rounded-full border border-border-gray">
              <FaCheck color="var(--color-text-primary)" />
            </div>
            <p className="text-sm text-text-black">出演情報を一括管理</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-background-light p-2 rounded-full border border-border-gray">
              <FaHeart color="var(--color-text-primary)" />
            </div>
            <p className="text-sm text-text-black">推しをフォロー</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-background-light p-2 rounded-full border border-border-gray">
              <FaCalendar color="var(--color-text-primary)" />
            </div>
            <p className="text-sm text-text-black">スケジュールを簡単管理</p>
          </div>
        </div>
        <LinkButton href="/signup" variant="filled" color="var(--color-button-red)" radius="lg">
          アカウント作成
        </LinkButton>
        <LinkButton href="/login" variant="transparent" color="var(--color-button-red)" radius="lg">
          ログイン
        </LinkButton>
      </div>
    </Modal>
  );
};
