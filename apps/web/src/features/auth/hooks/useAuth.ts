import { signIn } from 'next-auth/react';

export const useAuth = (): {
  handleGoogleLogin: () => Promise<void>;
  handleSignup: (email: string, password: string) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
} => {
  const handleGoogleLogin = async () => {
    try {
      await signIn('google', {
        redirectTo: '/',
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
        redirectTo: '/',
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
        redirectTo: '/',
        email,
        password,
      });
    } catch (e) {
      console.error('An unexpected error occurred during sign in:', e);
    }
  };

  return {
    handleGoogleLogin,
    handleSignup,
    handleLogin,
  };
};
