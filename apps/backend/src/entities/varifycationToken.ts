import { z } from 'zod';

export const varificateTokenRequestSchema = z.object({
  email: z.string(),
});

export type VarificateTokenRequestSchemaType = z.infer<typeof varificateTokenRequestSchema>;

export const verifyTokenRequestSchema = z.object({
  email: z.string(),
  token: z.string(),
});

export type VerifyTokenRequestSchemaType = z.infer<typeof verifyTokenRequestSchema>;
