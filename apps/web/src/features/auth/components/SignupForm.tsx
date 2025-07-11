'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Anchor, Button, Checkbox, PasswordInput, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { type SignupUserSchemaType, signupUserSchema } from '@/entities/user';
import { useAuth } from '../hooks/useAuth';

export const SignupForm = (): React.ReactNode => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupUserSchemaType>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      terms: false,
    },
    mode: 'all',
    resolver: zodResolver(signupUserSchema),
  });
  const { handleSignup, isLoading } = useAuth();

  const onSubmit = async (data: SignupUserSchemaType) => {
    try {
      await handleSignup(data.email, data.password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="メールアドレス"
        placeholder="hello@gemba.com"
        {...register('email')}
        error={errors.email?.message}
      />
      <PasswordInput
        label="パスワード"
        placeholder="パスワードを入力"
        {...register('password')}
        error={errors.password?.message}
      />
      <PasswordInput
        label="パスワード (確認)"
        placeholder="再度パスワードを入力"
        {...register('passwordConfirm')}
        error={errors.passwordConfirm?.message}
      />
      <Controller
        control={control}
        name="terms"
        render={({ field }) => (
          <Checkbox
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value}
            onBlur={field.onBlur}
            error={errors.terms?.message}
            label={
              <>
                <Anchor href="/terms" target="_blank" size="sm">
                  利用規約
                </Anchor>
                に同意します
              </>
            }
          />
        )}
      />

      <Button fullWidth color="var(--color-button-primary)" type="submit" loading={isLoading}>
        サインアップ
      </Button>
    </form>
  );
};
