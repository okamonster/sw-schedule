'use client';
import { APIProvider } from '@vis.gl/react-google-maps';
import { FirstEditEventForm } from '@/features/event/components/FirstEditEventForm';
import { SecondEditEventForm } from '@/features/event/components/SecondEditEventForm';
import { ThirdEditEventForm } from '@/features/event/components/ThirdEditEventForm';
import { useSteps } from '@/features/event/hooks/useSteps';

export default function CreateArtistPage() {
  const { step, nextStep, prevStep } = useSteps();

  return (
    <div className="px-4 py-6">
      {/* ページタイトル */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-black mb-2">新しいイベントを追加</h1>
        <p className="text-sm text-text-gray">出演情報をみんなと共有しよう！</p>
      </div>

      {/* 作成フォーム */}
      {step === 1 && <FirstEditEventForm onNext={nextStep} />}
      {step === 2 && (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? ''}>
          <SecondEditEventForm onPrev={prevStep} onNext={nextStep} />
        </APIProvider>
      )}
      {step === 3 && <ThirdEditEventForm onPrev={prevStep} onSubmit={() => {}} />}
    </div>
  );
}
