import { useState } from 'react';
import { SUPABASE_BUCKETS, SUPABASE_UPLOAD_PATHS } from '@/constants';
import { uploadImage } from '@/libs/storage';

export const useUploadImage = (
  onChange: (value: string) => void
): {
  isUploading: boolean;
  handleUpload: (file: File | null) => Promise<void>;
} => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File | null): Promise<void> => {
    if (!file) {
      return;
    }

    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(SUPABASE_BUCKETS.USERS, SUPABASE_UPLOAD_PATHS.USERS, file);

      if (!imageUrl) {
        throw new Error('画像のアップロードに失敗しました');
      }

      onChange(imageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    handleUpload,
  };
};
