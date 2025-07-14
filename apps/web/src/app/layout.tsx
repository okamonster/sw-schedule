import '@/styles/globals.css';
import '@/styles/variables.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ja" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications position="top-center" />
          <DatesProvider settings={{ locale: 'ja' }}>
            <SessionProvider session={session}>
              <div className="flex justify-center bg-theme">
                <div className="max-w-[500px] w-full h-full min-h-[100vh] bg-background-light">
                  {children}
                </div>
              </div>
            </SessionProvider>
          </DatesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
