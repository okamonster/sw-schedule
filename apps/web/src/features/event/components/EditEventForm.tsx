'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GoogleMapContainer } from '@/components/Container/GoogleMapContainer';
import type {
  EditEventRequestType,
  Event,
  FirstEditEventSchemaType,
  SecondEditEventSchemaType,
  ThirdEditEventSchemaType,
} from '@/entities/event';
import { useBackendToken } from '@/hooks/useBackendToken';
import { useToast } from '@/hooks/useToast';
import dayjs from '@/libs/dayjs';
import { createEvent, updateEvent } from '@/service/event';
import { useSteps } from '../hooks/useSteps';
import { FirstEditEventForm } from './FirstEditEventForm';
import { SecondEditEventForm } from './SecondEditEventForm';
import { ThirdEditEventForm } from './ThirdEditEventForm';

type Props = {
  event?: Event;
};

export const EditEventForm = ({ event }: Props): React.ReactNode => {
  const { push } = useRouter();
  const backendToken = useBackendToken();
  const { step, nextStep, prevStep } = useSteps();
  const [firstEditEventFormValue, setFirstEditEventFormValue] = useState<FirstEditEventSchemaType>({
    eventImageUrl: event?.eventImageUrl ?? '',
    eventName: event?.eventName ?? '',
    eventDescription: event?.eventDescription ?? '',
    eventDate: event?.eventDate ? dayjs(event.eventDate).toISOString() : '',
    openTime: event?.openDateTime ? dayjs(event.openDateTime).format('HH:mm') : '',
    startTime: event?.startDateTime ? dayjs(event.startDateTime).format('HH:mm') : '',
    ticketLink: event?.ticketUrl ?? '',
    ticketReleaseDateTime: event?.ticketReleaseDateTime
      ? dayjs(event.ticketReleaseDateTime).toISOString()
      : '',
    ticketPrice: event?.ticketPrice ?? 0,
    sameDayTicketPrice: event?.sameDayTicketPrice ?? 0,
    isNeedDrink: event?.isNeedDrink ? 'true' : 'false',
    drinkOption: event?.drinkOption ?? '',
  });

  const [secondEditEventFormValue, setSecondEditEventFormValue] =
    useState<SecondEditEventSchemaType>({
      eventLocationName: event?.eventLocationName ?? '',
      eventLocationAddress: event?.eventLocationAddress ?? '',
    });

  const [thirdEditEventFormValue, setThirdEditEventFormValue] = useState<ThirdEditEventSchemaType>({
    eventArtists: event?.artists.map((artistEvent) => artistEvent.artist.id) ?? [],
  });
  const { showErrorToast, showSuccessToast } = useToast();

  const onSaveEvent = async (data: EditEventRequestType) => {
    try {
      if (!backendToken) {
        return;
      }
      const editedEvent = event
        ? await updateEvent(event.id, data, backendToken)
        : await createEvent(data);

      showSuccessToast(event ? 'イベントを更新しました' : 'イベントを作成しました');
      await push(`/events/${editedEvent.id}`);
    } catch (error) {
      showErrorToast('イベントの保存に失敗しました');
      console.error(error);
    }
  };

  return (
    <div className="px-4 py-6">
      {/* ページタイトル */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-black mb-2">新しいイベントを追加</h1>
        <p className="text-sm text-text-gray">出演情報をみんなと共有しよう！</p>
      </div>

      {/* 作成フォーム */}
      {step === 1 && (
        <FirstEditEventForm
          firstStepValues={firstEditEventFormValue}
          onChangeFirstStep={setFirstEditEventFormValue}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <GoogleMapContainer>
          <SecondEditEventForm
            secondStepValues={secondEditEventFormValue}
            onChangeSecondStep={setSecondEditEventFormValue}
            onPrev={prevStep}
            onNext={nextStep}
          />
        </GoogleMapContainer>
      )}
      {step === 3 && (
        <ThirdEditEventForm
          firstStepValues={firstEditEventFormValue}
          secondStepValues={secondEditEventFormValue}
          thirdStepValues={thirdEditEventFormValue}
          onPrev={prevStep}
          onSubmit={onSaveEvent}
          onChangeThirdStep={setThirdEditEventFormValue}
        />
      )}
    </div>
  );
};
