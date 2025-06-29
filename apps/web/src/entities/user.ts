import { z } from 'zod';
import type { Profile } from './profile';
import type { UserArtistFollow } from './userArtistFollow';

export type User = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profile: Profile;
  followingArtists: UserArtistFollow[];
};

export const signupUserSchema = z
  .object({
    email: z
      .string()
      .email('メールアドレスの形式が不正です')
      .min(1, 'メールアドレスを入力してください'),
    password: z.string().min(8, 'パスワードを入力してください'),
    passwordConfirm: z.string().min(8, 'パスワードを入力してください'),
    terms: z.boolean().refine((val) => val, '利用規約に同意してください'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'パスワードが一致しません',
  });

export type SignupUserSchemaType = z.infer<typeof signupUserSchema>;

export const loginUserSchema = z.object({
  email: z
    .string()
    .email('メールアドレスの形式が不正です')
    .min(1, 'メールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードを入力してください'),
  isRemember: z.boolean().optional(),
});

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;
