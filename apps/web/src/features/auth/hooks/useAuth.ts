import { signIn, signOut } from 'next-auth/react';

export const useAuth = (): {
  handleGoogleLogin: () => Promise<void>;
  handleSignup: (email: string, password: string) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
} => {
  const handleGoogleLogin = async () => {
    try {
      await signIn('google', {
        redirectTo: '/home',
      });
    } catch (e) {
      console.error('An unexpected error occurred during sign in:', e);
    }
  };

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
        redirectTo: '/home',
        email,
        password,
      });
    } catch (e) {
      console.error('An unexpected error occurred during sign in:', e);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn('credentials', {
        redirectTo: '/home',
        email,
        password,
      });
    } catch (e) {
      console.error('An unexpected error occurred during sign in:', e);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({
        redirectTo: '/',
      });
    } catch (e) {
      console.error('An unexpected error occurred during sign out:', e);
    }
  };

  return {
    handleGoogleLogin,
    handleSignup,
    handleLogin,
    handleLogout,
  };
};
