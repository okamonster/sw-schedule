'use client';

import { Alert, Text } from '@mantine/core';
import { FaInfoCircle } from 'react-icons/fa';

type Props = {
  currentCount: number;
  maxCount: number;
  canFollow: boolean;
};

export const FollowLimitInfo = ({ currentCount, maxCount, canFollow }: Props) => {
  if (canFollow) {
    return null;
  }

  return (
    <Alert
      icon={<FaInfoCircle />}
      title="制限に達しました"
      color="yellow"
      variant="light"
      className="mb-4"
    >
      <Text size="sm">
        現在{currentCount}組推しに登録中です。{maxCount}組まで推しに登録できます。
        <br />
        より多くのアーティストをフォローするには、有料プラン(今後配信予定)へのアップグレードしてください。
      </Text>
    </Alert>
  );
};
