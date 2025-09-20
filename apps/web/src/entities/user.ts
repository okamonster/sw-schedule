import { z } from 'zod';

export const signupUserSchema = z.object({
  email: z
    .string()
    .email('メールアドレスの形式が不正です')
    .min(1, 'メールアドレスを入力してください'),
});

export type SignupUserSchemaType = z.infer<typeof signupUserSchema>;

export const signupSetPasswordSchema = z
  .object({
    password: z.string().min(8, 'パスワードを入力してください'),
    passwordConfirm: z.string().min(8, 'パスワードを入力してください'),
    terms: z.boolean().refine((val) => val, '利用規約に同意してください'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirm'],
  });

export type SignupSetPasswordSchemaType = z.infer<typeof signupSetPasswordSchema>;

export const loginUserSchema = z.object({
  email: z
    .string()
    .email('メールアドレスの形式が不正です')
    .min(1, 'メールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードを入力してください'),
  isRemember: z.boolean().optional(),
});

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;
