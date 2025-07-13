import { Divider, Image } from '@mantine/core';
import { notFound } from 'next/navigation';
import { GoogleMapContainer } from '@/components/Container/GoogleMapContainer';
import { EventArtistSection } from '@/features/event/components/EventArtistSection';
import { EventDateSection } from '@/features/event/components/EventDateSection';
import { EventDetailSection } from '@/features/event/components/EventDetailSection';
import { EventLocationSection } from '@/features/event/components/EventLocationSection';
import { EventTicketSection } from '@/features/event/components/EventTicketSection';
import { getEventById } from '@/service/event';
import { getCurrentUser } from '@/service/user';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id: eventId } = await params;
  const event = await getEventById(eventId);
  if (!event) {
    return notFound();
  }

  return {
    title: event.eventName,
    description: event.eventDescription,
    openGraph: {
      title: event.eventName,
      description: event.eventDescription,
      images: [event.ogpImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.eventName,
      description: event.eventDescription,
      images: [event.ogpImageUrl],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const currentUser = await getCurrentUser();
  const { id } = await params;
  const event = await getEventById(id);

  return (
    <div className="grid">
      <div className="w-full h-[250px] bg-theme">
        <Image src={event.eventImageUrl} alt={event.eventName} h="100%" fit="contain" />
      </div>
      <div className="grid gap-2 p-4 pb-4">
        <EventDetailSection event={event} currentUser={currentUser} />
        <EventArtistSection artists={event.artists.map((artistEvent) => artistEvent.artist)} />
        <Divider />
        <EventTicketSection event={event} />
        <Divider />
        <EventDateSection event={event} />
        <Divider />
        <GoogleMapContainer>
          <EventLocationSection event={event} />
        </GoogleMapContainer>
      </div>
    </div>
  );
}
