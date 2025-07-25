'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type SignupUserSchemaType, signupUserSchema } from '@/entities/user';
import { useToast } from '@/hooks/useToast';
import { createVarificationToken } from '@/service/auth';

export const SignupForm = (): React.ReactNode => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupUserSchemaType>({
    defaultValues: {
      email: '',
    },
    mode: 'all',
    resolver: zodResolver(signupUserSchema),
  });

  const { showSuccessToast, showErrorToast } = useToast();

  const onSubmit = async (data: SignupUserSchemaType) => {
    try {
      setIsLoading(true);
      await createVarificationToken(data.email);
      showSuccessToast('メールアドレス認証用メールを送信しました');
      push(`/signup/send/${data.email}`);
    } catch (e) {
      showErrorToast('メールアドレス認証用メールの送信に失敗しました');
      console.error(e);
    } finally {
      setIsLoading(false);
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
      <p className="text-sm text-text-gray">
        noreply@gemba-live.jpからメールアドレス認証用メールが送信されます。
      </p>

      <Button
        fullWidth
        color="var(--color-button-primary)"
        type="submit"
        radius="lg"
        disabled={!isValid}
        loading={isLoading}
      >
        メールを送信する
      </Button>
    </form>
  );
};
