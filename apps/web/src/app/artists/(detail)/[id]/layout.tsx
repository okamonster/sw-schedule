import '@mantine/core/styles.css';
import '@/styles/globals.css';
import '@/styles/variables.css';
import { ArtistDetailHeader } from '@/components/Navigations/ArtistDetailHeader';
import { DefaultFooter } from '@/components/Navigations/DefaultFooter';
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
    <div className="grid">
      {user ? <ArtistDetailHeader user={user} /> : <TopHeader />}
      <div className={`pt-14 ${user && 'pb-14'}`}>{children}</div>
      {user ? <DefaultFooter /> : <Footer />}
    </div>
  );
}
