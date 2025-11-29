import { FaSearch } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { LinkButton } from '@/components/Buttons/LinkButton';

export const EmptyReccentEventCard = (): React.ReactNode => {
  return (
    <div className="flex flex-col w-[300px] h-[230px] bg-background-light/50 border-1 border-border-white p-4 rounded-3xl shadow-lg gap-4 items-center justify-center">
      <div className="flex shrink-0 items-center justify-center w-[60px] h-[60px] bg-background-pink/30 border border-white rounded-full shadow-inner">
        <FaSearch className="text-text-primary" size={24} />
      </div>
      <p className="text-md text-text-black font-bold">次のGEMBAが決まっていません</p>
      <p className="text-xs text-text-gray text-center">
        登録中のアーティストの出演予定はありません。
        <br />
        新しい推しを見つけて、現場に行こう！
      </p>
      <LinkButton
        href="/artists"
        variant="filled"
        radius="lg"
        color="var(--color-button-primary)"
        className="shadow-lg shadow-pink-50"
        leftSection={<IoSparkles />}
      >
        アーティストを探す
      </LinkButton>
    </div>
  );
};
