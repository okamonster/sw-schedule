'use client';
import { Paper } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams, usePathname, useSearchParams } from 'next/navigation';
import { SetPasswordForm } from '@/features/auth/components/SetPasswordForm';

export default function SignupConfirmPage() {
  const { email } = useParams();
  const decodedEmail = decodeURIComponent(email as string);
  const searchParams = useSearchParams();
  const token = decodeURIComponent(searchParams.get('token') || '');

  if (!email || !token) {
    return notFound();
  }

  return (
    <div className="grid gap-2 p-4">
      <Link href="/" className="flex justify-center mb-4">
        <Image src="/images/logo.webp" alt="gemba" width={130} height={50} />
      </Link>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <div className="grid gap-2">
          <p className="text-center text-lg font-bold">パスワードを設定</p>
          <p className="text-center text-sm text-text-gray">
            パスワードを設定してアカウントを作成します。
          </p>
          <SetPasswordForm email={decodedEmail} token={token} />
        </div>
      </Paper>
    </div>
  );
}
