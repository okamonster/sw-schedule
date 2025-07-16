import { useEffect, useMemo, useState } from 'react';
import type { Artist } from '@/entities/artist';
import { plans } from '@/entities/plan';
import type { User } from '@/entities/user';
import { useBackendToken } from '@/hooks/useBackendToken';
import { useToast } from '@/hooks/useToast';
import { getCurrentUserByBackendToken } from '@/service/user';
import {
  createUserArtistFollow,
  deleteUserArtistFollow,
  getUserArtistFollow,
} from '@/service/userArtistFollow';

export const useFollowList = () => {
  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<User | null>(null);
  const backendToken = useBackendToken();
  const { showErrorToast } = useToast();

  const currentPlan = useMemo(() => {
    const currentPlan = plans.find((plan) => plan.planType === user?.planType);
    if (!currentPlan) {
      return plans[0];
    }
    return currentPlan;
  }, [user]);

  // ユーザー情報を取得
  useEffect(() => {
    if (!backendToken) {
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getCurrentUserByBackendToken(backendToken);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [backendToken]);

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

        // ユーザー情報を更新（フォロー数を減らす）
        if (user) {
          setUser({
            ...user,
            followingArtists: user.followingArtists.filter(
              (follow) => follow.artistId !== artistId
            ),
          });
        }
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

        // ユーザー情報を更新（フォロー数を増やす）
        if (user) {
          setUser({
            ...user,
            followingArtists: [
              ...user.followingArtists,
              {
                id: '',
                userId: user.id,
                artistId,
                createdAt: new Date(),
                updatedAt: new Date(),
                artist: {} as Artist,
                user: {} as User,
              },
            ],
          });
        }
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
