import type { DefaultSession, User as NextAuthUser } from 'next-auth';

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
  }
}

declare module 'next-auth/jwt' {
  /** JWTの型に`id`プロパティを追加します */
  interface JWT {
    id?: string;
  }
}
