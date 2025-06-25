import { auth } from '@/auth';
import { EditProfileForm } from '@/features/profile/components/EditProfileForm';

export default async function EntryPage() {
  const session = await auth();
  return <EditProfileForm backendToken={session?.backendToken} />;
}
