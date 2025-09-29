export type Profile = {
  id: string;
  userId: string;
  userName: string;
  userImageUrl: string;
  userDescription: string;
  mainActivityRegion: string; // 主な活動地域
  createdAt: Date;
  updatedAt: Date;
};
