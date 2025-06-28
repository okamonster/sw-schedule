'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Textarea, TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageInput } from '@/components/Inputs/ImageInput';
import { SUPABASE_BUCKETS, SUPABASE_UPLOAD_PATHS } from '@/constants';
import { type FirstProfileEditFormType, firstProfileEditFormSchema } from '@/entities/profile';

type Props = {
  next: () => void;
  firstStepValues: FirstProfileEditFormType;
  onChangeFirstStep: (data: FirstProfileEditFormType) => void;
};

export const FirstProfileEditFormContent = ({
  next,
  firstStepValues,
  onChangeFirstStep,
}: Props) => {
  const {
    register,
    getValues,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FirstProfileEditFormType>({
    resolver: zodResolver(firstProfileEditFormSchema),
    mode: 'all',
    defaultValues: {
      userImageUrl: firstStepValues.userImageUrl,
      userName: firstStepValues.userName,
      userDescription: firstStepValues.userDescription,
    },
  });

  const onSubmit = (data: FirstProfileEditFormType) => {
    onChangeFirstStep(data);
    next();
  };

  useEffect(() => {
    onChangeFirstStep({
      userImageUrl: getValues('userImageUrl'),
      userName: getValues('userName'),
      userDescription: getValues('userDescription'),
    });
  }, [getValues, onChangeFirstStep]);

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1">
        <h2 className="text-lg font-bold text-text-black">プロフィール設定</h2>
        <p className="text-sm text-text-gray">プロフィール情報を入力してください</p>
      </div>

      {/* プロフィール画像 */}
      <Controller
        control={control}
        name="userImageUrl"
        render={({ field }) => (
          <ImageInput
            buketName={SUPABASE_BUCKETS.IMAGES}
            uploadPath={SUPABASE_UPLOAD_PATHS.USERS}
            value={field.value ?? ''}
            onChange={field.onChange}
            error={errors.userImageUrl?.message}
          />
        )}
      />

      <Divider />

      {/* 基本情報入力 */}
      <TextInput
        label="ユーザー名"
        placeholder="あなたのユーザー名を入力"
        {...register('userName')}
        error={errors.userName?.message}
        radius="md"
      />

      <Textarea
        label="あなたについて"
        placeholder="あなたについて教えてください"
        {...register('userDescription')}
        error={errors.userDescription?.message}
        minRows={3}
        maxRows={5}
        radius="md"
      />

      <div className="flex justify-between">
        <Button variant="subtle" color="var(--color-text-black)" disabled radius="lg">
          戻る
        </Button>
        <Button color="var(--color-text-primary)" radius="lg" type="submit" disabled={!isValid}>
          次へ
        </Button>
      </div>
    </form>
  );
};
