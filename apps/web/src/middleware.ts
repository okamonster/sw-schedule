import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const protectedPaths = ['/entry', '/profile'];

// biome-ignore lint/suspicious/noExplicitAny: <req>
export default auth((req: any) => {
  const reqUrl = new URL(req.url);
  if (!req.auth && protectedPaths.includes(reqUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
