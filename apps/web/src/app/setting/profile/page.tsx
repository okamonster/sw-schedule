import { EditProfileForm } from '@/features/profile/components/EditProfileForm';
import { getCurrentUser } from '@/service/user';

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  return <EditProfileForm profile={user?.profile} />;
}
