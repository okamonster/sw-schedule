'use client';
import Image from 'next/image';

export const SimpleHeader = (): React.ReactNode => {
  return (
    <header className="flex justify-center px-[10px] shadow-md h-[50px]">
      {/* 中央寄せ */}
      <Image src="/images/logo.png" alt="gemba" width={130} height={50} />
    </header>
  );
};
