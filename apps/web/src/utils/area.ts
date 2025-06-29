import { AREAS } from '@/constants';

export const extractPrefecture = (address: string): string => {
  if (!address) return '';

  // AREASのlabelと住所を比較（最初の「すべて」は除外）
  for (const area of AREAS.slice(1)) {
    if (address.includes(area.label)) {
      return area.value;
    }
  }

  // 都道府県が見つからない場合は空文字を返す
  return '';
};
