import '@mantine/core/styles.css';
import '@/styles/globals.css';
import '@/styles/variables.css';
import { redirect } from 'next/navigation';
import { DefaultFooter } from '@/components/Navigations/DefaultFooter';
import { DefaultHeader } from '@/components/Navigations/DefaultHeader';
import { getCurrentUser } from '@/service/user';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user?.profile) {
    redirect('/entry');
  }

  return (
    <div>
      <DefaultHeader user={user} title="ホーム" showBackButton={false} />
      <div className="pt-14 pb-20 bg-background-light-gray min-h-[calc(100vh-56px)]">
        {children}
      </div>
      <DefaultFooter />
    </div>
  );
}
