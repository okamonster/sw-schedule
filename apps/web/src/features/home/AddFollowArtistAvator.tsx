import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export const AddFollowArtistAvator = (): React.ReactNode => {
  return (
    <Link href="/artists" className="grid gap-2 items-center justify-center text-center">
      <div className="grid shrink-0 p-1 items-center justify-center text-center w-[55px] h-[55px] bg-background-light/50 rounded-full shadow-inner border-2 border-border-gray">
        <FaPlus className="text-text-gray" />
      </div>
      <p className="text-xs text-text-gray">推しを追加</p>
    </Link>
  );
};
