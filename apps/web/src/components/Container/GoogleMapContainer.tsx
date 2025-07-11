'use client';
import { APIProvider } from '@vis.gl/react-google-maps';

export const GoogleMapContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ''}>{children}</APIProvider>
  );
};
