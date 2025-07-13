import sharp from 'sharp';
import { LOGO_IMAGE_PATH } from '~/constants/index.js';
import { getBufferImageOperation } from '~/infrastructures/getBufferImageOperation.js';
import { uploadImage } from '~/libs/storage.js';

export const generateArtistOgp = async (artistId: string, artistImageUrl: string) => {
  const artistImageBuffer = await getBufferImageOperation(artistImageUrl);
  const logoImageBuffer = await getBufferImageOperation(LOGO_IMAGE_PATH);
  const artistImage = await sharp(artistImageBuffer).resize({
    width: 1200,
    height: 630,
    fit: 'contain',
    background: '#f6f6f6',
  });

  const logoImage = await sharp(logoImageBuffer)
    .resize({
      width: 255,
      height: 85,
    })
    .toBuffer();

  const ogpImage = await artistImage
    .composite([{ input: logoImage, top: 10, left: 10 }])
    .toFormat('webp', { quality: 80 })
    .toBuffer();

  const ogpImageUrl = await uploadImage(
    'images',
    'artistOgp',
    `${artistId}.webp`,
    new File([ogpImage], `${artistId}.webp`, { type: 'image/webp' })
  );

  return ogpImageUrl;
};
