'use client';

import { Alert, Text } from '@mantine/core';
import { FaInfoCircle } from 'react-icons/fa';
import { LinkButton } from '@/components/Buttons/LinkButton';

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
    <Alert icon={<FaInfoCircle />} title="制限に達しました" color="yellow" variant="light">
      <div className="grid gap-2">
        <Text size="sm">
          現在{currentCount}組推しに登録中です。{maxCount}組まで推しに登録できます。
          <br />
          より多くのアーティストをフォローするには、有料プランへのアップグレードしてください。
        </Text>

        <LinkButton href="/plan" color="var(--color-button-primary)" radius="lg" w="fit-content">
          プランのアップグレード
        </LinkButton>
      </div>
    </Alert>
  );
};
