/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Next.jsの静的アセット（ビルド時にハッシュが付くファイル）
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // publicフォルダの静的ファイル（画像、アイコン、フォントなど）
        source: '/:path*\\.(jpg|jpeg|gif|png|svg|ico|webp|woff|woff2|ttf|eot|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
