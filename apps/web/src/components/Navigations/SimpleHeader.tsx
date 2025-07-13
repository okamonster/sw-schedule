'use client';
import Image from 'next/image';

export const SimpleHeader = (): React.ReactNode => {
  return (
    <header className="flex justify-center px-[10px] shadow-md h-[56px] fixed top-0 left-1/2 transform -translate-x-1/2 z-50 max-w-[500px] w-full bg-white">
      {/* 中央寄せ */}
      <Image src="/images/logo.webp" alt="gemba" width={130} height={50} />
    </header>
  );
};
