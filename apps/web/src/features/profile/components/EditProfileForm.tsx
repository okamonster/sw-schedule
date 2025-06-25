'use client';

import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import type { ProfileFormType } from '@/entities/profile';
import { FirstProfileEditFormContent } from '@/features/profile/components/FirstProfileEditFormContent';
import { ProfilePreview } from '@/features/profile/components/ProfilePreview';
import { SecondProfileEditFormContent } from '@/features/profile/components/SecondProfileEditFormContent';
import { useSteps } from '@/features/profile/hooks/useSteps';
import { useStepValidation } from '@/features/profile/hooks/useStepValidation';

type Props = {
  defaultValues: ProfileFormType;
  isEdit: boolean;
};

export const EditProfileForm = ({ defaultValues, isEdit }: Props) => {
  const { currentStep, steps, handleNext, handleBack } = useSteps();
  const { resolver } = useStepValidation(currentStep);

  const session = useSession();
  const { push } = useRouter();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    trigger,
    clearErrors,
  } = useForm<ProfileFormType>({
    mode: 'all',
    defaultValues: {
      userName: defaultValues.userName,
      userDescription: defaultValues.userDescription,
      mainActivityRegion: defaultValues.mainActivityRegion || '',
      userImageUrl: defaultValues.userImageUrl,
    },
    resolver,
  });

  const handleNextStep = async () => {
    // 現在のステップのフィールドのみバリデーション
    const fieldsToValidate =
      currentStep === 1 ? (['userName'] as const) : (['mainActivityRegion'] as const);

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      clearErrors(); // エラーをクリアしてから次のステップへ
      handleNext();
    }
  };

  // 現在のステップで必要なフィールドのみエラーチェック
  const getCurrentStepErrors = () => {
    if (currentStep === 1) {
      return {
        userName: errors.userName,
        userDescription: errors.userDescription,
      };
    }
    return {
      mainActivityRegion: errors.mainActivityRegion,
    };
  };

  const currentErrors = getCurrentStepErrors();

  const onSubmit = async (data: ProfileFormType) => {
    if (!session?.data?.backendToken) {
      return null;
    }

    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.data?.backendToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!result.ok) {
        throw new Error('Failed to create profile');
      }

      push('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="p-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        {currentStep === 1 && (
          <FirstProfileEditFormContent
            register={register}
            control={control}
            errors={currentErrors}
          />
        )}
        {currentStep === 2 && (
          <>
            <SecondProfileEditFormContent control={control} errors={currentErrors} />
            <ProfilePreview profileValues={getValues()} />
          </>
        )}
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex justify-between">
        <Button
          variant="subtle"
          color="var(--color-text-black)"
          onClick={handleBack}
          disabled={currentStep === 1}
          radius="lg"
        >
          戻る
        </Button>

        {currentStep < steps.length ? (
          <Button
            onClick={handleNextStep}
            color="var(--color-text-primary)"
            radius="lg"
            type="button"
            disabled={!isValid}
          >
            次へ
          </Button>
        ) : (
          <Button
            color="var(--color-text-primary)"
            radius="lg"
            leftSection={<FaCheck size={16} />}
            type="submit"
            disabled={!isValid}
          >
            プロフィールを作成
          </Button>
        )}
      </div>
    </form>
  );
};
