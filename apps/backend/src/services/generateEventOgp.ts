import sharp from 'sharp';
import { LOGO_IMAGE_PATH } from '~/constants/index.js';
import { getBufferImageOperation } from '~/infrastructures/getBufferImageOperation.js';
import { uploadImage } from '~/libs/storage.js';

export const generateEventOgp = async (eventId: string, eventImageUrl: string) => {
  const eventImageBuffer = await getBufferImageOperation(eventImageUrl);
  const logoImageBuffer = await getBufferImageOperation(LOGO_IMAGE_PATH);
  const eventImage = await sharp(eventImageBuffer).resize({
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

  const ogpImage = await eventImage
    .composite([{ input: logoImage, top: 10, left: 10 }])
    .toFormat('webp', { quality: 80 })
    .toBuffer();

  const ogpImageUrl = await uploadImage(
    'images',
    'eventOgp',
    `${eventId}.webp`,
    new File([ogpImage], `${eventId}.webp`, { type: 'image/webp' })
  );

  return ogpImageUrl;
};
