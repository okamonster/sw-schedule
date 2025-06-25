'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, PasswordInput, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { type LoginUserSchemaType, loginUserSchema } from '@/entities/user';
import { useAuth } from '../hooks/useAuth';

export const LoginForm = (): React.ReactNode => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginUserSchemaType>({
    defaultValues: {
      email: '',
      password: '',
      isRemember: false,
    },
    mode: 'all',
    resolver: zodResolver(loginUserSchema),
  });
  const { handleLogin } = useAuth();

  const onSubmit = async (data: LoginUserSchemaType) => {
    await handleLogin(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <TextInput
        label="メールアドレス"
        placeholder="hello@gemba.com"
        {...register('email')}
        error={errors.email?.message}
      />
      <PasswordInput
        color="var(--color-text-black)"
        label="パスワード"
        placeholder="パスワードを入力"
        {...register('password')}
        error={errors.password?.message}
      />
      <Controller
        control={control}
        name="isRemember"
        render={({ field }) => (
          <Checkbox
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value}
            onBlur={field.onBlur}
            error={errors.isRemember?.message}
            label="ログイン状態を保持"
          />
        )}
      />
      <Button fullWidth color="var(--color-button-primary)" type="submit">
        ログイン
      </Button>
    </form>
  );
};
