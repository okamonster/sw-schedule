'use client';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';

type Props = {
  title: string;
};

export const NonLoginHeader = ({ title }: Props): React.ReactNode => {
  const { back } = useRouter();
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex justify-between items-center px-4 shadow-sm h-[56px] bg-white max-w-[500px] w-full">
      {/* 左側: 戻るボタンまたはタイトル */}
      <div className="flex items-center">
        <Button variant="subtle" color="gray" onClick={back} className="p-2 hover:bg-gray-100">
          <FaChevronLeft size={16} />
        </Button>
      </div>

      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
    </header>
  );
};
