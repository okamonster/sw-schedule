'use client';
import { useEffect, useState } from 'react';
import { LoginPromptModal } from './LoginPromtModal';

type Props = {
  shouldShow: boolean;
};

export const LoginPromtOnFirstLoad = ({ shouldShow }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!shouldShow) return;
    const timerId = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    return () => clearTimeout(timerId);
  }, [shouldShow]);

  return (
    <LoginPromptModal
      isModalOpen={isOpen}
      handlers={{
        onClose: () => setIsOpen(false),
      }}
    />
  );
};
