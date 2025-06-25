import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const protectedPaths = ['/entry', '/profile', '/setting'];

// biome-ignore lint/suspicious/noExplicitAny: <req>
export default auth((req: any) => {
  const reqUrl = new URL(req.url);
  if (!req.auth && protectedPaths.some((path) => reqUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', req.url));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
