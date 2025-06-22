import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import type { User } from '@/entities/user';

// biome-ignore lint/suspicious/noExplicitAny: NextAuthの型推論の問題
export const { handlers, signIn, signOut, auth }: any = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: 'メールアドレス' },
        password: { label: 'パスワード' },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to fetch token');
        }

        const user: User = await res.json();

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  basePath: '/api/auth',
});
