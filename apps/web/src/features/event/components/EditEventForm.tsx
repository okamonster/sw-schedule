'use client';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type {
  EditEventRequestType,
  FirstEditEventSchemaType,
  SecondEditEventSchemaType,
  ThirdEditEventSchemaType,
} from '@/entities/event';
import { createEvent } from '@/service/event';
import { useSteps } from '../hooks/useSteps';
import { FirstEditEventForm } from './FirstEditEventForm';
import { SecondEditEventForm } from './SecondEditEventForm';
import { ThirdEditEventForm } from './ThirdEditEventForm';

export const EditEventForm = (): React.ReactNode => {
  const { push } = useRouter();

  const { step, nextStep, prevStep } = useSteps();
  const [firstEditEventFormValue, setFirstEditEventFormValue] = useState<FirstEditEventSchemaType>({
    eventImageUrl: '',
    eventName: '',
    eventDescription: '',
    eventDate: '',
    openTime: '',
    startTime: '',
    ticketLink: '',
    ticketReleaseDateTime: '',
    ticketPrice: 0,
    sameDayTicketPrice: 0,
    isNeedDrink: 'false',
  });

  const [secondEditEventFormValue, setSecondEditEventFormValue] =
    useState<SecondEditEventSchemaType>({
      eventLocationName: '',
      eventLocationAddress: '',
    });

  const [thirdEditEventFormValue, setThirdEditEventFormValue] = useState<ThirdEditEventSchemaType>({
    eventArtists: [],
  });

  const onSaveEvent = async (data: EditEventRequestType) => {
    try {
      const event = await createEvent(data);
      push(`/events/${event.id}`);
    } catch (error) {
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
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? ''}>
          <SecondEditEventForm
            secondStepValues={secondEditEventFormValue}
            onChangeSecondStep={setSecondEditEventFormValue}
            onPrev={prevStep}
            onNext={nextStep}
          />
        </APIProvider>
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
