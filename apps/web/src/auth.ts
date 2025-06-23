import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// import Google from 'next-auth/providers/google';
import type { User } from '@/entities/user';

// biome-ignore lint/suspicious/noExplicitAny: NextAuthの型推論の問題
export const { handlers, signIn, signOut, auth }: any = NextAuth({
  pages: {
    signIn: '/signup',
  },
  providers: [
    // Google,
    Credentials({
      credentials: {
        email: { label: 'メールアドレス' },
        password: { label: 'パスワード' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // TODO: ここで実際にバックエンドAPIを叩いてユーザー認証を行う
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        if (!result.ok) {
          throw new Error('Failed to login');
        }

        const user: User = await result.json();

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // JWTが作成・更新されるたびに呼び出される
    // userオブジェクトは初回サインイン時のみ渡される
    jwt({ token, user }) {
      if (user) {
        token.id = user.id; // JWTにユーザーIDを格納
      }
      return token;
    },
    // セッションがチェックされるたびに呼び出される
    session({ session, token }) {
      session.user.id = token.id as string; // セッションにユーザーIDを格納
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  basePath: '/api/auth',
});
