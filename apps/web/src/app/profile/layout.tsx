import '@mantine/core/styles.css';
import '@/styles/globals.css';
import '@/styles/variables.css';
import { redirect } from 'next/navigation';
import { DefaultHeader } from '@/components/Navigations/DefaultHeader';
import { getCurrentUser } from '@/service/user';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <DefaultHeader user={user} title="プロフィール" />
      {children}
    </div>
  );
}
