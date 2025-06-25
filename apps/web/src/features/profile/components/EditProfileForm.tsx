'use client';

import { Button } from '@mantine/core';
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
};

export const EditProfileForm = ({ defaultValues }: Props) => {
  const { currentStep, steps, handleNext, handleBack } = useSteps();
  const { resolver } = useStepValidation(currentStep);

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

  const onSubmit = (data: ProfileFormType) => {
    // TODO: プロフィール作成APIを呼び出し
  };

  const handleNextStep = async () => {
    // 現在のステップのフィールドのみバリデーション
    const fieldsToValidate = currentStep === 1 ? ['userName'] : ['mainActivityRegion'];

    const isValid = await trigger(fieldsToValidate as any);

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
