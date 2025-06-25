import { Divider, Select } from '@mantine/core';
import { type Control, Controller, type FieldErrors } from 'react-hook-form';
import { JAPAN_REGIONS, type ProfileFormType } from '@/entities/profile';

type Props = {
  control: Control<ProfileFormType>;
  errors: FieldErrors<ProfileFormType>;
};

export const SecondProfileEditFormContent = ({ control, errors }: Props) => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-1">
        <h2 className="text-lg font-bold text-text-black">あなたのよく行く「Gemba!」は？</h2>
        <p className="text-sm text-text-gray">あなたの主な現場の地域を選択してください</p>
      </div>

      <Controller
        control={control}
        name="mainActivityRegion"
        render={({ field }) => (
          <Select
            label="主な活動地域"
            placeholder="活動地域を選択してください"
            data={JAPAN_REGIONS}
            value={field.value}
            onChange={(value) => field.onChange(value || '')}
            error={errors.mainActivityRegion?.message}
            radius="md"
          />
        )}
      />

      <Divider />
    </div>
  );
};
