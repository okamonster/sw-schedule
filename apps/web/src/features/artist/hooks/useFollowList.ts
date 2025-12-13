import type { Artist, User } from '@repo/common';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useBackendToken } from '@/hooks/useBackendToken';
import { useToast } from '@/hooks/useToast';
import { getCurrentUserByBackendToken } from '@/service/user';
import { createUserArtistFollow, deleteUserArtistFollow } from '@/service/userArtistFollow';

// フォロー制限定数
const MAX_FOLLOWING_ARTISTS_FREE_PLAN = 3;

export const useFollowList = (artists: Artist[]) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  // 楽観的更新用のローカルフォロー状態（サーバーからの状態より優先して表示する）
  const [localFollowing, setLocalFollowing] = useState<Record<string, boolean | undefined>>({});
  const backendToken = useBackendToken();
  const { showErrorToast } = useToast();
  const queryClient = useQueryClient();

  // ユーザー情報を取得（TanStack Query 経由でキャッシュ）
  const { data: user } = useQuery<User | null>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      if (!backendToken) {
        return null;
      }
      return await getCurrentUserByBackendToken(backendToken);
    },
    enabled: !!backendToken,
  });

  // フォロー制限情報を計算（現在は無料プランのみ対応）
  const followLimit = user
    ? {
        currentCount: user.followingArtists.length,
        maxCount: MAX_FOLLOWING_ARTISTS_FREE_PLAN,
        canFollow: user.followingArtists.length < MAX_FOLLOWING_ARTISTS_FREE_PLAN,
      }
    : null;

  // アーティストごとのベースフォロー状態をユーザー情報から算出
  const baseFollowingStates = useMemo(() => {
    if (!user) {
      return {};
    }
    const followedIds = new Set(user.followingArtists.map((f) => f.artistId));
    const states: Record<string, boolean> = {};
    for (const artist of artists) {
      states[artist.id] = followedIds.has(artist.id);
    }
    return states;
  }, [user, artists]);

  // ローカルの楽観的状態をマージした最終的なフォロー状態
  const followingStates = useMemo(() => {
    const merged: Record<string, boolean> = { ...baseFollowingStates };
    for (const [id, value] of Object.entries(localFollowing)) {
      if (value !== undefined) {
        merged[id] = value;
      }
    }
    return merged;
  }, [baseFollowingStates, localFollowing]);

  // フォロー/アンフォロー処理
  const handleFollow = async (artistId: string) => {
    if (!backendToken) {
      showErrorToast('ログインが必要です');
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [artistId]: true }));

    const isCurrentlyFollowing = followingStates[artistId];
    const nextFollowing = !isCurrentlyFollowing;

    // フォロー制限をチェック（フォローするときのみ）
    if (!isCurrentlyFollowing && followLimit && !followLimit.canFollow) {
      showErrorToast(
        `フォロー制限に達しました。現在${followLimit.currentCount}人フォロー中です。無料プランは${followLimit.maxCount}人までフォローできます。`
      );
      setLoadingStates((prev) => ({ ...prev, [artistId]: false }));
      return;
    }

    // UI は即座に次の状態を表示（サーバー結果が来るまで固定）
    setLocalFollowing((prev) => ({ ...prev, [artistId]: nextFollowing }));

    try {
      if (nextFollowing) {
        // フォロー
        await createUserArtistFollow(backendToken, artistId);
      } else {
        // アンフォロー
        await deleteUserArtistFollow(backendToken, artistId);
      }

      // サーバー状態を再取得して最終的な整合性を取る
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    } catch (error) {
      console.error('Error handling follow:', error);
      showErrorToast('フォロー操作に失敗しました');
    } finally {
      // サーバー状態が反映されたタイミングでローカル状態の上書きを解除
      setLocalFollowing((prev) => {
        const { [artistId]: _, ...rest } = prev;
        return rest;
      });
      setLoadingStates((prev) => ({ ...prev, [artistId]: false }));
    }
  };

  return {
    followingStates,
    loadingStates,
    followLimit,
    handleFollow,
    canFollow: followLimit?.canFollow ?? true,
  };
};
