import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useBackendToken } from '@/hooks/useBackendToken';
import { useToast } from '@/hooks/useToast';
import {
  createUserArtistFollow,
  deleteUserArtistFollow,
  getUserArtistFollow,
} from '@/service/userArtistFollow';

export const useFollow = (artistId: string) => {
  const backendToken = useBackendToken();
  const { showErrorToast } = useToast();
  const queryClient = useQueryClient();

  // 単一アーティストのフォロー状態を取得
  const { data: isFollowing = false, isLoading: isFetching } = useQuery<boolean>({
    queryKey: ['artistFollow', artistId],
    enabled: !!backendToken && !!artistId,
    initialData: false,
    queryFn: async () => {
      if (!backendToken) {
        return false;
      }
      const userArtistFollow = await getUserArtistFollow(backendToken, artistId);
      return !!userArtistFollow;
    },
  });

  // フォロー/アンフォローのトグル
  const { mutate, isPending } = useMutation({
    mutationKey: ['toggleArtistFollow', artistId],
    mutationFn: async () => {
      if (!backendToken) {
        throw new Error('ログインが必要です');
      }

      // サーバー側の最新状態を見てからトグルする（誤ったAPI呼び出しを防ぐ）
      const currentFollow = await getUserArtistFollow(backendToken, artistId);

      if (currentFollow) {
        await deleteUserArtistFollow(backendToken, artistId);
      } else {
        await createUserArtistFollow(backendToken, artistId);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['artistFollow', artistId] });
      const previous = queryClient.getQueryData<boolean>(['artistFollow', artistId]) ?? isFollowing;

      // 楽観的にトグル
      queryClient.setQueryData<boolean>(['artistFollow', artistId], !previous);

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData<boolean>(['artistFollow', artistId], context.previous);
      }
      showErrorToast('フォロー操作に失敗しました');
    },
    onSettled: async () => {
      // サーバー状態を再フェッチして最終的な整合性を取る
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['artistFollow', artistId] }),
        queryClient.invalidateQueries({ queryKey: ['currentUser'] }),
      ]);
    },
  });

  const handleFollow = () => {
    mutate();
  };

  return { handleFollow, isFollowing, isLoading: isFetching || isPending };
};
