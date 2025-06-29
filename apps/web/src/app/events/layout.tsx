import '@mantine/core/styles.css';
import '@/styles/globals.css';
import '@/styles/variables.css';
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
      {children}
      {!user && <Footer />}
    </div>
  );
}
