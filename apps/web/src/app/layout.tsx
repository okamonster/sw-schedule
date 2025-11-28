import '@/styles/globals.css';
import '@/styles/variables.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { OGP_IMAGE_URL } from '@/constants';

export const metadata: Metadata = {
  title: 'Gemba! - 推し活',
  description:
    'アイドル・インディーズアーティストのライブスケジュールを管理・確認できる推し活特化プラットフォーム',
  keywords: ['推し活', 'ライブ', 'スケジュール', 'アイドル', 'インディーズ', 'アーティスト'],
  authors: [{ name: 'お茶' }],
  creator: 'お茶',
  publisher: 'お茶',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gemba-live.jp'),
  openGraph: {
    title: 'Gemba! - 推し活',
    description:
      'アイドル・インディーズアーティストのライブスケジュールを管理・確認できる推し活特化プラットフォーム',
    url: 'https://gemba-live.jp',
    siteName: 'Gemba!',
    images: [
      {
        url: OGP_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Gemba! - 推し活',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemba! - 推し活',
    description:
      '地下アイドル・インディーズアーティストのライブスケジュールを管理・確認できる推し活特化プラットフォーム',
    images: [OGP_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ja" data-mantine-color-scheme="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        <ColorSchemeScript />
      </head>
      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
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
