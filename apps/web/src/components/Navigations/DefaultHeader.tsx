'use client';
import { Button } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const DefaultHeader = (): React.ReactNode => {
  const router = useRouter();
  return (
    <header className="flex justify-between items-center px-[10px] shadow-md h-[50px]">
      <Image src="/images/logo.png" alt="gemba" width={130} height={50} />
      <div className="flex gap-2">
        <Button
          variant="transparent"
          color="var(--color-text-black)"
          onClick={() => router.push('/login')}
        >
          ログイン
        </Button>
      </div>
    </header>
  );
};
