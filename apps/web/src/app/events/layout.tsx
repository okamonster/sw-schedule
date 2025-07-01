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

  return (
    <div>
      {user ? <DefaultHeader user={user} title="イベント" /> : <TopHeader />}
      <div className={`pt-14 ${user && 'pb-14'}`}>{children}</div>
      {user ? <DefaultFooter /> : <Footer />}
    </div>
  );
}
