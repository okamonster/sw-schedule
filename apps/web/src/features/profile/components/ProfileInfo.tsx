import { Avatar, Badge } from '@mantine/core';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { getRegionLabel } from '@/constants';
import type { Profile } from '@/entities/profile';

type Props = {
  profile: Profile;
};

export const ProfileInfo = ({ profile }: Props): React.ReactNode => {
  return (
    <section className="grid justify-center gap-2">
      <div className="flex justify-center">
        <Avatar src={profile?.userImageUrl} size="xl" radius="xl" className="shadow-lg">
          <FaUser size={40} />
        </Avatar>
      </div>

      <p className="text-2xl font-bold text-text-black text-center">
        {profile.userName || '名前未設定'}
      </p>

      {profile?.userDescription && (
        <p className="text-sm text-text-gray text-center break-words whitespace-pre-wrap w-[200px]">
          {profile.userDescription}
        </p>
      )}

      {profile.mainActivityRegion && (
        <div className="grid gap-1 justify-items-center">
          <p className="text-sm text-text-black font-bold">メインのエリア</p>
          <Badge
            variant="light"
            color="var(--color-text-primary)"
            leftSection={<FaMapMarkerAlt size={12} />}
          >
            {getRegionLabel(profile.mainActivityRegion)}
          </Badge>
        </div>
      )}
    </section>
  );
};
