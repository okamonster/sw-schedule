'use client';

import { Button } from '@mantine/core';
import Link from 'next/link';

export const PlanChangeBanner = (): React.ReactNode => {
  return (
    <Link
      href="/plan"
      className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg text-text-black px-4 py-2 rounded-md grid gap-2"
    >
      <p className="text-lg font-bold mb-2">有料プランに変更すると...</p>
      <p className="text-sm mb-2">
        もっとたくさんのアーティストを推しに登録できます！
        <br />
        プランを変更してみませんか？
      </p>

      <Button color="var(--color-button-primary)" radius="lg" fullWidth>
        プランを変更する
      </Button>
    </Link>
  );
};
