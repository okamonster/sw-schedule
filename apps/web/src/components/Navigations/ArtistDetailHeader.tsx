'use client';

import { Avatar, Button } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';
import type { User } from '@/entities/user';

type Props = {
  user: User;
};

export const ArtistDetailHeader = ({ user }: Props): React.ReactNode => {
  const { push } = useRouter();

  const handleBackClick = () => {
    push('/artists');
  };

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex justify-between items-center px-4 shadow-sm h-[56px] bg-white max-w-[500px] w-full">
      <div className="flex items-center">
        <Button
          variant="subtle"
          color="gray"
          onClick={handleBackClick}
          className="p-2 hover:bg-gray-100"
        >
          <FaChevronLeft size={16} />
        </Button>
      </div>

      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold text-gray-900">アーティスト</h1>
      </div>

      {/* 右側: プロフィールアバター */}
      <div className="flex items-center">
        <Link href="/profile">
          <Avatar
            src={user.profile?.userImageUrl}
            size="md"
            alt={'profile'}
            className="border-2 border-text-gray"
          />
        </Link>
      </div>
    </header>
  );
};
