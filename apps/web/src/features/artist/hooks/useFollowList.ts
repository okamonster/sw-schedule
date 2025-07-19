import { useState } from 'react';
import type { Artist } from '@/entities/artist';
import { useBackendToken } from '@/hooks/useBackendToken';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useToast } from '@/hooks/useToast';
import {
  createUserArtistFollow,
  deleteUserArtistFollow,
  getUserArtistFollow,
} from '@/service/userArtistFollow';

export const useFollowList = () => {
  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const { user, currentPlan, refetchCurrentUser } = useCurrentUser();
  const backendToken = useBackendToken();
  const { showErrorToast } = useToast();

  // フォロー制限情報を計算（現在は無料プランのみ対応）
  const followLimit = user
    ? {
        currentCount: user.followingArtists.length,
        maxCount: currentPlan.maxFollowingArtists,
        canFollow: user.followingArtists.length < currentPlan.maxFollowingArtists,
      }
    : null;

  // アーティストのフォロー状態を取得
  const fetchFollowStates = async (artists: Artist[]) => {
    if (!backendToken) {
      return;
    }

    try {
      const states: Record<string, boolean> = {};
      await Promise.all(
        artists.map(async (artist) => {
          try {
            const follow = await getUserArtistFollow(backendToken, artist.id);
            states[artist.id] = !!follow;
          } catch (error) {
            console.error(`Error fetching follow state for artist ${artist.id}:`, error);
            states[artist.id] = false;
          }
        })
      );
      setFollowingStates(states);
    } catch (error) {
      console.error('Error fetching follow states:', error);
    }
  };

  // フォロー/アンフォロー処理
  const handleFollow = async (artistId: string) => {
    if (!backendToken) {
      showErrorToast('ログインが必要です');
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [artistId]: true }));

    try {
      const isCurrentlyFollowing = followingStates[artistId];

      if (isCurrentlyFollowing) {
        // アンフォロー
        await deleteUserArtistFollow(backendToken, artistId);
        setFollowingStates((prev) => ({ ...prev, [artistId]: false }));

        refetchCurrentUser();
      } else {
        // フォロー制限をチェック
        if (followLimit && !followLimit.canFollow) {
          showErrorToast(
            `フォロー制限に達しました。現在${followLimit.currentCount}人フォロー中です。無料プランは${followLimit.maxCount}人までフォローできます。`
          );
          return;
        }

        // フォロー
        await createUserArtistFollow(backendToken, artistId);
        setFollowingStates((prev) => ({ ...prev, [artistId]: true }));

        refetchCurrentUser();
      }
    } catch (error) {
      console.error('Error handling follow:', error);
      const errorMessage = error instanceof Error ? error.message : 'フォロー操作に失敗しました';
      showErrorToast(errorMessage);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [artistId]: false }));
    }
  };

  return {
    followingStates,
    loadingStates,
    followLimit,
    fetchFollowStates,
    handleFollow,
    canFollow: followLimit?.canFollow ?? true,
  };
};
