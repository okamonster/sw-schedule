'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCalendar, FaHome, FaMusic } from 'react-icons/fa';

export const DefaultFooter = () => {
  const pathname = usePathname();

  const isHome = pathname.startsWith('/home');
  const isArtists = pathname.startsWith('/artists');
  const isEvents = pathname.startsWith('/events');

  return (
    <div className="px-6 py-4 fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 max-w-[500px] w-full">
      <footer className="max-w-[500px] w-full bg-background-light/70 backdrop-blur-xl h-[60px] flex justify-around items-center border border-border-white px-4 rounded-lg shadow-md">
        <div className="flex justify-around items-center w-full">
          <Link href="/artists" className={'flex flex-col items-center'}>
            <FaMusic
              color={isArtists ? 'var(--color-button-red)' : 'var(--color-text-gray)'}
              className="text-xl"
            />
            <span
              className={`text-xs ${isArtists ? 'text-[var(--color-button-red)]' : 'text-text-gray'}`}
            >
              アーティスト
            </span>
          </Link>
          <Link href="/events" className={'flex flex-col items-center'}>
            <FaCalendar
              color={isEvents ? 'var(--color-button-red)' : 'var(--color-text-gray)'}
              className="text-xl"
            />
            <span
              className={`text-xs ${isEvents ? 'text-[var(--color-button-red)]' : 'text-text-gray'}`}
            >
              イベント
            </span>
          </Link>
          <Link href="/home" className={'flex flex-col items-center'}>
            <FaHome
              color={isHome ? 'var(--color-button-red)' : 'var(--color-text-gray)'}
              className="text-xl"
            />
            <span
              className={`text-xs ${isHome ? 'text-[var(--color-button-red)]' : 'text-text-gray'}`}
            >
              ホーム
            </span>
          </Link>
        </div>
      </footer>
    </div>
  );
};
