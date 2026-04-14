import Link from 'next/link';

export const runtime = 'edge';

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-4 py-16">
      <div className="grid gap-3 text-center">
        <h1 className="text-2xl font-bold text-text-black">ページが見つかりません</h1>
        <p className="text-sm text-text-gray">
          URLが変更されたか、ページが削除された可能性があります。
        </p>
        <Link href="/" className="text-blue-500 underline">
          トップへ戻る
        </Link>
      </div>
    </div>
  );
}
