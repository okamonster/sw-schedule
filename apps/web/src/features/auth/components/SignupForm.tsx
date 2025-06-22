import { Anchor, Button, Checkbox, PasswordInput, TextInput } from '@mantine/core';

export const SignupForm = (): React.ReactNode => {
  return (
    <form>
      <TextInput label="メールアドレス" placeholder="hello@gemba.com" required />
      <PasswordInput label="パスワード" placeholder="パスワードを入力" required mt="md" />
      <PasswordInput
        label="パスワード (確認)"
        placeholder="再度パスワードを入力"
        required
        mt="md"
      />
      <Checkbox
        mt="lg"
        label={
          <>
            <Anchor href="/terms" target="_blank" size="sm">
              利用規約
            </Anchor>
            に同意します
          </>
        }
      />
      <Button fullWidth mt="xl" color="var(--color-button-primary)">
        サインアップ
      </Button>
    </form>
  );
};
