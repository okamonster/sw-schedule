import Link from 'next/link';
import { FaChevronRight, FaTicket } from 'react-icons/fa6';

export const EmptyScheduleCard = (): React.ReactNode => {
  return (
    <Link
      href="/events"
      className="flex items-center justify-between gap-2 w-full p-2 rounded-md bg-gradient-to-r from-pink-50 to-pink-100 border-2 border-pink-300 shadow-lg"
    >
      <div className="flex items-center gap-2">
        <div className="grid shrink-0 p-1 items-center justify-center text-center w-[55px] h-[55px] bg-background-primary rounded-lg shadow-inner shadow-pink-500 border-2 border-border-gray">
          <FaTicket className="text-white" size={24} />
        </div>
        <div className="grid gap-1">
          <p className="text-xs text-text-gray font-bold overflow-hidden text-ellipsis whitespace-nowrap">
            予定がまだありません
          </p>
          <p className="text-md text-text-black font-bold overflow-hidden text-ellipsis whitespace-nowrap">
            今週末のイベントを探してみる？
          </p>
        </div>
      </div>
      <FaChevronRight className="text-text-primary" size={12} />
    </Link>
  );
};
