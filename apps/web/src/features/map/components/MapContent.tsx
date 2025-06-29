/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: <Map> */
'use client';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

type Props = {
  center?: { lat: number; lng: number };
};

export const MapContent = ({ center }: Props) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? '';
  const defaultCenter = { lat: 35.656, lng: 139.737 };

  return (
    <APIProvider apiKey={apiKey} libraries={['places']}>
      <Map defaultZoom={15} center={center || defaultCenter} className="w-full h-full rounded-md">
        <Marker position={center || defaultCenter} />
      </Map>
    </APIProvider>
  );
};
