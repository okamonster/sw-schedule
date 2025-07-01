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
    <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 max-w-[500px] w-full bg-white h-[56px] flex justify-around items-center border-t border-border-gray px-4">
      <div className="flex justify-around items-center w-full">
        <Link href="/artists" className={'flex flex-col items-center'}>
          <FaMusic className={`text-xl ${isArtists ? 'text-text-primary' : 'text-text-gray'}`} />
          <span className={`text-xs ${isArtists ? 'text-text-primary' : 'text-text-gray'}`}>
            アーティスト
          </span>
        </Link>
        <Link href="/events" className={'flex flex-col items-center'}>
          <FaCalendar className={`text-xl ${isEvents ? 'text-text-primary' : 'text-text-gray'}`} />
          <span className={`text-xs ${isEvents ? 'text-text-primary' : 'text-text-gray'}`}>
            イベント
          </span>
        </Link>
        <Link href="/home" className={'flex flex-col items-center'}>
          <FaHome className={`text-xl ${isHome ? 'text-text-primary' : 'text-text-gray'}`} />
          <span className={`text-xs ${isHome ? 'text-text-primary' : 'text-text-gray'}`}>
            ホーム
          </span>
        </Link>
      </div>
    </footer>
  );
};
