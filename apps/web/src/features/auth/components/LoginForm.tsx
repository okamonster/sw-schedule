import { Button, Checkbox, PasswordInput, TextInput } from '@mantine/core';

export const LoginForm = (): React.ReactNode => {
  return (
    <form>
      <TextInput label="メールアドレス" placeholder="hello@gemba.com" required />
      <PasswordInput
        color="var(--color-text-black)"
        label="パスワード"
        placeholder="パスワードを入力"
        required
        mt="md"
      />
      <Checkbox label="ログイン状態を保持" mt="lg" />
      <Button fullWidth mt="xl" color="var(--color-button-primary)" type="submit">
        ログイン
      </Button>
    </form>
  );
};
