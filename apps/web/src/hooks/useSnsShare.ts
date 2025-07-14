import { useCallback } from 'react';
import { useToast } from '@/hooks/useToast';

export const useSnsShare = (): {
  copyUrl: () => Promise<void>;
  shareX: (text: string, url: string, hashTags: string[]) => void;
} => {
  const { showSuccessToast } = useToast();

  const shareX = useCallback(
    (text: string, url: string, hashTags: string[]) => {
      const shareBaseUrl = new URL('http://x.com/intent/tweet/');
      const urlParams = [['text', `${text}\n`]];
      url && urlParams.push(['url', `${url}\n`]);
      hashTags && urlParams.push(['hashtags', hashTags.join(',')]);

      const params = new URLSearchParams(urlParams);
      shareBaseUrl.search = params.toString();
      const shareUrl = shareBaseUrl.toString();

      window.open(shareUrl, '_blank', 'noopener noreferrer');
      showSuccessToast('Xでシェアしました');
    },
    [showSuccessToast]
  );

  const copyUrl = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
    showSuccessToast('URLをコピーしました');
  }, [showSuccessToast]);

  return { copyUrl, shareX };
};
