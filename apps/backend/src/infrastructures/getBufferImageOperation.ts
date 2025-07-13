import axios from 'axios';

export const getBufferImageOperation = async (imageUrl: string) => {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  return Buffer.from(response.data);
};
