import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/libs/supabase';

export const uploadImage = async (
  bucket: string,
  uploadPath: string,
  file: File
): Promise<string | null> => {
  const fileName = uuidv4();

  try {
    const { data } = await supabase.storage.from(bucket).upload(`${uploadPath}/${fileName}`, file);

    if (!data) {
      return null;
    }

    const { data: urlData } = await supabase.storage
      .from(bucket)
      .getPublicUrl(`${uploadPath}/${fileName}`);

    if (!urlData) {
      return null;
    }

    return urlData.publicUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
