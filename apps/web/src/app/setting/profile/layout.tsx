import '@mantine/core/styles.css';
import '@/styles/globals.css';
import '@/styles/variables.css';
import { DefaultHeader } from '@/components/Navigations/DefaultHeader';
import { getCurrentUser } from '@/service/user';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <div>
      {user && <DefaultHeader user={user} />}
      <div className="pt-14">{children}</div>
    </div>
  );
}
