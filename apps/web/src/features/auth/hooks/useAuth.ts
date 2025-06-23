'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export const useAuth = (): {
  handleSignup: (email: string, password: string) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
} => {
  const router = useRouter();

  const handleSignup = async (email: string, password: string) => {
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!result.ok) {
        throw new Error('Failed to sign up');
      }

      await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      router.push('/');
      router.refresh();
    } catch (e) {
      console.error('An unexpected error occurred during sign in:', e);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      // NextAuthのsignIn関数を呼び出す
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push('/');
      router.refresh();

      // ログイン成功時
      // トップページに遷移し、サーバーコンポーネントを再レンダリングしてセッションを反映させる
    } catch (e) {
      console.error('An unexpected error occurred during sign in:', e);
    }
  };

  return {
    handleSignup,
    handleLogin,
  };
};
