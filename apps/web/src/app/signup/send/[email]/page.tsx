'use client';
import { Paper } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SignupPage() {
  const { email } = useParams();
  const decodedEmail = decodeURIComponent(email as string);

  return (
    <div className="grid gap-2 p-4">
      <Link href="/" className="flex justify-center mb-4">
        <Image src="/images/logo.webp" alt="gemba" width={130} height={50} />
      </Link>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <div className="grid gap-4">
          <h2 className="text-xl font-bold text-text-black text-center">
            送信されたメールをご確認ください
          </h2>

          <p className="text-sm text-text-gray">
            noreply@gemba-live.jpから
            <span className="font-bold">{decodedEmail}</span>
            にメールアドレス認証用メールが送信されました。
          </p>

          <p className="text-sm text-text-gray">
            メールが届かない場合は、迷惑メールフォルダをご確認ください。
          </p>
        </div>
      </Paper>

      <p className="text-center text-sm text-text-gray">
        すでにアカウントをお持ちですか？
        <Link href="/login">
          <span className="text-blue-500">ログイン</span>
        </Link>
      </p>
    </div>
  );
}
