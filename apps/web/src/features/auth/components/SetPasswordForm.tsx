'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, TextInput } from '@mantine/core';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { type SignupSetPasswordSchemaType, signupSetPasswordSchema } from '@/entities/user';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { verifyToken } from '@/service/auth';

type Props = {
  email: string;
  token: string;
};

export const SetPasswordForm = ({ email, token }: Props): React.ReactNode => {
  const { handleSignup, isLoading } = useAuth();
  const { showErrorToast } = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupSetPasswordSchemaType>({
    defaultValues: {
      password: '',
      passwordConfirm: '',
      terms: false,
    },
    mode: 'all',
    resolver: zodResolver(signupSetPasswordSchema),
  });

  const onSubmit = async (data: SignupSetPasswordSchemaType) => {
    try {
      await verifyToken(email, token);
      await handleSignup(email, data.password);
    } catch (e) {
      showErrorToast('パスワードの設定に失敗しました');
      console.error(e);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="パスワード"
        placeholder="パスワードを入力"
        {...register('password')}
        error={errors.password?.message}
      />

      <TextInput
        label="パスワード確認"
        placeholder="パスワードを入力"
        {...register('passwordConfirm')}
        error={errors.passwordConfirm?.message}
      />

      <Controller
        control={control}
        name="terms"
        render={({ field }) => (
          <Checkbox
            label={
              <p>
                <Link
                  href="/terms"
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-blue-500">利用規約</span>
                </Link>
                に同意する
              </p>
            }
            onChange={(e) => field.onChange(e.target.checked)}
            error={errors.terms?.message}
            checked={field.value}
          />
        )}
      />

      <Button
        fullWidth
        color="var(--color-button-primary)"
        type="submit"
        radius="lg"
        loading={isLoading}
        disabled={!isValid}
      >
        パスワードを設定する
      </Button>
    </form>
  );
};
