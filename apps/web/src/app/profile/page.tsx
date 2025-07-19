import { Divider } from '@mantine/core';
import { redirect } from 'next/navigation';
import { PlanChangeBanner } from '@/features/profile/components/PlanChangeBanner';
import { ProfileActions } from '@/features/profile/components/ProfileActions';
import { ProfileInfo } from '@/features/profile/components/ProfileInfo';
import { getCurrentUser } from '@/service/user';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const { profile } = user;

  return (
    <div className="w-full grid items-center p-4 gap-2">
      <ProfileInfo profile={profile} />
      <PlanChangeBanner />
      <Divider />

      <ProfileActions />
    </div>
  );
}
