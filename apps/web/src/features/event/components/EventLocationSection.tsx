'use client';
import { Map as GoogleMap, Marker, useApiIsLoaded } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import type { Event } from '@/entities/event';

type Props = {
  event: Event;
};

export const EventLocationSection = ({ event }: Props): React.ReactNode => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const isLoaded = useApiIsLoaded();

  useEffect(() => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: event.eventLocationAddress }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          setLocation({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        }
      });
    }
    return () => {
      setLocation(null);
    };
  }, [event.eventLocationAddress, isLoaded]);

  return (
    <section className="grid gap-2">
      <p className="text-sm font-bold">会場</p>
      <div className="grid gap-1 px-2">
        <p className="text-sm text-text-gray">{event.eventLocationName}</p>
        <p className="text-sm text-text-gray">住所:{event.eventLocationAddress}</p>
      </div>
      <div className="w-full h-[250px]">
        <GoogleMap
          defaultZoom={15}
          center={location ?? { lat: 35.681236, lng: 139.767125 }}
          className="w-full h-full rounded-md"
        >
          <Marker position={location ?? { lat: 35.681236, lng: 139.767125 }} />
        </GoogleMap>
      </div>
    </section>
  );
};
