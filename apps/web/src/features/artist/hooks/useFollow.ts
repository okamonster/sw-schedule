import { useEffect, useMemo, useState } from 'react';
import { useBackendToken } from '@/hooks/useBackendToken';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import {
  createUserArtistFollow,
  deleteUserArtistFollow,
  getUserArtistFollow,
} from '@/service/userArtistFollow';

export const useFollow = (
  artistId: string
): {
  handleFollow: () => Promise<void>;
  isFollowing: boolean;
  isCanFollow: boolean;
  isLoading: boolean;
} => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, currentPlan, refetchCurrentUser } = useCurrentUser();
  const backendToken = useBackendToken();

  // 初期フォロー状態を取得
  useEffect(() => {
    if (!backendToken) {
      return;
    }

    const fetchUserArtistFollow = async () => {
      try {
        const userArtistFollow = await getUserArtistFollow(backendToken, artistId);
        setIsFollowing(!!userArtistFollow);
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };
    fetchUserArtistFollow();
  }, [backendToken, artistId]);

  const isCanFollow = useMemo(() => {
    return !!(
      user?.followingArtists.length &&
      user.followingArtists.length < currentPlan.maxFollowingArtists
    );
  }, [user, currentPlan]);

  const handleFollow = async () => {
    if (!backendToken) {
      throw new Error('Backend token not found');
    }

    setIsLoading(true);
    try {
      if (isFollowing) {
        await deleteUserArtistFollow(backendToken, artistId);
      } else {
        await createUserArtistFollow(backendToken, artistId);
      }

      // 操作後に再フェッチして状態を同期
      const userArtistFollow = await getUserArtistFollow(backendToken, artistId);
      await refetchCurrentUser();
      setIsFollowing(!!userArtistFollow);
    } catch (error) {
      console.error('Error handling follow:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFollow, isFollowing, isCanFollow, isLoading };
};
