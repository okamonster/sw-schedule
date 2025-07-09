import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * `session.user`にカスタムプロパティ（例: `id`）を追加するために、
   * Sessionインターフェースを拡張します。
   */
  interface Session {
    user: {
      /** ユーザーの一意な識別子 */
      id: string;
    } & DefaultSession['user']; // `name`, `email`, `image`などのデフォルトプロパティを維持
    /** バックエンドのJWTトークン */
    backendToken?: string;
  }

  /**
   * Userインターフェースを拡張して、バックエンドのJWTトークンを含める
   */
  interface User {
    /** バックエンドのJWTトークン */
    token?: string;
  }
}

declare module 'next-auth/jwt' {
  /** JWTの型に`id`プロパティと`backendToken`プロパティを追加します */
  interface JWT {
    id?: string;
    backendToken?: string;
  }
}
