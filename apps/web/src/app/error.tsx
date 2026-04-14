'use client';

import { useEffect } from 'react';

export const runtime = 'edge';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error: err, reset }: Props) {
  useEffect(() => {
    console.error(err);
  }, [err]);

  return (
    <div className="grid min-h-[40vh] place-items-center gap-4 px-4 py-16 text-center">
      <div className="grid gap-2">
        <h1 className="text-xl font-bold text-text-black">エラーが発生しました</h1>
        <p className="text-sm text-text-gray">しばらくしてからもう一度お試しください。</p>
      </div>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white"
      >
        再試行
      </button>
    </div>
  );
}
