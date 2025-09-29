import { Badge, Image } from '@mantine/core';
import type { Event } from '@repo/common';
import { FaCheck, FaMapMarkerAlt } from 'react-icons/fa';
import { DEFAULT_IMAGE_URL, getAreaLabel } from '@/constants';
import dayjs from '@/libs/dayjs';

type Props = {
  event: Event;
  isSelected: boolean;
  isRegistered: boolean;
  onClick: () => void;
};

export const EventSelectButton = ({
  event,
  isSelected,
  isRegistered,
  onClick,
}: Props): React.ReactNode => {
  const imageUrl = event.eventImageUrl ? event.eventImageUrl : DEFAULT_IMAGE_URL;

  return (
    <button
      type="button"
      className={`flex rounded-md border border-border-gray ${
        isSelected && 'border-2 border-border-selected-light'
      } ${isRegistered && 'border-2 border-border-gray'} ${
        !isSelected && !isRegistered && 'border-1 border-border-gray'
      } w-full`}
      disabled={isRegistered}
      onClick={onClick}
    >
      <div className="w-[100px] h-full bg-theme shrink-0">
        <Image src={imageUrl} alt="イベント画像" w={100} h="100%" fit="contain" />
      </div>
      <div className="flex p-2 justify-between w-full">
        <div className="grid gap-1 w-full">
          <div className="flex justify-between">
            <p className="text-md font-bold text-start overflow-hidden text-ellipsis">
              {event.eventName.substring(0, 15)}
              {event.eventName.length > 15 && '...'}
            </p>
            {isSelected && <FaCheck className="text-border-selected-light" />}
            {isRegistered && <p className="text-sm text-text-gray text-nowrap">登録済み</p>}
          </div>
          <p className="text-sm text-text-gray text-start">
            開催:{dayjs(event.eventDate).tz().format('YYYY/MM/DD(ddd)')}
          </p>
          <div className="flex gap-1">
            <Badge
              color="var(--color-button-primary)"
              radius="lg"
              leftSection={<FaMapMarkerAlt />}
              className="shrink-0"
            >
              {getAreaLabel(event.locatePrefecture)}
            </Badge>
            <p className="text-sm text-text-gray text-nowrap overflow-hidden text-ellipsis">
              {event.eventLocationName.substring(0, 10)}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};
