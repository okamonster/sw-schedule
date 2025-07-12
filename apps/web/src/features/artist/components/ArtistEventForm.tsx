'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Paper } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { LinkButton } from '@/components/Buttons/LinkButton';
import {
  type AddArtistEventSchemaType,
  type Artist,
  addArtistEventSchema,
} from '@/entities/artist';
import { useBackendToken } from '@/hooks/useBackendToken';
import { useToast } from '@/hooks/useToast';
import { createArtistEvent } from '@/service/artistEvent';
import { ArtistEventInput } from './ArtistEventInput';

type Props = {
  artist: Artist;
};

export const ArtistEventForm = ({ artist }: Props) => {
  const backendToken = useBackendToken();
  const { showErrorToast, showSuccessToast } = useToast();
  const { back, push } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddArtistEventSchemaType>({
    resolver: zodResolver(addArtistEventSchema),
    defaultValues: {
      eventIds: [],
    },
  });

  const onSubmit = async (data: AddArtistEventSchemaType) => {
    console.log(data);
    try {
      if (!backendToken) {
        return;
      }
      await createArtistEvent(artist.id, data.eventIds, backendToken);
      showSuccessToast('出演情報を追加しました');
      push(`/artists/${artist.id}`);
    } catch (error) {
      showErrorToast('出演情報の追加に失敗しました');
      console.error(error);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Paper className="p-4 grid gap-4" shadow="md" radius="md" withBorder>
        <h2 className="text-lg font-bold text-text-black">イベントを検索</h2>
        <Controller
          control={control}
          name="eventIds"
          render={({ field }) => (
            <ArtistEventInput
              artist={artist}
              value={field.value}
              onChange={field.onChange}
              error={errors.eventIds?.message}
            />
          )}
        />
        <div className="grid gap-2">
          <p className="text-sm text-text-gray">出演予定のイベントが見つからない場合は...</p>
          <LinkButton href={'/events/new'} color="var(--color-button-primary)" radius="lg" w="full">
            イベントを作成
          </LinkButton>
        </div>
      </Paper>
      <div className="flex justify-between">
        <Button variant="subtle" color="var(--color-text-black)" radius="lg" onClick={back}>
          戻る
        </Button>
        <Button color="var(--color-text-primary)" radius="lg" type="submit" onClick={() => {}}>
          追加する
        </Button>
      </div>
    </form>
  );
};
