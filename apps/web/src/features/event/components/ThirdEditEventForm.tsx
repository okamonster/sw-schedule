/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <isValidating> */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Paper } from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  type EditEventRequestType,
  type FirstEditEventSchemaType,
  type SecondEditEventSchemaType,
  ThirdEditEventSchema,
  type ThirdEditEventSchemaType,
} from '@/entities/event';
import { EventArtistInput } from '@/features/event/components/EventArtistInput';
import { extractPrefecture } from '@/utils/area';
import { parseTimeString } from '@/utils/date';

type Props = {
  firstStepValues: FirstEditEventSchemaType;
  secondStepValues: SecondEditEventSchemaType;
  thirdStepValues: ThirdEditEventSchemaType;
  onChangeThirdStep: (data: ThirdEditEventSchemaType) => void;
  onPrev: () => void;
  onSubmit: (data: EditEventRequestType) => void;
};

export const ThirdEditEventForm = ({
  firstStepValues,
  secondStepValues,
  thirdStepValues,
  onPrev,
  onSubmit,
  onChangeThirdStep,
}: Props) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isValidating },
  } = useForm<ThirdEditEventSchemaType>({
    mode: 'all',
    resolver: zodResolver(ThirdEditEventSchema),
    defaultValues: {
      eventArtists: thirdStepValues.eventArtists,
    },
  });

  useEffect(() => {
    const values = getValues();
    onChangeThirdStep({ ...values });
  }, [getValues, onChangeThirdStep, isValidating]);

  const onSaveEvent = async () => {
    const openTimeParsed = parseTimeString(firstStepValues.openTime);
    const startTimeParsed = parseTimeString(firstStepValues.startTime);

    const dto: EditEventRequestType = {
      eventName: firstStepValues.eventName,
      eventDescription: firstStepValues.eventDescription ?? undefined,
      eventImageUrl: firstStepValues.eventImageUrl ?? undefined,
      eventDate: firstStepValues.eventDate,
      openDateTime: dayjs(firstStepValues.eventDate)
        .hour(openTimeParsed.hour)
        .minute(openTimeParsed.minute)
        .toISOString(),
      startDateTime: dayjs(firstStepValues.eventDate)
        .hour(startTimeParsed.hour)
        .minute(startTimeParsed.minute)
        .toISOString(),
      locatePrefecture: extractPrefecture(secondStepValues.eventLocationAddress),
      eventLocationName: secondStepValues.eventLocationName,
      eventLocationAddress: secondStepValues.eventLocationAddress,
      ticketReleaseDateTime: firstStepValues.ticketReleaseDateTime
        ? new Date(firstStepValues.ticketReleaseDateTime).toISOString()
        : undefined,
      ticketPrice: firstStepValues.ticketPrice.toString(),
      sameDayTicketPrice: firstStepValues.sameDayTicketPrice.toString(),
      ticketUrl: firstStepValues.ticketLink ?? undefined,
      isNeedDrink: firstStepValues.isNeedDrink,
      artists: thirdStepValues.eventArtists,
    };
    try {
      await onSubmit({ ...dto });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSaveEvent)}>
      <Paper className="p-4 grid gap-4" shadow="md" radius="md" withBorder>
        <h2 className="text-lg font-bold text-text-black">出演者情報</h2>

        <div className="grid gap-2">
          <Controller
            control={control}
            name="eventArtists"
            render={({ field }) => (
              <EventArtistInput
                onChange={field.onChange}
                value={field.value}
                error={errors.eventArtists?.message}
              />
            )}
          />
        </div>
      </Paper>
      <div className="flex justify-between">
        <Button variant="subtle" color="var(--color-text-black)" radius="lg" onClick={onPrev}>
          戻る
        </Button>
        <Button color="var(--color-text-primary)" radius="lg" type="submit" disabled={!isValid}>
          保存する
        </Button>
      </div>
    </form>
  );
};
