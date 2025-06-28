'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Paper, TextInput } from '@mantine/core';
import { useApiIsLoaded } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SecondEditEventSchema, type SecondEditEventSchemaType } from '@/entities/event';
import { MapContent } from '@/features/map/components/MapContent';
import { VenueSearchInput } from './VenueSearchInput';

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

export const SecondEditEventForm = ({ onPrev, onNext }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<SecondEditEventSchemaType>({
    mode: 'all',
    defaultValues: {
      eventLocationName: '',
      eventLocationAddress: '',
    },
    resolver: zodResolver(SecondEditEventSchema),
  });

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const isLoaded = useApiIsLoaded();

  const handlePlaceSelect = (
    name: string,
    address: string,
    location: { lat: number; lng: number }
  ) => {
    setValue('eventLocationName', name);
    setValue('eventLocationAddress', address);
    setSelectedLocation(location);
  };

  const handleVenueNameChange = (value: string) => {
    setValue('eventLocationName', value);
    if (!value) {
      setValue('eventLocationAddress', '');
      setSelectedLocation(null);
    }
  };

  const handleVenueAddressChange = (value: string) => {
    setValue('eventLocationAddress', value);
    if (!value) {
      setSelectedLocation(null);
      return;
    }
    if (isLoaded && typeof window !== 'undefined' && window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: value }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          setSelectedLocation({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        }
      });
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onNext)}>
      <Paper className="p-4 grid gap-4" shadow="md" radius="md" withBorder>
        <h2 className="text-lg font-bold text-text-black">会場情報</h2>

        <div className="grid gap-2">
          <Controller
            control={control}
            name="eventLocationName"
            render={({ field }) => (
              <VenueSearchInput
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  handleVenueNameChange(value);
                }}
                onPlaceSelect={handlePlaceSelect}
                label="会場名"
                description="ライブハウス名など"
                placeholder="会場名を入力してください"
              />
            )}
          />

          <Controller
            control={control}
            name="eventLocationAddress"
            render={({ field }) => (
              <TextInput
                label="会場住所"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  handleVenueAddressChange(e.target.value);
                }}
                error={errors.eventLocationAddress?.message}
                placeholder="住所が自動入力されます"
              />
            )}
          />

          <div className="h-[200px]">
            <MapContent center={selectedLocation || undefined} />
          </div>
        </div>
      </Paper>
      <div className="flex justify-between">
        <Button variant="subtle" color="var(--color-text-black)" radius="lg" onClick={onPrev}>
          戻る
        </Button>
        <Button color="var(--color-text-primary)" radius="lg" type="submit" disabled={!isValid}>
          次へ
        </Button>
      </div>
    </form>
  );
};
