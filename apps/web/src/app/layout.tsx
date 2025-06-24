import '@/styles/globals.css';
import '@/styles/variables.css';
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body className="flex justify-center bg-theme">
        <MantineProvider>
          <SessionProvider>
            <div className="max-w-[500px] w-full h-full min-h-[100vh] bg-background-light">
              {children}
            </div>
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
