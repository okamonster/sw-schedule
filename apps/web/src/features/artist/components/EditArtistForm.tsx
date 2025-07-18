'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Paper, Select, Textarea, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import { ImageInput } from '@/components/Inputs/ImageInput';
import { ARTIST_GENRES, JAPAN_REGIONS, SUPABASE_BUCKETS, SUPABASE_UPLOAD_PATHS } from '@/constants';
import { type Artist, type CreateArtistSchemaType, createArtistSchema } from '@/entities/artist';
import { useToast } from '@/hooks/useToast';
import { createArtist, updateArtist } from '@/service/artist';

type Props = {
  artist?: Artist;
};

export const EditArtistForm = ({ artist }: Props) => {
  const { push } = useRouter();
  const { showErrorToast, showSuccessToast } = useToast();

  const session = useSession();

  const onSubmit = async (data: CreateArtistSchemaType) => {
    const backendToken = session.data?.backendToken;
    if (!backendToken) {
      return;
    }

    try {
      const newArtist = artist
        ? await updateArtist(artist.id, data, backendToken)
        : await createArtist(data, backendToken);

      showSuccessToast(artist ? 'アーティストを更新しました' : 'アーティストを作成しました');

      return push(`/artists/${newArtist.id}`);
    } catch (error) {
      showErrorToast('アーティストの作成に失敗しました');
      console.error(error);
    }
  };

  const {
    register,
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateArtistSchemaType>({
    defaultValues: {
      artistName: artist?.artistName ?? '',
      artistImageUrl: artist?.artistImageUrl ?? '',
      artistDescription: artist?.artistDescription ?? '',
      genre: artist?.genre ?? '',
      region: artist?.region ?? '',
      twitterId: artist?.twitterId ?? '',
      instagramId: artist?.instagramId ?? '',
      youtubeUrl: artist?.youtubeUrl ?? '',
    },
    resolver: zodResolver(createArtistSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {/* 基本情報 */}
      <Paper className="p-4 grid gap-2" shadow="md" radius="md" withBorder>
        <h2 className="text-lg font-bold text-text-black mb-4">アーティスト情報</h2>

        <div className="grid gap-2">
          {/* 推しの画像 */}
          <div className="text-center">
            <Controller
              control={control}
              name="artistImageUrl"
              render={({ field }) => (
                <ImageInput
                  buketName={SUPABASE_BUCKETS.IMAGES}
                  uploadPath={SUPABASE_UPLOAD_PATHS.ARTISTS}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  error={errors.artistImageUrl?.message}
                />
              )}
            />
          </div>

          <TextInput
            label="アーティスト名"
            placeholder="推しの名前を入力"
            {...register('artistName')}
            error={errors.artistName?.message}
          />

          <Controller
            control={control}
            name="genre"
            render={({ field }) => (
              <Select
                label="ジャンル"
                placeholder="ジャンルを選択"
                data={ARTIST_GENRES}
                searchable
                clearable
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.genre?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="region"
            render={({ field }) => (
              <Select
                label="活動地域"
                placeholder="活動地域を選択"
                data={JAPAN_REGIONS}
                searchable
                clearable
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.region?.message}
              />
            )}
          />

          <Textarea
            label="詳細"
            {...register('artistDescription')}
            error={errors.artistDescription?.message}
            rows={4}
            placeholder="推しの魅力や特徴を教えてください..."
          />
        </div>
      </Paper>

      {/* SNS */}
      <Paper className="p-4 grid gap-2" shadow="md" radius="md" withBorder>
        <h2 className="text-lg font-bold text-text-black mb-4">SNS</h2>

        <div className="grid gap-4">
          <TextInput
            label="X(旧Twitter)"
            {...register('twitterId')}
            error={errors.twitterId?.message}
            placeholder="IDを入力"
          />

          <TextInput
            label="Instagram"
            {...register('instagramId')}
            error={errors.instagramId?.message}
            placeholder="IDを入力"
          />

          <TextInput
            label="YouTube"
            {...register('youtubeUrl')}
            error={errors.youtubeUrl?.message}
            placeholder="URLを入力"
          />
        </div>
      </Paper>

      {/* 送信ボタン */}
      <div className="flex justify-center">
        <Button
          type="submit"
          color="var(--color-button-primary)"
          radius="lg"
          fullWidth
          disabled={!isValid}
        >
          {artist ? '更新' : '作成'}
        </Button>
      </div>
    </form>
  );
};
