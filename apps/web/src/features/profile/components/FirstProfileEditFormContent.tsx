import { Divider, Textarea, TextInput } from '@mantine/core';
import { type Control, Controller, type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { ImageInput } from '@/components/Inputs/ImageInput';
import type { ProfileFormType } from '@/entities/profile';

type Props = {
  register: UseFormRegister<ProfileFormType>;
  control: Control<ProfileFormType>;
  errors: FieldErrors<ProfileFormType>;
};

export const FirstProfileEditFormContent = ({ register, control, errors }: Props) => {
  return (
    <div className="grid gap-4">
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
    </div>
  );
};
