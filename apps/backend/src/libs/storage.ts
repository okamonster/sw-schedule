import { supabase } from './supabase.js';

export const uploadImage = async (
  bucket: string,
  uploadPath: string,
  fileName: string,
  file: File | Buffer
): Promise<string | null> => {
  try {
    const { data } = await supabase.storage.from(bucket).upload(`${uploadPath}/${fileName}`, file, {
      upsert: true,
    });

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
