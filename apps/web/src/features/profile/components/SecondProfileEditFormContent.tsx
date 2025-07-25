'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Select } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { JAPAN_REGIONS } from '@/constants';
import {
  type ProfileFormType,
  type SecondProfileEditFormType,
  secondProfileEditFormSchema,
} from '@/entities/profile';
import { useToast } from '@/hooks/useToast';
import { ProfilePreview } from './ProfilePreview';

type Props = {
  back: () => void;
  secondStepValues: SecondProfileEditFormType;
  onChangeSecondStep: (data: SecondProfileEditFormType) => void;
  profileValues: ProfileFormType;
  saveProfile: (data: ProfileFormType) => Promise<void>;
};

export const SecondProfileEditFormContent = ({
  back,
  secondStepValues,
  onChangeSecondStep,
  profileValues,
  saveProfile,
}: Props) => {
  const { push } = useRouter();
  const { showErrorToast, showSuccessToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isValidating },
  } = useForm<SecondProfileEditFormType>({
    mode: 'all',
    defaultValues: {
      mainActivityRegion: secondStepValues.mainActivityRegion,
    },
    resolver: zodResolver(secondProfileEditFormSchema),
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <isFormValid>
  useEffect(() => {
    const values = getValues();
    onChangeSecondStep({ ...values });
  }, [getValues, onChangeSecondStep, isValidating]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await saveProfile({ ...profileValues });
      showSuccessToast('プロフィールを作成しました');
      await push('/home');
    } catch (error) {
      showErrorToast('プロフィールの作成に失敗しました');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1">
        <h2 className="text-lg font-bold text-text-black">あなたのよく行く「Gemba!」は？</h2>
        <p className="text-sm text-text-gray">あなたの主な現場の地域を選択してください</p>
      </div>

      <Controller
        control={control}
        name="mainActivityRegion"
        render={({ field }) => (
          <Select
            label="主な活動地域"
            placeholder="活動地域を選択してください"
            data={JAPAN_REGIONS}
            value={field.value}
            onChange={(value) => field.onChange(value || '')}
            error={errors.mainActivityRegion?.message}
            radius="md"
          />
        )}
      />

      <Divider />

      <ProfilePreview profileValues={profileValues} />

      <div className="flex justify-between">
        <Button variant="subtle" color="var(--color-text-black)" onClick={back} radius="lg">
          戻る
        </Button>
        <Button
          color="var(--color-text-primary)"
          radius="lg"
          leftSection={<FaCheck size={16} />}
          type="submit"
          disabled={!isValid}
          loading={isLoading}
        >
          プロフィールを作成
        </Button>
      </div>
    </form>
  );
};
