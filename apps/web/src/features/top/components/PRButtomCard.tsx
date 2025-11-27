import { Card } from '@mantine/core';
import { FaArrowRight } from 'react-icons/fa';
import { LinkButton } from '@/components/Buttons/LinkButton';

export const PRButtomCard = (): React.ReactNode => {
  return (
    <Card
      className="bg-gradient-to-br from-pink-500 to-rose-600 text-center relative shadow-[0_30px_60px_-15px_rgba(244,63,94,0.5)]"
      px={24}
      py={32}
      radius="lg"
      shadow="xl"
    >
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2.5px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="grid gap-6">
        <div className="inline-block bg-white/20 px-6 py-2 rounded-full font-bold border border-white/30 shadow-lg text-center">
          <p className="text-text-white">あなたの「行きたい」が見つかる。</p>
        </div>
        <h2 className="text-4xl font-bold text-text-white">さあ、推しに会いに行こう。</h2>
        <p className="text-xl font-bold text-pink-100">
          登録無料。あなたの「好き」を今すぐアップデート！
        </p>
        <LinkButton
          href="/signup"
          variant="white"
          radius="xl"
          h={55}
          color="#EC407A"
          fullWidth
          rightSection={<FaArrowRight />}
        >
          無料でアカウント作成
        </LinkButton>
      </div>
    </Card>
  );
};
