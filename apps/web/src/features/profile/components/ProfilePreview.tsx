import { Avatar, Badge, Paper } from '@mantine/core';
import { FaCheck, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { getRegionLabel, type ProfileFormType } from '@/entities/profile';

type Props = {
  profileValues: ProfileFormType;
};
export const ProfilePreview = ({ profileValues }: Props) => {
  return (
    <div className="grid gap-2">
      <div className="grid gap-1">
        <h2 className="text-lg font-bold text-text-black">プレビュー</h2>
        <Paper p="lg" bg="var(--color-background-light-gray)" radius="md">
          <div className="flex gap-4">
            <Avatar size={80} src={profileValues.userImageUrl}>
              <FaUser size={40} />
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-text-black">{profileValues.userName}</h2>
              <p className="text-sm text-text-gray">{profileValues.userDescription}</p>
              {profileValues.mainActivityRegion && (
                <Badge
                  variant="light"
                  color="var(--color-text-primary)"
                  leftSection={<FaMapMarkerAlt size={12} />}
                >
                  {getRegionLabel(profileValues.mainActivityRegion)}
                </Badge>
              )}
              {profileValues.userDescription && (
                <p className="text-sm text-text-gray">{profileValues.userDescription}</p>
              )}
            </div>
          </div>
        </Paper>
      </div>
      <Paper p="md" bg="var(--color-background-blue)" radius="md">
        <div className="flex gap-2">
          <FaCheck size={20} color="var(--mantine-color-blue-6)" />
          <p className="text-sm text-text-blue">
            入力内容を確認して、プロフィールを作成してください
          </p>
        </div>
      </Paper>
    </div>
  );
};
