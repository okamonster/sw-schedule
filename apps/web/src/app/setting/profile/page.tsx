import { LoadingOverlay } from '@mantine/core';
import { Suspense } from 'react';
import { EditProfileForm } from '@/features/profile/components/EditProfileForm';
import { getCurrentUser } from '@/service/user';

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  console.log(user);

  return (
    <Suspense fallback={<LoadingOverlay visible={true} />}>
      <EditProfileForm profile={user?.profile} />
    </Suspense>
  );
}
