import { useRouter } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useBackendToken } from '@/hooks/useBackendToken';
import { useToast } from '@/hooks/useToast';
import { deleteUser } from '@/service/user';

export const useAuth = (): {
  handleGoogleLogin: () => Promise<void>;
  handleSignup: (email: string, password: string) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleWithdraw: () => Promise<void>;
  isLoading: boolean;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const { showErrorToast, showSuccessToast } = useToast();
  const backendToken = useBackendToken();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn('google', {
        redirectTo: '/home',
      });

      showSuccessToast('ログインに成功しました');
    } catch (e) {
      showErrorToast('ログインに失敗しました');
      console.error('An unexpected error occurred during sign in:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!result.ok) {
        throw new Error('Failed to sign up');
      }

      const signInRes = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (signInRes.error) {
        throw new Error(signInRes.error);
      }

      showSuccessToast('サインアップに成功しました');

      push('/home');
    } catch (e) {
      showErrorToast('サインアップに失敗しました');
      console.error('An unexpected error occurred during sign up:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const signInRes = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (signInRes.error) {
        throw new Error(signInRes.error);
      }

      showSuccessToast('ログインに成功しました');

      push('/home');
    } catch (e) {
      showErrorToast('ログインに失敗しました');
      console.error('An unexpected error occurred during sign in:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut({
        redirect: false,
      });

      showSuccessToast('ログアウトに成功しました');

      push('/');
    } catch (e) {
      showErrorToast('ログアウトに失敗しました');
      console.error('An unexpected error occurred during sign out:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);

      if (!backendToken) {
        throw new Error('ログインしていません');
      }

      await deleteUser(backendToken);

      // ログアウト処理
      await signOut({
        redirect: false,
      });

      showSuccessToast('退会処理が完了しました');

      push('/');
    } catch (e) {
      showErrorToast('退会処理に失敗しました');
      console.error('An unexpected error occurred during withdrawal:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleGoogleLogin,
    handleSignup,
    handleLogin,
    handleLogout,
    handleWithdraw,
    isLoading,
  };
};
