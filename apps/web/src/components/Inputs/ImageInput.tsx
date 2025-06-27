'use client';

import { ActionIcon, Avatar, Loader, Text } from '@mantine/core';
import { useRef } from 'react';
import { FaCamera, FaTrash, FaUser } from 'react-icons/fa';
import { useUploadImage } from './hooks/useUploadImage';

type Props = {
  buketName: string;
  uploadPath: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export const ImageInput = ({
  buketName,
  uploadPath,
  value,
  onChange,
  error,
}: Props): React.ReactNode => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, handleUpload } = useUploadImage(buketName, uploadPath, onChange);

  const handleDelete = () => {
    // ファイル入力もクリア
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // 値を空文字列に設定
    onChange('');
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <Avatar
          size={120}
          src={value}
          alt="user image"
          radius="xl"
          style={{ cursor: isUploading ? 'not-allowed' : 'pointer' }}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <FaUser size={60} />
        </Avatar>

        {/* ローディングオーバーレイ */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-theme bg-opacity-50 rounded-md">
            <Loader size="md" color="white" />
          </div>
        )}

        {/* カメラアイコン（画像が選択されていない場合のみ表示） */}
        {!value && !isUploading && (
          <ActionIcon
            size="lg"
            variant="filled"
            color="var(--color-text-primary)"
            radius="xl"
            pos="absolute"
            bottom={0}
            right={0}
            onClick={() => fileInputRef.current?.click()}
          >
            <FaCamera size={16} />
          </ActionIcon>
        )}

        {/* 削除バッジ（画像が選択されている場合のみ表示） */}
        {value && !isUploading && (
          <ActionIcon
            size="md"
            variant="filled"
            color="red"
            radius="xl"
            pos="absolute"
            top={-8}
            right={-8}
            onClick={handleDelete}
            style={{ zIndex: 10 }}
          >
            <FaTrash size={12} />
          </ActionIcon>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          disabled={isUploading}
          onChange={async (e) => {
            await handleUpload(e.target.files?.[0] ?? null);
          }}
        />
      </div>

      {/* ローディングテキスト */}
      {isUploading && (
        <Text size="sm" c="dimmed" ta="center">
          画像をアップロード中...
        </Text>
      )}

      {/* エラーメッセージ */}
      {error && (
        <Text size="sm" c="red" ta="center">
          {error}
        </Text>
      )}
    </div>
  );
};
