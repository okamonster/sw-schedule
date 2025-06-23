import bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * 与えられた平文のパスワードをハッシュ化します。
 * @param plaintextPassword - ハッシュ化する平文のパスワード
 * @returns ハッシュ化されたパスワードの文字列
 */
export const hashPassword = async (plaintextPassword: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
  return hashedPassword;
};

/**
 * 与えられた平文のパスワードが、ハッシュ化されたパスワードと一致するかを検証します。
 * @param plaintextPassword - ユーザーが入力した平文のパスワード
 * @param hash - データベースに保存されているハッシュ化されたパスワード
 * @returns パスワードが一致する場合はtrue、そうでない場合はfalse
 */
export const comparePassword = async (
  plaintextPassword: string,
  hash: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plaintextPassword, hash);
  return isMatch;
};
