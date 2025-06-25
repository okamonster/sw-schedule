import { auth } from '@/auth';
import { EditProfileForm } from '@/features/profile/components/EditProfileForm';
import { getCurrentUser } from '@/service/user';

export default async function EditProfilePage() {
  const user = await getCurrentUser();
  const session = await auth();

  return <EditProfileForm profile={user?.profile} backendToken={session?.backendToken} />;
}
