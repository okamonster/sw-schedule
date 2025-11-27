'use client';
import Image from 'next/image';
import Link from 'next/link';
import { LinkButton } from '../Buttons/LinkButton';

export const TopHeader = (): React.ReactNode => {
  return (
    <header className="flex justify-between items-center px-[10px] shadow-md h-[56px] fixed top-0 left-1/2 transform -translate-x-1/2 z-50 max-w-[500px] w-full bg-white">
      <Link href="/">
        <Image src="/images/logo.webp" alt="gemba" width={130} height={50} />
      </Link>
      <div className="flex gap-2">
        <LinkButton href="/login" variant="filled" color="var(--color-button-primary)" radius="lg">
          ログイン
        </LinkButton>
      </div>
    </header>
  );
};
