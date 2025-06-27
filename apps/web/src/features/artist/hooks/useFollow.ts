import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  createUserArtistFollow,
  deleteUserArtistFollow,
  getUserArtistFollow,
} from '@/service/userArtistFollow';

export const useFollow = (artistId: string) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const backendToken = session.data?.backendToken;

  // 初期フォロー状態を取得
  useEffect(() => {
    if (!backendToken) {
      return;
    }

    const fetchUserArtistFollow = async () => {
      try {
        const userArtistFollow = await getUserArtistFollow(backendToken, artistId);
        console.log('userArtistFollow', userArtistFollow);
        setIsFollowing(!!userArtistFollow);
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };
    fetchUserArtistFollow();
  }, [backendToken, artistId]);

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
      setIsFollowing(!!userArtistFollow);
    } catch (error) {
      console.error('Error handling follow:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFollow, isFollowing, isLoading };
};
