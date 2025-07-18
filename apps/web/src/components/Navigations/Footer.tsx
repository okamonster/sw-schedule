'use client';
import { ActionIcon } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import { useSnsShare } from '@/hooks/useSnsShare';

export const Footer = () => {
  const { shareX } = useSnsShare();

  return (
    <footer className="bg-slate-800 text-slate-200">
      <div className="container mx-auto px-6 py-16 text-center">
        {/* 上段: ブランド、ナビ */}
        <div className="mb-12">
          <div className="flex justify-center mb-4">
            <Image src="/images/logo.webp" alt="GEMBA!" width={150} height={50} />
          </div>
          <p className="text-slate-400 mb-8">あなたの「行きたい」が見つかる。</p>

          {/* 主要ナビリンク */}
          <nav className="flex justify-center gap-6 md:gap-8 mb-12">
            <Link href="/terms" className="text-text-white">
              利用規約
            </Link>
            <Link href="/privacy" className="text-text-white">
              プライバシーポリシー
            </Link>
          </nav>

          <nav className="flex justify-center gap-6 md:gap-8 mb-12">
            <Link href="/asct" className="text-text-white">
              特定商法取引法に基づく表記
            </Link>
          </nav>
        </div>

        {/* 下段: コピーライト、SNS、その他リンク */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-text-gray text-sm">&copy; 2025 GEMBA!. All Rights Reserved.</p>

          <div className="flex items-center gap-x-6 order-1 md:order-2">
            <div className="grid  gap-2">
              <ActionIcon
                variant="transparent"
                color="var(--color-text-white)"
                className="hover:bg-transparent"
                onClick={() =>
                  shareX(
                    'あなたの推しの次の出演予定はいつ？\n推し活するならGEMBA!',
                    'https://gemba-live.jp',
                    ['Gemba', '推し活するならGemba']
                  )
                }
              >
                <FaXTwitter size={20} />
              </ActionIcon>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
