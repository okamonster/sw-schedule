import '@mantine/core/styles.css';
import '@/styles/globals.css';
import '@/styles/variables.css';
import { SimpleHeader } from '@/components/Navigations/SimpleHeader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SimpleHeader />
      <div className="pt-14">{children}</div>
    </div>
  );
}
