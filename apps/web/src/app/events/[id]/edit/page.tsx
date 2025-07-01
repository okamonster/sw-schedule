import { notFound } from 'next/navigation';
import { EditEventForm } from '@/features/event/components/EditEventForm';
import { getEventById } from '@/service/event';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditEventPage({ params }: Props) {
  const { id: eventId } = await params;

  const event = await getEventById(eventId);
  if (!event) {
    notFound();
  }

  return event && <EditEventForm event={event} />;
}
