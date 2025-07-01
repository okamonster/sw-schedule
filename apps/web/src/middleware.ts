import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const protectedPaths = [
  '/entry',
  '/profile',
  '/setting',
  '/events/new',
  '/artists/new',
  '/artists/:id/edit',
  '/events/:id/edit',
];

// パスパターンマッチング関数
function matchesPathPattern(pathname: string, pattern: string): boolean {
  // パターンを正規表現に変換
  const regexPattern = pattern
    .replace(/:[^/]+/g, '[^/]+') // :id を [^/]+ に変換
    .replace(/\//g, '\\/'); // / をエスケープ

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(pathname);
}

// biome-ignore lint/suspicious/noExplicitAny: <req>
export default auth((req: any) => {
  const reqUrl = new URL(req.url);
  if (!req.auth && protectedPaths.some((pattern) => matchesPathPattern(reqUrl.pathname, pattern))) {
    return NextResponse.redirect(new URL('/', req.url));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
