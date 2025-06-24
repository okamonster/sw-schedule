'use server';

import { AuthError } from 'next-auth';
import { signIn as serverSignIn } from '@/auth';

/**
 * 資格情報（メールアドレス・パスワード）を使用してログインを試みるサーバーアクション
 * @param email ユーザーのメールアドレス
 * @param password ユーザーのパスワード
 * @returns 成功した場合はリダイレクトが発生するため何も返さない。失敗した場合はエラーメッセージを持つオブジェクトを返す。
 */
export const login = async (email?: string, password?: string) => {
  try {
    // サーバーサイドのsignInを呼び出す
    // redirect: false を指定すると、エラー時にリダイレクトせず、AuthErrorをスローする
    await serverSignIn('credentials', { email, password, redirect: false });
    // 成功した場合、この後の処理はNextAuthのミドルウェアがハンドリングし、
    // セッションクッキーが設定され、通常はページがリフレッシュされてセッションが有効になる
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'メールアドレスまたはパスワードが正しくありません。' };
        default:
          return { error: '認証中に不明なエラーが発生しました。' };
      }
    }

    // AuthError以外の予期せぬエラー
    console.error('Unexpected error during login:', error);
    // 必ず re-throw する
    throw error;
  }
};
