import { LinkButton } from '@/components/Buttons/LinkButton';
import type { Event } from '@/entities/event';
import dayjs from '@/libs/dayjs';

type Props = {
  event: Event;
};

export const EventTicketSection = ({ event }: Props): React.ReactNode => {
  return (
    <section className="grid gap-2">
      <p className="text-sm font-bold">チケット</p>
      <p className="text-sm text-text-gray">
        通常:{event.ticketPrice}円
        {!!event.sameDayTicketPrice && ` / 当日:${event.sameDayTicketPrice}円`}
        {event.isNeedDrink && ' / 1ドリンク必須'}
      </p>
      {event.drinkOption && <p className="text-sm text-text-gray">{event.drinkOption}</p>}
      {event.ticketReleaseDateTime && (
        <p className="text-sm text-text-gray">
          発売日時:{dayjs(event.ticketReleaseDateTime).format('YYYY/MM/DD HH:mm')}
        </p>
      )}
      <LinkButton
        href={event.ticketUrl}
        variant="filled"
        color="var(--color-button-primary)"
        radius="lg"
      >
        チケットページへ
      </LinkButton>
    </section>
  );
};
