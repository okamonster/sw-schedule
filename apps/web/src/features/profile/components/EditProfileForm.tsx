'use client';

import { useEffect, useState } from 'react';
import type {
  FirstProfileEditFormType,
  Profile,
  ProfileFormType,
  SecondProfileEditFormType,
} from '@/entities/profile';
import { FirstProfileEditFormContent } from '@/features/profile/components/FirstProfileEditFormContent';
import { SecondProfileEditFormContent } from '@/features/profile/components/SecondProfileEditFormContent';
import { useSteps } from '@/features/profile/hooks/useSteps';

type Props = {
  profile?: Profile;
  backendToken: string;
};

export const EditProfileForm = ({ profile, backendToken }: Props) => {
  const [firstStepValues, setFirstStepValues] = useState<FirstProfileEditFormType>({
    userName: profile?.userName ?? '',
    userDescription: profile?.userDescription ?? '',
    userImageUrl: profile?.userImageUrl ?? '',
  });

  const [secondStepValues, setSecondStepValues] = useState<SecondProfileEditFormType>({
    mainActivityRegion: profile?.mainActivityRegion ?? '',
  });

  const [profileValues, setProfileValues] = useState<ProfileFormType>({
    userName: profile?.userName ?? '',
    userDescription: profile?.userDescription ?? '',
    mainActivityRegion: profile?.mainActivityRegion ?? '',
    userImageUrl: profile?.userImageUrl ?? '',
  });

  const { currentStep, handleNext, handleBack } = useSteps();

  useEffect(() => {
    setProfileValues({
      userName: firstStepValues.userName,
      userDescription: firstStepValues.userDescription,
      mainActivityRegion: secondStepValues.mainActivityRegion,
      userImageUrl: firstStepValues.userImageUrl,
    });
  }, [firstStepValues, secondStepValues]);

  const saveProfile = async (data: ProfileFormType) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      method: profile ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${backendToken}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save profile');
    }
  };

  return (
    <div className="p-4 grid gap-4">
      <div className="grid gap-4">
        {currentStep === 1 && (
          <FirstProfileEditFormContent
            firstStepValues={firstStepValues}
            onChangeFirstStep={setFirstStepValues}
            next={handleNext}
          />
        )}
        {currentStep === 2 && (
          <SecondProfileEditFormContent
            back={handleBack}
            secondStepValues={secondStepValues}
            profileValues={profileValues}
            onChangeSecondStep={setSecondStepValues}
            saveProfile={saveProfile}
          />
        )}
      </div>
    </div>
  );
};
