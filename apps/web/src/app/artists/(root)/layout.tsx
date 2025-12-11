import '@mantine/core/styles.css';
import '@/styles/globals.css';
import '@/styles/variables.css';
import { redirect } from 'next/navigation';
import { DefaultFooter } from '@/components/Navigations/DefaultFooter';
import { DefaultHeader } from '@/components/Navigations/DefaultHeader';
import { Footer } from '@/components/Navigations/Footer';
import { TopHeader } from '@/components/Navigations/TopHeader';
import { getCurrentUser } from '@/service/user';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (user && !user?.profile) {
    return redirect('/entry');
  }
  return (
    <div>
      {user ? <DefaultHeader user={user} title="アーティスト" /> : <TopHeader />}
      <div className={`pt-14 ${user && 'pb-14'} bg-background-light-gray min-h-[calc(100vh-56px)]`}>
        {children}
      </div>
      {user ? <DefaultFooter /> : <Footer />}
    </div>
  );
}
