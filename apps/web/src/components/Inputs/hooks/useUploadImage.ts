import { useState } from 'react';
import { uploadImage } from '@/libs/storage';

export const useUploadImage = (
  buketName: string,
  uploadPath: string,
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
      const imageUrl = await uploadImage(buketName, uploadPath, file);

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
